IDRegistry.genBlockID("desh");
Block.createBlock("desh",[{name: "Desh Ore", texture: [["desh", 0]], inCreative: true} ],STONE);

new IronBlock("iron", "mars")
("ore_iron_mars",[{name: "Ore Iron Mars", texture: [["Ore Iron Mars", 0]], inCreative: true} ],STONE);

Recipes.addFurnace(BlockID["ore_iron_mars"], 0, VanillaItemID.iron_ingot, 0)
