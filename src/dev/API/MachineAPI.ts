let MachineAPI = {
	all: {},
	register(id, obj){
		obj = obj || {};
		obj.connectEnergy = obj.connectEnergy || [];
		this.all[id] = obj;
	},
	getMeta: function(metaConnect, meta){
		let metas = [
			[0, 0, 0, 0, 0, 0],
			[1, 1, 1, 1, 1, 1],
			[0, 1, 3, 2, 5, 4],
			[0, 1, 2, 3, 4, 5],
			[0, 1, 4, 5, 3, 2],
			[0, 1, 5, 4, 2, 3]
		];
    return metas[meta][metaConnect];
  },
	getPosByMeta(meta){
		let pos = [
			{x: 0, y: -1, z: 0},
			{x: 0, y: 1, z: 0},
    	{x: 0, y: 0, z: -1},
      {x: 0, y: 0, z: 1},
      {x: -1, y: 0, z: 0},
      {x: 1, y: 0, z: 0}
    ];
  	return pos[meta] || {x: 0, y: 0, z: 0};
	},
	getCoords(x, y, z, meta){
		let pos = this.getPosByMeta(meta);
		pos.x+=x;
		pos.y+=y;
		pos.z+=z;
		return pos;
	},
	getSideByPos(x, y, z, xc, yc, zc, data){
		let block = World.getBlock(x, y, z);
		if(block.id == 0)
			return;
		let sides = this.all[block.id].connectEnergy;
		for(let i in sides){
			let tile = World.getTileEntity(x,y,z);
			if(!tile)
				return
			let pos = this.getPosByMeta(this.getMeta(tile.data.meta+data, sides[i]));
			if(x+pos.x==xc&&y+pos.y==yc&&z+pos.z==zc)
				return sides[i];
		}
		return -1;
	},
	updateWireRender(x, y, z, id, rot){
		let sides = this.all[id].connectEnergy;
		for(let side in sides){
			let pos = this.getCoords(x, y, z, this.getMeta(rot,sides[side]));
			let block = World.getBlock(pos.x, pos.y, pos.z);
			let wire = RenderAPI.wire[block.id];
			if(wire){
				let model = RenderAPI.getModel(block.id);
				let p = [
					{x: 0, y: -1, z: 0},
					{x: 0, y: 1, z: 0},
    			{x: 0, y: 0, z: -1},
      		{x: 0, y: 0, z: 1},
    		  {x: -1, y: 0, z: 0},
      		{x: 1, y: 0, z: 0}
   		 ];
				for(let i in p){
					let blockMachine = World.getBlock(pos.x+p[i].x,pos.y+p[i].y,pos.z+p[i].z);
					if(this.all[blockMachine.id]){
						let meta = this.getSideByPos(pos.x+p[i].x,pos.y+p[i].y,pos.z+p[i].z, pos.x, pos.y, pos.z, 2)
						if(meta != -1){
							let tile = World.getTileEntity(pos.x+p[i].x,pos.y+p[i].y,pos.z+p[i].z);
							if(!tile)
								return
							let box = wire.boxes[this.getMeta(tile.data.meta+2, meta)].box; 
							model.addEntry(new BlockRenderer.Model(box[0], box[1], box[2], box[3], box[4], box[5], block.id, 0)); 
						}
					}
				}
				BlockRenderer.mapAtCoords(pos.x, pos.y, pos.z, model);
			}
		}
	},
	destroyModel(x, y, z, id, rot){
		let sides = this.all[id].connectEnergy;
		for(let i in sides){
			let pos = MachineAPI.getCoords(x, y, z, MachineAPI.getMeta(rot, sides[i]))
			BlockRenderer.unmapAtCoords(pos.x, pos.y, pos.z, true);
		}
	},
	registerRotation: function(id, meta, arr){
		TileRenderer.setStandartModel(id, arr);
		TileRenderer.registerRotationModel(id, meta, arr);
	},
	registerChangeSkin: function(id, meta, arr){
		TileRenderer.registerRotationModel(id, meta, arr);
		TileRenderer.setRotationPlaceFunction(id, false)
	},
	setSkin: function(x, y, z, id, meta){
		TileRenderer.mapAtCoords(x, y, z, id, meta);
	},
};
/*var MachineAPI = {
    all: {},
    register: function(id, data){
        this.all[id] = {};
        if(data.energyConnect || data.energyConnect == 0) this.all[id].energyConnect = data.energyConnect;
        if(data.energyOutput || data.energyOutput == 0) this.all[id].energyOutput = data.energyOutput;
    },
    getConnectMeta: function(id, meta){
        let metas = [
            [1, 0, 3, 2],
            [0, 1, 2, 3],
            [3, 2, 0, 1],
            [2, 3, 1, 0]
        ];
        return metas[meta][this.all[id].energyConnect];
    },
    getConnectCoords: function(id, meta){
        return this.getCoordsForMeta(this.getConnectMeta(id, meta));
    },
    getConnectMetaOutput: function(id, meta){
        let metas = [
            [1, 0, 3, 2],
            [0, 1, 2, 3],
            [3, 2, 0, 1],
            [2, 3, 1, 0]
        ];
        return metas[meta][this.all[id].energyOutput || this.all[id].energyConnect];
    },
    getConnectCoordsOutput: function(id, meta){
        return this.getCoordsForMeta(this.getConnectMetaOutput(id, meta));
    },
    registerRotation: function(id, meta, arr){
        TileRenderer.setStandartModel(id, arr);
        TileRenderer.registerRotationModel(id, meta, arr);
    },
    registerChangeSkin: function(id, meta, arr){
        TileRenderer.registerRotationModel(id, meta, arr);
        TileRenderer.setRotationPlaceFunction(id, false)
    },
    setSkin: function(x, y, z, id, meta){
        TileRenderer.mapAtCoords(x, y, z, id, meta);
    },
    getCoordsForMeta: function(meta){
        let pos = [
            {x: 0, y: 0, z: -1},
            {x: 0, y: 0, z: 1},
            {x: -1, y: 0, z: 0},
            {x: 1, y: 0, z: 0}
        ]
        return pos[meta] || {x: 0, y: 0, z: 0};
    },
    metaForSide: function(meta){
        let arr = [2, 3, 4, 5];
        return arr[meta];
    },
    updateWireRender: function(region, x, y, z, id, meta){
        let arr = [
            4, 
            5,
            0,
            1
        ];
        let pos = MachineAPI.getConnectCoords(id, meta);
        let block = region.getBlock(x+pos.x, y+pos.y, z+pos.z);
        if(RenderAPI.wire[block.id]){
            var model = new ICRender.Model();
            let boxes = RenderAPI.wire[block.id].boxes;
            for(let i in arr){
                let coord = this.getCoordsForMeta(i);
                let bl = region.getBlock(x+pos.x+coord.x, y+pos.y+coord.y, z+pos.z+coord.z);
                if(this.all[bl.id]){
                    if(this.all[bl.id].energyConnect){
                        let te = TileEntity.getTileEntity(x+pos.x+coord.x, y+pos.y+coord.y, z+pos.z+coord.z, region);
                        if(te){
                        let posTe = this.getConnectCoords(bl.id, te.data.meta);
                        if((te.x+posTe.x) == (x+pos.x) && (te.y+posTe.y) == (y+pos.y) && (te.z+posTe.z) == (z+pos.z) && te.data.connect){
                            let box = RenderAPI.wire[block.id].boxes[arr[this.getConnectMeta(bl.id, te.data.meta)]].box;
                            model.addEntry(new BlockRenderer.Model(box[0], box[1], box[2], box[3], box[4], box[5], block.id, 0));
                        }
                        }
                    }
                     if(this.all[bl.id].energyOutput){
                        let te = TileEntity.getTileEntity(x+pos.x+coord.x, y+pos.y+coord.y, z+pos.z+coord.z, region);
                        if(te){
                        let posTe = this.getConnectCoordsOutput(bl.id, te.data.meta);
                        if((te.x+posTe.x) == (x+pos.x) && (te.y+posTe.y) == (y+pos.y) && (te.z+posTe.z) == (z+pos.z) && te.data.connect){
                            let box = RenderAPI.wire[block.id].boxes[arr[this.getConnectMetaOutput(bl.id, te.data.meta)]].box;
                            model.addEntry(new BlockRenderer.Model(box[0], box[1], box[2], box[3], box[4], box[5], block.id, 0));
                        }
                        }
                    }
                }
            }
            let width = RenderAPI.wire[block.id].width;
            model.addEntry(new BlockRenderer.Model(0.5 - width / 2, 0.5 - width / 2, 0.5 - width / 2, 0.5 + width / 2, 0.5 + width / 2, 0.5 + width / 2, block.id, 0)); 
            for(var i in boxes){ 
                var box = boxes[i].box; 
                var side = boxes[i].side; 
                model.addEntry(new BlockRenderer.Model(box[0], box[1], box[2], box[3], box[4], box[5], block.id, 0)).setCondition(new ICRender.BLOCK(side[0], side[1], side[2], ICRender.getGroup("sc-wire"), false)); 
            }
            BlockRenderer.mapAtCoords(x+pos.x, y+pos.y, z+pos.z, model);
        }
        if(this.all[id]){
            if(this.all[id].energyOutput) this.updateWireRender2(region, x, y, z, id, meta)
        }
    },
    updateWireRender2: function(region, x, y, z, id, meta){
        let arr = [
            4, 
            5,
            0,
            1
        ];
        let pos = MachineAPI.getConnectCoordsOutput(id, meta);
        let block = region.getBlock(x+pos.x, y+pos.y, z+pos.z);
        if(RenderAPI.wire[block.id]){
            var model = new ICRender.Model();
            let boxes = RenderAPI.wire[block.id].boxes;
            for(let i in arr){
                let coord = this.getCoordsForMeta(i);
                let bl = region.getBlock(x+pos.x+coord.x, y+pos.y+coord.y, z+pos.z+coord.z);
                if(this.all[bl.id]){
                    if(this.all[bl.id].energyConnect){
                        let te = TileEntity.getTileEntity(x+pos.x+coord.x, y+pos.y+coord.y, z+pos.z+coord.z, region);
                        if(te){
                        let posTe = this.getConnectCoords(bl.id, te.data.meta);
                        if((te.x+posTe.x) == (x+pos.x) && (te.y+posTe.y) == (y+pos.y) && (te.z+posTe.z) == (z+pos.z) && te.data.connect){
                            let box = RenderAPI.wire[block.id].boxes[arr[this.getConnectMeta(bl.id, te.data.meta)]].box;
                            model.addEntry(new BlockRenderer.Model(box[0], box[1], box[2], box[3], box[4], box[5], block.id, 0));
                        }
                        }
                    }
                     if(this.all[bl.id].energyOutput){
                        let te = TileEntity.getTileEntity(x+pos.x+coord.x, y+pos.y+coord.y, z+pos.z+coord.z, region);
                        if(te){
                        let posTe = this.getConnectCoordsOutput(bl.id, te.data.meta);
                        if((te.x+posTe.x) == (x+pos.x) && (te.y+posTe.y) == (y+pos.y) && (te.z+posTe.z) == (z+pos.z) && te.data.connect){
                            let box = RenderAPI.wire[block.id].boxes[arr[this.getConnectMetaOutput(bl.id, te.data.meta)]].box;
                            model.addEntry(new BlockRenderer.Model(box[0], box[1], box[2], box[3], box[4], box[5], block.id, 0));
                        }
                        }
                    }
                }
            }
            let width = RenderAPI.wire[block.id].width;
            model.addEntry(new BlockRenderer.Model(0.5 - width / 2, 0.5 - width / 2, 0.5 - width / 2, 0.5 + width / 2, 0.5 + width / 2, 0.5 + width / 2, block.id, 0)); 
            for(var i in boxes){ 
                var box = boxes[i].box; 
                var side = boxes[i].side; 
                model.addEntry(new BlockRenderer.Model(box[0], box[1], box[2], box[3], box[4], box[5], block.id, 0)).setCondition(new ICRender.BLOCK(side[0], side[1], side[2], ICRender.getGroup("sc-wire"), false)); 
            }
            BlockRenderer.mapAtCoords(x+pos.x, y+pos.y, z+pos.z, model);
        }
        
    }
};*/