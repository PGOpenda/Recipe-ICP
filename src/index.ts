// cannister code goes here
import { $query, $update, Record, StableBTreeMap, Vec, match, Result, nat64, ic, Opt } from 'azle';
import { v4 as uuidv4 } from 'uuid';

type Recipe = Record<{
    id: string;
    title: string;
    ingredients: string;
    preparation: string;
    createdAt: nat64;
    updatedAt: Opt<nat64>;
}>

type RecipePayload = Record<{
    title: string;
    ingredients: string;
    preparation: string;
}>

const recipeStorage = new StableBTreeMap<string, Recipe>(0, 44, 1024)

$query;
export function getRecipes(): Result<Vec<Recipe>, string> {
    return Result.Ok(recipeStorage.values())
}

$query;
export function getRecipeById(id: string): Result<Recipe, string> {
    return match(recipeStorage.get(id), {
        Some: (recipe) => Result.Ok<Recipe, string>(recipe),
        None: () => Result.Err<Recipe, string>(`Couldn't find the recipe with id = ${id}.`)
    })
}

$query
export function getRecipeByIngredients(ingredient: string): Result<Recipe | Recipe[], string> {
    const recipesWithIngredient = recipeStorage.values().filter(recipe =>
        recipe.ingredients.toLowerCase().includes(ingredient.toLowerCase())
    )

    if (recipesWithIngredient.length > 0) {
        return Result.Ok<Recipe | Recipe[], string>(recipesWithIngredient);
    } else {
        return Result.Err<Recipe | Recipe[], string>(`Couldn't find any recipes with the ingredient = ${ingredient}.`);
    }
}

$update;
export function addRecipe(payload: RecipePayload): Result<Recipe, string> {
    const recipe: Recipe = { id: uuidv4(), createdAt: ic.time(), updatedAt: Opt.None, ...payload }
    recipeStorage.insert(recipe.id, recipe)
    return Result.Ok(recipe)
}

$update;
export function updateRecipe(id: string, payload: RecipePayload): Result<Recipe, string> {
    return match(recipeStorage.get(id), {
        Some: (recipe) => {
            const updatedRecipe: Recipe = {...recipe, ...payload, updatedAt: Opt.Some(ic.time())}
            recipeStorage.insert(recipe.id, updatedRecipe)
            return Result.Ok<Recipe, string>(updatedRecipe)
        },
        None: () => Result.Err<Recipe, string>(`Couldn't update the recipe with id = ${id}. The Recipe could not be found.`)
    })
}

$update;
export function deleteRecipe(id: string): Result<Recipe, string> {
    return match(recipeStorage.remove(id), {
        Some: (deletedRecipe) => Result.Ok<Recipe, string>(deletedRecipe),
        None: () => Result.Err<Recipe, string>(`Couldn't delete the recipe with id = ${id}. The Recipe could not be found.`)
    });
}

// a workaround to make uuid package work with Azle
globalThis.crypto = {
     // @ts-ignore
    getRandomValues: () => {
        let array = new Uint8Array(32);

        for (let i = 0; i < array.length; i++) {
            array[i] = Math.floor(Math.random() * 256);
        }

        return array;
    }
};