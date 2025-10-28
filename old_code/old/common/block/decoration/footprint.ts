const FootMesh = (rx, ry, rz) => {
    const mesh = new RenderMesh();
    mesh.addVertex(0, 0, 0, 0, 0); 
    mesh.addVertex(1, 0.5, 0, 1, 0); 
    mesh.addVertex(0, 0.5, 1, 0, 1); 
     
    mesh.addVertex(1, 0.5, 0, 1, 0); 
    mesh.addVertex(0, 0.5, 1, 0, 1); 
    mesh.addVertex(1, 1, 1, 1, 1);
mesh.rotate(rx, ry, rz);
return mesh;
};

Block.registerEntityStepOnFunction(EMoonBlocks.MOON_TOP_SIDE, (coords, block, entity) => {
    alert("На блоке!");
    const animation = new Animation.Base(coords.x, coords.y + 1.01, coords.z);
    animation.describe({mesh: FootMesh(randomInt(0.01, 0.09), 0, 0), skin: "misc/footprint.png"});
    animation.load();

})
