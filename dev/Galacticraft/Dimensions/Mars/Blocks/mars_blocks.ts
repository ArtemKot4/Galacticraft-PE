IDRegistry.genBlockID("cobblestone_mars");
Block.createBlock("cobblestone_mars",[{name: "The Martian Cobblestone", texture: [["Cobblestone Mars", 0]], inCreative: true} ],STONE);
Translation.addTranslation("The Martian Cobblestone",{
ru: "Марсианский булыжник"
})






IDRegistry.genBlockID("dense_ice");
Block.createBlock("dense_ice",[{name: "Dense Ice", texture: [["Dense Ice", 0]], inCreative: true} ], BLOCK_TYPE_GLASS);
Translation.addTranslation("Dense Ice",{
ru: "Плотный лёд"
})

IDRegistry.genBlockID("mars_bottom_stone");
Block.createBlock("mars_bottom_stone",[{name: "The Martian Bottom Stone", texture: [["Bottom Mars", 0]], inCreative: true} ],STONE);
Translation.addTranslation("The Martian Bottom Stone",{
ru: "Глубинный марсианский камень"
})

IDRegistry.genBlockID("mars_top_stone");
Block.createBlock("mars_top_stone",[{name: "The Martian Top Stone", texture: [["Top Mars", 0]], inCreative: true} ],STONE);
Translation.addTranslation("The Martian Top Stone",{
ru: "Поверхностный марсианский камень"
})

IDRegistry.genBlockID("mars_middle_stone");
Block.createBlock("mars_middle_stone",[{name: "The Martian Middle Stone", texture: [["Middle Mars", 0]], inCreative: true} ],STONE);
Translation.addTranslation("The Martian Middle Stone",{
ru: "Средний марсианский камень"
});

Block.registerDropFunction("mars_bottom_stone", function(coords, blockID){
    return [[BlockID.cobblestone_mars, 1, 0]] 
});







