// IDRegistry.genBlockID("wind_power_plant_block_0");
// Block.createBlock("wind_power_plant_block_0",[{name: "Wind power plant machine block", texture: [["vpp_block", 0]], inCreative: true} ],STONE);
// Translation.addTranslation("Wind power plant machine block",{
// ru: "Машинный блок §6ВЭУ"
// })

// sj.registerWire(BlockID.wind_power_plant_block_0, 200);
// sj.registerWire(BlockID.wind_power_plant_block_1, 200);
// sj.registerWire(BlockID.wind_power_plant_connector, 200);

// IDRegistry.genBlockID("wind_power_plant_block_2");
// Block.createBlock("wind_power_plant_block_2",[{name: "Wind power plant machine block", texture: [["vpp_block", 0],["vpp_block", 0],["vpp_block", 1]], inCreative: true} ],STONE);


// IDRegistry.genBlockID("wind_power_plant_core_machine");
// Block.createBlock("wind_power_plant_core_machine",[{name: "Wind power plant core machine block", texture: [["vpp_coreblock", 0]], inCreative: true} ],STONE);
// Translation.addTranslation("Wind power plant core machine block",{
// ru: "Машинный блок ядра §6ВЭУ"
// })

// IDRegistry.genBlockID("wind_power_plant_core_off");
// Block.createBlockWithRotation("wind_power_plant_core_off",[{name: "Wind power plant core off", texture: [["vpp_coreblock", 0],["vpp_coreblock", 0],["vpp_core_lamp", 0],["vpp_int", 0],["vpp_core_port", 0],["vpp_core_lamp", 0]], inCreative: true} ],STONE);
// Translation.addTranslation("Wind power plant core off",{
// ru: "Обесточенное ядро §6ВЭУ"
// });

// IDRegistry.genBlockID("wind_power_plant_core_on");
// Block.createBlockWithRotation("wind_power_plant_core_on",[{name: "Wind power plant core on", texture: [["vpp_coreblock", 0],["vpp_coreblock", 0],["vpp_core_lamp", 1],["vpp_int", 0],["vpp_core_port", 0],["vpp_core_lamp", 1]], inCreative: true} ], WPPTYPE);
// Translation.addTranslation("Wind power plant core on",{
// ru: "Заряженное ядро §6ВЭУ"
// });

// IDRegistry.genBlockID("wind_power_plant_block_1");
// Block.createBlockWithRotation("wind_power_plant_block_1",[{name: "Wind power plant machine of ports", texture: [["vpp_block", 0],["vpp_block", 0],["vpp_block_1_port", 0],["vpp_block_1_port", 0],["vpp_block", 1],["vpp_block", 1]], inCreative: true} ],STONE);
// Translation.addTranslation("Wind power plant machine of ports",{
// ru: "Машинный блок с энергопортом §6ВЭУ"
// });

// IDRegistry.genBlockID("wind_power_plant_connector");
// Block.createBlock("wind_power_plant_connector",[{name: "Wind power plant connector for roter", texture: [["vpp_glassblock", 0]], inCreative: true} ],STONE);
// Translation.addTranslation("Wind power plant connector for roter",{
// ru: "Подсоединитель для ротера §6ВЭУ"
// })

// var model = BlockRenderer.createModel();
// var render = new ICRender.Model();
// model.addBox(0, 13/16, 0, 1, 3/16,1,"vpp_glassblock", 0);
// model.addBox(13/16, 0, 0, 3/16, 1,1,"vpp_glassblock", 0);
// model.addBox(0, 0, 13/16, 1, 1,3/16,"vpp_glassblock", 0);

// //model.addBox(0,0,0 ,1,1/16,1,"tank", 0);


// render.addEntry(model);

// BlockRenderer.setStaticICRender(BlockID.wind_power_plant_connector, -1, render);

// var WPPMesh = new RenderMesh(); 
// WPPMesh.setBlockTexture("wpp_modelstrure",0); 
// WPPMesh.importFromFile(__dir__+"/models/wpp_model.obj","obj", {translation: [0.5,0,0.5], scale: 3}); 
// IDRegistry.genBlockID("wpp_block"); 
// Block.createBlockWithRotation("wpp_block", [ 
//  {name: "Wind power plant", texture: [["wpp_modelstrure", 0],["wpp_modelstrure", 1],["wpp_modelstrure", 2],["wpp_modelstrure", 3],["wpp_modelstrure", 4],["wpp_modelstrure", 5]], inCreative: false} 
// ]); 
// var WPPRender = new ICRender.Model(); 
// WPPRender.addEntry(new BlockRenderer.Model(WPPMesh)); 
// BlockRenderer.setStaticICRender(BlockID.wpp_block,0,WPPRender);

// TileEntity.registerPrototype(BlockID.wpp_block,{
// 	useNetworkItemContainer: true,
//     tick: function(){
//         if(World.getThreadTime()%5 == 0){
//    WPPMesh.rotate(+0.1,0,0.1)
// }
// 	},
// 	});

