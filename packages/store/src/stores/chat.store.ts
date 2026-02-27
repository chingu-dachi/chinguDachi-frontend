import { create } from 'zustand';

interface ChatState {
  activeRoomId: string | null;
  typingUsers: Record<string, string[]>; // roomId → userId[]
  setActiveRoom: (roomId: string | null) => void;
  addTypingUser: (roomId: string, userId: string) => void;
  removeTypingUser: (roomId: string, userId: string) => void;
}

export const useChatStore = create<ChatState>((set) => ({
  activeRoomId: null,
  typingUsers: {},

  setActiveRoom: (roomId) => set({ activeRoomId: roomId }),

  addTypingUser: (roomId, userId) =>
    set((state) => {
      const current = state.typingUsers[roomId] ?? [];
      if (current.includes(userId)) return state;
      return {
        typingUsers: { ...state.typingUsers, [roomId]: [...current, userId] },
      };
    }),

  removeTypingUser: (roomId, userId) =>
    set((state) => {
      const current = state.typingUsers[roomId] ?? [];
      return {
        typingUsers: {
          ...state.typingUsers,
          [roomId]: current.filter((id) => id !== userId),
        },
      };
    }),
}));
