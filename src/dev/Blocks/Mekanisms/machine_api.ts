var cableAPI = {
    renderSet: function (idblock, siz) {
        var group = ICRender.getGroup("sj-wire");
        var id = idblock;
        var width = siz;
        group.add(id, -1);

        var boxes = [{
            side: [1,
                0,
                0],
            box: [0.5 + width / 2,
                0.5 - width / 2,
                0.5 - width / 2,
                1,
                0.5 + width / 2,
                0.5 + width / 2]},
            {
                side: [-1,
                    0,
                    0],
                box: [0,
                    0.5 - width / 2,
                    0.5 - width / 2,
                    0.5 - width / 2,
                    0.5 + width / 2,
                    0.5 + width / 2]},
            {
                side: [0,
                    1,
                    0],
                box: [0.5 - width / 2,
                    0.5 + width / 2,
                    0.5 - width / 2,
                    0.5 + width / 2,
                    1,
                    0.5 + width / 2]},
            {
                side: [0,
                    -1,
                    0],
                box: [0.5 - width / 2,
                    0,
                    0.5 - width / 2,
                    0.5 + width / 2,
                    0.5 - width / 2,
                    0.5 + width / 2]},
            {
                side: [0,
                    0,
                    1],
                box: [0.5 - width / 2,
                    0.5 - width / 2,
                    0.5 + width / 2,
                    0.5 + width / 2,
                    0.5 + width / 2,
                    1]},
            {
                side: [0,
                    0,
                    -1],
                box: [0.5 - width / 2,
                    0.5 - width / 2,
                    0,
                    0.5 + width / 2,
                    0.5 + width / 2,
                    0.5 - width / 2]}];

        var model = new ICRender.Model();

        model.addEntry(new BlockRenderer.Model(0.5 - width / 2, 0.5 - width / 2, 0.5 - width / 2, 0.5 + width / 2, 0.5 + width / 2, 0.5 + width / 2, id, 0));

        for (var i in boxes) {

            var box = boxes[i].box;
            var side = boxes[i].side;

            model.addEntry(new BlockRenderer.Model(box[0], box[1], box[2], box[3], box[4], box[5], id, 0))
            .setCondition(ICRender.BLOCK(side[0], side[1], side[2], group, false));
        }

        BlockRenderer.setStaticICRender(id, -1, model);
    },
    addGroup: function (id) {
        var group = ICRender.getGroup("sj-wire");
         group.add(id, -1);
    },
    // renderStjSet: function (idblock, siz) {
    //     var group = ICRender.getGroup("stj-wire");
    //     var id = idblock;
    //     var width = siz;
    //     group.add(id, -1);

    //     var boxes = [{
    //         side: [1,
    //             0,
    //             0],
    //         box: [0.5 + width / 2,
    //             0.5 - width / 2,
    //             0.5 - width / 2,
    //             1,
    //             0.5 + width / 2,
    //             0.5 + width / 2]},
    //         {
    //             side: [-1,
    //                 0,
    //                 0],
    //             box: [0,
    //                 0.5 - width / 2,
    //                 0.5 - width / 2,
    //                 0.5 - width / 2,
    //                 0.5 + width / 2,
    //                 0.5 + width / 2]},
    //         {
    //             side: [0,
    //                 1,
    //                 0],
    //             box: [0.5 - width / 2,
    //                 0.5 + width / 2,
    //                 0.5 - width / 2,
    //                 0.5 + width / 2,
    //                 1,
    //                 0.5 + width / 2]},
    //         {
    //             side: [0,
    //                 -1,
    //                 0],
    //             box: [0.5 - width / 2,
    //                 0,
    //                 0.5 - width / 2,
    //                 0.5 + width / 2,
    //                 0.5 - width / 2,
    //                 0.5 + width / 2]},
    //         {
    //             side: [0,
    //                 0,
    //                 1],
    //             box: [0.5 - width / 2,
    //                 0.5 - width / 2,
    //                 0.5 + width / 2,
    //                 0.5 + width / 2,
    //                 0.5 + width / 2,
    //                 1]},
    //         {
    //             side: [0,
    //                 0,
    //                 -1],
    //             box: [0.5 - width / 2,
    //                 0.5 - width / 2,
    //                 0,
    //                 0.5 + width / 2,
    //                 0.5 + width / 2,
    //                 0.5 - width / 2]}];

    //     var model = new ICRender.Model();

    //     model.addEntry(new BlockRenderer.Model(0.5 - width / 2, 0.5 - width / 2, 0.5 - width / 2, 0.5 + width / 2, 0.5 + width / 2, 0.5 + width / 2, id, 0));

    //     for (var i in boxes) {

    //         var box = boxes[i].box;
    //         var side = boxes[i].side;

    //         model.addEntry(new BlockRenderer.Model(box[0], box[1], box[2], box[3], box[4], box[5], id, 0))
    //         .setCondition(new ICRender.BLOCK(side[0], side[1], side[2], group, false));
    //     }

    //     BlockRenderer.setStaticICRender(id, -1, model);
    // },
    // addStj: function (id) {
    //     var group = ICRender.getGroup("stj-wire");
    //     group.add(id, -1);
    // },
}

