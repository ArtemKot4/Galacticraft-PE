let RV: any = null;

function rvIsPlainObject(value) {
    return value != null && typeof value == "object" && !Array.isArray(value);
}

function rvToRecipeItem(source) {
    if(source == null || typeof source != "object") {
        return null;
    }
    var id = source.id;
    var count = source.count == null ? 1 : source.count;
    var data = source.data == null ? 0 : source.data;
    if(!isFinite(id) || id <= 0) {
        return null;
    }
    if(!isFinite(count) || count < 1) {
        return null;
    }
    if(!isFinite(data)) {
        return null;
    }
    return {id: id | 0, count: count | 0, data: data | 0};
}

function rvMapSlotList(list, stats) {
    if(!Array.isArray(list)) {
        return [];
    }
    var result = [];
    for(var i = 0; i < list.length; i++) {
        var item = rvToRecipeItem(list[i]);
        if(item == null) {
            if(list[i] != null) {
                stats.skippedItems++;
            }
            result.push(null);
        }
        else {
            result.push(item);
        }
    }
    return result;
}

function rvMapNamedSlots(slots, order, stats) {
    if(!rvIsPlainObject(slots)) {
        return [];
    }
    var result = [];
    for(var i = 0; i < order.length; i++) {
        var item = rvToRecipeItem(slots[order[i]]);
        if(item == null) {
            if(slots[order[i]] != null) {
                stats.skippedItems++;
            }
            result.push(null);
        }
        else {
            result.push(item);
        }
    }
    return result;
}

function rvPatternHasItems(pattern) {
    var fields = ["input", "output"];
    for(var f = 0; f < fields.length; f++) {
        var list = pattern[fields[f]];
        if(Array.isArray(list)) {
            for(var i = 0; i < list.length; i++) {
                if(list[i] != null) {
                    return true;
                }
            }
        }
    }
    return false;
}

function rvConvertRecipes(recipes, mapRecipe, onSkip) {
    var result = [];
    if(!Array.isArray(recipes)) {
        return result;
    }
    for(var i = 0; i < recipes.length; i++) {
        var pattern = null;
        try {
            pattern = mapRecipe(recipes[i]);
        }
        catch (error) {
            pattern = null;
        }
        if(pattern == null || !rvPatternHasItems(pattern)) {
            onSkip(i);
            continue;
        }
        result.push(pattern);
    }
    return result;
}

function rvMapCompressorRecipe(recipe, stats) {
    return {
        input: rvMapSlotList(recipe.input, stats),
        output: rvMapSlotList(recipe.output, stats)
    };
}

var rvCircuitInputOrder = ["diamond_slot", "fabricator_slot_1", "fabricator_slot_2", "dust_slot", "plate_slot"];

function rvMapCircuitFabricatorRecipe(recipe, stats) {
    return {
        input: rvMapNamedSlots(recipe.input, rvCircuitInputOrder, stats),
        output: rvMapNamedSlots(recipe.output, ["result_slot"], stats)
    };
}

function rvMapWorkbenchNasaRecipe(recipe, stats) {
    var input = recipe.input || {};
    var sources = [input.nose_cone];
    var plates = Array.isArray(input.plate) ? input.plate : [];
    var fins = Array.isArray(input.fin) ? input.fin : [];
    var i;
    for(i = 0; i < 8; i++) {
        sources.push(plates[i]);
    }
    for(i = 0; i < 4; i++) {
        sources.push(fins[i]);
    }
    sources.push(input.engine);
    return {
        input: rvMapSlotList(sources, stats),
        output: rvMapNamedSlots(recipe.output, ["result_slot"], stats)
    };
}

function rvElementSlots(count, x0, y0, step, size, prefix) {
    var elements = {};
    for(var i = 0; i < count; i++) {
        elements[(prefix || "input") + i] = {x: x0 + i * step, y: y0, size: size};
    }
    return elements;
}

function rvCompressorDrawings() {
    return [
        {type: "frame", x: 0, y: 0, width: 1000, height: 540, bitmap: "classic_frame_bg_light", scale: 2},
        {type: "bitmap", x: 409, y: 158, bitmap: "machine.compressor.progress_scale_empty", scale: 5.9},
        {type: "bitmap", x: 465, y: 158, bitmap: "machine.fire_scale_empty", scale: 5.7}
    ];
}

function rvCompressorElements() {
    var elements = {};
    for(var i = 0; i < 9; i++) {
        elements["input" + i] = {x: 157 + (i % 3) * 84, y: 102 + Math.floor(i / 3) * 84, size: 84, iconScale: 0.9};
    }
    elements["output0"] = {x: 745, y: 214, size: 98, iconScale: 0.9};
    return elements;
}

