const WIRE = Block.createSpecialType({
    destroytime: 0.1,
    explosionres: 0.5,
    sound: "cloth",

});

var RenderAPI = {
    wire: {},
    addGroupWire(id){
      let group = ICRender.getGroup("sj-wire");
      group.add(id, -1);
      let model = new ICRender.Model();
        
      BlockRenderer.setStaticICRender(id, -1, model); 
    },
    setWire(id, width){
      let group = ICRender.getGroup("sj-wire");
      group.add(id, -1);
      let boxes = [
      	{side: [0, 1, 0], box: [0.5 - width / 2, 0.5 + width / 2, 0.5 - width / 2, 0.5 + 
        width / 2, 1, 0.5 + width / 2]}, 
        {side: [0, -1, 0], box: [0.5 - width / 2, 0, 0.5 - width / 2, 0.5 + width / 2,
         0.5 - width / 2, 0.5 + width / 2]}, 
    		{side: [0, 0, 1], box: [0.5 - width / 2, 0.5 - width / 2, 0.5 + width / 2, 
            0.5 + width / 2, 0.5 + width / 2, 1]}, 
        {side: [0, 0, -1], box: [0.5 - width / 2, 0.5 - width / 2, 0, 0.5 + width / 2,
         0.5 + width / 2, 0.5 - width / 2]},
        {side: [1, 0, 0], box: [0.5 + width / 2, 0.5 - width / 2, 0.5 - width / 2, 1,
         0.5 + width / 2, 0.5 + width / 2]},
        {side: [-1, 0, 0], box: [0, 0.5 - width / 2, 0.5 - width / 2, 0.5 - width /
         2, 0.5 + width / 2, 0.5 + width / 2]}
      ];
      let model = new ICRender.Model();
      model.addEntry(new BlockRenderer.Model(0.5 - width / 2, 0.5 - width / 2, 0.5 - width / 2, 0.5 + width 
      / 2, 0.5 + width / 2, 0.5 + width / 2, id, 0)); 
      this.wire[id] = {};
      this.wire[id].boxes = boxes;
      this.wire[id].width = width;
      for(let i in boxes){ 
        let box = boxes[i].box; 
        let side = boxes[i].side; 
        model.addEntry(new BlockRenderer.Model(box[0], box[1], box[2], box[3], box[4], box[5],
             id, 0)).setCondition(ICRender.BLOCK(side[0], side[1], side[2], group, false)); 
      }
      this.wire[id].model = model;
      BlockRenderer.setStaticICRender(id, -1, model); 
      BlockRenderer.enableCoordMapping(id, -1, model);
    },setWireLittle(id, width){
      let group = ICRender.getGroup("sj-wire");
      group.add(id, -1);
      let boxes = [
      	{side: [0, 1, 0], box: [0.5 - width / 3, 0.5 + width / 3, 0.5 -
         width / 3, 0.5 + width / 3, 1, 0.5 + width / 3]}, 
        {side: [0, -1, 0], box: [0.5 - width / 3, 0, 0.5 - width / 3, 0.5
         + width / 3, 0.5 - width / 3, 0.5 + width / 3]}, 
    		{side: [0, 0, 1], box: [0.5 - width / 3, 0.5 - width / 3, 0.5 +
             width / 3, 0.5 + width / 3, 0.5 + width / 3, 1]}, 
        {side: [0, 0, -1], box: [0.5 - width / 3, 0.5 - width / 3, 0, 0.5 + 
        width / 3, 0.5 + width / 3, 0.5 - width / 3]},
        {side: [1, 0, 0], box: [0.5 + width / 3, 0.5 - width / 3/**/, 0.5 -
         width / 3, 1, 0.5 + width / 3, 0.5 + width / 3]},
        {side: [-1, 0, 0], box: [0, 0.5 - width / 3, 0.5 - width / 3, 0.5
         - width / 3, 0.5 + width / 3, 0.5 + width / 3]}
      ];
      let model = new ICRender.Model();
      model.addEntry(new BlockRenderer.Model(0.5 - width / 3, 0.5 - width / 3, 0.5 - width /
       3, 0.5 + width / 3, 0.5 + width / 3, 0.5 + width / 3, id, 0)); 
      this.wire[id] = {};
      this.wire[id].boxes = boxes;
      this.wire[id].width = width;
      for(let i in boxes){ 
        let box = boxes[i].box; 
        let side = boxes[i].side; 
        model.addEntry(new BlockRenderer.Model(box[0], box[1], box[2], box[3], box[4],
             box[5], id, 0)).setCondition(ICRender.BLOCK(side[0], side[1], side[2], group, false)); 
      }
      this.wire[id].model = model;
      BlockRenderer.setStaticICRender(id, -1, model); 
      BlockRenderer.enableCoordMapping(id, -1, model);
    },setAirwire(id, width){
      let group = ICRender.getGroup("sc-wire");
      group.add(id, -1);
      let boxes = [
      	{side: [0, 1, 0], box: [0.5 - width / 2, 0.5 + width / 2, 0.5 - width / 2, 0.5 
        + width / 2, 1, 0.5 + width / 2]}, 
        {side: [0, -1, 0], box: [0.5 - width / 2, 0, 0.5 - width / 2, 0.5 + width / 2, 
        0.5 - width / 2, 0.5 + width / 2]}, 
    		{side: [0, 0, 1], box: [0.5 - width / 2, 0.5 - width / 2, 0.5 + width / 2, 
            0.5 + width / 2, 0.5 + width / 2, 1]}, 
        {side: [0, 0, -1], box: [0.5 - width / 2, 0.5 - width / 2, 0, 0.5 + width / 2,
         0.5 + width / 2, 0.5 - width / 2]},
        {side: [1, 0, 0], box: [0.5 + width / 2, 0.5 - width / 2, 0.5 - width / 2, 1,
         0.5 + width / 2, 0.5 + width / 2]},
        {side: [-1, 0, 0], box: [0, 0.5 - width / 2, 0.5 - width / 2, 0.5 - width / 
        2, 0.5 + width / 2, 0.5 + width / 2]}
      ];
      let model = new ICRender.Model();
      model.addEntry(new BlockRenderer.Model(0.5 - width / 2, 0.5 - width / 2, 0.5 - width / 2, 0.5 + width / 2,
       0.5 + width / 2, 0.5 + width / 2, id, 0)); 
      this.wire[id] = {};
      this.wire[id].boxes = boxes;
      this.wire[id].width = width;
      for(let i in boxes){ 
        let box = boxes[i].box; 
        let side = boxes[i].side; 
        model.addEntry(
            new BlockRenderer.Model(box[0], box[1], box[2], box[3], box[4], box[5], 
                id, 0)).setCondition(ICRender.BLOCK(side[0], side[1], side[2], group, false)); 
      }
      this.wire[id].model = model;
      BlockRenderer.setStaticICRender(id, -1, model); 
      BlockRenderer.enableCoordMapping(id, -1, model);
    },
    getModel(id){
    	if(!this.wire[id])
    		return;
    	let model = new ICRender.Model();
    	model.addEntry(
            new BlockRenderer.Model(0.5 - this.wire[id].width / 2, 0.5 - 
            this.wire[id].width / 2, 0.5 - this.wire[id].width / 2, 0.5
             + this.wire[id].width / 2, 0.5 + this.wire[id].width /
              2, 0.5 + this.wire[id].width / 2, id, 0)); 
    	for(let i in this.wire[id].boxes){ 
        let box = this.wire[id].boxes[i].box; 
        let side = this.wire[id].boxes[i].side; 
        model.addEntry(new BlockRenderer.Model(box[0], box[1], box[2], box[3], box[4],
             box[5], id, 0)).setCondition( ICRender.BLOCK(side[0], side[1], side[2], ICRender.getGroup("sc-wire"), false)); 
      }
      return model;
    }
};
Callback.addCallback("DestroyBlock", function(pos, block, player){
    if(RenderAPI.wire[block.id] || MachineAPI.all[block.id]) BlockRenderer.unmapAtCoords(pos.x, pos.y, pos.z, true);

})