var AirCable = {
    set: function (idblock, siz) {
        var group2 = ICRender.getGroup("sc-wire");
        var id = idblock;
        var width = siz;
        group2.add(id, -1);

        var boxes = [{
            side: [1,
                0,
                0],
            box: [0.5 + width / 2,
                0.5 - width / 2,
                0.5 - width / 2,
                1,
                0.5 + width / 2,
                0.5 + width / 2]},
            {
                side: [-1,
                    0,
                    0],
                box: [0,
                    0.5 - width / 2,
                    0.5 - width / 2,
                    0.5 - width / 2,
                    0.5 + width / 2,
                    0.5 + width / 2]},
            {
                side: [0,
                    1,
                    0],
                box: [0.5 - width / 2,
                    0.5 + width / 2,
                    0.5 - width / 2,
                    0.5 + width / 2,
                    1,
                    0.5 + width / 2]},
            {
                side: [0,
                    -1,
                    0],
                box: [0.5 - width / 2,
                    0,
                    0.5 - width / 2,
                    0.5 + width / 2,
                    0.5 - width / 2,
                    0.5 + width / 2]},
            {
                side: [0,
                    0,
                    1],
                box: [0.5 - width / 2,
                    0.5 - width / 2,
                    0.5 + width / 2,
                    0.5 + width / 2,
                    0.5 + width / 2,
                    1]},
            {
                side: [0,
                    0,
                    -1],
                box: [0.5 - width / 2,
                    0.5 - width / 2,
                    0,
                    0.5 + width / 2,
                    0.5 + width / 2,
                    0.5 - width / 2]}];

        var model = new ICRender.Model();

        model.addEntry(new BlockRenderer.Model(0.5 - width / 2, 0.5 - width / 2, 0.5 - width / 2, 0.5 + width / 2, 0.5 + width / 2, 0.5 + width / 2, id, 0));

        for (var i in boxes) {

            var box = boxes[i].box;
            var side = boxes[i].side;

            model.addEntry(new BlockRenderer.Model(box[0], box[1], box[2], box[3], box[4], box[5], id, 0))
            .setCondition(ICRender.BLOCK(side[0], side[1], side[2], group2, false));
        }

        BlockRenderer.setStaticICRender(id, -1, model);
    },
    addGroup: function (id) {
        var group2 = ICRender.getGroup("sc-wire");
        group2.add(id, -1);
    }
};


