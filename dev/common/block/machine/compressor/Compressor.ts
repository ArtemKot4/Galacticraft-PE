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

RecipeFactory.register("compressor").registerPath(__dir__ + "resources/recipes/compressor");