/*var BlockWire = ["AluminumWire","ImprovedAluminumWire","CopperWire","ImprovedCopperWire","aluminum_wire_bare","copper_wire_bare"];
var ItemsWire = ["aluminum_wire_item","aluminum_wire_heavy_item","copper_wire_item","improved_copper_wire_item","aluminum_wire_bare_item","copper_wire_bare_item"];
var nameWire = ["Aluminum Wire","Improved aluminum wire","Copper wire","Improved copper wire","Aluminum wire bare","Copper wire bare"];*/

IDRegistry.genBlockID("StandartAluminumWire");
Block.createBlock("StandartAluminumWire", [ {name: "standartAluminumWire", texture:
 [["aluminum_wire", 0]], inCreative: true}], WIRE);

gj.registerWire(BlockID.AluminumWire, 200);

TileRenderer.setupWireModel(BlockID.StandartAluminumWire,-1, 4 / 32, "sj-wire");








IDRegistry.genBlockID("ImprovedAluminumWireLightBlue");
Block.createBlock("ImprovedAluminumWireLightBlue", [ {name: "Improved Aluminum Wire", texture: [["LightBlueWire", 0]], inCreative: true}],WIRE);
TileRenderer.setupWireModel(BlockID.ImprovedAluminumWireLightBlue,0, 2/8,"sj-wire");
gj.registerWire(BlockID.ImprovedAluminumWireLightBlue, 400);
Translation.addTranslation("Improved Aluminum Wire", {
ru: "Улучшенный алюминиевый провод"
})
Item.registerNameOverrideFunction(BlockID.ImprovedAluminumWireLightBlue, function(item, name){
    return Native.Color.WHITE + name + "\n§1" + "Свойства:\n1.Передаёт 400 единиц энергии Space Joule\n2.Крашенный";
});









