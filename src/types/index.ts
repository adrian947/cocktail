import { z } from "zod";
import {
    CategoriesResponseApiSchema,
    CocktailResponseApiSchema,
    CocktailsResponseApiSchema,
    RecipeApiResponseSchema,
    RecipesAPIResponseSchema,
    SearchRecipeSchema
} from "../schemas/recipes.schema";




export type Categories = z.infer<typeof CategoriesResponseApiSchema>
export type SearchRecipe = z.infer<typeof SearchRecipeSchema>
export type Cocktails = z.infer<typeof CocktailsResponseApiSchema>
export type Cocktail = z.infer<typeof CocktailResponseApiSchema>
export type Recipe = z.infer<typeof RecipeApiResponseSchema>
export type Recipes = z.infer<typeof RecipesAPIResponseSchema>