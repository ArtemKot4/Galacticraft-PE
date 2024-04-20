
Translation.addTranslation("Oxygen Collector", {
    ru: "Кислородный коллектор"
});


class Collector extends InputMachine {
    useNetworkItemContainer: true;
    getScreenName() {
        return "main";
    };
    getScreenByName() {
        return OxygenCollectorUI
    };
    defaultValues = {
        progress: 0,
        progressMax: 0,
        active: false,
        oxygen: 0,
        oxygenMax: 1000,
        energy: 0,
        energyMax: 1500,
        leaveS: 0,
        leavesMax: 1000,
    };
    isEnergySource (): boolean {
        return true
    };
    getCapacity () {
        return 1500
    };
    onTick () {
        //TODO: переписать
        // this.container.sendChanges();
        // //battery.add(this.container, this.data, "slot1");
        // InfiniteBattery.addInfinite(this.container, this.data, "slot1")
        // //ChargeItemRegistry.getEnergyFrom("slot1", "sj", 1500, 900, 1, false)

        // if (this.dimension == 0 && this.data.energy >= 5) {
        //     if (World.getThreadTime() % 20 == 0) {
        //         this.data.oxygen += Math.min(1, this.data.oxygenMax - this.data.oxygen); this.data.energy -= 1;
        //     }
        // };

        // if (this.data.oxygen >= 5) {
        //     this.container.setText("Status", Translation.translate("Status: input oxygen"));
        //     if (__config__.getBool("Gameplay.Special_Effects")) {
        //         Particles.addParticle(
        //             collecticle, this.x + 0.1,
        //             this.y + 0.5,
        //             this.z + 0.1,
        //             Math.random() / 20,
        //             Math.random() / 20,
        //             Math.random() / 20);
        //     }
        // };

        // if (
        //     this.data.oxygen == 1000
        // ) {
        //     this.container.setText
        //         ("Status", Translation.translate("Status: storage full"));
        // };

        // if (this.data.oxygen == 0) {
        //     this.container.setText("Status", Translation.translate("Status: waiting"));
        // };
        // let slot1 = this.container.getSlot("slot1");

        // this.container.setScale("scala", this.data.oxygen / 1000);
        // this.container.setScale("ENERGYBar", this.data.energy / 1500);
        // this.container.setScale("Energy", this.data.energy / 700);
        // this.container.setScale("o2", this.data.oxygen / 100);
        // this.container.setText("OXYGEN", "Oxygen: " + this.data.oxygen + " / " + this.data.oxygenMax);
        // this.container.setText("LeavesStatus", "Кислорода использовано: " + this.data.leaveS + " / " + this.data.leavesMax);
        // if (this.dimension != 0) {
        //     if (World.getThreadTime() % 20 == 0) {
        //         for (var i in leaves) {
        //             for (let n; n<6;n++){
        //             if (this.data.energy != 0) {
        //                 if (this.blockSource.getBlockId(this.x, this.y + n, this.z) == leaves[i].id ||
        //                     this.blockSource.getBlockId(this.x, this.y, this.z - n) == leaves[i].id ||
        //                     this.blockSource.getBlockId(this.x + n, this.y, this.z) == leaves[i].id ||
        //                     this.blockSource.getBlockId(this.x, this.y, this.z - n) == leaves[i].id ||
        //                     this.blockSource.getBlockId(this.x - n, this.y, this.z) == leaves[i].id ||
        //                     this.blockSource.getBlockId(this.x, this.y - n, this.z) == leaves[i].id) {
        //                     this.data.oxygen += 1;
        //                     this.data.energy -= 5;
        //                     this.data.leaveS++
        //                     /*  if(this.data.leaveS < 969){this.blockSource.setGrassColorRGB(this.x,this.z+1,192);
        //     this.blockSource.setGrassColorRGB(this.x,this.z-1,192)
        //     this.blockSource.setGrassColorRGB(this.x-1,this.z,192)
        //     this.blockSource.setGrassColorRGB(this.x+1,this.z+1,192);
        //     this.blockSource.setGrassColorRGB(this.x,this.z,192);
        //     }*/
        //                     if (this.data.leaveS == 999) {
        //                         this.data.leaveS = 0;
        //                         if (
        //                             this.blockSource.getBlockId(this.x, this.y + n, this.z) == leaves[i].id) {
        //                             this.blockSource.destroyBlock(this.x, this.y + n, this.z, false);
        //                             this.blockSource.spawnDroppedItem(this.x, this.y + n, this.z, ItemID.damaged_leave, 1, 0)
        //                         };
        //                         if (
        //                             this.blockSource.getBlockId(this.x, this.y, this.z + n) == leaves[i].id) {
        //                             this.blockSource.destroyBlock(this.x, this.y + n, this.z, false);
        //                             this.blockSource.spawnDroppedItem(this.x, this.y, this.z + n, ItemID.damaged_leave, 1, 0)
        //                         };
        //                         if (this.blockSource.getBlockId(this.x + n, this.y, this.z) == leaves[i].id) {
        //                             this.blockSource.destroyBlock(this.x + n, this.y, this.z, false);
        //                             this.blockSource.spawnDroppedItem(this.x + n, this.y, this.z, ItemID.damaged_leave, 1, 0)
        //                         };

        //                         if (this.blockSource.getBlockId(this.x, this.y, this.z - 1) == leaves[i].id) {
        //                             this.blockSource.destroyBlock(this.x, this.y, this.z - 1, false);
        //                             this.blockSource.spawnDroppedItem(this.x, this.y, this.z - 1, ItemID.damaged_leave, 1, 0)
        //                         };
        //                         if (this.blockSource.getBlockId(this.x - 1, this.y, this.z) == leaves[i].id) {
        //                             this.blockSource.destroyBlock(this.x - 1, this.y, this.z, false);
        //                             this.blockSource.spawnDroppedItem(
        //                                 this.x - 1, this.y, this.z, ItemID.damaged_leave, 1, 0)
        //                         };
        //                         if (this.blockSource.getBlockId(this.x, this.y - 1, this.z) == leaves[i].id) {
        //                             this.blockSource.destroyBlock(this.x, this.y - 1, this.z, false);
        //                             this.blockSource.spawnDroppedItem(this.x, this.y - 1, this.z, ItemID.damaged_leave, 1, 0)

        //                         }}
        //                     }
        //                 }
        //             }
        //         }
        //     }
        // }
    };
    public override canExtractEnergy () {
        return true
    };
    public energyReceive (type, amount, voltage) {

        amount = Math.min(amount, 1550)
        var add = Math.min(amount, this.getCapacity() - this.data.energy);
        this.data.energy += add
        return add
    };
    energyTick (type, src) {
        if (this.dimension == 0) {

            src.addAll(1);
        }
        /*let oxygenput = Math.min(1000, this.data.oxygen);
      this.data.oxygen += src.add(oxygenput) - oxygenput;*/
        let output = Math.min(1500, this.data.energy)
        this.data.energy += src.add(output) - output;

    }; 
    
}

SpacesMachine.registerO2SJMachine(BlockID.oxygen_collector, new Collector(OxygenCollectorUI));


