IDRegistry.genBlockID("venus_quartz");
Block.createBlock("venus_quartz",[{name: "Venus Quartz", texture: [["Ore Quartz Venus", 0]], inCreative: true} ],STONE);
Translation.addTranslation("Venus Quartz",{
ru: "Венерианский кварц"
})

Recipes.addFurnace(BlockID.venus_quartz, VanillaItemID.quartz, 0);

Block.registerDropFunction("venus_quartz", function(coords, blockID){
    return [[VanillaItemID.quartz, 1, 0]] 
});