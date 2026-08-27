namespace RecipeModule {
    export abstract class ParseProvider<ParsedObject extends Object> {
        /**
         * Method to parse your recipe from JSON by default. Override for add support read your custom format.
         * @param text text of file
         * @param path path of file
         */
        public parseText(text: string, path: string): ParsedObject {
            return JSON.parse(text);
        }

        public getFileFormat(): string {
            return "json";
        }

        abstract buildRecipe(object: Partial<ParsedObject>, path: string): ParsedObject;
    } 
}