function rvCircuitFabricatorDrawings() {
    return [
        {type: "frame", x: 0, y: 0, width: 1000, height: 540, bitmap: "classic_frame_bg_light", scale: 2},
        {type: "bitmap", x: 179, y: 96, bitmap: "machine.circuit_fabricator.line1_off", scale: 5.3},
        {type: "bitmap", x: 292, y: 418, bitmap: "machine.energy_bar_empty", scale: 4.5},
        {type: "bitmap", x: 277, y: 418, bitmap: "machine.energy_icon_off", scale: 4.5},
        {type: "bitmap", x: 477, y: 215, bitmap: "machine.circuit_fabricator.line2_off", scale: 5.3},
        {type: "bitmap", x: 690, y: 138, bitmap: "machine.circuit_fabricator.line3_off", scale: 5.3},
        {type: "bitmap", x: 473, y: 96, bitmap: "machine.circuit_fabricator.heat_scale_0", scale: 4.5}
    ];
}

function rvCircuitFabricatorElements() {
    return {
        input0: {x: 158, y: 61, size: 84, bitmap: "machine.circuit_fabricator.diamond_slot", iconScale: 0.9},
        input1: {x: 403, y: 194, size: 84, bitmap: "machine.circuit_fabricator.fabricator_slot", iconScale: 0.9},
        input2: {x: 403, y: 278, size: 84, bitmap: "machine.circuit_fabricator.fabricator_slot", iconScale: 0.9},
        input3: {x: 637, y: 187, size: 84, bitmap: "machine.circuit_fabricator.dust_slot", iconScale: 0.9},
        input4: {x: 725, y: 75, size: 84, iconScale: 0.9},
        output0: {x: 758, y: 395, size: 84, iconScale: 0.9}
    };
}

function rvWorkbenchNasaDrawings() {
    return [
        {type: "frame", x: 0, y: 0, width: 1000, height: 540, bitmap: "classic_frame_bg_light", scale: 2},
        {type: "bitmap", x: 581, y: 263, bitmap: "rocket.sign", scale: 4.5}
    ];
}

function rvWorkbenchNasaElements() {
    return {
        input0: {x: 336, y: 60, size: 70, iconScale: 0.9},
        input1: {x: 301, y: 130, size: 70, iconScale: 0.9},
        input2: {x: 371, y: 130, size: 70, iconScale: 0.9},
        input3: {x: 301, y: 200, size: 70, iconScale: 0.9},
        input4: {x: 371, y: 200, size: 70, iconScale: 0.9},
        input5: {x: 301, y: 270, size: 70, iconScale: 0.9},
        input6: {x: 371, y: 270, size: 70, iconScale: 0.9},
        input7: {x: 301, y: 340, size: 70, iconScale: 0.9},
        input8: {x: 371, y: 340, size: 70, iconScale: 0.9},
        input9: {x: 441, y: 340, size: 70, iconScale: 0.9},
        input10: {x: 441, y: 410, size: 70, iconScale: 0.9},
        input11: {x: 231, y: 340, size: 70, iconScale: 0.9},
        input12: {x: 231, y: 410, size: 70, iconScale: 0.9},
        input13: {x: 336, y: 410, size: 70, iconScale: 0.9},
        output0: {x: 651, y: 326, size: 119, bitmap: "rocket.result_slot", iconScale: 0.9}
    };
}

function rvGeneratorDrawings() {
    return [
        {type: "frame", x: 0, y: 0, width: 1000, height: 540, bitmap: "classic_frame_bg_light", scale: 2},
        {type: "bitmap", x: 418, y: 218, bitmap: "arrow_bar_1", scale: 6.3}
    ];
}

function rvGeneratorElements() {
    return {
        input0: {x: 283, y: 218, size: 105, bitmap: "machine.coal_generator.slot", iconScale: 0.9},
        burn_time: {type: "text", x: 718, y: 248, width: 220, height: 40, font: {size: 45, shadow: 0.5}}
    };
}
namespace RecipeViewerIntegration {

    export interface IConvertStats {
        recipes: number;
        skippedRecipes: number;
        skippedItems: number;
    }

    export interface ILazyRecipeList {
        getAllList(): any[];
        getStats(): IConvertStats;
    }

    export function onApiRegistered(api: any): void {
        Logger.Log(`RecipeViewer API registered (keys: ${Object.keys(api).join(",")})`, "GC-RV");
        try {
            registerTypes(api);
        }
        catch (error) {
            Logger.Log(`RecipeViewer: failed to register GC recipe types: ${error}`, "WARNING");
        }
    }

