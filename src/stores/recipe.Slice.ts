import { StateCreator } from "zustand"
import { getCategories, getCockTails, getRecipeDrink } from "../services/RecipeService"
import { Categories, Cocktails, SearchRecipe } from "../types"
import { Recipes } from '../types/index';

export type RecipesSliceType = {
    categories: Categories,
    cocktails: Cocktails,
    recipe: Recipes,
    modal: boolean,
    closeModal: () => void,
    fetchCategories: () => Promise<void>
    searchRecipes: (searchRecipe: SearchRecipe) => Promise<void>
    selectRecipe: (idDrink: string) => Promise<void>
}

export const createRecipesSlice: StateCreator<RecipesSliceType> = (set) => ({
    categories: {
        drinks: []
    },
    cocktails: {
        drinks: []
    },
    recipe: {
        drinks: []
    },
    modal: false,
    fetchCategories: async () => {
        const categories = await getCategories()
        set({
            categories
        })
    },
    searchRecipes: async (searchRecipe) => {
        const cocktails = await getCockTails(searchRecipe)
        set({
            cocktails
        })
    },
    selectRecipe: async (idDrink) => {
        const recipe = await getRecipeDrink(idDrink)
        set({
            recipe,
            modal: true
        })
    },
    closeModal: () => {
        set({
            modal: false,
            recipe: {
                drinks: []
            },
        })
    }
})