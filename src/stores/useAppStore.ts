import { create } from 'zustand';
import { RecipesSliceType, createRecipesSlice } from './recipe.Slice';
import { devtools } from 'zustand/middleware';
import { FavoritesSliceType, createFavoritesSlice } from './favorites.Slice';
import { createIASlice, IASliceType } from './ia.Slice';

export const useAppStore = create<
  RecipesSliceType & FavoritesSliceType & IASliceType
>()(
  devtools((...a) => ({
    ...createRecipesSlice(...a),
    ...createFavoritesSlice(...a),
    ...createIASlice(...a),
  })),
);
