import { useNavigate } from 'react-router-dom';

interface BackHeaderProps {
  title?: string;
  right?: React.ReactNode;
  onBack?: () => void;
}

export function BackHeader({ title, right, onBack }: BackHeaderProps) {
  const navigate = useNavigate();

  function handleBack() {
    if (onBack) {
      onBack();
    } else {
      navigate(-1);
    }
  }

  return (
    <header className="relative flex h-14 items-center border-b border-gray-100 px-4">
      <button
        type="button"
        onClick={handleBack}
        className="flex items-center justify-center rounded-lg p-1 hover:bg-gray-100"
        aria-label="뒤로 가기"
      >
        <svg className="h-6 w-6 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
        </svg>
      </button>
      {title && (
        <h1 className="absolute left-1/2 -translate-x-1/2 text-body font-semibold">
          {title}
        </h1>
      )}
      {right && (
        <div className="ml-auto flex items-center gap-2">{right}</div>
      )}
    </header>
  );
}
