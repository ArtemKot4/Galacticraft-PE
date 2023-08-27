IDRegistry.genBlockID("crashed_probe");
Block.createBlockWithRotation("crashed_probe", [
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
], STONE);
Translation.addTranslation("Crashed probe", {
    ru: "§aРазбившийся зонд"
});

let DisplayUI = new UI.StandardWindow({
    standard: {
        header: {
            text: {
                text: "Display"
            },
        },
        inventory: {
            standard: true
        },
        background: {
            standard: true
        }
    },
    elements: {}
});
        
        var CrashedProbe = new UI.StandardWindow({
            standard: {
                header: {
                    text: {
                        text:  Translation.translate("Crashed probe")
                    },
                },
                inventory: {
                    standard: true
                },
                background: {
                    standard: true
                }
            },
        drawing: [],
        elements:
        {
            "slot0":
            {
                type: "slot",
                x: 380,
                y: 200,
                size: 70

            },
            "slot1":
            {
                type: "slot",
                x: 450,
                y: 200,
                size: 70

            },
            "slot2":
            {
                type: "slot",
                x: 520,
                y: 200,
                size: 70

            },
            "slot3":
            {
                type: "slot",
                x: 590,
                y: 200,
                size: 70

            },
            "slot4":
            {
                type: "slot",
                x: 660,
                y: 200,
                size: 70

            },
            "slot5":
            {
                type: "slot",
                x: 730,
                y: 200,
                size: 70

            },
        }
    }
);

TileEntity.registerPrototype(BlockID.crashed_probe, {
    useNetworkItemContainer: true,
    getScreenName() { return "main"; },
    getScreenByName() { return CrashedProbe }, click: function (id, count, data, coords, player) {



        if (id == ItemID["Space wrench"]) {

            this.blockSource.setBlock(
                this.x,
                this.y,
                this.z,
                BlockID.crashed_probe, this.blockSource.getBlockData(
                    this.x,
                    this.y,
                    this.z
                ) + 1);


        }

    }
});

Block.registerDropFunction("ore_silicon", function(coords, blockID){
    return [[ItemID.radioisotope_core, 1, 0]] 
});
