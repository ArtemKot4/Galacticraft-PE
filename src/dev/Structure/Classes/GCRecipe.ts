let gc_recipe = []

class GCMachineRecipe {
    public slots: int;
    public recipe_key;
  

    constructor(slots,recipe_key){
        this.slots =  slots ;
        this.recipe_key = recipe_key;
  
        
    }
    public getSlot(count: int,container){
        for(var s;s < count;s++){
            return container.getSlot("slot_"+s)
        }
    }
        public getRecipe(container) {
     for(var r in gc_recipe){
        var rec = gc_recipe[r];
        if(this.getSlot(this.slots,container)==rec[this.recipe_key].input){
            return true
        }
   
     }
        
    }
    public recipeRegistry
        
      }
let GCRecipe = {pushCompressor: function (type,slots: int,id_1?: id, id_2?: id, id_3?: id, id_4?: id, id_5?: id, id_6?: id, id_7?: id, id_8?: id, id_9?: id,out?: id) {
    for(var h;h<slots;h++){
        var identifiers = "id_"+h
    gc_recipe.push({
    
        ["slot_"+h]: identifiers || 0,
        // slot_2: id_2 || 0,
        // slot_3: id_3 || 0,
        // slot_4: id_4 || 0,
        // slot_5: id_5 || 0,
        // slot_6: id_6 || 0,
        // slot_7: id_7 || 0,
        // slot_8: id_8 || 0,
        // slot_9: id_9 || 0,
      
    });
}}
}