IDRegistry.genBlockID("ImprovedAluminumWire");
Block.createBlock("ImprovedAluminumWire", [ {name: "Improved Aluminum Wire", texture: [["aluminum_wire", 0]], inCreative: true}],WIRE);
TileRenderer.setupWireModel(BlockID.ImprovedAluminumWire,0, 2/8,"sj-wire");
gj.registerWire(BlockID.ImprovedAluminumWire, 400);
Translation.addTranslation("Improved Aluminum Wire", {
ru: "Улучшенный алюминиевый провод"
})
Item.registerNameOverrideFunction(BlockID.ImprovedAluminumWire, function(item, name){
    return Native.Color.WHITE + name + "\n§1" + "Свойства:\n1.Передаёт 400 единиц энергии Space Joule\n2.Можно покрасить";
});


















IDRegistry.genBlockID("ImprovedAluminumWireDarkLime");
Block.createBlock("ImprovedAluminumWireDarkLime", [ {name: "Improved Aluminum Wire", texture: [["DarkLime", 0]], inCreative: true}],WIRE);
TileRenderer.setupWireModel(BlockID.ImprovedAluminumWireDarkLime,0, 2/8,"sj-wire");
gj.registerWire(BlockID.ImprovedAluminumWireDarkLime, 400);
Translation.addTranslation("Improved Aluminum Wire", {
ru: "Улучшенный алюминиевый провод"
})
Item.registerNameOverrideFunction(BlockID.ImprovedAluminumWireDarkLime, function(item, name){
    return Native.Color.WHITE + name + "\n§1" + "Свойства:\n1.Передаёт 400 единиц энергии Space Joule\n2.Крашенный";
});








IDRegistry.genBlockID("ImprovedAluminumWireMagenta");
Block.createBlock("ImprovedAluminumWireMagenta", [ {name: "Improved Aluminum Wire", texture: [["Magenta", 0]], inCreative: true}],WIRE);
TileRenderer.setupWireModel(BlockID.ImprovedAluminumWireMagenta,0, 2/8,"sj-wire");
gj.registerWire(BlockID.ImprovedAluminumWireMagenta, 400);
Translation.addTranslation("Improved Aluminum Wire", {
ru: "Улучшенный алюминиевый провод"
})
Item.registerNameOverrideFunction(BlockID.ImprovedAluminumWireMagenta, function(item, name){
    return Native.Color.WHITE + name + "\n§1" + "Свойства:\n1.Передаёт 400 единиц энергии Space Joule\n2.Крашенный";
});







IDRegistry.genBlockID("ImprovedAluminumWireOrange");
Block.createBlock("ImprovedAluminumWireOrange", [ {name: "Improved Aluminum Wire", texture: [["OrangeCopper", 0]], inCreative: true}],WIRE);
TileRenderer.setupWireModel(BlockID.ImprovedAluminumWireOrange,0, 2/8,"sj-wire");
gj.registerWire(BlockID.ImprovedAluminumWireOrange, 400);
Translation.addTranslation("Improved Aluminum Wire", {
ru: "Улучшенный алюминиевый провод"
})
Item.registerNameOverrideFunction(BlockID.ImprovedAluminumWireOrange, function(item, name){
    return Native.Color.WHITE + name + "\n§1" + "Свойства:\n1.Передаёт 400 единиц энергии Space Joule\n2.Крашенный";
});







IDRegistry.genBlockID("ImprovedAluminumWireGray");
Block.createBlock("ImprovedAluminumWireGray", [ {name: "Improved Aluminum Wire", texture: [["DemerrorColor", 0]], inCreative: true}],WIRE);
TileRenderer.setupWireModel(BlockID.ImprovedAluminumWireGray,0, 2/8,"sj-wire");
gj.registerWire(BlockID.ImprovedAluminumWireGray, 400);
Translation.addTranslation("Improved Aluminum Wire", {
ru: "Улучшенный алюминиевый провод"
})
Item.registerNameOverrideFunction(BlockID.ImprovedAluminumWireGray, function(item, name){
    return Native.Color.WHITE + name + "\n§1" + "Свойства:\n1.Передаёт 400 единиц энергии Space Joule\n2.Крашенный";
});






IDRegistry.genBlockID("ImprovedAluminumWireDarkGrey");
Block.createBlock("ImprovedAluminumWireDarkGrey", [ {name: "Improved Aluminum Wire", texture: [["ArtemOnColor", 0]], inCreative: true}],WIRE);
TileRenderer.setupWireModel(BlockID.ImprovedAluminumWireDarkGrey, 0,2/8,"sj-wire");
gj.registerWire(BlockID.ImprovedAluminumWireDarkGrey, 400);
Translation.addTranslation("Improved Aluminum Wire", {
ru: "Улучшенный алюминиевый провод"
})
Item.registerNameOverrideFunction(BlockID.ImprovedAluminumWireDarkGrey, function(item, name){
    return Native.Color.WHITE + name + "\n§1" + "Свойства:\n1.Передаёт 400 единиц энергии Space Joule\n2.Крашенный";
});







