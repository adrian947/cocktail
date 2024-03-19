import { StateCreator } from 'zustand';
import { Recipe } from '../types/index';

export type FavoritesSliceType = {
    favorites: Recipe[]
    handeleAddFavorites: (recipe: Recipe) => void
    favoriteExists: (id: Recipe['idDrink']) => boolean
    loadFromStorage: () => void
}


export const createFavoritesSlice: StateCreator<FavoritesSliceType> = (set, get) => ({
    favorites: [],

    handeleAddFavorites: (recipe: Recipe) => {
        if (get().favorites.some(favorite => favorite.idDrink === recipe.idDrink)) {
            set((state) => ({
                favorites: state.favorites.filter(favorite => favorite.idDrink !== recipe.idDrink)
            }))
        } else {
            set({
                favorites: [...get().favorites, recipe]
            })
        }
        localStorage.setItem('favorites', JSON.stringify(get().favorites))

    },
    favoriteExists: (id) => {
        return get().favorites.some(favorite => favorite.idDrink === id)
    },
    loadFromStorage: ()=>{
        const localStorageInFavorites = localStorage.getItem('favorites');
        if(localStorageInFavorites){
            set({
                favorites: JSON.parse(localStorageInFavorites)
            })
        }
    }
})