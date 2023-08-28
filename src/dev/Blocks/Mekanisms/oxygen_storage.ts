IDRegistry.genBlockID("oxygen_storage_module");
Block.createBlockWithRotation("oxygen_storage_module", [{
    name: "Oxygen Storage Module",
    texture: [["Machine",
        0],
        ["Machine",
            0],
        ["Machine",
            0],
        ["Oxygen Storage Module",
            0],
        ["Machine Input",
            0],
        ["Machine Oxygen Input",
            0]],
    inCreative: true
},
{
        name: "Oxygen Storage Module",
        texture: [["Machine",
            0],
            ["Machine",
                0],
            ["Machine",
                0],
            ["Oxygen Storage Module 1",
                0],
            ["Machine Input",
                0],
            ["Machine Oxygen Input",
                0]],
        inCreative: false
    }, {
        name: "Oxygen Storage Module",
        texture: [["Machine",
            0],
            ["Machine",
                0],
            ["Machine",
                0],
            ["Oxygen Storage Module 2",
                0],
            ["Machine Input",
                0],
            ["Machine Oxygen Input",
                0]],
        inCreative: false
    }, {
        name: "Oxygen Storage Module",
        texture: [["Machine",
            0],
            ["Machine",
                0],
            ["Machine",
                0],
            ["Oxygen Storage Module 3",
                0],
            ["Machine Input",
                0],
            ["Machine Oxygen Input",
                0]],
        inCreative: false
    }, {
        name: "Oxygen Storage Module",
        texture: [["Machine",
            0],
            ["Machine",
                0],
            ["Machine",
                0],
            ["Oxygen Storage Module 4",
                0],
            ["Machine Input",
                0],
            ["Machine Oxygen Input",
                0]],
        inCreative: false
    }, {
        name: "Oxygen Storage Module",
        texture: [["Machine",
            0],
            ["Machine",
                0],
            ["Machine",
                0],
            ["Oxygen Storage Module 5",
                0],
            ["Machine Input",
                0],
            ["Machine Oxygen Input",
                0]],
        inCreative: false
    }, {
        name: "Oxygen Storage Module",
        texture: [["Machine",
            0],
            ["Machine",
                0],
            ["Machine",
                0],
            ["Oxygen Storage Module 6",
                0],
            ["Machine Input",
                0],
            ["Machine Oxygen Input",
                0]],
        inCreative: false
    }, {
        name: "Oxygen Storage Module",
        texture: [["Machine",
            0],
            ["Machine",
                0],
            ["Machine",
                0],
            ["Oxygen Storage Module 7",
                0],
            ["Machine Input",
                0],
            ["Machine Oxygen Input",
                0]],
        inCreative: false
    }, {
        name: "Oxygen Storage Module",
        texture: [["Machine",
            0],
            ["Machine",
                0],
            ["Machine",
                0],
            ["Oxygen Storage Module 8",
                0],
            ["Machine Input",
                0],
            ["Machine Oxygen Input",
                0]],
        inCreative: false
    }, {
        name: "Oxygen Storage Module",
        texture: [["Machine",
            0],
            ["Machine",
                0],
            ["Machine",
                0],
            ["Oxygen Storage Module 9",
                0],
            ["Machine Input",
                0],
            ["Machine Oxygen Input",
                0]],
        inCreative: false
    }, {
        name: "Oxygen Storage Module",
        texture: [["Machine",
            0],
            ["Machine",
                0],
            ["Machine",
                0],
            ["Oxygen Storage Module 10",
                0],
            ["Machine Input",
                0],
            ["Machine Oxygen Input",
                0]],
        inCreative: false
    }, {
        name: "Oxygen Storage Module",
        texture: [["Machine",
            0],
            ["Machine",
                0],
            ["Machine",
                0],
            ["Oxygen Storage Module 11",
                0],
            ["Machine Input",
                0],
            ["Machine Oxygen Input",
                0]],
        inCreative: false
    }, {
        name: "Oxygen Storage Module",
        texture: [["Machine",
            0],
            ["Machine",
                0],
            ["Machine",
                0],
            ["Oxygen Storage Module 12",
                0],
            ["Machine Input",
                0],
            ["Machine Oxygen Input",
                0]],
        inCreative: false
    }, {
        name: "Oxygen Storage Module",
        texture: [["Machine",
            0],
            ["Machine",
                0],
            ["Machine",
                0],
            ["Oxygen Storage Module 13",
                0],
            ["Machine Input",
                0],
            ["Machine Oxygen Input",
                0]],
        inCreative: false
    }, {
        name: "Oxygen Storage Module",
        texture: [["Machine",
            0],
            ["Machine",
                0],
            ["Machine",
                0],
            ["Oxygen Storage Module 14",
                0],
            ["Machine Input",
                0],
            ["Machine Oxygen Input",
                0]],
        inCreative: false
    },/* {
        name: "Oxygen Storage Module",
        texture: [["Machine",
            0],
            ["Machine",
                0],
            ["Machine",
                0],
            ["Oxygen Storage Module 15",
                0],
            ["Machine Input",
                0],
            ["Machine Oxygen Input",
                0]],
        inCreative: false
    },*/ {
        name: "Oxygen Storage Module",
        texture: [["Machine",
            0],
            ["Machine",
                0],
            ["Machine",
                0],
            ["Oxygen Storage Module Full",
                0],
            ["Machine Input",
                0],
            ["Machine Oxygen Input",
                0]],
        inCreative: false
    } ],STONE);
Translation.addTranslation("Oxygen Storage Module", {
    ru: "Кислородное хранилище"
});


let OxygenStorageUI = new UI.StandartWindow(
    {
        standard: {
            header: {
                text: {
                    text: Translation.translate("Кислородное хранилище")
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
        bitmap: "Others.Scala",
        scale: 4.3
    },
        {
            type: "bitmap",
            x: 680,
            y: 150,
            bitmap: "o2_noy",
            scale: 4.0
        }],
    elements: {
        slot1:
        {
            type: "slot",
            x: 400,
            y: 110,
            size: 70,
            bitmap: "Others.O2Slot"
        },
        scala:
        {
            type: "scale",
            x: 400,
            y: 190,
            bitmap: "Others.Scala2",
            scale: 4.3,
            direction: 0
        },
        o2:
        {
            type: "scale",
            x: 680,
            y: 150,
            bitmap: "o2_yes",
            scale: 4.0,
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
    }
}
);

class OxygenStorage extends MachineStorage {
    defaultValues = { energy: 0, energyMax: 2500000 };
    onTick(): void {
        let slot1 = this.container.getSlot("slot1");

        this.container.setScale("scala", this.data.energy / 2500000);
        this.container.setScale("o2", this.data.energy / 100);
        this.container.setText("OXYGEN", "Oxygen: " + this.data.energy + " / " + this.getCapacity());
    }
}

TileEntity.registerPrototype(BlockID.oxygen_storage_module,new OxygenStorage(OxygenStorageUI));
﻿
﻿EnergyTileRegistry.addEnergyTypeForId(BlockID.oxygen_storage_module, ob);