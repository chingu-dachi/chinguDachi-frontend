import type { Message } from '@chingu-dachi/shared';
import { formatMessageTime } from '@chingu-dachi/shared';
import { Spinner } from '@/components/ui';

interface PartnerBubbleProps {
  message: Message;
}

export function PartnerBubble({ message }: PartnerBubbleProps) {
  const isTranslating = !message.translatedText;

  return (
    <div className="flex justify-start gap-1.5 px-4 py-0.5">
      <div className="max-w-[70%] rounded-2xl rounded-tl-sm bg-bubble-partner px-4 py-3">
        {isTranslating ? (
          <div className="flex items-center gap-2">
            <Spinner size="sm" />
            <span className="text-sm text-gray-400">번역 중...</span>
          </div>
        ) : (
          <>
            <p className="text-body text-gray-900">{message.translatedText}</p>
            <p className="mt-1 text-caption text-gray-400">
              {message.originalText}
            </p>
          </>
        )}
      </div>
      <div className="flex flex-col justify-end">
        <span className="text-[10px] text-gray-400">
          {formatMessageTime(message.createdAt)}
        </span>
      </div>
    </div>
  );
}
