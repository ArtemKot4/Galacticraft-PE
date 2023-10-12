
const BLOCK_TYPE_LIQUID = Block.createSpecialType({
    solid: false,
    renderlayer: 1,
    explosionres: 10000
});

 LiquidRegistry.registerLiquid("oil", "Oil", ["oil_gl_flow"]); 
 
Block.createLiquidBlock("oil", 
{ 
 name: "Oil", 
 still: { 
 texture: ["oil_gl_still", 0], 
 id: "oil_still",
 }, 
 flowing: { 
 texture: ["oil_gl_flow", 0], 
 id: "oil_flowing",
 }, 
 bucket: { 
 texture: { name: "Bucket Oil", meta: 0 }, 
 //name: "bucket of oil",
 id: "bucket_of_oil",
 },
}, BLOCK_TYPE_LIQUID);





LiquidRegistry.registerLiquid("liquidoxygen", "Liquid Oxygen", ["liquidoxygen"]); 
 
Block.createLiquidBlock("liquidoxygen", 
{ 
 name: "Liquid Oxygen", 
 still: { 
 texture: ["liquidoxygen", 0], 
 id: "liquidoxygen_still",
 }, 
 flowing: { 
 texture: ["liquidoxygen", 0], 
 id: "liquidoxygen_flowing",
 }, 
 bucket: { 
 texture: { name: "oxygenliquid_bucket", meta: 0 }, 
 //name: "Bucket of liquid oxygen",
 id: "bucket_of_liquid_oxygen",
 }, 
}, BLOCK_TYPE_LIQUID);



LiquidRegistry.registerLiquid("argon", "Argon", ["argon"]); 
 
Block.createLiquidBlock("argon", 
{ 
 name: "Argon", 
 still: { 
 texture: ["argon", 0], 
 id: "argon_still",
 }, 
 flowing: { 
 texture: ["argon", 0], 
 id: "argon_flowing",
 }, 
 bucket: { 
 texture: { name: "argon_bucket", meta: 0 }, 
 //name: "Bucket of argon",
 id: "bucket_of_argon",
 }, 
}, BLOCK_TYPE_LIQUID);



LiquidRegistry.registerLiquid("methane", "Methane", ["methane"]); 
 
Block.createLiquidBlock("methane", 
{ 
 name: "Methane", 
 still: { 
 texture: ["methane", 0], 
 id: "methane_still",
 }, 
 flowing: { 
 texture: ["methane", 0], 
 id: "methane_flowing",
 }, 
 bucket: { 
 texture: { name: "methane_bucket", meta: 1 }, 
 //name: "Bucket of methane",
 id: "bucket_of_methane",
 }, 
}, BLOCK_TYPE_LIQUID);



LiquidRegistry.registerLiquid("liquid_methane", "Liquid Methane", ["liquidmethane"]); 
 
Block.createLiquidBlock("liquid_methane", 
{ 
 name: "Liquid Methane", 
 still: { 
 texture: ["liquidmethane", 0], 
 id: "liquid_methane_still",
 }, 
 flowing: { 
 texture: ["liquidmethane", 0], 
 id: "liquid_methane_flowing",
 }, 
 bucket: { 
 texture: { name: "liquidmethane_bucket", meta: 0 }, 
 //name: "Bucket of liquid methane",
 id: "bucket_of_liquid_methane",
 }, 
}, BLOCK_TYPE_LIQUID);



LiquidRegistry.registerLiquid("carbondioxide", "Carbon dioxide", ["carbondioxide"]); 
 
Block.createLiquidBlock("carbondioxide", 
{ 
 name: "Carbon dioxide", 
 still: { 
 texture: ["carbondioxide", 0], 
 id: "carbondioxide_still",
 }, 
 flowing: { 
 texture: ["carbondioxide", 0], 
 id: "carbondioxide_flowing",
 }, 
 bucket: { 
 texture: { name: "carbondioxide_bucket", meta: 0 }, 
//name: "Bucket of carbon dioxide",
 id: "bucket_of_carbondioxide",
 }, 
}, BLOCK_TYPE_LIQUID);



LiquidRegistry.registerLiquid("helium", "Helium", ["helium"]); 
 
