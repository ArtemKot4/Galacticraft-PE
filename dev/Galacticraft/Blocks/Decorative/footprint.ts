const FootMesh = new RenderMesh();
FootMesh.addVertex(11, 0, 1, 11, 1)
FootMesh.addVertex(11, 0, 7, 11, 7)
FootMesh.addVertex(0, 0, 7, 0, 7)

FootMesh.addVertex(0, 0, 7, 0, 7)
FootMesh.addVertex(10, 0, 1, 10, 1)
FootMesh.addVertex(11, 0, 1, 11, 1)

TileEntity.registerPrototype(EMoonBlocks.MOON_TOP_SIDE, {
    tick() {
        if(World.getThreadTime()% 80 === 0 ) {
            const animation = new Animation.Base(this.x + 0.5, this.y + 1.1, this.z + 0.5);
            animation.describe({mesh: FootMesh, skin: "misc/footprint.png"});
            animation.setPos(this.x - randomInt(0, 0.2), this.y,  this.z + 0.1)
            animation.load();
            animation.transform().rotate(0, randomInt(0, 0.9), 0)
           animation.refresh();
            alert("Загружен след")
        }
    },
})

Callback.addCallback("ItemUse", (coords, item, block, player) => {
    if(item.id === VanillaItemID.bone) {
        const animation = new Animation.Base(this.x + 0.5, this.y + 1.1, this.z + 0.5);
        animation.describe({mesh: FootMesh, skin: "misc/footprint.png"});
    //    animation.setPos(this.x - randomInt(0, 0.2), this.y,  this.z + 0.1)
        animation.load();
    //    animation.transform().rotate(0, randomInt(0, 0.9), 0)
      // animation.refresh();
       alert("Загрузилось?")
    }
})