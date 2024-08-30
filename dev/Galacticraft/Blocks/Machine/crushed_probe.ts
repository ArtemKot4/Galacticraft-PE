
Translation.addTranslation("Crashed probe", {
    ru: "§aРазбившийся зонд"
});
 
class CrashedProbe extends TileEntityBase {
    public static itemList = [] as {id: int, min: int, max: int}[];
    
    data: {isDone: boolean};

    defaultValues = {
        isDone: false
    };

    useNetworkItemContainer = true;

    getScreenName() { return "main"; };
    getScreenByName() { return CrashedProbeUI };

    public static addRandom(id: int, min: int, max: int) {
           CrashedProbe.itemList.push({id, min, max});
    };

    public isValidContent() {
        if(!!this.data.isDone) {
            return true;
        }
        for(let i = 0; i < 9; i++) {
            if(this.container.getSlot("slot_" + i).id !== 0) {
                return true;
            }
        };
        return false;
    };

    public setupContent(webMultiplier: int) {
       const length = CrashedProbe.itemList.length;
       let webSlots = [];

        for(let i = 0; i < 9; i++) {

            if(Math.random() < 0.5 && webSlots.length < webMultiplier) {
                webSlots.push(i);
            };

           const current = CrashedProbe.itemList[randomInt(0, length)];
           this.container.setSlot("slot_" + i, current.id, randomInt(current.min, current.max), 0);
        };

        for(const i in webSlots) {
            this.container.setSlot("slot_" + i, VanillaBlockID.web, randomInt(1, 8), 0); 
        };

        return;
    };

    onLoad(): void {
        if(!this.isValidContent()) {
              this.setupContent(randomInt(0, 5));
        };
        this.data.isDone = true;
        return;
    }
}

TileEntity.registerPrototype(BlockID.crashed_probe, new CrashedProbe());

Block.registerDropFunction("ore_silicon", function(coords, blockID){
    return [[ItemID.radioisotope_core, 1, 0]] 
});

CrashedProbe.addRandom(ItemID["carbon_fragments"], 2, 8);
CrashedProbe.addRandom(ItemID["ingot_lead"], 2, 10);
CrashedProbe.addRandom(ItemID["ingot_copper_gc"], 1, 6);
CrashedProbe.addRandom(ItemID["ingot_tin_gc"], 1, 6);

CrashedProbe.addRandom(VanillaItemID.iron_ingot, 1, 10);
CrashedProbe.addRandom(VanillaItemID.stick, 1, 8);