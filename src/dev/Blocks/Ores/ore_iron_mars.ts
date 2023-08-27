IDRegistry.genBlockID("ore_iron_mars");
Block.createBlock("ore_iron_mars",[{name: "Ore Iron Mars", texture: [["Ore Iron Mars", 0]], inCreative: true} ],STONE);
Translation.addTranslation("Ore Iron Mars",{
ru: "Железная марсианская руда"
})

Block.registerDropFunction("ore_iron_mars", function(coords, blockID){
    return [[ItemID.shard_iron, 1, 0]] 
});