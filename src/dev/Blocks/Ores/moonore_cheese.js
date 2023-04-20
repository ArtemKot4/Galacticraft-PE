IDRegistry.genBlockID("moonore_cheese");
Block.createBlock("moonore_cheese",[{name: "Lunar Cheese Ore", texture: [["Moonore Cheese", 0]], inCreative: true} ],STONE);
Translation.addTranslation("Lunar Cheese Ore",{
ru: "Лунная сырная руда"
})

Block.registerDropFunction("moonore_cheese", function(coords, blockID){
    return [[ItemID.cheese_curd, randomInt[1,3,2], 0]] 
});