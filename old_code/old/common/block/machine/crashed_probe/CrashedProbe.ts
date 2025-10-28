class CrashedProbe extends GalacticraftBlock {
    public static items: (ItemInstance & { chance: number })[] = [];

    public constructor() {
        super("crashed_probe", [
            {
                name: "Crashed probe",
                texture: [["probe_top",
                    0],
                ["probe_bottom",
                    0],
                ["probe_side",
                    2],
                ["probe_side",
                    2],
                ["probe_side",
                    1],
                ["probe_side",
                    1]],
                inCreative: true
            }, {
                name: "Crashed probe",
                texture: [["probe_top",
                    0],
                ["probe_bottom",
                    0],
                ["probe_side",
                    2],
                ["probe_side",
                    2],
                ["probe_side",
                    1],
                ["probe_side",
                    1]],
                inCreative: false
            }, {
                name: "Crashed probe",
                texture: [["probe_top",
                    0],
                ["probe_bottom",
                    0],
                ["probe_side",
                    2],
                ["probe_side",
                    2],
                ["probe_side",
                    1],
                ["probe_side",
                    1]],
                inCreative: false
            }
        ]);
    };

    public getTileEntity() {
        return new CrashedProbeTile();
    };

    public static addItem(chance: number, id: number, count_max: number, data?: number) {
        const stack = new ItemStack(id, count_max, data || 0);
        const maxStack = stack.getMaxStack();

        if(maxStack > count_max) {
            stack.count = maxStack;
        };

        this.items.push({...stack, chance});
    };

    public static getRandomItem(): ItemInstance & { chance: number } {
        const item = MathHelper.randomFromArray(CrashedProbe.items);
        item.count = MathHelper.randomInt(1, item.count);
        return item;
    };
};