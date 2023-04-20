

IDRegistry.genBlockID("oxygen_compressor");
Block.createBlockWithRotation("oxygen_compressor",[{name: "Oxygen Compressor", texture: [["Machine", 0],["Machine", 0],["Oxygen Compressor Back", 0],["Oxygen Compressor", 0],["Machine Input", 0],["Machine Oxygen Input", 0]], inCreative: true} ],STONE);
Translation.addTranslation("Oxygen Compressor",{
ru: "Кислородный компрессор"
})

	
/*EnergyTileRegistry.addEnergyTypeForId(BlockID.oxygen_compressor, sj);
EnergyTileRegistry.addEnergyTypeForId(BlockID.oxygen_compressor, ob);
    EnergyTileRegistry.addEnergyTypeForId(BlockID.oxygen_compressor, EU);
    EnergyTileRegistry.addEnergyTypeForId(BlockID.oxygen_compressor, RF);*/

IDRegistry.genBlockID("oxygen_decompressor");
Block.createBlockWithRotation("oxygen_decompressor",[{name: "Oxygen Decompressor", texture: [["Machine", 0],["Machine", 0],["Oxygen Compressor Back", 0],["Oxygen Decompressor", 0],["Machine Input", 0],["Machine Oxygen Input", 0]], inCreative: true} ],STONE);
Translation.addTranslation("Oxygen Decompressor",{
ru: "Кислородный декомпрессор"
})

/*EnergyTileRegistry.addEnergyTypeForId(BlockID.oxygen_decompressor, sj);
EnergyTileRegistry.addEnergyTypeForId(BlockID.oxygen_decompressor, ob);
    EnergyTileRegistry.addEnergyTypeForId(BlockID.oxygen_decompressor, EU);
    EnergyTileRegistry.addEnergyTypeForId(BlockID.oxygen_decompressor, RF);*/
    
let CompressorUI = new UI.StandartWindow({
    standard: {
        header: {
            text: {
                text: Translation.translate("Oxygen Compressor")
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
﻿