IDRegistry.genBlockID("ImprovedAluminumWireRed");
Block.createBlock("ImprovedAluminumWireRed", [ {name: "Improved Aluminum Wire", texture: [["Red", 0]], inCreative: true}],WIRE);
TileRenderer.setupWireModel(BlockID.ImprovedAluminumWireRed,0, 2/8,"sj-wire");
gj.registerWire(BlockID.ImprovedAluminumWireRed, 400);
Translation.addTranslation("Improved Aluminum Wire", {
ru: "Улучшенный алюминиевый провод"
})
Item.registerNameOverrideFunction(BlockID.ImprovedAluminumWireRed, function(item, name){
    return Native.Color.WHITE + name + "\n§1" + "Свойства:\n1.Передаёт 400 единиц энергии Space Joule\n2.Крашенный";
});






IDRegistry.genBlockID("ImprovedAluminumWirePink");
Block.createBlock("ImprovedAluminumWirePink", [ {name: "Improved Aluminum Wire", texture: [["Pink", 0]], inCreative: true}],WIRE);
TileRenderer.setupWireModel(BlockID.ImprovedAluminumWirePink,0, 2/8,"sj-wire");
gj.registerWire(BlockID.ImprovedAluminumWirePink, 400);
Translation.addTranslation("Improved Aluminum Wire", {
ru: "Улучшенный алюминиевый провод"
})
Item.registerNameOverrideFunction(BlockID.ImprovedAluminumWirePink, function(item, name){
    return Native.Color.WHITE + name + "\n§1" + "Свойства:\n1.Передаёт 400 единиц энергии Space Joule\n2.Крашенный";
});








IDRegistry.genBlockID("ImprovedAluminumWireBlue");
Block.createBlock("ImprovedAluminumWireBlue", [ {name: "Improved Aluminum Wire", texture: [["Blue", 0]], inCreative: true}],WIRE);
TileRenderer.setupWireModel(BlockID.ImprovedAluminumWireBlue,0, 2/8,"sj-wire");
gj.registerWire(BlockID.ImprovedAluminumWireBlue, 400);
Translation.addTranslation("Improved Aluminum Wire", {
ru: "Улучшенный алюминиевый провод"
})
Item.registerNameOverrideFunction(BlockID.ImprovedAluminumWireBlue, function(item, name){
    return Native.Color.WHITE + name + "\n§1" + "Свойства:\n1.Передаёт 400 единиц энергии Space Joule\n2.Крашенный";
});






IDRegistry.genBlockID("ImprovedAluminumWireOrange");
Block.createBlock("ImprovedAluminumWireOrange", [ {name: "Improved Aluminum Wire", texture: [["OrangeS", 0]], inCreative: true}],WIRE);
TileRenderer.setupWireModel(BlockID.ImprovedAluminumWireOrange,0, 2/8,"sj-wire");
gj.registerWire(BlockID.ImprovedAluminumWireOrange, 400);
Translation.addTranslation("Improved Aluminum Wire", {
ru: "Улучшенный алюминиевый провод"
})
Item.registerNameOverrideFunction(BlockID.ImprovedAluminumWireOrange, function(item, name){
    return Native.Color.WHITE + name + "\n§1" + "Свойства:\n1.Передаёт 400 единиц энергии Space Joule\n2.Крашенный";
});







IDRegistry.genBlockID("ImprovedAluminumWireYellow");
Block.createBlock("ImprovedAluminumWireYellow", [ {name: "Improved Aluminum Wire", texture: [["Yellow", 0]], inCreative: true}],WIRE);
TileRenderer.setupWireModel(BlockID.ImprovedAluminumWireYellow,0, 2/8,"sj-wire");
gj.registerWire(BlockID.ImprovedAluminumWireYellow, 400);
Translation.addTranslation("Improved Aluminum Wire", {
ru: "Улучшенный алюминиевый провод"
})
Item.registerNameOverrideFunction(BlockID.ImprovedAluminumWireYellow, function(item, name){
    return Native.Color.WHITE + name + "\n§1" + "Свойства:\n1.Передаёт 400 единиц энергии Space Joule\n2.Крашенный";
});





IDRegistry.genBlockID("ImprovedAluminumWireBlack");
Block.createBlock("ImprovedAluminumWireBlack", [ {name: "Improved Aluminum Wire", texture: [["Black", 0]], inCreative: true}],WIRE);
TileRenderer.setupWireModel(BlockID.ImprovedAluminumWireBlack, 0,2/8,"sj-wire");
gj.registerWire(BlockID.ImprovedAluminumWireBlack, 400);
Translation.addTranslation("Improved Aluminum Wire", {
ru: "Улучшенный алюминиевый провод"
})
Item.registerNameOverrideFunction(BlockID.ImprovedAluminumWireBlack, function(item, name){
    return Native.Color.WHITE + name + "\n§1" + "Свойства:\n1.Передаёт 400 единиц энергии Space Joule\n2.Крашенный";
});






