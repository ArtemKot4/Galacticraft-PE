ShapelessRecipeFactory.register("gc:compressor", new ShapelessRecipeFactory()).registerPath(__dir__ + "resources/recipes/compressor");
ShapedRecipeFactory.register("gc:circuit_fabricator", new ShapedRecipeFactory()).registerPath(__dir__ + "resources/recipes/circuit");

ModAPI.registerAPI("GalacticraftAPI", {
    Galacticraft,
    GalacticraftItem,
    GalacticraftBlock,
    battery: Battery,
    requireGlobal(command: string) {
        return eval(command);
    }
});

alert(JSON.stringify(RecipeFactory.get<ShapedRecipeFactory>("gc:coal_generator").storage[0]));