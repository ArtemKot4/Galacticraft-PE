let gc_recipe = [];
abstract class GCRecipe {
    public getSlot(count: int,container){
        for(var s;s < count;s++){
            return container.getSlot("slot_"+s)
        };
        
    }
}