IDRegistry.genBlockID("ImprovedAluminumWireWhite");
Block.createBlock("ImprovedAluminumWireWhite", [ {name: "Improved Aluminum Wire", texture: [["Demerror&ArtemOn", 0]], inCreative: true}],WIRE);
TileRenderer.setupWireModel(BlockID.ImprovedAluminumWireWhite,0, 2/8,"sj-wire");
gj.registerWire(BlockID.ImprovedAluminumWireWhite, 400);
Translation.addTranslation("Improved Aluminum Wire", {
ru: "Улучшенный алюминиевый провод"
})
Item.registerNameOverrideFunction(BlockID.ImprovedAluminumWireWhite, function(item, name){
    return Native.Color.WHITE + name + "\n§1" + "Свойства:\n1.Передаёт 400 единиц энергии Space Joule\n2.Крашенный";
});





IDRegistry.genBlockID("ImprovedAluminumWireDarkBlue");
Block.createBlock("ImprovedAluminumWireDarkBlue", [ {name: "Improved Aluminum Wire", texture: [["DarkBlue", 0]], inCreative: true}],WIRE);
TileRenderer.setupWireModel(BlockID.ImprovedAluminumWireDarkBlue,0, 2/8,"sj-wire");
gj.registerWire(BlockID.ImprovedAluminumWireDarkBlue, 400);
Translation.addTranslation("Improved Aluminum Wire", {
ru: "Улучшенный алюминиевый провод"
})
Item.registerNameOverrideFunction(BlockID.ImprovedAluminumWireDarkBlue, function(item, name){
    return Native.Color.WHITE + name + "\n§1" + "Свойства:\n1.Передаёт 400 единиц энергии Space Joule\n2.Крашенный";
});




IDRegistry.genBlockID("ImprovedAluminumWireGreen");
Block.createBlock("ImprovedAluminumWireGreen", [ {name: "Improved Aluminum Wire", texture: [["Green", 0]], inCreative: true}],WIRE);
TileRenderer.setupWireModel(BlockID.ImprovedAluminumWireGreen, 0,2/8,"sj-wire");
gj.registerWire(BlockID.ImprovedAluminumWireGreen, 400);
Translation.addTranslation("Improved Aluminum Wire", {
ru: "Улучшенный алюминиевый провод"
})
Item.registerNameOverrideFunction(BlockID.ImprovedAluminumWireGreen, function(item, name){
    return Native.Color.WHITE + name + "\n§1" + "Свойства:\n1.Передаёт 400 единиц энергии Space Joule\n2.Крашенный";
});





IDRegistry.genBlockID("ImprovedAluminumWireDarkGreen");
Block.createBlock("ImprovedAluminumWireDarkGreen", [ {name: "Improved Aluminum Wire", texture: [["DarkGreen", 0]], inCreative: true}],WIRE);
TileRenderer.setupWireModel(BlockID.ImprovedAluminumWireDarkGreen,0, 2/8,"sj-wire");
gj.registerWire(BlockID.ImprovedAluminumWireDarkGreen, 400);
Translation.addTranslation("Improved Aluminum Wire", {
ru: "Улучшенный алюминиевый провод"
})
Item.registerNameOverrideFunction(BlockID.ImprovedAluminumWireDarkGreen, function(item, name){
    return Native.Color.WHITE + name + "\n§1" + "Свойства:\n1.Передаёт 400 единиц энергии Space Joule\n2.Крашенный";
});

IDRegistry.genBlockID("AluminumWire");
Block.createBlock("AluminumWire", [ {name: "Aluminum Wire", texture: [["wire_aluminum", 0]], inCreative: true}],WIRE);
TileRenderer.setupWireModel(BlockID.AluminumWire,0, 2/8,"sj-wire");
gj.registerWire(BlockID.AluminumWire, 200);
Translation.addTranslation("Aluminum Wire", {
ru: "Алюминиевый провод"
})
Item.registerNameOverrideFunction(BlockID.AluminumWire, function(item, name){
    return Native.Color.WHITE + name + "\n§1" + "Свойства:\n1.Передаёт 200 единиц энергии Space Joule\n2.Можно покрасить";
});






IDRegistry.genBlockID("AluminumWireBlue");
Block.createBlock("AluminumWireBlue", [ {name: "Aluminum Wire", texture: [["BlueW", 0]], inCreative: false}],WIRE);
TileRenderer.setupWireModel(BlockID.AluminumWireBlue,0, 2/8,"sj-wire");
gj.registerWire(BlockID.AluminumWireBlue, 200);
Translation.addTranslation("Aluminum Wire", {
ru: "Алюминиевый провод"
})
Item.registerNameOverrideFunction(BlockID.AluminumWireBlue, function(item, name){
    return Native.Color.WHITE + name + "\n§1" + "Свойства:\n1.Передаёт 200 единиц энергии Space Joule\n2.Крашенный";
});





