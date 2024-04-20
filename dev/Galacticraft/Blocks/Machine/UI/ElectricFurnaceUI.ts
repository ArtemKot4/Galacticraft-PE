
const ElectricFurnaceUI = new UI.StandartWindow(
    {
        standard: {
            header: {
                text: {
                    text: Translation.translate("Electric furnace")
                },
            },
            inventory: {
                standard: true
            },
            background: {
                standard: true
            }
        },
    drawing: [
    //     {
    //     type: "bitmap",
    //     x: 402,
    //     y: 45,
    //     scale: 3.4,
    //   bitmap: 
    //         "generators.coalscale1"

    //     },
        {
            type: "bitmap",
            x: 550,
            y: 110,
            bitmap: "arrow_bar_1",
            scale: 4.2
        
       
       },
     {
        type: "bitmap",
        x: 430,
        y: 140,
        bitmap: "slace_en_0",
        scale: 3,
      },    
     {
        type: "bitmap",
        x: 415,
        y: 140,
        bitmap: "en_noy",
        scale: 3,
        
           }
    ],
    elements: {
        input: {
            type: "slot",
            x: 460,
            y: 110,
            bitmap: "coalslot",
            size: 70
        },

        ENERGYBar: {
            type: "scale",
            x: 430,
            y: 140,
            bitmap: "slace_en_1",
            scale: 3,
            direction: 0
        },
        Energy: {
            type: "scale",
            x: 415,
            y: 140,
            bitmap: "en_yes",
            scale: 3,
            direction: 1
        },
        result: {
            type: "slot",
            x: 610,
            y: 110,
            bitmap: "coalslot",
            size: 70
        },
        progress_scale: {
            type: "scale",
            x: 550,
            y: 110,
            scale: 4.2,
            direction: 0,
            bitmap: "arrow_bar_scale",
            clicker: {
                onClick: function() {
                    RV && RV.RecipeTypeRegistry.openRecipePage("generator 2");
                }}
        },
        
          
      
        ELECTRIC: {
            type: "text",
            x: 400,
            y: 190,
            width: 100,
            height: 30,
            text: "Energy type is not defined"
        },
        Status: {
            type: "text",
            x: 400,
            y: 220,
            width: 100,
            height: 30,
            text: "Status: energy is not defined"
        },
        // FiringStatus: {
        //     type: "text",
        //     x: 545,
        //     y: 55,
        //     width: 100,
        //     height: 30,
        //     text: "Burning: %"
        // },
    }
});
