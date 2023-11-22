namespace Storage {
    export function set(slot: string, item: int, container: ItemContainer, count?: int, data?: int): void {
      return container.setSlot(slot, item, count = count || container.getSlot(slot).count+1, 
      container.getSlot(slot).data + data);
    };
    export function get(container: ItemContainer,slot: string,param: string,value: any): boolean {
        if(container.getSlot(slot)[param] == value){
            return true
        };
        
    }
  }