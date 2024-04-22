IDRegistry.genBlockID("liquid_tank_gc");
Block.createBlock("liquid_tank_gc",[{name: "Liquid tank", texture: [["tank", 0]], inCreative: false} ], BLOCK_TYPE_GLASS);
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

modell({}, BlockID.liquid_tank_gc,0).setBlockModel(BlockID.liquid_tank_gc)

