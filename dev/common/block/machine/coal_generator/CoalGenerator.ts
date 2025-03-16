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

    public factory: RecipeFactory = new RecipeFactory()
    .set({
        "coal_slot": new ItemStack(VanillaItemID.coal, 1),
        "power": 3000
    })
    .set({
        "coal_slot": new ItemStack(VanillaItemID.stick, 1),
        "power": 150
    });
};