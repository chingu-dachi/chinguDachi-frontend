import { useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { uploadApi } from '@chingu-dachi/api-client';
import { Avatar, Spinner } from '@/components/ui';
import { resizeImage } from '@/lib/image-resize';

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'];

interface ProfileImageUploaderProps {
  imageUrl: string | null;
  onChange: (url: string | null) => void;
}

export function ProfileImageUploader({
  imageUrl,
  onChange,
}: ProfileImageUploaderProps) {
  const { t } = useTranslation('auth');
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file || isUploading) return;

    setError(null);

    if (!ALLOWED_TYPES.includes(file.type)) {
      setError(t('invalidFileType'));
      return;
    }

    if (file.size > MAX_FILE_SIZE) {
      setError(t('fileTooLarge'));
      return;
    }

    setIsUploading(true);
    try {
      const resized = await resizeImage(file);
      const res = await uploadApi.profileImage(resized);
      if (res.success) {
        onChange(res.data.imageUrl);
      } else {
        setError(t('uploadFailed'));
      }
    } catch {
      setError(t('uploadFailed'));
    } finally {
      setIsUploading(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  }

  return (
    <div className="flex flex-col items-center gap-2">
      <div className="relative">
        <Avatar
          src={imageUrl}
          alt={t('profileImage')}
          size="xl"
          editable={!isUploading}
          onEdit={() => fileInputRef.current?.click()}
        />
        {isUploading && (
          <div
            className="absolute inset-0 flex items-center justify-center rounded-full bg-black/30"
            role="status"
          >
            <Spinner />
            <span className="sr-only">{t('uploading')}</span>
          </div>
        )}
      </div>
      <input
        ref={fileInputRef}
        type="file"
        accept={ALLOWED_TYPES.join(',')}
        className="hidden"
        onChange={handleFileChange}
        aria-label={t('uploadProfileImage')}
      />
      {error && (
        <p className="text-caption text-danger" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}
