import { create } from "zustand";

import type { Upload } from "@/types";

interface UploadQueueState {
  queue: Upload[];
  addToQueue: (upload: Upload) => void;
  removeFromQueue: (id: string) => void;
  clearQueue: () => void;
  updateUpload: (id: string, updates: Partial<Upload>) => void;
}

export const useUploadQueueStore = create<UploadQueueState>((set) => ({
  queue: [],
  addToQueue: (upload) =>
    set((state) => ({
      queue: [...state.queue, upload],
    })),
  removeFromQueue: (id) =>
    set((state) => ({
      queue: state.queue.filter((item) => item.id !== id),
    })),
  clearQueue: () => set({ queue: [] }),
  updateUpload: (id, updates) =>
    set((state) => ({
      queue: state.queue.map((item) =>
        item.id === id ? { ...item, ...updates } : item,
      ),
    })),
}));