var leaves = [];
var burnItems = []
var Colding = [];
var compressorRecipe = [];
var circuit = [];
var rock1 = [];
 var liquids = [];
   
 var Working = {
    createStatus: function (scale: string,text: string){this.container.setText(scale, Translation.translate(text))},
    addBattery: function (block: any,slot: any,data: any){
        this.data.energy -= ChargeItemRegistry.addEnergyToSlot(
            block.getSlot(slot), "sj", data.energy, block.getCapacity());
             battery.addInfinite(block.container,block.data,slot);
}};
var SpacesMachine = {
    addCollectorLeaves: function(leaf) {
      leaf = leaf || {};
      leaf.id = leaf.id || 0;
      leaves.push({
            id: leaf.id
        })
    },
    addCoal: function(id) {
     
     burnItems.push({
            id: id
        })
    },
    getCoal: function(){
        for(var i in burnItems){
        return burnItems[i].coal;
    }},
	 liquidRegistry: function(id,data,voId,voData,liquid){
        liquids.push({id: id,data: data,voId: voId,voData: voData,liquid: liquid})
    },
	 
    registerStandartMachine: function(id, Standart) {
        rfGroup.add(id, -1);
        euGroup.add(id, -1);
        cableAPI.addGroup(id)
        ICRender.getGroup("bt-wire").add(id, -1);
        ICRender.getGroup("fc-wire").add(id, -1);
        ToolAPI.registerBlockMaterial(id, "stone");
        Block.setDestroyTime(id, 3);
        TileEntity.registerPrototype(id, Standart);
        EnergyTileRegistry.addEnergyTypeForId(id, EU);
        EnergyTileRegistry.addEnergyTypeForId(id, RF);
        EnergyTileRegistry.addEnergyTypeForId(id, ft);
        EnergyTileRegistry.addEnergyTypeForId(id, sj);
    },
    registerO2SJMachine: function(id, Standart) {
        rfGroup.add(id, -1);
        euGroup.add(id, -1);
        ICRender.getGroup("bt-wire").add(id, -1);
        ICRender.getGroup("fc-wire").add(id, -1);
        cableAPI.addGroup(id)
        AirCable.addGroup(id);
        ToolAPI.registerBlockMaterial(id, "stone");
        Block.setDestroyTime(id, 3);
        TileEntity.registerPrototype(id, Standart);
        EnergyTileRegistry.addEnergyTypeForId(id, EU);
        EnergyTileRegistry.addEnergyTypeForId(id, RF);
        EnergyTileRegistry.addEnergyTypeForId(id, ft);
        EnergyTileRegistry.addEnergyTypeForId(id, sj);
        EnergyTileRegistry.addEnergyTypeForId(id, ob);
    }, 
    addReceptForElectricCompressor: function(inp ,out) {
        
        inp = inp || {};
        out = out || {};
        inp.slot_1 = inp.slot_1 || 0;
        inp.slot_2 = inp.slot_2 || 0;
        inp.slot_3 = inp.slot_3 || 0;
        inp.slot_4 = inp.slot_4 || 0;
        inp.slot_5 = inp.slot_5 || 0;
        inp.slot_6 = inp.slot_6 || 0;
        inp.slot_7 = inp.slot_7 || 0;
        inp.slot_8 = inp.slot_8 || 0;
        inp.slot_9 = inp.slot_9 || 0;
        out.result = out.result || 0;
        compressorRecipe.push({slot_1: inp.slot_1, slot_2: inp.slot_2, slot_3: inp.slot_3, slot_4: inp.slot_4, 
            slot_5: inp.slot_5, 
            slot_6: inp.slot_6, slot_7: inp.slot_7, slot_8: inp.slot_8, slot_9: inp.slot_9, result: out.result
        });
    },
    getCompressorRecipe: function(){
        for(var i in compressorRecipe){
      return compressorRecipe[i].inp}
    },
    getCompressorResult: function(){
        for(var i in compressorRecipe){
      return compressorRecipe[i].out}
    },
    addCircuitRecept: function(inp,out){  
        inp = inp || {};
        out = out || {};    
        inp.diamond = inp.diamond || 0;
        inp.fabricator_1 = inp.fabricator_1 || 0;
        inp.fabricator_0 = inp.fabricator_0 || 0;
        inp.dust = inp.dust || 0;
        inp.slot = inp.slot || 0;
        out.resultat = out.resultat || 0;  
        circuit.push({
            diamond: inp.diamond, fabricator_1: inp.fabricator_1, fabricator_0: inp.fabricator_0, dust: inp.dust, 
            slot: inp.slot, resultat: out.resultat
        })},
        getCircuitRecipe: function(){
            for(var i in circuit){
                return circuit[i].inp;
            }
        },
    addDefaultRocketRecipe: function(rock,out){ 
        rock = rock || {};
        out = out || {};
        rock.cone = rock.cone || 0;
        rock.cover_1 = rock.cover_1 || 0;
        rock.cover_2 = rock.cover_2 || 0;
        rock.cover_3 = rock.cover_3 || 0;
        rock.cover_4 = rock.cover_4 || 0;
        rock.cover_5 = rock.cover_5 || 0;
        rock.cover_6 = rock.cover_6 || 0;
        rock.cover_7 = rock.cover_7 || 0;
        rock.cover_8 = rock.cover_8 || 0;
        rock.fin_1 = rock.fin_1 || 0;
        rock.fin_2 = rock.fin_2 || 0;
        rock.fin_3 = rock.fin_3 || 0;
        rock.fin_4 = rock.fin_4 || 0;
        rock.engine = rock.engine|| 0;
        rock.storage_1 = rock.storage_1 || 0;
        rock.storage_2 = rock.storage_2 || 0;
        rock.storage_3 = rock.storage_3 || 0;
        out.rocket = out.rocket || 0;
        rock1.push({
             cone: rock.cone, cover_1: rock.cover_1, cover_2: rock.cover_2, cover_3: rock.cover_3, cover_4: rock.cover_4, cover_5:rock.cover_5, cover_6: rock.cover_6, cover_7: rock.cover_7, cover_8: rock.cover_8, engine: rock.engine, fin_1: rock.fin_1, fin_2: rock.fin_2, fin_3: rock.fin_3, fin_4: rock.fin_4, storage_1: rock.storage_1, storage_2: rock.storage_2, storage_3: rock.storage_3,rocket: out.rocket
        })
    },
    getDefaultRocketRecipe: function(){
        for(var i in rock1){
            return rock1[i].rock
        }
    },
    getDefaultRocketResult: function(){
        for(var i in rock1){
            return rock1[i].out
        }
    },
}

SpacesMachine.addCoal(VanillaItemID.coal);
SpacesMachine.addCoal(VanillaItemID.charcoal);

SpacesMachine.addCoal(VanillaBlockID.coal_block);

IDRegistry.genBlockID("spaces_lent");
Block.createBlock("spaces_lent", [{
    name: "Dangerous Lent", texture: [["Dangerous Lent", 0]], inCreative: true
}], STONE);
Translation.addTranslation("Dangerous Lent", {
    ru: "§6Аварийная лента"
});






















/*
 $ - slot1
 # - Scala
 $
 #######
    */


/*
 $ - slot1
 # - Scala
 $
 #######
    */




//SpacesMachine.addReceptForElectricCompressor(ItemID.ingot_steel_spacescraft, ItemID.compressed_steel)

//SpacesMachine.addReceptForElectricCompressor(VanillaItemID.iron_ingot, ItemID.compressed_iron)