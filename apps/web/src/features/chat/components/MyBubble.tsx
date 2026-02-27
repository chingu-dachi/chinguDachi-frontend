import type { Message } from '@chingu-dachi/shared';
import { formatMessageTime } from '@chingu-dachi/shared';
import { cn } from '@/lib/cn';

interface MyBubbleProps {
  message: Message;
}

export function MyBubble({ message }: MyBubbleProps) {
  const isSending = message.status === 'sending';
  const isFailed = message.status === 'failed';

  return (
    <div className="flex justify-end gap-1.5 px-4 py-0.5">
      <div className="flex flex-col items-end gap-0.5">
        <span className="text-[10px] text-gray-400">
          {formatMessageTime(message.createdAt)}
        </span>
        {isFailed && (
          <span className="text-[10px] text-danger">전송 실패</span>
        )}
      </div>
      <div
        className={cn(
          'max-w-[70%] rounded-2xl rounded-tr-sm px-4 py-3',
          isSending ? 'bg-primary/70' : 'bg-bubble-mine',
          'text-white',
        )}
      >
        <p className="text-body">{message.originalText}</p>
      </div>
    </div>
  );
}
