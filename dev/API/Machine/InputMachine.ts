abstract class InputMachine extends Machine {
   public canReceiveEnergy(type: number, side: string): boolean {
      return true;
    }
   public canExtractEnergy(): boolean {
      return false;
    }
   public getTier(): number {
      return 1;
    }
   public click(id): any {
      this.setWrenchable(id);
    }
  
    charge (slot: string) {
        this.data.energy -= ChargeItemRegistry.addEnergyToSlot(this.container.getSlot(slot), "GalacticraftJoule",
        this.data.energy, this.getTier());
    };
    public discharge(slot: string) {
      let amount = this.getCapacity() - this.data.energy;
      this.data.energy += ChargeItemRegistry.getEnergyFromSlot(
        this.container.getSlot(slot),
        "GalacticraftJoule",
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
  