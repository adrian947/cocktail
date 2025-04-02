import { StateCreator } from 'zustand';
import { openRouter } from '../services/IaService';

export type IASliceType = {
  iaRecipe: string;
  isLoading: boolean;
  generateRecipe: (prompt: string) => Promise<void>;
};

export const createIASlice: StateCreator<IASliceType, [], [], IASliceType> = (
  set,
) => ({
  iaRecipe: '',
  isLoading: false,
  generateRecipe: async (prompt) => {

    set({ iaRecipe: '', isLoading: true });

    const data = await openRouter(prompt);

    for await (const textPart of data) {
      set((state) => ({
        iaRecipe: state.iaRecipe + textPart,
      }));
    }
	set({ isLoading: false });
  },
});
