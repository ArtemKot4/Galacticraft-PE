ModAPI.addAPICallback("ClassicUI", function(api:any){
    
Translation.addTranslation("Spaces Dark #1",{
ru: "Тёмная тема SpacesCraft #1"
});

Translation.addTranslation("Spaces Dark #2",{
ru: "Тёмная тема SpacesCraft #2"
});

	api.registerUiConfig("coal_generator",{
        	"x": 25,
			"y": 0,
			"scale": -0.09999999999999987,
			
			"padding": 20
	});
	api.registerUiConfig("oxygen_storage_module",{
   			"x": -25,
			"y": 80,
			"scale": -0.19999999999999996,
			
			"padding": 20
	});
	
	api.registerUiConfig("workbench_nasa",{
       	"x": 0,
			"y": 30,
			"scale": -0.19999999999999996,
			
			"padding": 20
	});
	
	api.registerUiConfig("refinery_sc",{
            "x": 0,
			"y": -30,
			"scale": 0.20000000000000018,
			
			"padding": 20
	});
	api.registerUiConfig("workbench_rocket",{  "x": 0,
			"y": -30,
			"scale": 0.30000000000000027,
			
			"padding": 20
	});
	api.registerUiConfig("Pad_Normal",{
			"x": 0,
			"y": -10,
			"scale": 0.10000000000000009,
			
			"padding": 20
		
	});
		api.registerUiConfig("Padding1lvl",{
			"x": 0,
			"y": -10,
			"scale": 0,
			"padding": 20
	});
     	api.registerUiConfig("fuel_loader",{
					"x": -170,
			"y": -40,
			"scale": 0.30000000000000027,
			
			"padding": 20
    });
    api.registerUiConfig("electric_compressor_sj",{
			"x": -5,
			"y": -25,
			"scale": 0.30000000000000027,
			
			"padding": 20
    });
    api.registerUiConfig("compressor_sj",{
			"x": 0,
			"y": -25,
			"scale": 0.20000000000000018,
			
			"padding": 20,
    });
    api.registerUiConfig("collector_sc",{	"x": -35,
			"y": 0,
			"scale": 0.20000000000000018,
			
			"padding": 20
    });
    api.registerUiConfig("circuit_fabricator",{
			"x": 0,
			"y": -25,
			"scale": 0.30000000000000027,
			
			"padding": 20
    });
	api.registerTheme(Translation.translate("Spaces Dark #1"), {
				"slot":	"_default_slot",
			"invSlot": "_default_slot",
			"selected_slot": "_selection",
			"selected_invSlot": "_selection",
			"frame": "workbench_frame3",
			"color_inventory": "#ffffff",
			"color_title": "#ffffff",
});

api.registerTheme(Translation.translate("Spaces Dark #2"), {
    
			"base": [Translation.translate("Spaces Dark #1"), "super_classic_base"],
   "post_base": {
    "can_show": true,
"prototype": {
     "setting": {
      "padding_name": "padding_space"
     },
     "customConfigs": {
      "default": {
       "padding_space": 20
      },
      "configs": [
       ["keyValue", "slider", "Padding", "padding_space", 20, 25, 5, ""]
      ]
     
    },
}}
})



   
 api.registerAllHandler({
  updateUi(id, window, tile){
   let content = window.getContent();
   
   let config = api.getConfig(id);
   let theme = api.getTheme(id);
   
   if(config.theme == Translation.translate("Spaces Dark #1") || config.theme == Translation.translate("Spaces Dark #2")){
   
 //  for(let i in content.drawing){let element = content.drawing[i];

//шкала тут бля }
    for(let key in content.elements){
     let element = content.elements[key];
     
     if(element.bitmap == "SPC.SPC_Canister"){
        element.bitmap = "SPC_Canister_Dark"};
        
     if(element.bitmap == "Others.en_slot"){
        element.bitmap = "en_slot_dark"};
        
     if(element.bitmap == "RocketSlots"){
        element.bitmap = "RocketSlots_dark"};
        
     if(element.bitmap == "trashslot"){
        element.bitmap = "dark_trashslot"};
        
     if(element.bitmap == "ChestableSlot"){
        element.bitmap = "ChestableSlot_dark"};
        
     if(element.bitmap == "Others.O2Slot"){
        element.bitmap = "O2Slot_dark"};
        
        if(element.bitmap == "Others.dust_slot"){
        element.bitmap = "Others.dust_slot_dark"};
        
        if(element.bitmap == "Others.diamond_slot"){
        element.bitmap = "Others.diamond_slot_dark"};
        
        if(element.bitmap == "Others.fabricator_slot"){
        element.bitmap = "Others.fabricator_slot_dark"};
        
        if(element.bitmap == "coalslot"){
        element.bitmap = "coalslot_dark"};
        
        if(element.drawing == "energy_small_background"){
        element.drawing = "energy_small_dark"};
        if(element.drawing == "arrow_bar_background"){
        element.drawing = "arrow_bar_dark"};
    }
  }}
 });
	});
	
	/*
	api.registerAllHandler({
  updateUi(id, window, tile){
   let content = window.getContent();
   
   let config = api.getConfig(id);
   let theme = api.getTheme(id);
   
   if(config.theme == "Dark_SpacesCraft"){
for(let i in content.drawing){
let element = content.drawing[i];

//тут не заполненная шкала
}

    for(let key in content.elements){
     let element = content.elements[key];
     //тут заполненная шкала
     if(element.bitmap == "SPC.SPC_Canister"){
        element.bitmap = "SPC_Canister_Dark"};
        
     if(element.bitmap == "Others.en_slot"){
        element.bitmap = "en_slot_dark"};
        
     if(element.bitmap == "RocketSlots"){
        element.bitmap = "RocketSlots_dark"};
        
     if(element.bitmap == "trashslot"){
        element.bitmap = "dark_trashslot"};
        
     if(element.bitmap == "ChestableSlot"){
        element.bitmap = "ChestableSlot_dark"};
        
     if(element.bitmap == "Others.O2Slot"){
        element.bitmap = "O2Slot_dark"};
        if(element.bitmap == "coalslot"){
        element.bitmap = "coalslot_dark"};
    }
}
  }
 });
	*/
	
let ClassicUI;
ModAPI.addAPICallback("ClassicUI", function(api){
ClassicUI = api;
});
function getWindow(id, ui){
if(ClassicUI)
return ClassicUI.getWindow(id, ui, {});
return ui;
}
﻿