Block.createLiquidBlock("helium", 
{ 
 name: "Helium", 
 still: { 
 texture: ["helium", 0], 
 id: "helium_still",
 }, 
 flowing: { 
 texture: ["helium", 0], 
 id: "helium_flowing",
 }, 
 bucket: { 
 texture: { name: "helium_bucket", meta: 0 }, 
 //name: "Bucket of helium",
 id: "bucket_of_helium",
 }, 
}, BLOCK_TYPE_LIQUID);



LiquidRegistry.registerLiquid("nitrogen", "Nitrogen", ["nitrogen"]); 
 
Block.createLiquidBlock("nitrogen", 
{ 
 name: "Nitrogen", 
 still: { 
 texture: ["nitrogen", 0], 
 id: "nitrogen_still",
 }, 
 flowing: { 
 texture: ["nitrogen", 0], 
 id: "nitrogen_flowing",
 }, 
 bucket: { 
 texture: { name: "nitrogen_bucket", meta: 0 }, 
 //name: "Bucket of nitrogen",
 id: "bucket_of_nitrogen",
 }, 
}, BLOCK_TYPE_LIQUID);



LiquidRegistry.registerLiquid("liquid_nitrogen", "Liquid Nitrogen", ["liquidnitrogen"]); 
 
Block.createLiquidBlock("liquid_nitrogen", 
{ 
 name: "Liquid Nitrogen", 
 still: { 
 texture: ["liquidnitrogen", 0], 
 id: "liquid_nitrogen_still",
 }, 
 flowing: { 
 texture: ["liquidnitrogen", 0], 
 id: "liquid_nitrogen_flowing",
 }, 
 bucket: { 
 texture: { name: "liquidnitrogen_bucket", meta: 0 }, 
 //name: "Bucket of liquid nitrogen",
 id: "bucket_of_liquid_nitrogen",
 }, 
}, BLOCK_TYPE_LIQUID);




LiquidRegistry.registerLiquid("liquid_argon", "Liquid Argon", ["liquidargon"]); 
 
Block.createLiquidBlock("liquid_argon", 
{ 
 name: "Liquid Argon", 
 still: { 
 texture: ["liquidargon", 0], 
 id: "liquid_argon_still",
 }, 
 flowing: {  
 texture: ["liquidargon", 0], 
 id: "liquid_argon_flowing",
 }, 
 bucket: { 
 texture: { name: "liquidargon_bucket", meta: 0 }, 
 //name: "Bucket of liquid argon",
 id: "bucket_of_liquid_argon",
 }, 
}, BLOCK_TYPE_LIQUID);


Block.createLiquidBlock("fuel", 
{ 
 name: "Fuel", 
 still: { 
 texture: ["fuel_gl", 0], 
 id: "fuel_still",
 }, 
 flowing: { 
 texture: ["fuel_gl_flow", 0],
 id: "fuel_flowing",
 }, 
 bucket: { 
 texture: { name: "Bucket Fuel", meta: 0 }, 
// name: "Bucket of fuel",
 id: "bucket_of_fuel",
 }, 
}, BLOCK_TYPE_LIQUID);



LiquidRegistry.registerLiquid("sulphuric_acid", "Sulphuric Acid", ["sulphuric_acid_flow"]); 
 
Block.createLiquidBlock("sulphuric_acid", 
{ 
 name: "Sulphuric Acid", 
 still: { 
 texture: ["sulphuric_acid_still", 0],
 id: "sulphuric_acid_still",
 }, 
 flowing: { 
 texture: ["sulphuric_acid_flow", 0], 
 id: "sulphuric_acid_flow",
 }, 
 bucket: { 
 texture: { name: "bucket_sulphuric_acid", meta: 0 }, 
 //name: "Bucket of sulphuric acid",
 id: "bucket_of_sulphuric_acid",
 }, 
}, BLOCK_TYPE_LIQUID);

LiquidRegistry.registerLiquid("sludge_liquid", "Sludge", ["sludge_flow"]); 
 
Block.createLiquidBlock("sludge_liquid", 
{ 
 name: "Sludge", 
 still: { 
 texture: ["sludge_still", 0], 
 id: "sludge_still",
 }, 
 flowing: { 
 texture: ["sludge_flow", 0],
 id: "sludge_flowing",
 }, 
 bucket: { 
 texture: { name: "bucket_sludge", meta: 0 }, 
 //name: "Bucket of sludge",
 id: "bucket_of_sludge",
 }, 
 
}, BLOCK_TYPE_LIQUID);

