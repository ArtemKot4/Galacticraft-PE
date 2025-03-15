new GBlock("workbench_nasa", [{
    name: "Workbench Nasa",
    texture: [["assembly",
        0],
        ["assembly",
            1],
        ["assembly",
            2],
        ["assembly",
            3],
        ["assembly",
            4],
        ["assembly",
            5]],
    inCreative: false
} ]).create().setupObjModel("assembly", "workbench", [1, 1, 1]);

new GBlock("workbench_rocket", [
    {
    name: "Workbench Rocket", texture: [["workbench_nasa_side", 0], ["rocket_workbench", 0], ["workbench_nasa_side", 0],
     ["workbench_nasa_side", 0], ["workbench_nasa_side", 0], ["workbench_nasa_side", 0]], inCreative: true
     },    {
    name: "Workbench Rocket", texture: [["workbench_nasa_side", 0], ["rocket_workbench", 0], ["workbench_nasa_side", 0], 
    ["workbench_nasa_side", 0], ["workbench_nasa_side", 0], ["workbench_nasa_side", 0]], inCreative: false
     },    {
    name: "Workbench Rocket", texture: [["workbench_nasa_side", 0], ["rocket_workbench", 0], ["workbench_nasa_side", 0],
     ["workbench_nasa_side", 0], ["workbench_nasa_side", 0], ["workbench_nasa_side", 0]], inCreative: false
     }
],STONE).createWithRotation();
Translation.addTranslation("Workbench Rocket", {
    ru: "Верстак NASA"
});


new GBlock("oxygen_collector", [
    {
        name: "Oxygen Collector",
        texture: [["collector",
            0],
        ["collector",
            0],
        ["collector",
            0],
        ["collector",
            0],
        ["Machine Input",
            0],
        ["Machine Oxygen Output",
            0]],
        inCreative: true
    }, {
        name: "Oxygen Collector",
        texture: [["collector",
            0],
        ["collector",
            0],
        ["collector",
            0],
        ["collector",
            0],
        ["Machine Input",
            0],
        ["Machine Oxygen Output",
            0]],
        inCreative: false
    }, {
        name: "Oxygen Collector",
        texture: [["collector",
            0],
        ["collector",
            0],
        ["collector",
            0],
        ["collector",
            0],
        ["Machine Input",
            0],
        ["Machine Oxygen Output",
            0]],
        inCreative: false
    }
], STONE).createWithRotation();

new GBlock(
  "fuel_loader",
  [
    {
      name: "Fuel Loader",
      texture: [
        ["Machine", 0],
        ["Machine", 0],
        ["refinery_front", 0],
        ["Fuel Loader", 0],
        ["Machine Output", 0],
        ["Machine Output", 0],
      ],
      inCreative: true,
    },
    {
      name: "Fuel Loader",
      texture: [
        ["Machine", 0],
        ["Machine", 0],
        ["refinery_front", 0],
        ["Fuel Loader", 0],
        ["Machine Output", 0],
        ["Machine Output", 0],
      ],
      inCreative: false,
    },
    {
      name: "Fuel Loader",
      texture: [
        ["Machine", 0],
        ["Machine", 0],
        ["refinery_front", 0],
        ["Fuel Loader", 0],
        ["Machine Output", 0],
        ["Machine Output", 0],
      ],
      inCreative: false,
    },
  ],
  STONE
).createWithRotation();


new GBlock(
    "refinery_gc",
    [
      {
        name: "Refinery",
        texture: [
          ["Machine", 0],
          ["refinery_top", 0],
          ["refinery_front", 0],
          ["refinery_side", 0],
          ["Machine Input", 0],
          ["Machine Oxygen Input", 0],
        ],
        inCreative: true,
      },
      {
        name: "Refinery",
        texture: [
          ["Machine", 0],
          ["refinery_top", 0],
          ["refinery_front", 0],
          ["refinery_side", 0],
          ["Machine Input", 0],
          ["Machine Oxygen Input", 0],
        ],
        inCreative: false,
      },
      {
        name: "Refinery",
        texture: [
          ["Machine", 0],
          ["refinery_top", 0],
          ["refinery_front", 0],
          ["refinery_side", 0],
          ["Machine Input", 0],
          ["Machine Oxygen Input", 0],
        ],
        inCreative: false,
      },
    ],
    STONE
  ).createWithRotation();
  

  


  new GBlock(
    "geothermal_generator_gc",
    [
      {
        name: "Geothermal generator",
        texture: [
          ["geothermal_vent", 0],
          ["geothermal_vent", 0],
          ["Machine", 0],
          ["geothermal_inactive", 0],
          ["Machine Output", 0],
          ["Machine Output", 0],
        ],
        inCreative: true,
      },
      {
        name: "Geothermal generator",
        texture: [
          ["geothermal_vent", 0],
          ["geothermal_vent", 0],
          ["Machine", 0],
          ["geothermal", 0],
          ["Machine Output", 0],
          ["Machine Output", 0],
        ],
        inCreative: false,
      },
    ],
    STONE
  ).createWithRotation();

  
  new GBlock("crashed_probe", [
    {
        name: "Crashed probe",
        texture: [["probe_top",
            0],
        ["probe_bottom",
            0],
        ["probe_side",
            2],
        ["probe_side",
            2],
        ["probe_side",
            1],
        ["probe_side",
            1]],
        inCreative: true
    }, {
        name: "Crashed probe",
        texture: [["probe_top",
            0],
        ["probe_bottom",
            0],
        ["probe_side",
            2],
        ["probe_side",
            2],
        ["probe_side",
            1],
        ["probe_side",
            1]],
        inCreative: false
    }, {
        name: "Crashed probe",
        texture: [["probe_top",
            0],
        ["probe_bottom",
            0],
        ["probe_side",
            2],
        ["probe_side",
            2],
        ["probe_side",
            1],
        ["probe_side",
            1]],
        inCreative: false
    }
], STONE).createWithRotation();



