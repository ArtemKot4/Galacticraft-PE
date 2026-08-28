namespace RecipeModule {
    export interface WorkbenchNasaSchema {
        item: ItemInstance,
        inputSlots: Set<string>,
        outputSlots: Set<string>,
        chestSlots: Set<string>,
        ui: UI.IWindow
    }
    export type WorkbenchNasaCachedStorage = ICachedStorage & { schemaName: string };

    export class WorkbenchNasaFactory extends RecipeModule.FormedFactory<WorkbenchNasaCachedStorage> {
        protected schemas: Map<string, WorkbenchNasaSchema> = new Map();

        public override registerRecipe(obj: IDefaultRecipe, fileName: string): this {
            if(obj.schema == null) {
                throw `Recipe${fileName != null ? ` of file "${fileName}" ` : " "}mush have schema`;
            }
            if(this.getSchemaByName(obj.schema as string) == null) {
                throw `Schema "${obj.schema}" is not registered`;
            }
            for(const key in obj.input) {
                if(Array.isArray(obj.input[key])) {
                    let i = 1;
                    for(const instance of obj.input[key]) {
                        obj.input[key + "_" + i++] = instance;
                    }
                    delete obj.input[key];
                }
            }
            super.registerRecipe(obj);
            return this;
        }

        protected override isRightValues(cachedStorage: WorkbenchNasaCachedStorage, slotGetter: (slotName: string) => ItemStack | ItemContainerSlot, recipeIndex: string = "0"): boolean {         
            if(this.storage[recipeIndex].schema != cachedStorage.schemaName) {
                return false;
            }
            return super.isRightValues(cachedStorage, slotGetter, recipeIndex);
        }

        public registerSchema(name: string, item: ItemInstance, inputSlots: string[], outputSlots: string[], ui: UI.IWindow, chestSlots: string[] = ["chest_1", "chest_2", "chest_3"]): this {
            this.schemas.set(name, { item, inputSlots: new Set(inputSlots), outputSlots: new Set(outputSlots), ui, chestSlots: new Set(chestSlots) });
            return this;
        }

        public hasSchemaOfItem(item: ItemInstance): boolean {
            return this.schemas.values().some((schema) => ItemStack.equals(schema.item, item));
        }

        public getSchemaByItem(item: ItemInstance): Nullable<WorkbenchNasaSchema> {
            return this.schemas.values().find((schema) => ItemStack.equals(schema.item, item)) || null;
        }

        public getSchemaWithEntry(item: ItemInstance): [string, WorkbenchNasaSchema] {
            return this.schemas.entries().find(([_, schema]) => ItemStack.equals(schema.item, item));
        }

        public getSchemaByName(name: string): Nullable<WorkbenchNasaSchema> {
            return this.schemas.get(name) || null;
        }

        public getSchemaUIByScreenName<T extends UI.IWindow>(screenName: string): Nullable<T> {
            return this.getSchemaByName(screenName)?.ui as T;
        }
    }
}

RecipeModule.registerFactory("workbench_nasa", new RecipeModule.WorkbenchNasaFactory())
.registerSchema("rocket_tier_1", new ItemStack(), 
[
    "nose_cone", "plate_1", "plate_2", "plate_3", "plate_4", "plate_5", "plate_6", 
    "plate_7", "plate_8", "fin_1", "fin_2", "fin_3", "fin_4", "engine"
], ["result_slot"], WorkbenchNasaRocketTier1UI)
.registerRecipesFrom(__dir__ + "resources/assets/recipes/workbench_nasa");