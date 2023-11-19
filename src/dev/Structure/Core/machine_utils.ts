namespace Storage {
    export function set(slot: string, item: number, container: ItemContainer, count?: int, data?: int): void {
       count = count || 1;
       data = data || 0;
      return container.setSlot(slot, item, container.getSlot(slot).count + count, 
      container.getSlot(slot).data + data);
    };
    export function get(container: ItemContainer,slot: string,param: string,value: any): boolean {
        if(container.getSlot(slot)[param]==value){
            return true
        }
    }
  }