IDRegistry.genBlockID("moonore_sapphire");
Block.createBlock("moonore_sapphire",[{name: "Lunar Sapphire", texture: [["Moonore Sapphire", 0]], inCreative: true} ],STONE);
Translation.addTranslation("Lunar Sapphire",{
ru: "Лунная сапфирная руда"
})

Block.registerDropFunction("moonore_sapphire", function(coords, blockID){
    return [[ItemID.lunar_sapphire, 1, 0]] 
});