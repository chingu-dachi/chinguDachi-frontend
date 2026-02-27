import { useRef } from 'react';
import { Avatar } from '@/components/ui';

interface ProfileImageUploaderProps {
  imageUrl: string | null;
  onChange: (url: string | null) => void;
}

export function ProfileImageUploader({
  imageUrl,
  onChange,
}: ProfileImageUploaderProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    // MVP: 로컬 프리뷰 URL 생성 (실제 업로드는 백엔드 연동 시 구현)
    const url = URL.createObjectURL(file);
    onChange(url);
  }

  return (
    <div className="flex flex-col items-center gap-2">
      <Avatar
        src={imageUrl}
        alt="프로필 사진"
        size="xl"
        editable
        onEdit={() => fileInputRef.current?.click()}
      />
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleFileChange}
        aria-label="프로필 사진 업로드"
      />
    </div>
  );
}
