IDRegistry.genBlockID("enclosed_aluminum_wire");
Block.createBlock("enclosed_aluminum_wire", [{
    name: "Enclosed Aluminum Wire",
    texture: [["Enclosed Aluminum Wire", 0]],
    inCreative: true
} ],//STONE
);
Translation.addTranslation("Enclosed Aluminum Wire", {
    ru: "Герметичная алюминиевая труба"
});
gj.registerWire(BlockID.enclosed_aluminum_wire, 200);

IDRegistry.genBlockID("enclosed_fluid_pipe");
Block.createBlock("enclosed_fluid_pipe", [{
    name: "Enclosed Oxygen Pipe",
    texture: [["Enclosed Fluid Pipe", 0]],
    inCreative: true
} ],//STONE
);
Translation.addTranslation("Enclosed Oxygen Pipe", {
    ru: "Герметичная кислородная труба"
});
ob.registerWire(BlockID.enclosed_fluid_pipe, 400);

IDRegistry.genBlockID("enclosed_heavy_aluminum_wire");
Block.createBlock("enclosed_heavy_aluminum_wire", [{
    name: "Enclosed Heavy Aluminum Wire",
    texture: [["Enclosed Heavy Aluminum Wire", 0]],
    inCreative: true
} ],//STONE
);
Translation.addTranslation("Enclosed Heavy Aluminum Wire", {
    ru: "Герметичная улучшенная алюминиевая труба"
});
gj.registerWire(BlockID.enclosed_heavy_aluminum_wire, 400);