ModAPI.addAPICallback("RecipeViewer", (api: any) => {
   var RV = api.Core;

Translation.addTranslation("Energy generating: 3000",
{
    ru: "Энергии будет получено: 3000"
});

Translation.addTranslation("Energy: 3000",
{
    ru: "Энергии: 3000"
});

Translation.addTranslation("Collector recipes",
{
    ru: "Рецепты коллектора"
});

Translation.addTranslation("Circuit fabricator recipes",
{
    ru: "Рецепты производителя микросхем"
});

Translation.addTranslation("Compressor recipes",
{
    ru: "Рецепты компрессора"
});

Translation.addTranslation("1-6 blocks leaves you can place",
{
    ru: "Ты можешь использовать от одного до шести блоков листвы"
});

Translation.addTranslation("Status: generating",
{
    ru: "Статус: работает"
});

Translation.addTranslation("Burning: 0%",
{
  ru: "Нагрев: 0%"
});

Translation.addTranslation("Burning: 50 / 2 %",
{
  ru: "Нагрев: 50 / 2 %"
});

Translation.addTranslation("Oxygen: + 1 / second",
{
  ru: "Кислород: + 1 / в секунду"
});


Translation.addTranslation("Coal generator recipes",
{
    ru: "Рецепты угольного генератора"
});

Translation.addTranslation("Coal generator cooling",
{
    ru: "Охлаждение угольного генератора"
});




	RV.registerRecipeType("refinery", {
      title: "Refinery",
      contents: {
         icon: BlockID.refinery_sc,
         drawing: [
    {type: "bitmap",x: 268,y: 190, bitmap: "Liquid_null",scale: 3.8},
    {type: "bitmap",x: 769,y: 190, bitmap: "Liquid_null",scale: 3.8}, {type: "bitmap", x:667 ,y: 190, bitmap:"Liquid_null",scale : 3.8},{type: "bitmap", x:565 ,y: 190, bitmap:"Liquid_null",scale : 3.8},
     {type: "bitmap", x:500 ,y: 70, bitmap:"slace_en_0",scale : 3}, {type: "bitmap", x:640 ,y: 70, bitmap:"en_noy",scale : 3}, 
			],
         elements: {
      input0:
    	{type:"slot",x:355,y:120,size:70, bitmap:"SPC.SPC_Canister"},input1:
    	{type:"slot",x:445,y:120,size:70, bitmap:"SPC.SPC_Canister"},
    output0:    	{type:"slot",x:455,y:260,size:70,bitmap: "Others.en_slot"}, 
    
    	output1:
    	{type:"slot",x:855,y:120,size:70, bitmap:"SPC.SPC_Canister"},
    	output2: {type:"slot",x:755,y:120,size:70, bitmap:"SPC.SPC_Canister"}, output3: {type:"slot",x:651,y:120,size:70, bitmap:"SPC.SPC_Canister"}

         }

      },getList: function(id, data, isUsage) {    
}});

RV.registerRecipeType("generator 1", {
   title: Translation.translate("Coal generator recipes"),
   contents: {
      icon: BlockID.coal_generator,
      drawing: [
         {
            type: "bitmap",
            x: 320,
            y: 215,
            bitmap: "arrow_bar_background",
            scale: 8
    },
         {
             type: "bitmap", 
             x: 490, 
             y: 215, 
             bitmap: "generators.Crashed_1",
             scale: 8
             
         },
           { type: "bitmap",
           x: 770,
           y: 215,
           bitmap: "energy_small_background", 
         scale: 8
         },

   ],
      elements: {
         input0: {
            type: "slot",
            x: 145,
            y: 210,
            bitmap: "coalslot",
            size: 140,
         },
         output0: {
            type: "slot",
            x: 630,
            y: 210,
            bitmap: "trashslot",
            size: 140

         },
         Status: {
            type: "text",
            x: 300,
            y: 400,
            
            text: Translation.translate("Status: generating")

         },

         EnergiA: { 
             type: "text", 
             x: 270, 
             y: 170,
           
             text: Translation.translate("Energy generating: 3000")
             
         },
      }
   },

   getAllList: function(id, data, count) {
      let list = []
      for (var i in burnItems) {
         for (let e in Colding) {
            list.push({
               input: [{
                  id: burnItems[i].id,
                  count: 1,
                  data: 0
               }],
               output: [{
                  id: ItemID.soot_coal,
                  count: 1,
                  data: 0
               }]
            })
         }
      }
      return list
   },
});




RV.registerRecipeType("Collector", {
   title: Translation.translate("Collector recipes"),
   contents: {
      icon: BlockID.collector_sc,
      drawing: [
         {
            type: "bitmap",
            x: 300,
            y: 100,
            bitmap: "RV.Collector_rv",
            scale: 3
    },

         
   ],
      elements: {
         Status: {
            type: "text",
            x: 110,
            y: 10,
            
            text: Translation.translate("1-6 blocks leaves you can place")

         },
                 input0: {
            type: "slot",
            x: 425,
            y: 480,
            bitmap: "Others.O2Slot",
            size: 120,
         },
         input1: {
            type: "slot",
            x: 680,
            y: 420,
            bitmap: "Others.O2Slot",
            size: 120

         },
         input2: {
            type: "slot",
            x: 140,
            y: 200,
            bitmap: "Others.O2Slot",
            size: 120

         },
         input3: {
            type: "slot",
            x: 190,
            y: 40,
            bitmap: "Others.O2Slot",
            size: 120

         },
         input4: {
            type: "slot",
            x: 690,
            y: 40,
            bitmap: "Others.O2Slot",
            size: 120

         },
         input5: {
            type: "slot",
            x: 740,
            y: 200,
            bitmap: "Others.O2Slot",
            size: 120

         },
         input6: {
            type: "slot",
            x: 40,
            y: 480,
            bitmap: "Others.en_slot",
            size: 120

         },
         
      }
   },

   getAllList: function(id, data, count) {
      let list = []
     for (let e in leaves) {
             for(var i in batt){
            list.push({
      
               input: [{
                        id: leaves[e].id,
                        count: 1,
                        data: 0
                     },{
                        id: leaves[e].id,
                        count: 1,
                        data: 0
                     },{
                        id: leaves[e].id,
                        count: 1,
                        data: 0
                     },{
                        id: leaves[e].id,
                        count: 1,
                        data: 0
                     },{
                        id: leaves[e].id,
                        count: 1,
                        data: 0
                     },{
                        id: leaves[e].id,
                        count: 1,
                        data: 0
                     },{
                        id: batt[i].id,
                        count: 1,
                        data: 0
                     }],
            })
         
      }
        
             
      return list
   }
},});





RV.registerRecipeType("Compressor", {
   title: Translation.translate("Compressor recipes"),
   contents: {
      icon: BlockID.compressor_gj,
      drawing: [
         {
            type: "bitmap",
            x: 425,
            y: 185,
            bitmap: "compressor_slace",
            scale: 7
    },

         
   ],
      elements: {
                 input0: {
            type: "slot",
            x: 60,
            y: 100,
           
            size: 120,
         },
         input1: {
            type: "slot",
            x: 60,
            y: 220,
           
            size: 120

         },
         input2: {
            type: "slot",
            x: 60,
            y: 340,
            
            size: 120

         },
         input3: {
            type: "slot",
            x: 180,
            y: 100,
           
            size: 120

         },
         input4: {
            type: "slot",
            x:180,
            y:220,
           
            size: 120

         },
         input5: {
            type: "slot",
            x: 180,
            y: 340,
           
            size: 120

         },
         input6: {
            type: "slot",
            x: 300,
            y: 100,
           
            size: 120

         },
                  input7: {
            type: "slot",
            x: 300,
            y: 220,
           
            size: 120

         },
                  input8: {
            type: "slot",
            x: 300,
            y: 340,
           
            size: 120

         },
         output0: {
            type: "slot",
            x: 835,
            y: 220,
           
            size: 120

         },
            }
   },

   getAllList: function(id, data, count) {
      let list = []
     for(var e in compressorRecipe){
            list.push({
      
               input: [{
                        id: compressorRecipe[e].slot_1,
                        count: 1,
                        data: 0
                     },{
                        id: compressorRecipe[e].slot_4,
                        count: 1,
                        data: 0
                     },{
                        id: compressorRecipe[e].slot_7,
                        count: 1,
                        data: 0
                     },{
                        id: compressorRecipe[e].slot_2,
                        count: 1,
                        data: 0
                     },{
                        id: compressorRecipe[e].slot_5,
                        count: 1,
                        data: 0
                     },{
                        id:compressorRecipe[e].slot_8,
                        count: 1,
                        data: 0
                     },{
                        id: compressorRecipe[e].slot_3,
                        count: 1,
                        data: 0
                     },{
                        id: compressorRecipe[e].slot_6,
                        count: 1,
                        data: 0
                     },{
                        id:compressorRecipe[e].slot_9,
                        count: 1,
                        data: 0
                     }/*{
                        id: batt[i].id,
                        count: 1,
                        data: 0
                     }*/],
                     output: [{id: compressorRecipe[e].result,count:1,data:0}]
            })
         
      }
         
      return list
   },
});



RV.registerRecipeType("CircuitFabricator", {
   title: Translation.translate("Circuit fabricator recipes"),
   contents: {
      icon: BlockID.circuit_fabricator,
      drawing: [
         {
     
    },

         
   ],
      elements: {
                  input0:
        {
            type: "slot",
            x: 40,
            y: 40,
            size: 90,
            bitmap: "Others.diamond_slot"
        },
     /*   EnergySlot:
        {
            type: "slot",
            x: 330,
            y: 290,
            size: 60,
            bitmap: "Others.en_slot"
        },*/
        input1:
        {
            type: "slot",
            x: 295,
            y: 135,
            size: 90,
            bitmap: "Others.fabricator_slot"
        },
        input2:
        {
            type: "slot",
            x: 295,
            y: 225,
            //195,
            size: 90,
            bitmap: "Others.fabricator_slot"
        },
        input3:
        {
            type: "slot",
            x: 462,
            y: 210,
            //130,
            size: 90,
            bitmap: "Others.dust_slot"
        },
        input4:
        {
            type: "slot",
            x: 635,
            y: 50,
            size: 90
        },
        output0:
        {
            type: "slot",
            x: 635,
            y: 358,
            //278,
            size: 90
        },
                 
            }
   },

   getAllList: function(id, data, count) {
      let list = []
    for(var e in circuit){
            list.push({
      
               input: [{
                        id: circuit[e].diamond,
                        count: 1,
                        data: 0
                     },{
                        id: circuit[e].fabricator_0,
                        count: 1,
                        data: 0
                     },{
                        id: circuit[e].fabricator_1,
                        count: 1,
                        data: 0
                     },{
                        id: circuit[e].dust,
                        count: 1,
                        data: 0
                     },{
                        id: circuit[e].slot,
                        count: 1,
                        data: 0}],
                     output: [{id: circuit[e].resultat,count:1,data:0}]
            })
         
      }
         
      return list
   },
});







});
﻿