IDRegistry.genBlockID("AluminumWireWhite");
Block.createBlock("AluminumWireWhite", [ {name: "Aluminum Wire", texture: [["WhiteW", 0]], inCreative: true}],WIRE);
TileRenderer.setupWireModel(BlockID.AluminumWireWhite,0, 2/8,"sj-wire");
gj.registerWire(BlockID.AluminumWireWhite, 200);
Translation.addTranslation("Aluminum Wire", {
ru: "Алюминиевый провод"
})
Item.registerNameOverrideFunction(BlockID.AluminumWireWhite, function(item, name){
    return Native.Color.WHITE + name + "\n§1" + "Свойства:\n1.Передаёт 200 единиц энергии Space Joule\n2.Крашенный";
});




IDRegistry.genBlockID("AluminumWireBlack");
Block.createBlock("AluminumWireBlack", [ {name: "Aluminum Wire", texture: [["BlackW", 0]], inCreative: true}],WIRE);
TileRenderer.setupWireModel(BlockID.AluminumWireBlack,0, 2/8,"sj-wire");
gj.registerWire(BlockID.AluminumWireBlack, 200);
Translation.addTranslation("Aluminum Wire", {
ru: "Алюминиевый провод"
})
Item.registerNameOverrideFunction(BlockID.AluminumWireBlack, function(item, name){
    return Native.Color.WHITE + name + "\n§1" + "Свойства:\n1.Передаёт 200 единиц энергии Space Joule\n2.Крашенный";
});






IDRegistry.genBlockID("ImprovedCopperWire");
Block.createBlock("ImprovedCopperWire", [ {name: "Improved Copper Wire", texture: [["wire_copper", 0]], inCreative: true}],WIRE);
TileRenderer.setupWireModel(BlockID.ImprovedCopperWire,0, 2/8,"sj-wire");
gj.registerWire(BlockID.ImprovedCopperWire, 300);
Translation.addTranslation("Improved Copper Wire", {
ru: "Улучшенный медный провод"
})
Item.registerNameOverrideFunction(BlockID.ImprovedCopperWire, function(item, name){
    return Native.Color.WHITE + name + "\n§1" + "Свойства:\n1.Улучшенный провод\n2.Передаёт 300 единиц энергии Space Joule";
});







IDRegistry.genBlockID("CopperWire");
Block.createBlock("CopperWire", [ {name: "Copper Wire", texture: [["copper_wire", 0]], inCreative: true}],WIRE);
TileRenderer.setupWireModel(BlockID.CopperWire,0, 2/8,"sj-wire");
gj.registerWire(BlockID.CopperWire, 100);
Translation.addTranslation("Copper Wire", {
ru: "Медный провод"
})
Item.registerNameOverrideFunction(BlockID.CopperWire, function(item, name){
    return Native.Color.WHITE + name + "\n§1" + "Свойства:\n1.Передаёт 100 единиц энергии Space Joule";
});








IDRegistry.genBlockID("PipeOxygenWhite");
Block.createBlock("PipeOxygenWhite", [ {name: "Pipe Oxygen White", texture: [["Pipe Oxygen White", 0]], inCreative: true}]);
RenderAPI.setAirwire(BlockID.PipeOxygenWhite, 2/8);
ob.registerWire(BlockID.PipeOxygenWhite, 200);
Translation.addTranslation("Pipe Oxygen White", {
ru: "Кислородная труба"
})
Item.registerNameOverrideFunction(BlockID.PipeOxygenWhite, function(item, name){
    return Native.Color.WHITE + name + "\n§1" + "Свойства:\n1.Можно покрасить\n2.Может передовать 200 единиц кислорода";
});







IDRegistry.genBlockID("PipeOxygenGray");
Block.createBlock("PipeOxygenGray", [ {name: "Pipe Oxygen Gray", texture: [["Pipe Oxygen Gray", 0]], inCreative: true}]);
RenderAPI.setAirwire(BlockID.PipeOxygenGray, 2/8);
ob.registerWire(BlockID.PipeOxygenGray, 200);
Translation.addTranslation("Pipe Oxygen Gray", {
ru: "Серая кислородная труба"
})
Item.registerNameOverrideFunction(BlockID.PipeOxygenGray, function(item, name){
    return Native.Color.WHITE + name + "\n§1" + "Свойства:\n1.Крашенная\n2.Может передовать 200 единиц кислорода";
});




IDRegistry.genBlockID("PipeOxygenLime");
Block.createBlock("PipeOxygenLime", [ {name: "Pipe Oxygen Lime", texture: [["Pipe Oxygen Lime", 0]], inCreative: true}]);
RenderAPI.setAirwire(BlockID.PipeOxygenLime, 2/8);
ob.registerWire(BlockID.PipeOxygenLime, 200);
Translation.addTranslation("Pipe Oxygen Lime", {
ru: "Лаймовая кислородная труба"
})
Item.registerNameOverrideFunction(BlockID.PipeOxygenLime, function(item, name){
    return Native.Color.WHITE + name + "\n§1" + "Свойства:\n1.Крашенная\n2.Может передовать 200 единиц кислорода";
});




