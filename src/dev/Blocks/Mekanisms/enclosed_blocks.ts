IDRegistry.genBlockID("enclosed_aluminum_wire");
Block.createBlockWithRotation("enclosed_aluminum_wire", [{
    name: "Enclosed Aluminum Wire",
    texture: [["Deco Block",
        0],
        ["Deco Block",
            0],
        ["Enclosed Aluminum Wire",
            0],
        ["Enclosed Aluminum Wire",
            0],
        ["Enclosed Aluminum Wire",
            0],
        ["Enclosed Aluminum Wire",
            0]],
    inCreative: true
} ],STONE);
Translation.addTranslation("Enclosed Aluminum Wire", {
    ru: "Герметичная алюминиевая труба"
});
sj.registerWire(BlockID.enclosed_aluminum_wire, 200);

IDRegistry.genBlockID("enclosed_fluid_pipe");
Block.createBlockWithRotation("enclosed_fluid_pipe", [{
    name: "Enclosed Oxygen Pipe",
    texture: [["Deco Block",
        0],
        ["Deco Block",
            0],
        ["Enclosed Fluid Pipe",
            0],
        ["Enclosed Fluid Pipe",
            0],
        ["Enclosed Fluid Pipe",
            0],
        ["Enclosed Fluid Pipe",
            0]],
    inCreative: true
} ],STONE);
Translation.addTranslation("Enclosed Oxygen Pipe", {
    ru: "Герметичная кислородная труба"
});
sj.registerWire(BlockID.enclosed_fluid_pipe, 400);

IDRegistry.genBlockID("enclosed_heavy_aluminum_wire");
Block.createBlockWithRotation("enclosed_heavy_aluminum_wire", [{
    name: "Enclosed Heavy Aluminum Wire",
    texture: [["Deco Block",
        0],
        ["Deco Block",
            0],
        ["Enclosed Heavy Aluminum Wire",
            0],
        ["Enclosed Heavy Aluminum Wire",
            0],
        ["Enclosed Heavy Aluminum Wire",
            0],
        ["Enclosed Heavy Aluminum Wire",
            0]],
    inCreative: true
} ],STONE);
Translation.addTranslation("Enclosed Heavy Aluminum Wire", {
    ru: "Герметичная улучшенная алюминиевая труба"
});
sj.registerWire(BlockID.enclosed_heavy_aluminum_wire, 400);