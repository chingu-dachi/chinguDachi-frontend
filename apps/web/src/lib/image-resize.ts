const PROFILE_IMAGE_MAX_DIMENSION_PX = 500;
const JPEG_QUALITY = 0.8;

export function resizeImage(file: File): Promise<File> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    const objectUrl = URL.createObjectURL(file);

    img.onload = () => {
      URL.revokeObjectURL(objectUrl);

      const canvas = document.createElement('canvas');
      let { width, height } = img;

      if (width > PROFILE_IMAGE_MAX_DIMENSION_PX || height > PROFILE_IMAGE_MAX_DIMENSION_PX) {
        if (width > height) {
          height = Math.round((height * PROFILE_IMAGE_MAX_DIMENSION_PX) / width);
          width = PROFILE_IMAGE_MAX_DIMENSION_PX;
        } else {
          width = Math.round((width * PROFILE_IMAGE_MAX_DIMENSION_PX) / height);
          height = PROFILE_IMAGE_MAX_DIMENSION_PX;
        }
      }

      canvas.width = width;
      canvas.height = height;
      const ctx = canvas.getContext('2d');
      if (!ctx) {
        reject(new Error('Canvas context not available'));
        return;
      }
      // JPEG 변환 시 투명 배경이 검은색이 되지 않도록 흰색 배경 채움
      ctx.fillStyle = '#FFFFFF';
      ctx.fillRect(0, 0, width, height);
      ctx.drawImage(img, 0, 0, width, height);
      canvas.toBlob(
        (blob) => {
          if (!blob) {
            reject(new Error('Failed to create blob'));
            return;
          }
          const outputName = file.name.replace(/\.[^.]+$/, '.jpg');
          resolve(new File([blob], outputName, { type: 'image/jpeg' }));
        },
        'image/jpeg',
        JPEG_QUALITY,
      );
    };
    img.onerror = () => {
      URL.revokeObjectURL(objectUrl);
      reject(new Error('Failed to load image'));
    };
    img.src = objectUrl;
  });
}
