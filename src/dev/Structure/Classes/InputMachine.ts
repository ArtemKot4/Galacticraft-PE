abstract class InputMachine extends Machine {
    canReceiveEnergy(type: number, side: string): boolean {
      return true;
    }
    canExtractEnergy(): boolean {
      return false;
    }
    getTier(): number {
      return 1;
    }
    click(id): any {
      this.setWrenchable(id);
    }
  
    // charge (slot: string) {
    //     this.data.energy -= ChargeItemRegistry.addEnergyToSlot(this.container.getSlot(slot), "spacejoule",
    //     this.data.energy, this.getTier());
    // };
    discharge(slot: string) {
      let amount = this.getCapacity() - this.data.energy;
      this.data.energy += ChargeItemRegistry.getEnergyFromSlot(
        this.container.getSlot(slot),
        "spacejoule",
        amount,
        this.getTier()
      );
  
      for (let i in infinitybatt) {
        if (this.container.getSlot(slot).id == infinitybatt[i].id) {
          if (World.getThreadTime() % infinitybatt[i].num == 0) {
            this.data.energy += 1;
          }
        }
      }
    }
  }
  