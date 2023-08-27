IDRegistry.genBlockID("collector_sc");
Block.createBlockWithRotation("collector_sc", [
    {
        name: "Oxygen Collector",
        texture: [["collector",
            0],
        ["collector",
            0],
        ["collector",
            0],
        ["collector",
            0],
        ["Machine Input",
            0],
        ["Machine Oxygen Output",
            0]],
        inCreative: true
    }, {
        name: "Oxygen Collector",
        texture: [["collector",
            0],
        ["collector",
            0],
        ["collector",
            0],
        ["collector",
            0],
        ["Machine Input",
            0],
        ["Machine Oxygen Output",
            0]],
        inCreative: false
    }, {
        name: "Oxygen Collector",
        texture: [["collector",
            0],
        ["collector",
            0],
        ["collector",
            0],
        ["collector",
            0],
        ["Machine Input",
            0],
        ["Machine Oxygen Output",
            0]],
        inCreative: false
    }
], STONE);
Translation.addTranslation("Oxygen Collector", {
    ru: "Кислородный коллектор"
});

IDRegistry.genItemID("damaged_leave");
Item.createItem("damaged_leave", "Damaged Leave", {
    name: "damage_leave",
    meta: 0
}, {
    stack: 64
});
Translation.addTranslation("Damaged Leave", {
    ru: "Уничтоженный листок"
});

Recipes.addFurnaceFuel(ItemID.damaged_leave, 0, 20)

SpacesMachine.registerO2SJMachine(BlockID.collector_sc, {
    useNetworkItemContainer: true,
    getScreenName() {
        return "main";
    },
    getScreenByName() {
        return Collector
    },
    defaultValues: {
        progress: 0,
        progressMax: 0,
        active: false,
        oxygen: 0,
        oxygenMax: 1000,
        energy: 0,
        energyMax: 1500,
        leaveS: 0,
        leavesMax: 1000,
    },
    isEnergySource: function () {
        return true
    },
    canReceiveEnergy: function () {
        return true
    },
    getCapacity: function () {
        return 1500
    },
    tick: function () {
        this.container.sendChanges();
        battery.add(this.container, this.data, "slot1");
        battery.addInfinite(this.container, this.data, "slot1")
        //ChargeItemRegistry.getEnergyFrom("slot1", "sj", 1500, 900, 1, false)

        if (this.dimension == 0 && this.data.energy >= 5) {
            if (World.getThreadTime() % 20 == 0) {
                this.data.oxygen += Math.min(1, this.data.oxygenMax - this.data.oxygen); this.data.energy -= 1;
            }
        };

        if (this.data.oxygen >= 5) {
            this.container.setText("Status", Translation.translate("Status: input oxygen"));
            if (__config__.getBool("Gameplay.Special_Effects")) {
                Particles.addParticle(
                    collecticle, this.x + 0.1,
                    this.y + 0.5,
                    this.z + 0.1,
                    Math.random() / 20,
                    Math.random() / 20,
                    Math.random() / 20);
            }
        };

        if (
            this.data.oxygen == 1000
        ) {
            this.container.setText
                ("Status", Translation.translate("Status: storage full"));
        };

        if (this.data.oxygen == 0) {
            this.container.setText("Status", Translation.translate("Status: waiting"));
        };
        let slot1 = this.container.getSlot("slot1");

        this.container.setScale("scala", this.data.oxygen / 1000);
        this.container.setScale("ENERGYBar", this.data.energy / 1500);
        this.container.setScale("Energy", this.data.energy / 700);
        this.container.setScale("o2", this.data.oxygen / 100);
        this.container.setText("OXYGEN", "Ob: " + this.data.oxygen + " / " + this.data.oxygenMax);
        this.container.setText("LeavesStatus", "Кислорода использовано: " + this.data.leaveS + " / " + this.data.leavesMax);
        if (this.dimension != 0) {
            if (World.getThreadTime() % 20 == 0) {
                for (var i in leaves) {
                    if (this.data.energy != 0) {
                        if (this.blockSource.getBlockId(this.x, this.y + 1, this.z) == leaves[i].id ||
                            this.blockSource.getBlockId(this.x, this.y, this.z + 1) == leaves[i].id ||
                            this.blockSource.getBlockId(this.x + 1, this.y, this.z) == leaves[i].id ||
                            this.blockSource.getBlockId(this.x, this.y, this.z - 1) == leaves[i].id ||
                            this.blockSource.getBlockId(this.x - 1, this.y, this.z) == leaves[i].id ||
                            this.blockSource.getBlockId(this.x, this.y - 1, this.z) == leaves[i].id) {
                            this.data.oxygen += 1;
                            this.data.energy -= 5;
                            this.data.leaveS++
                            /*  if(this.data.leaveS < 969){this.blockSource.setGrassColorRGB(this.x,this.z+1,192);
            this.blockSource.setGrassColorRGB(this.x,this.z-1,192)
            this.blockSource.setGrassColorRGB(this.x-1,this.z,192)
            this.blockSource.setGrassColorRGB(this.x+1,this.z+1,192);
            this.blockSource.setGrassColorRGB(this.x,this.z,192);
            }*/
                            if (this.data.leaveS == 999) {
                                this.data.leaveS = 0;
                                if (
                                    this.blockSource.getBlockId(this.x, this.y + 1, this.z) == leaves[i].id) {
                                    this.blockSource.destroyBlock(this.x, this.y + 1, this.z, false);
                                    this.blockSource.spawnDroppedItem(this.x, this.y + 1, this.z, ItemID.damaged_leave, 1, 0)
                                };
                                if (
                                    this.blockSource.getBlockId(this.x, this.y, this.z + 1) == leaves[i].id) {
                                    this.blockSource.destroyBlock(this.x, this.y + 1, this.z, false);
                                    this.blockSource.spawnDroppedItem(this.x, this.y, this.z + 1, ItemID.damaged_leave, 1, 0)
                                };
                                if (this.blockSource.getBlockId(this.x + 1, this.y, this.z) == leaves[i].id) {
                                    this.blockSource.destroyBlock(this.x + 1, this.y, this.z, false);
                                    this.blockSource.spawnDroppedItem(this.x + 1, this.y, this.z, ItemID.damaged_leave, 1, 0)
                                };

                                if (this.blockSource.getBlockId(this.x, this.y, this.z - 1) == leaves[i].id) {
                                    this.blockSource.destroyBlock(this.x, this.y, this.z - 1, false);
                                    this.blockSource.spawnDroppedItem(this.x, this.y, this.z - 1, ItemID.damaged_leave, 1, 0)
                                };
                                if (this.blockSource.getBlockId(this.x - 1, this.y, this.z) == leaves[i].id) {
                                    this.blockSource.destroyBlock(this.x - 1, this.y, this.z, false);
                                    this.blockSource.spawnDroppedItem(
                                        this.x - 1, this.y, this.z, ItemID.damaged_leave, 1, 0)
                                };
                                if (this.blockSource.getBlockId(this.x, this.y - 1, this.z) == leaves[i].id) {
                                    this.blockSource.destroyBlock(this.x, this.y - 1, this.z, false);
                                    this.blockSource.spawnDroppedItem(this.x, this.y - 1, this.z, ItemID.damaged_leave, 1, 0)

                                }
                            }
                        }
                    }
                }
            }
        }
    },
    canExtractEnergy: function () {
        return true
    },
    energyReceive: function (type, amount, voltage) {

        amount = Math.min(amount, 1550)
        var add = Math.min(amount, this.getCapacity() - this.data.energy);
        this.data.energy += add
        return add
    },
    energyTick: function (type, src) {
        if (this.dimension == 0) {

            src.addAll(1);
        }
        /*let oxygenput = Math.min(1000, this.data.oxygen);
      this.data.oxygen += src.add(oxygenput) - oxygenput;*/
        let output = Math.min(1500, this.data.energy)
        this.data.energy += src.add(output) - output;

    }, click: function (id, count, data, coords) {



        if (id == ItemID["Space wrench"]) {

            this.blockSource.setBlock(
                this.x,
                this.y,
                this.z,
                BlockID.collector_sc, this.blockSource.getBlockData(
                    this.x,
                    this.y,
                    this.z
                ) + 1);


        }

    }
});



