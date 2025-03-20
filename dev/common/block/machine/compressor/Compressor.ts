interface ICompressorRecipe {
    slot_0: ItemInstance;
    slot_1: ItemInstance;
    slot_2: ItemInstance;
    slot_3: ItemInstance;
    slot_4: ItemInstance;
    slot_5: ItemInstance;
    slot_6: ItemInstance;
    slot_7: ItemInstance;
    slot_8: ItemInstance;
    result_slot_0: ItemInstance;
};

class Compressor extends MachineBlock {
    public constructor() {
        super(
            "compressor_gc",
            [
              {
                name: "Compressor",
                texture: [
                  ["Machine", 0],
                  ["Machine", 0],
                  ["Machine", 0],
                  ["Compressor", 0],
                  ["Machine", 0],
                  ["Machine", 0],
                ],
                inCreative: true,
              },
              {
                name: "Compressor",
                texture: [
                  ["Machine", 0],
                  ["Machine", 0],
                  ["Machine", 0],
                  ["Compressor", 0],
                  ["Machine", 0],
                  ["Machine", 0],
                ],
                inCreative: false,
              },
              {
                name: "Compressor",
                texture: [
                  ["Machine", 0],
                  ["Machine", 0],
                  ["Machine", 0],
                  ["Compressor", 0],
                  ["Machine", 0],
                  ["Machine", 0],
                ],
                inCreative: false,
              },
            ]
        );
    };

    public getTileEntity(): CommonTileEntity {
        return new CompressorTile();
    };
};

RecipeFactory.register("compressor").registerFromPath(__dir__ + "resources/recipes/compressor");