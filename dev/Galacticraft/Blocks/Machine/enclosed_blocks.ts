new GBlock("enclosed_aluminum_wire", [{
    name: "Enclosed Aluminum Wire",
    texture: [["Enclosed Aluminum Wire", 0]],
    inCreative: true
} ], STONE
).create();

GJ.registerWire(BlockID.enclosed_aluminum_wire, 200);
ICRender.getGroup("gc-wire").add(BlockID["enclosed_aluminum_wire"], -1);


new GBlock("enclosed_fluid_pipe", [{
    name: "Enclosed Oxygen Pipe",
    texture: [["Enclosed Fluid Pipe", 0]],
    inCreative: true
} ],STONE
).create();

GJ.registerWire(BlockID.enclosed_fluid_pipe, 400);
ICRender.getGroup("gc-oxygen-pipe").add(BlockID["enclosed_fluid_pipe"], -1);


new GBlock("enclosed_heavy_aluminum_wire", [{
    name: "Enclosed Heavy Aluminum Wire",
    texture: [["Enclosed Heavy Aluminum Wire", 0]],
    inCreative: true
} ],STONE
).create();
 
GJ.registerWire(BlockID.enclosed_heavy_aluminum_wire, 400);
ICRender.getGroup("gc-improved-wire").add(BlockID["enclosed_heavy_aluminum_wire"], -1);
