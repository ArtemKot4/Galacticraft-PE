class Ballone extends GalacticraftItem {
    public static list: Record<number, number> = {};
    public constructor(stringID: string, public capacity: number) {
        super(stringID, {
            name: stringID,
            meta: 0
        });

        Ballone.list[this.id] = capacity;
    };

    public static is(id: number): boolean {
        return id in this.list;
    };

    public static getCapacity(id: number): number {
        return this.list[id];
    };
};

