/**
 * 최소 1x1 PNG 바이너리를 생성하여 테스트용 이미지 파일로 사용
 */
export function createCanvas(): Buffer {
  // 1x1 pixel red PNG
  return Buffer.from(
    'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8/5+hHgAHggJ/PchI7wAAAABJRU5ErkJggg==',
    'base64',
  );
}