new GBlock("oxygen_storage_module", [{
    name: "Oxygen Storage Module",
    texture: [["Machine",
        0],
        ["Machine",
            0],
        ["Machine",
            0],
        ["Oxygen Storage Module",
            0],
        ["Machine Input",
            0],
        ["Machine Oxygen Input",
            0]],
    inCreative: true
},
{
        name: "Oxygen Storage Module",
        texture: [["Machine",
            0],
            ["Machine",
                0],
            ["Machine",
                0],
            ["Oxygen Storage Module 1",
                0],
            ["Machine Input",
                0],
            ["Machine Oxygen Input",
                0]],
        inCreative: false
    }, {
        name: "Oxygen Storage Module",
        texture: [["Machine",
            0],
            ["Machine",
                0],
            ["Machine",
                0],
            ["Oxygen Storage Module 2",
                0],
            ["Machine Input",
                0],
            ["Machine Oxygen Input",
                0]],
        inCreative: false
    }, {
        name: "Oxygen Storage Module",
        texture: [["Machine",
            0],
            ["Machine",
                0],
            ["Machine",
                0],
            ["Oxygen Storage Module 3",
                0],
            ["Machine Input",
                0],
            ["Machine Oxygen Input",
                0]],
        inCreative: false
    }, {
        name: "Oxygen Storage Module",
        texture: [["Machine",
            0],
            ["Machine",
                0],
            ["Machine",
                0],
            ["Oxygen Storage Module 4",
                0],
            ["Machine Input",
                0],
            ["Machine Oxygen Input",
                0]],
        inCreative: false
    }, {
        name: "Oxygen Storage Module",
        texture: [["Machine",
            0],
            ["Machine",
                0],
            ["Machine",
                0],
            ["Oxygen Storage Module 5",
                0],
            ["Machine Input",
                0],
            ["Machine Oxygen Input",
                0]],
        inCreative: false
    }, {
        name: "Oxygen Storage Module",
        texture: [["Machine",
            0],
            ["Machine",
                0],
            ["Machine",
                0],
            ["Oxygen Storage Module 6",
                0],
            ["Machine Input",
                0],
            ["Machine Oxygen Input",
                0]],
        inCreative: false
    }, {
        name: "Oxygen Storage Module",
        texture: [["Machine",
            0],
            ["Machine",
                0],
            ["Machine",
                0],
            ["Oxygen Storage Module 7",
                0],
            ["Machine Input",
                0],
            ["Machine Oxygen Input",
                0]],
        inCreative: false
    }, {
        name: "Oxygen Storage Module",
        texture: [["Machine",
            0],
            ["Machine",
                0],
            ["Machine",
                0],
            ["Oxygen Storage Module 8",
                0],
            ["Machine Input",
                0],
            ["Machine Oxygen Input",
                0]],
        inCreative: false
    }, {
        name: "Oxygen Storage Module",
        texture: [["Machine",
            0],
            ["Machine",
                0],
            ["Machine",
                0],
            ["Oxygen Storage Module 9",
                0],
            ["Machine Input",
                0],
            ["Machine Oxygen Input",
                0]],
        inCreative: false
    }, {
        name: "Oxygen Storage Module",
        texture: [["Machine",
            0],
            ["Machine",
                0],
            ["Machine",
                0],
            ["Oxygen Storage Module 10",
                0],
            ["Machine Input",
                0],
            ["Machine Oxygen Input",
                0]],
        inCreative: false
    }, {
        name: "Oxygen Storage Module",
        texture: [["Machine",
            0],
            ["Machine",
                0],
            ["Machine",
                0],
            ["Oxygen Storage Module 11",
                0],
            ["Machine Input",
                0],
            ["Machine Oxygen Input",
                0]],
        inCreative: false
    }, {
        name: "Oxygen Storage Module",
        texture: [["Machine",
            0],
            ["Machine",
                0],
            ["Machine",
                0],
            ["Oxygen Storage Module 12",
                0],
            ["Machine Input",
                0],
            ["Machine Oxygen Input",
                0]],
        inCreative: false
    }, {
        name: "Oxygen Storage Module",
        texture: [["Machine",
            0],
            ["Machine",
                0],
            ["Machine",
                0],
            ["Oxygen Storage Module 13",
                0],
            ["Machine Input",
                0],
            ["Machine Oxygen Input",
                0]],
        inCreative: false
    }, {
        name: "Oxygen Storage Module",
        texture: [["Machine",
            0],
            ["Machine",
                0],
            ["Machine",
                0],
            ["Oxygen Storage Module 14",
                0],
            ["Machine Input",
                0],
            ["Machine Oxygen Input",
                0]],
        inCreative: false
    },/* {
        name: "Oxygen Storage Module",
        texture: [["Machine",
            0],
            ["Machine",
                0],
            ["Machine",
                0],
            ["Oxygen Storage Module 15",
                0],
            ["Machine Input",
                0],
            ["Machine Oxygen Input",
                0]],
        inCreative: false
    },*/ {
        name: "Oxygen Storage Module",
        texture: [["Machine",
            0],
            ["Machine",
                0],
            ["Machine",
                0],
            ["Oxygen Storage Module Full",
                0],
            ["Machine Input",
                0],
            ["Machine Oxygen Input",
                0]],
        inCreative: false
    } ],STONE).createWithRotation();


    new GBlock(
        "circuit_fabricator",
        [
          {
            name: "Circuit Fabricator",
            texture: [
              ["Machine", 0],
              ["Machine", 0],
              ["Machine", 0],
              ["circuit_fabricator", 0],
              ["Machine Input", 0],
              ["Machine", 0],
            ],
            inCreative: true,
          },
          {
            name: "Circuit Fabricator",
            texture: [
              ["Machine", 0],
              ["Machine", 0],
              ["Machine", 0],
              ["circuit_fabricator", 0],
              ["Machine Input", 0],
              ["Machine", 0],
            ],
            inCreative: false,
          },
          {
            name: "Circuit Fabricator",
            texture: [
              ["Machine", 0],
              ["Machine", 0],
              ["Machine", 0],
              ["circuit_fabricator", 0],
              ["Machine Input", 0],
              ["Machine", 0],
            ],
            inCreative: false,
          },
        ],
        STONE
      ).createWithRotation();
      

      


  






  new GBlock(
    "compressor_gj",
    [
      {
        name: "Compressor",
        texture: [
          ["Machine", 0],
          ["Machine", 0],
          ["Machine", 0],
          ["Compressor", 0],
          ["Machine", 0],
          ["Machine", 0],
        ],
        inCreative: true,
      },
      {
        name: "Compressor",
        texture: [
          ["Machine", 0],
          ["Machine", 0],
          ["Machine", 0],
          ["Compressor", 0],
          ["Machine", 0],
          ["Machine", 0],
        ],
        inCreative: false,
      },
      {
        name: "Compressor",
        texture: [
          ["Machine", 0],
          ["Machine", 0],
          ["Machine", 0],
          ["Compressor", 0],
          ["Machine", 0],
          ["Machine", 0],
        ],
        inCreative: false,
      },
    ],
    STONE
  ).createWithRotation();

  new GBlock(
    "electric_compressor_gj",
    [
      {
        name: "Electric compressor",
        texture: [
          ["machine_b", 0],
          ["machine_b", 0],
          ["machine_b", 0],
          ["electric_compressor", 0],
          ["machine_input", 0],
          ["machine_b", 0],
        ],
        inCreative: true,
      },
      {
        name: "Electric compressor",
        texture: [
          ["machine_b", 0],
          ["machine_b", 0],
          ["machine_b", 0],
          ["electric_compressor", 0],
          ["machine_input", 0],
          ["machine_b", 0],
        ],
        inCreative: false,
      },
      {
        name: "Electric compressor",
        texture: [
          ["machine_b", 0],
          ["machine_b", 0],
          ["machine_b", 0],
          ["electric_compressor", 0],
          ["machine_input", 0],
          ["machine_b", 0],
        ],
        inCreative: false,
      },
    ],
    STONE
  ).createWithRotation();
  
  new GBlock(
    "oxygen_compressor",
    [
      {
        name: "Oxygen Compressor",
        texture: [
          ["Machine", 0],
          ["Machine", 0],
          ["Oxygen Compressor Back", 0],
          ["Oxygen Compressor", 0],
          ["Machine Input", 0],
          ["Machine Oxygen Input", 0],
        ],
        inCreative: true,
      },
    ],
    STONE
  ).createWithRotation();
  
  
  /*EnergyTileRegistry.addEnergyTypeForId(BlockID.oxygen_compressor, gj);
  EnergyTileRegistry.addEnergyTypeForId(BlockID.oxygen_compressor, ob);
      EnergyTileRegistry.addEnergyTypeForId(BlockID.oxygen_compressor, EU);
      EnergyTileRegistry.addEnergyTypeForId(BlockID.oxygen_compressor, RF);*/
  
  new GBlock(
    "oxygen_decompressor",
    [
      {
        name: "Oxygen Decompressor",
        texture: [
          ["Machine", 0],
          ["Machine", 0],
          ["Oxygen Compressor Back", 0],
          ["Oxygen Decompressor", 0],
          ["Machine Input", 0],
          ["Machine Oxygen Input", 0],
        ],
        inCreative: true,
      },
    ],
    STONE
  ).createWithRotation();