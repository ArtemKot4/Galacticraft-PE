IDRegistry.genBlockID("ore_iron_asteroids");
Block.createBlock("ore_iron_asteroids",[{name: "Ore Iron Asteroids", texture: [["Ore Iron Asteroids", 0]], inCreative: true} ],STONE);
Translation.addTranslation("Ore Iron Asteroids",{
ru: "Железная руда из астероида"
})

Block.registerDropFunction("ore_iron_asteroids", function(coords, blockID){
    return [[ItemID.shard_iron, 1, 0]] 
});

{
layers: [
    {
        minY: 2,
        maxY: 100,
         yConversion: [[1, -0.9], [.1, -.9], [.99, -0.99], [.1, -.6], [0, -1]
        ],
        material: {
            base: 7,
            surface: {
                id: 7,
                
            },
            cover: 7
        },
        noise: {
            octaves: {
               count: 1,
               scale: 7,
               weight: 1.4
               }
        }
    },{ minY: 0,
      	maxY: 1,
      	material: {base: 7}
    }]}