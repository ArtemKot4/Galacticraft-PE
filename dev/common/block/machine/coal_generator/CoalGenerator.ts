class CoalGenerator extends MachineBlock {
    public constructor() {
        super("coal_generator", [{
            name: "Coal Generator", texture: [["Machine", 0], ["Machine", 0], ["Machine", 0], ["Coal Generator", 0], ["Machine Output", 0], ["Machine Output", 0]], inCreative: true
        }, {
            name: "Coal Generator", texture: [["Machine", 0], ["Machine", 0], ["Machine", 0], ["Coal Generator", 0], ["Machine Output", 0], ["Machine Output", 0]], inCreative: false
        }, {
            name: "Coal Generator", texture: [["Machine", 0], ["Machine", 0], ["Machine", 0], ["Coal Generator", 0], ["Machine Output", 0], ["Machine Output", 0]], inCreative: false
        }]);
    };

    public getHint(): string {
        return "4 gJ/ s";
    };

    public getTileEntity(): CommonTileEntity {
        return new CoalGeneratorTile();
    };
};

RecipeFactory.register("coal_generator").registerPath(__dir__ + "resources/recipes/coal"); //в конце должна быть / или нет?