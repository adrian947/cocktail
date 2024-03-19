import { create } from "zustand";
import { RecipesSliceType, createRecipesSlice } from './recipe.Slice';
import { devtools } from "zustand/middleware";
import { FavoritesSliceType, createFavoritesSlice } from './favorites.Slice';


export const useAppStore = create<RecipesSliceType & FavoritesSliceType>()(devtools((...a)=>({
    ...createRecipesSlice(...a),
    ...createFavoritesSlice(...a),
})))


