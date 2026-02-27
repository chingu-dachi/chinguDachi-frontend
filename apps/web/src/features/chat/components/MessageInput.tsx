import { useState } from 'react';
import { useTranslation } from 'react-i18next';

interface MessageInputProps {
  onSend: (text: string) => void;
  disabled?: boolean;
}

export function MessageInput({ onSend, disabled }: MessageInputProps) {
  const { t } = useTranslation('chat');
  const [text, setText] = useState('');

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const trimmed = text.trim();
    if (!trimmed) return;
    onSend(trimmed);
    setText('');
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex items-center gap-2 border-t border-gray-100 px-4 py-3 pb-safe-bottom"
    >
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder={t('messagePlaceholder')}
        maxLength={1000}
        disabled={disabled}
        className="flex-1 rounded-full border border-gray-200 px-4 py-2.5 text-body outline-none transition-colors placeholder:text-gray-400 focus:border-primary"
        aria-label={t('messagePlaceholder')}
      />
      <button
        type="submit"
        disabled={!text.trim() || disabled}
        className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-white transition-colors disabled:bg-gray-200 disabled:text-gray-400"
        aria-label={t('send')}
      >
        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 19V5m0 0l-7 7m7-7l7 7" />
        </svg>
      </button>
    </form>
  );
}
