declare namespace RecipeModule {
    export interface IDefaultRecipe<InputFormat = Record<string, ItemInstance>, OutputFormat = Record<string, ItemInstance>> {
        recipe_type?: string;
        input: InputFormat;
        output: OutputFormat;
        [key: string]: unknown
    }
}