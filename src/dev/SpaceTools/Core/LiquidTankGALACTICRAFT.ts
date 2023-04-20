IDRegistry.genBlockID("liquid_tank_sc");
Block.createBlock("liquid_tank_sc",[{name: "Liquid tank", texture: [["tank", 0]], inCreative: false} ], BLOCK_TYPE_GLASS);
Translation.addTranslation("Liquid tank",{
ru: "Жидкостный резервуар"
})

let modell = (function(obj, texture_default, data_default){
	obj = obj || {};
	const texture = texture_default || 1, data = data_default || 0;
	let model = new RenderUtil.Model();
	model.addBoxByBlock("cube", 0.0625, 0, 0.07500000000000029, 0.9375, 0, 0.9500000000000002, obj["cube"] ? obj["cube"].texture : texture, obj["cube"] ? obj["cube"].data : data);
	model.addBoxByBlock("cube_2", 0.0625, 0, 0.07500000000000029, 0.125, 1, 0.9500000000000002, obj["cube_2"] ? obj["cube_2"].texture : texture, obj["cube_2"] ? obj["cube_2"].data : data);
	model.addBoxByBlock("cube_3", 0.875, 0, 0.07500000000000018, 0.9375, 1, 0.9500000000000002, obj["cube_3"] ? obj["cube_3"].texture : texture, obj["cube_3"] ? obj["cube_3"].data : data);
	model.addBoxByBlock("cube_4", 0.0625, 0, 0.07500000000000029, 0.9375, 1, 0.13750000000000018, obj["cube_4"] ? obj["cube_4"].texture : texture, obj["cube_4"] ? obj["cube_4"].data : data);
	model.addBoxByBlock("cube_5", 0.0625, 0, 0.8875000000000002, 0.9375, 1, 0.9500000000000002, obj["cube_5"] ? obj["cube_5"].texture : texture, obj["cube_5"] ? obj["cube_5"].data : data);
	return model;
});//boxes - 5 

modell({}, BlockID.liquid_tank_sc,0).setBlockModel(BlockID.liquid_tank_sc)


   SpacesMachine.liquidRegistry(ItemID.bucket_of_oil,0,VanillaItemID.bucket,0,"oil")
SpacesMachine.liquidRegistry(ItemID.bucket_of_fuel,0,VanillaItemID.bucket,0,"fuel")
  
for(var i in liquids){
   Item.registerUseFunction(liquids[i].id, function(coords, item, block, player){
	function updaterStorage(liquidsture,level){
		if(level>0){
	//modell.addBoxByBlock("firstfluid",  0.125, 0, 0.125, 0.875, 1/16, 0.875, liquidsture, 0);
	modell({}, BlockID.liquid_tank_sc,0).setBlockModel(BlockID.liquid_tank_sc)
	}
	
	   
	   

	if(block.id==BlockID.liquid_tank_sc && item.data==liquids[i].data && liquids[i] == liquids[i].liquid && 
 level!=17&&level!=-1){
		if(liquids[i]=="oil"){updaterStorage("oil_gl_still",+1);
		var actor = new PlayerActor(player);
		Entity.setCarriedItem(player,item.id,item.count-1,0);
		actor.addItemToInventory(liquids[i].voId,item.count,liquids[i].voData,item.extra,false)
		}
		if(liquids[i]=="fuel"){updaterStorage("fuel_gl_still",+1);
		var actor = new PlayerActor(player);
		Entity.setCarriedItem(player,item.id,item.count-1,0);
		actor.addItemToInventory(liquids[i].voId,item.count,liquids[i].voData,item.extra,false)
		}
	}}
   });
}

//model.addBoxByBlock("firstfluid",  0.125, 0, 0.125, 0.875, 1/16=level, 0.875, liquidsture, 0);