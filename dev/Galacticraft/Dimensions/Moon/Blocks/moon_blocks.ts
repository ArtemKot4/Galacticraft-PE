IDRegistry.genBlockID("lunar_stone");
Block.createBlock("lunar_stone",[{name: "Lunar Stone", texture: [["Lunar Stone", 0]], inCreative: true} ],STONE);
Translation.addTranslation("Lunar Stone",{
ru: "Лунный камень"
})




IDRegistry.genBlockID("lunar_middle");
Block.createBlock("lunar_middle",[{name: "Lunar Dirt", texture: [["Middle", 0]], inCreative: true} ],STONE);
Translation.addTranslation("Lunar Dirt",{
ru: "Лунная почва"
})





IDRegistry.genBlockID("moon_top_side");
Block.createBlock("moon_top_side",[{name: "Lunar Top Side", texture: [["Top Side", 0],["Top", 0],["Top Side", 0],["Top", 0],["Top Side", 0],["Top Side", 0]], inCreative: true} ],STONE);
Translation.addTranslation("Lunar Top Side",{
ru: "Лунный грунт"
})

enum EMoonBlocks {
    LUNAR_STONE = BlockID["lunar_stone"],
    LUNAR_MIDDLE = BlockID["lunar_middle"],
    MOON_TOP_SIDE = BlockID["moon_top_side"]
}