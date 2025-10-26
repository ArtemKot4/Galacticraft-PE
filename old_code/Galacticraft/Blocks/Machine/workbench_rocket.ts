
Block.registerPlaceFunction("workbench_rocket", function(coords, item, block, player) {
    var region = BlockSource.getDefaultForActor(player);
    var spaces = coords.relative

    region.setBlock(spaces.x, spaces.y, spaces.z, item.id, item.data);
    region.setBlock(spaces.x, spaces.y + 1, spaces.z, BlockID.workbench_nasa,0);
});





SpacesMachine.registerStandartMachine(BlockID.workbench_rocket, {
    useNetworkItemContainer: true,
    getScreenName() {
        return "main";
    },
    getScreenByName() {
        return WorkbencheableUI
    },
    defaultValues: {
        ui: 0
    },
    getCapacity: function() {
        return 1050
    },
 
    energyReceive: function(type, amount, voltage) {
        amount = Math.min(amount, 1000)
        var add = Math.min(amount, this.getCapacity() - this.data.energy);
        this.data.energy += add
        return add
    },
    canReceiveEnergy: function(type, side) {
        return true;
    },
       tick: function() {
        this.container.sendChanges();
        this.container.validateAll();
                
        
        let slot1 = this.container.getSlot("slot1")
        let slot2 = this.container.getSlot("slot2")
        let slot3 = this.container.getSlot("slot3")
        let slot4 = this.container.getSlot("slot4")
        let slot5 = this.container.getSlot("slot5")
        let slot6 = this.container.getSlot("slot6")
        let slot7 = this.container.getSlot("slot7")
        let slot8 = this.container.getSlot("slot8")
        let slot9 = this.container.getSlot("slot9")
        let slot10 = this.container.getSlot("slot10")
        let slotuer1 = this.container.getSlot("slotuer1")
        let slotuer2 = this.container.getSlot("slotuer2")
        let slotuel1 = this.container.getSlot("slotuel1")
        let slotuel2 = this.container.getSlot("slotuel2")
        let chestable1 = this.container.getSlot("chestable1")
        let chestable2 = this.container.getSlot("chestable2")
        let chestable3 = this.container.getSlot("chestable3")
        let craftable = this.container.getSlot("craftable")
        for (var i in rock1){var er = rock1[i];
            if(
            slot1.id == er.cone && 
            slot2.id == er.cover_1 &&
            slot3.id == er.cover_2 && 
            slot4.id == er.cover_3 && 
            slot5.id == er.cover_4 &&
            slot6.id == er.cover_5 &&
            slot7.id ==er.cover_6 &&
            slot8.id == er.cover_7 && 
            slot9.id==er.cover_8 && 
            slot10.id == er.engine &&
            slotuer1.id == er.fin_1 &&
            slotuer2.id == er.fin_2 &&
            slotuel1.id == er.fin_3 &&
            slotuel2.id == er.fin_4 &&
            chestable1.id == er.storage_1 &&
            chestable2.id == er.
            storage_2&& 
            chestable3.id==er.storage_3 && 
            
            craftable.id == 0 ){
               slot2.count-=1;
              slot1.count-=1;
              slot3.count-=1;
              slot4.count-=1;
              slot5.count-=1;
              slot6.count-=1;
              slot7.count-=1;
              slot8.count-=1;
              slot9.count-=1;
              slot10.count-=1;
              slotuer1.count-=1;
              slotuer2.count-=1;
              slotuel1.count-=1;
              slotuel2.count-=1;
              chestable3.count-=1;
              chestable2.count-=1;
              chestable1.count-=1;
              
  this.container.setSlot("slot1",slot1.id,slot1.count,slot1.data)
  
   this.container.setSlot("slot2",slot2.id,slot2.count,slot2.data)
                         
      this.container.setSlot("slot3",slot3.id,slot3.count,slot3.data)
         
    this.container.setSlot("slot4",slot4.id,slot4.count,slot4.data) 
           
     this.container.setSlot("slot5",slot5.id,slot5.count,slot5.data) 
           
      this.container.setSlot("slot6",slot6.id,slot6.count,slot6.data)  
           
    this.container.setSlot("slot7",slot7.id,slot7.count,slot7.data)  
           
    this.container.setSlot("slot8",slot8.id,slot8.count,slot8.data)  
           
  this.container.setSlot("slot9",slot9.id,slot9.count,slot9.data)  
           
 this.container.setSlot("slot10",slot10.id,slot10.count,slot10.data)  
           
     this.container.setSlot("slotuer1",slotuer1.id,slotuer1.count,slotuer1.data)
                      
 this.container.setSlot("slotuer2",slotuer2.id,slotuer2.count,slotuer2.data) 
           
this.container.setSlot("slotuel1",slotuel1.id,slotuel1.count,slotuel1.data)
           
                      
this.container.setSlot("slotuel2",slotuel2.id,slotuel2.count,slotuel2.data)
           
                      
this.container.setSlot("chestable1",chestable1.id,chestable1.count,chestable1.data)
           
this.container.setSlot("chestable2",chestable2.id,chestable2.count,chestable2.data)
           
 this.container.setSlot("chestable3",chestable3.id,chestable3.count,chestable3.data)
           
           
              this.container.setSlot("craftable",er.rocket,1,0)
          
            }
        }

    },
    energyTick: function(type, src) {

        let output = Math.min(950, this.data.energy)
        this.data.energy += src.add(output) - output;

    },

    destroyBlock: function () {
        this.blockSource.setBlock(this.x, this.y + 1, this.z, 0);
    }});
/*  slots:numerations
slotuer:r1,r2.
sltuel:l1,l2.
slotchestable:sc1,sc2,sc3.
craftable:cr.
drawing:SignRocketbench — drsrb.
             #1
           2#-#3   sc1#  sc2#  sc3#
           4#-#5
           6#-#7
        r1#8#-#9#l1  #drsrb
        r2# #10 #l2   #cr
          Интерфейс*/


TileEntity.registerPrototype(BlockID.workbench_nasa, {
    useNetworkItemContainer: true,
    getScreenName() {
        return "main";
    },
    getScreenByName() {
        return ManipulatorsUI
    },
    destroyBlock: function () {
        this.blockSource.setBlock(this.x, this.y-1, this.z, 0);
    },});

/*
          #######
          ##d,s##
          #######
          %%%%%%%
          Интерфейс*/

Block.registerDropFunction("workbench_nasa", function(coords, blockID) {
    return [[BlockID.workbench_rocket,
        1,
        0]]
});

// StorageInterface.createInterface(BlockID.coal_generator, {
//     slots: {
//         "slot^1-10": {
//             input: true,
//             side: "down",
//             isValid: function(item, side){
//                 return SpacesMachine.getDefaultRocketRecipe();
//             }
//         },
//         "slotuer^1-2": {
//             input: true,
//             side: "down",
//             isValid: function(item, side){
//                 return SpacesMachine.getDefaultRocketRecipe();
//             }
//         },
//         "slotuel^1-2": {
//             input: true,
//             side: "down",
//             isValid: function(item, side){
//                 return SpacesMachine.getDefaultRocketRecipe();
//             }
//         },
//         "craftable": {output: true}
//     }     
// });