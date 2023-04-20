

IDRegistry.genBlockID("Pad_Normal");
Block.createBlock("Pad_Normal", [ 
 {name: "Padding Rocket", texture: [["PadNormal", 0],["PadNormal", 1],["PadNormal", 2],["PadNormal", 3],["PadNormal", 4],["PadNormal", 5]], inCreative: true} 
]); 



TileEntity.registerPrototype(BlockID.Pad_Normal,{
	useNetworkItemContainer: true,
    tick: function(){
    	if(this.blockSource.getBlockId(this.x,this.y,this.z)==BlockID.Pad_Normal && this.blockSource.getBlockId(this.x-1,this.y,this.z)==BlockID.Pad_Normal && this.blockSource.getBlockId(this.x-2,this.y,this.z)==BlockID.Pad_Normal && this.blockSource.getBlockId(this.x,this.y,this.z-1)==BlockID.Pad_Normal && this.blockSource.getBlockId(this.x-1,this.y,this.z-1)==BlockID.Pad_Normal && this.blockSource.getBlockId(this.x-2,this.y,this.z-1)==BlockID.Pad_Normal && this.blockSource.getBlockId(this.x,this.y,this.z-2)==BlockID.Pad_Normal && this.blockSource.getBlockId(this.x-1,this.y,this.z-2)==BlockID.Pad_Normal && this.blockSource.getBlockId(this.x-2,this.y,this.z-2)==BlockID.Pad_Normal && this.blockSource.getBlockId(this.x-2,this.y,this.z-1)==BlockID.Pad_Normal){ 
        this.blockSource.setBlock(this.x-1, this.y, this.z-1, BlockID.Padding1lvl);}
        
	},
	});

var model = BlockRenderer.createModel();
var render = new ICRender.Model();
model.addBox(0, 0, 0, 1, 3/16,1 ,"landing_pad", 0);

var Padding1lvl = new ICRender.CollisionShape();
var entry = Padding1lvl.addEntry();
entry.addBox( 0, 0, 0, 1,3/16, 1) 
BlockRenderer.setCustomCollisionShape(BlockID.Pad_Normal, -1,Padding1lvl)

render.addEntry(model);

BlockRenderer.setStaticICRender(BlockID.Pad_Normal, -1, render);



IDRegistry.genBlockID("Padding1lvl"); 
Block.createBlock("Padding1lvl", [ 
 {name: "Padding of Rocket", texture: [["Padding", 0],["Padding", 1],["Padding", 2],["Padding", 3],["Padding", 4],["Padding", 5]], inCreative: false} ]);
	


var model1 = BlockRenderer.createModel();
var render1 = new ICRender.Model();


var Padding1lvll = new ICRender.CollisionShape();
var entry = Padding1lvll.addEntry();
entry.addBox( 0, 0, 0, 1,5/16, 1) 
BlockRenderer.setCustomCollisionShape(BlockID.Padding1lvl, -1,Padding1lvll)

﻿/*IDRegistry.genItemID("padding"); 
Item.createItem("padding", "Padding 1 tier", {name: "padding", meta: 0}, {stack: 1, inCreative:false});
IAHelper.makeAdvancedAnim(ItemID.padding, "padding", 1, [1, 1, 1,1 , 1, 2, 2, 2, 2, 2 , 2, 3 ,3 ,3 ,3 ,3 ,3 ,3]);
Translation.addTranslation("Padding 1 tier", {
ru: "Площадка 1го уровня"
});*/

render1.addEntry(model1);
model1.addBox(0, 0, 0, 1, 5/16,1 ,"landing_pad", 0);
BlockRenderer.setStaticICRender(BlockID.Padding1lvl, -1, render1);
