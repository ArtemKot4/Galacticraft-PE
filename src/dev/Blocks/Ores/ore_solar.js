IDRegistry.genBlockID("ore_solar");
Block.createBlock("ore_solar",[{name: "Ore Solar", texture: [["Ore Solar", 0]], inCreative: true} ],STONE);
Translation.addTranslation("Ore Solar",{
ru: "Руда насыщенная солнцем"
})

Block.registerDropFunction("ore_solar", function(coords, blockID){
    return [[ItemID.solar_dust_sc, 1, 0]] 
});