let Collector = new UI.StandartWindow({
    standard: {
        header: {
            text: {
                text: Translation.translate("Oxygen Collector")
            },
        },
        inventory: {
            standard: true
        },
        background: {
            standard: true
        }
    },
    drawing: [{
        type: "bitmap",
        x: 400,
        y: 190,
        bitmap: "Others.collector_scale_0",
        scale: 4.3
    },
    {
        type: "bitmap",
        x: 680,
        y: 130,
        bitmap: "o2_noy",
        scale: 6.0
    },
    {
        type: "bitmap",
        x: 379,
        y: 300,
        bitmap: "slace_en_0",
        scale: 3.4
    },
    {
        type: "bitmap",
        x: 370,
        y: 300,
        bitmap: "en_noy",
        scale: 3.4
    }],
    elements: {
        slot1:
        {
            type: "slot",
            x: 400,
            y: 110,
            size: 70,
            bitmap: "Others.en_slot"
        },
        scala:
        {
            type: "scale",
            x: 400,
            y: 190,
            bitmap: "Others.collector_scale_1",
            scale: 4.3,
            direction: 0,
            clicker: {
                onClick: function () {
                    RV && RV.RecipeTypeRegistry.openRecipePage("Collector");
                }
            }
        },
        o2:
        {
            type: "scale",
            x: 680,
            y: 130,
            bitmap: "o2_yes",
            scale: 6.0,
            direction: 1
        },
        OXYGEN:
        {
            type: "text",
            x: 480,
            y: 135,
            width: 100,
            height: 30,
            text: "Oxygen Bar"
        },
        Status:
        {
            type: "text",
            x: 420,
            y: 250,
            width: 100,
            height: 30,
            text: "Статус: Нейтральный"
        },
        LeavesStatus:
        {
            type: "text",
            x: 420,
            y: 280,
            width: 99,
            height: 20,
            text: "Кислорода использовано:"
        },
        ENERGYBar: {
            type: "scale",
            x: 379,
            y: 300,
            bitmap: "slace_en_1",
            scale: 3.4,
            direction: 0
        },
        Energy: {
            type: "scale",
            x: 370,
            y: 300,
            bitmap: "en_yes",
            scale: 3.4,
            direction: 1
        },
    }
}
);