IDRegistry.genBlockID("PipeOxygenOrange");
Block.createBlock("PipeOxygenOrange", [ {name: "Pipe Oxygen Orange", texture: [["Pipe Oxygen Orange", 0]], inCreative: true}]);
RenderAPI.setAirwire(BlockID.PipeOxygenOrange, 2/8);
ob.registerWire(BlockID.PipeOxygenOrange, 200);
Translation.addTranslation("Pipe Oxygen Orange", {
ru: "Оранжевая кислородная труба"
})
Item.registerNameOverrideFunction(BlockID.PipeOxygenOrange, function(item, name){
    return Native.Color.WHITE + name + "\n§1" + "Свойства:\n1.Крашенная\n2.Может передовать 200 единиц кислорода";
});




IDRegistry.genBlockID("PipeOxygenSilver");
Block.createBlock("PipeOxygenSilver", [ {name: "Pipe Oxygen Silver", texture: [["Pipe Oxygen Silver", 0]], inCreative: true}]);
RenderAPI.setAirwire(BlockID.PipeOxygenSilver, 2/8);
ob.registerWire(BlockID.PipeOxygenWhite, 200);
Translation.addTranslation("Pipe Oxygen Silver", {
ru: "Серебрянная кислородная труба"
})
Item.registerNameOverrideFunction(BlockID.PipeOxygenSilver, function(item, name){
    return Native.Color.WHITE + name + "\n§1" + "Свойства:\n1.Крашенная\n2.Может передовать 200 единиц кислорода";
});




IDRegistry.genBlockID("PipeOxygenRed");
Block.createBlock("PipeOxygenRed", [ {name: "Pipe Oxygen Red", texture: [["Pipe Oxygen Red", 0]], inCreative: true}]);
RenderAPI.setAirwire(BlockID.PipeOxygenRed, 2/8);
ob.registerWire(BlockID.PipeOxygenRed, 200);
Translation.addTranslation("Pipe Oxygen Red", {
ru: "Красная кислородная труба"
})
Item.registerNameOverrideFunction(BlockID.PipeOxygenRed, function(item, name){
    return Native.Color.WHITE + name + "\n§1" + "Свойства:\n1.Крашенная\n2.Может передовать 200 единиц кислорода";
});





IDRegistry.genBlockID("PipeOxygenBrown");
Block.createBlock("PipeOxygenBrown", [ {name: "Pipe Oxygen Brown", texture: [["Pipe Oxygen Brown", 0]], inCreative: true}]);
RenderAPI.setAirwire(BlockID.PipeOxygenBrown, 2/8);
ob.registerWire(BlockID.PipeOxygenBrown, 200);
Translation.addTranslation("Pipe Oxygen Brown", {
ru: "Коричневая кислородная труба"
})
Item.registerNameOverrideFunction(BlockID.PipeOxygenBrown, function(item, name){
    return Native.Color.WHITE + name + "\n§1" + "Свойства:\n1.Крашенная\n2.Может передовать 200 единиц кислорода";
});




IDRegistry.genBlockID("PipeOxygenBlue");
Block.createBlock("PipeOxygenBlue", [ {name: "Pipe Oxygen Blue", texture: [["Pipe Oxygen Blue", 0]], inCreative: true}]);
RenderAPI.setAirwire(BlockID.PipeOxygenBlue, 2/8);
ob.registerWire(BlockID.PipeOxygenBlue, 200);
Translation.addTranslation("Pipe Oxygen Blue", {
ru: "Синяя кислородная труба"
})
Item.registerNameOverrideFunction(BlockID.PipeOxygenBlue, function(item, name){
    return Native.Color.WHITE + name + "\n§1" + "Свойства:\n1.Крашенная\n2.Может передовать 200 единиц кислорода";
});




IDRegistry.genBlockID("PipeOxygenBlack");
Block.createBlock("PipeOxygenBlack", [ {name: "Pipe Oxygen Black", texture: [["Pipe Oxygen Black", 0]], inCreative: true}]);
RenderAPI.setAirwire(BlockID.PipeOxygenBlack, 2/8);
ob.registerWire(BlockID.PipeOxygenBlack, 200);
Translation.addTranslation("Pipe Oxygen Black", {
ru: "Чёрная кислородная труба"
})
Item.registerNameOverrideFunction(BlockID.PipeOxygenBlack, function(item, name){
    return Native.Color.WHITE + name + "\n§1" + "Свойства:\n1.Крашенная\n2.Может передовать 200 единиц кислорода";
});




IDRegistry.genBlockID("PipeOxygenPink");
Block.createBlock("PipeOxygenPink", [ {name: "Pipe Oxygen Pink", texture: [["Pipe Oxygen Pink", 0]], inCreative: true}]);
RenderAPI.setAirwire(BlockID.PipeOxygenPink, 2/8);
ob.registerWire(BlockID.PipeOxygenPink, 200);
Translation.addTranslation("Pipe Oxygen Pink", {
ru: "Розовая кислородная труба"
})
Item.registerNameOverrideFunction(BlockID.PipeOxygenPink, function(item, name){
    return Native.Color.WHITE + name + "\n§1" + "Свойства:\n1.Крашенная\n2.Может передовать 200 единиц кислорода";
});