    export function convertLazy(factoryName: string, mapRecipe: (recipe: any, stats: IConvertStats) => any): ILazyRecipeList {
        let cache: any[] | null = null;
        let cachedStorageLength = -1;
        let missingLogged = false;
        let stats: IConvertStats = {recipes: 0, skippedRecipes: 0, skippedItems: 0};

        return {
            getAllList(): any[] {
                const factory = RecipeModule.getFactory<any>(factoryName);
                if(factory == null) {
                    if(!missingLogged) {
                        missingLogged = true;
                        Logger.Log(`RecipeViewer: factory "${factoryName}" not found`, "WARNING");
                    }
                    return [];
                }
                const storage = factory.getRecipes();
                if(cache != null && storage.length === cachedStorageLength) {
                    return cache;
                }
                stats = {recipes: storage.length, skippedRecipes: 0, skippedItems: 0};
                const list = rvConvertRecipes(storage, (recipe: any) => mapRecipe(recipe, stats), (index: number) => {
                    stats.skippedRecipes++;
                    Logger.Log(`RecipeViewer: [${factoryName}] skipped invalid recipe #${index}`, "WARNING");
                });
                if(stats.skippedItems > 0) {
                    Logger.Log(`RecipeViewer: [${factoryName}] skipped ${stats.skippedItems} invalid item entries`, "WARNING");
                }
                cache = list;
                cachedStorageLength = storage.length;
                return cache;
            },
            getStats(): IConvertStats {
                return stats;
            }
        };
    }

    function blockIcon(stringID: string): number {
        //@ts-ignore BlockID/IDRegistry are engine globals, not present in the local declarations used for the build
        const blockID = typeof BlockID !== "undefined" ? BlockID[stringID] : undefined;
        if(typeof blockID === "number" && blockID > 0) {
            return blockID;
        }
        //@ts-ignore Fireflies registers blocks via IDRegistry.genBlockID (idempotent), which is not mirrored into BlockID
        const generated = typeof IDRegistry !== "undefined" ? IDRegistry.genBlockID(stringID) : undefined;
        if(typeof generated === "number" && generated > 0) {
            return generated;
        }
        return 1;
    }

    function registerLazyType(api: any, key: string, titleKey: string, iconStringID: string, drawing: any[], elements: any, list: ILazyRecipeList, onOpen?: (elements: any, recipe: any) => void): void {
        const type = new api.RecipeType(Translation.translate(titleKey), blockIcon(iconStringID), {params: {slot: "classic_slot"}, drawing: drawing, elements: elements});
        type.getAllList = function(): any[] {
            return list.getAllList();
        };
        if(onOpen != null) {
            type.onOpen = onOpen;
        }
        api.RecipeTypeRegistry.register(key, type);
    }

    let generatorFuelsCache: any[] | null = null;

    function buildGeneratorFuels(): any[] {
        const result: any[] = [];
        //@ts-ignore Recipes belongs to Fireflies; shared global scope, dependency loaded before galacticraft
        const registry = typeof Recipes !== "undefined" ? Recipes.specialFuelBurnDurations : null;
        if(registry == null) {
            Logger.Log("RecipeViewer: Fireflies fuel registry not found, gc_generator stays empty", "WARNING");
            return result;
        }
        for(const key in registry) {
            const parts = String(key).split(":");
            const id = Number(parts[0]);
            const data = Number(parts[1]) || 0;
            const duration = registry[key];
            if(!(id > 0) || typeof duration !== "number" || !isFinite(duration) || duration <= 0) {
                continue;
            }
            result.push({input: [{id: id, count: 1, data: data}], output: [], burnTicks: duration});
        }
        return result;
    }

    function getGeneratorFuels(): any[] {
        if(generatorFuelsCache == null) {
            generatorFuelsCache = buildGeneratorFuels();
        }
        return generatorFuelsCache;
    }

    export function registerTypes(api: any): void {
        registerLazyType(api, "gc_compressor", "tile.galacticraft.compressor", "compressor_gc",
            rvCompressorDrawings(), rvCompressorElements(), convertLazy("compressor", rvMapCompressorRecipe));
        registerLazyType(api, "gc_circuit_fabricator", "tile.galacticraft.circuit_fabricator", "circuit_fabricator_gc",
            rvCircuitFabricatorDrawings(), rvCircuitFabricatorElements(), convertLazy("circuit", rvMapCircuitFabricatorRecipe));
        registerLazyType(api, "gc_workbench_nasa", "block.galacticraft.workbench_nasa", "workbench_nasa",
            rvWorkbenchNasaDrawings(), rvWorkbenchNasaElements(), convertLazy("workbench_nasa", rvMapWorkbenchNasaRecipe));
        registerLazyType(api, "gc_generator", "tile.galacticraft.coal_generator", "coal_generator_gc",
            rvGeneratorDrawings(), rvGeneratorElements(),
            {
                getAllList: getGeneratorFuels,
                getStats: function(): IConvertStats {
                    return {recipes: generatorFuelsCache ? generatorFuelsCache.length : 0, skippedRecipes: 0, skippedItems: 0};
                }
            },
            function(elements: any, recipe: any): void {
                elements.get("burn_time").setBinding("text", recipe.burnTicks + " ticks");
            });
    }
}

//@ts-ignore ModAPI is an engine global, not present in the local declarations used for the build
ModAPI.addAPICallback("RecipeViewer", (api: any) => {
    RV = api;
    RecipeViewerIntegration.onApiRegistered(api);
});
