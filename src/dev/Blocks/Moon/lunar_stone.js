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





var moonmesh = new RenderMesh(); 
moonmesh.setBlockTexture("Lunar",0); 
moonmesh.importFromFile(__dir__+"/models/luna.obj","obj",null); 
IDRegistry.genBlockID("charged_moon"); 
Block.createBlock("charged_moon", [ 
 {name: "A little Moon", texture: [["Lunar", 0],["Lunar", 1],["Lunar", 2],["Lunar", 3],["Lunar", 4],["Lunar", 5]], inCreative: true} 
]); 
Translation.addTranslation("A little Moon",{
ru: "< Луна >"
});
var moonrender = new ICRender.Model(); 
moonrender.addEntry(new BlockRenderer.Model(moonmesh)); 
BlockRenderer.setStaticICRender(BlockID.charged_moon,0,moonrender);

IDRegistry.genBlockID("moon_top_side");
Block.createBlock("moon_top_side",[{name: "Lunar Top Side", texture: [["Top Side", 0],["Top", 0],["Top Side", 0],["Top", 0],["Top Side", 0],["Top Side", 0]], inCreative: true} ],STONE);
Translation.addTranslation("Lunar Top Side",{
ru: "Лунный грунт"
})

