import { z } from "zod";

export const CategoriesResponseApiSchema = z.object({
    drinks: z.array(
        z.object({
            strCategory: z.string()
        })
    )
})

export const SearchRecipeSchema = z.union([
    z.object({
        category: z.string(),
        ingredient: z.string().nullable().optional()
    }),
    z.object({
        category: z.string().nullable().optional(),
        ingredient: z.string()
    })
])

export const CocktailResponseApiSchema = z.object({

    idDrink: z.string(),
    strDrink: z.string(),
    strDrinkThumb: z.string()

})

export const CocktailsResponseApiSchema = z.object({
    drinks: z.array(
        CocktailResponseApiSchema
    )
})

export const RecipeApiResponseSchema = z.object({

    idDrink: z.string(),
    strDrink: z.string(),
    strDrinkThumb: z.string(),
    strInstructions: z.string(),
    strIngredient1: z.string().nullable(),
    strIngredient2: z.string().nullable(),
    strIngredient3: z.string().nullable(),
    strIngredient4: z.string().nullable(),
    strIngredient5: z.string().nullable(),
    strIngredient6: z.string().nullable(),
    strMeasure1: z.string().nullable(),
    strMeasure2: z.string().nullable(),
    strMeasure3: z.string().nullable(),
    strMeasure4: z.string().nullable(),
    strMeasure5: z.string().nullable(),
    strMeasure6: z.string().nullable(),

})


export const RecipesAPIResponseSchema = z.object({
    drinks: z.array(
        RecipeApiResponseSchema
    )
});