IDRegistry.genBlockID("PipeOxygenYellow");
Block.createBlock("PipeOxygenYellow", [ {name: "Pipe Oxygen Yellow", texture: [["Pipe Oxygen Yellow", 0]], 
inCreative: true}]);
RenderAPI.setAirwire(BlockID.PipeOxygenYellow, 2/8);
ob.registerWire(BlockID.PipeOxygenYellow, 200);
Translation.addTranslation("Pipe Oxygen Yellow", {
ru: "Жёлтая кислородная труба"
})
Item.registerNameOverrideFunction(BlockID.PipeOxygenYellow, function(item, name){
    return Native.Color.WHITE + name + "\n§1" + "Свойства:\n1.Крашенная\n2.Может передовать 200 единиц кислорода";
});




IDRegistry.genBlockID("PipeOxygenGreen");
Block.createBlock("PipeOxygenGreen", [ {name: "Pipe Oxygen Green", texture: [["Pipe Oxygen Green", 0]], inCreative: true}]);
RenderAPI.setAirwire(BlockID.PipeOxygenGreen, 2/8);
ob.registerWire(BlockID.PipeOxygenGreen, 200);
Translation.addTranslation("Pipe Oxygen Green", {
ru: "Зелёная кислородная труба"
})
Item.registerNameOverrideFunction(BlockID.PipeOxygenGreen, function(item, name){
    return Native.Color.WHITE + name + "\n§1" + "Свойства:\n1.Крашенная\n2.Может передовать 200 единиц кислорода";
});




IDRegistry.genBlockID("PipeOxygenLightBlue");
Block.createBlock("PipeOxygenLightBlue", [ {name: "Pipe Oxygen Light Blue", texture: [["Pipe Oxygen LightBlue", 0]], inCreative: true}]);
RenderAPI.setAirwire(BlockID.PipeOxygenLightBlue, 2/8);
ob.registerWire(BlockID.PipeOxygenLightBlue, 200);
Translation.addTranslation("Pipe Oxygen Light Blue", {
ru: "Голубая кислородная труба"
})
Item.registerNameOverrideFunction(BlockID.PipeOxygenLightBlue, function(item, name){
    return Native.Color.WHITE + name + "\n§1" + "Свойства:\n1.Крашенная\n2.Может передовать 200 единиц кислорода";
});




IDRegistry.genBlockID("PipeOxygenCyan");
Block.createBlock("PipeOxygenCyan", [ {name: "Pipe Oxygen Cyan", texture: [["Pipe Oxygen Cyan", 0]], inCreative: true}]);
RenderAPI.setAirwire(BlockID.PipeOxygenCyan, 2/8);
ob.registerWire(BlockID.PipeOxygenCyan, 200);
Translation.addTranslation("Pipe Oxygen Cyan", {
ru: "Бирюзовая кислородная труба"
})
Item.registerNameOverrideFunction(BlockID.PipeOxygenCyan, function(item, name){
    return Native.Color.WHITE + name + "\n§1" + "Свойства:\n1.Крашенная\n2.Может передовать 200 единиц кислорода";
});



IDRegistry.genBlockID("PipeOxygenMagenta");
Block.createBlock("PipeOxygenMagenta", [ {name: "Pipe Oxygen Magenta", texture: [["Pipe Oxygen Magenta", 0]], inCreative: true}]);
RenderAPI.setAirwire(BlockID.PipeOxygenMagenta, 2/8);
ob.registerWire(BlockID.PipeOxygenMagenta, 200);
Translation.addTranslation("Pipe Oxygen Magenta", {
ru: "Пурпурная кислородная труба"
})
Item.registerNameOverrideFunction(BlockID.PipeOxygenMagenta, function(item, name){
    return Native.Color.WHITE + name + "\n§1" + "Свойства:\n1.Крашенная\n2.Может передовать 200 единиц кислорода";
});




IDRegistry.genBlockID("PipeOxygenPurple");
Block.createBlock("PipeOxygenPurple", [ {name: "Pipe Oxygen Purple", texture: [["Pipe Oxygen Purple", 0]], inCreative: true}]);
RenderAPI.setAirwire(BlockID.PipeOxygenPurple, 2/8);
ob.registerWire(BlockID.PipeOxygenPurple, 200);
Translation.addTranslation("Pipe Oxygen Purple", {
ru: "Фиолетовая кислородная труба"
})
Item.registerNameOverrideFunction(BlockID.PipeOxygenPurple, function(item, name){
    return Native.Color.WHITE + name + "\n§1" + "Свойства:\n1.Крашенная\n2.Может передовать 200 единиц кислорода";
});

IDRegistry.genBlockID("hydrogen_pipe");
Block.createBlock("hydrogen_pipe", [ {name: "Pipe Hydrogen", texture: [["pipe_hydrogen", 0]], inCreative: true}]);
RenderAPI.setAirwire(BlockID.hydrogen_pipe, 2/8);
ob.registerWire(BlockID.hydrogen_pipe, 200);
Translation.addTranslation("Pipe Hydrogen", {
ru: "§6Газовая труба"
})