import axios from "axios"
import { CategoriesResponseApiSchema, CocktailsResponseApiSchema, RecipesAPIResponseSchema } from "../schemas/recipes.schema"
import { SearchRecipe } from "../types"

export const getCategories = async () => {
    const url = 'https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list'
    const { data } = await axios.get(url)
    const result = CategoriesResponseApiSchema.safeParse(data)
    if (result.success) {
        return result.data
    }
}

export const getCockTails = async (filters: SearchRecipe) => {
    let url;
    if (filters.ingredient) {
        url = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${filters.ingredient}`;
    } else {
        url = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${filters.category}`;
    }

    const { data } = await axios.get(url)
    const result = CocktailsResponseApiSchema.safeParse(data)

    if (result.success) {
        return result.data
    } else {
        return {
            drinks: []
        }
    }
}

export const getRecipeDrink = async (idDtrink: string) => {
    const url = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${idDtrink}`;

    const { data } = await axios.get(url)
    const result = RecipesAPIResponseSchema.safeParse(data)

    if (result.success) {
        return result.data
    } else {
        return {
            drinks: []
        }
    }
}
