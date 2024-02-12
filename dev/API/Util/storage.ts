namespace Storage {
    export function set(slot: string, item: int, container: ItemContainer, count?: int, data?: int): void {
      const get = container.getSlot(slot);
      get.data+=data;
      return container.setSlot(slot, item, count || get.count + 1, 
      get.data);
    };
    export function get(container: ItemContainer,slot: string,param: string,value: any): boolean {
        return container.getSlot(slot)[param] == value;
    }
  }