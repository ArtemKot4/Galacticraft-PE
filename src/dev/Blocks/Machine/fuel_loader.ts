IDRegistry.genBlockID("fuel_loader");
Block.createBlockWithRotation(
  "fuel_loader",
  [
    {
      name: "Fuel Loader",
      texture: [
        ["Machine", 0],
        ["Machine", 0],
        ["refinery_front", 0],
        ["Fuel Loader", 0],
        ["Machine Output", 0],
        ["Machine Output", 0],
      ],
      inCreative: true,
    },
    {
      name: "Fuel Loader",
      texture: [
        ["Machine", 0],
        ["Machine", 0],
        ["refinery_front", 0],
        ["Fuel Loader", 0],
        ["Machine Output", 0],
        ["Machine Output", 0],
      ],
      inCreative: false,
    },
    {
      name: "Fuel Loader",
      texture: [
        ["Machine", 0],
        ["Machine", 0],
        ["refinery_front", 0],
        ["Fuel Loader", 0],
        ["Machine Output", 0],
        ["Machine Output", 0],
      ],
      inCreative: false,
    },
  ],
  STONE
);

let FuelLoaderUI = new UI.StandartWindow({
  standard: {
    header: {
      text: {
        text: Translation.translate("Fuel Loader"),
      },
    },
    inventory: {
      standard: true,
    },
    background: {
      standard: true,
    },
  },
  drawing: [
    {
      type: "bitmap",
      x: 268,
      y: 190,
      bitmap: "Liquid_null",
      scale: 3.8,
    },
    {
      type: "bitmap",
      x: 550,
      y: 70,
      bitmap: "slace_en_0",
      scale: 3,
    },
    {
      type: "bitmap",
      x: 690,
      y: 70,
      bitmap: "en_noy",
      scale: 3,
    },
  ],
  elements: {
    canisterFuel: {
      type: "slot",
      x: 355,
      y: 120,
      size: 70,
      bitmap: "SPC.SPC_Canister",
    },
    FuelScale: {
      type: "scale",
      x: 268,
      y: 190,
      bitmap: "Liquid_fuel",
      scale: 3.8,
      direction: 1,
    },
    EnergySlot: {
      type: "slot",
      x: 455,
      y: 260,
      size: 70,
      bitmap: "Others.en_slot",
    },
    ENERGYBar: {
      type: "scale",
      x: 550,
      y: 70,
      bitmap: "slace_en_1",
      scale: 3,
      direction: 0,
    },
    Energy: {
      type: "scale",
      x: 690,
      y: 70,
      bitmap: "en_yes",
      scale: 3,
      direction: 1,
    },
    ELECTRIC: {
      type: "text",
      x: 565,
      y: 113,
      width: 100,
      height: 30,
      text: "Space Joule",
    },
  },
});

class FuelLoader extends InputMachine {
  defaultValues = {
    energy: 0,
    energyMax: 1000,
    liquid: 0,
  };
 
  onTick(): void {
    this.discharge("EnergySlot");
    this.container.sendChanges();
    this.container.validateAll();

    let canisterFuel = this.container.getSlot("canisterFuel");
    this.container.setScale("Energy", this.data.energy / 1000);
    this.container.setScale("ENERGYBar", this.data.energy / 1000);
    this.container.setScale("FuelScale", this.data.liquid / 40);

    this.container.setText(
      "ELECTRIC",
      "Gj :" + this.data.energy + " / " + this.data.energyMax
    );
    if (
      (canisterFuel.id == ItemID.bucket_of_fuel &&
        this.data.liquid <= 40 &&
        this.data.energy >= 50) ||
      (canisterFuel.id == ItemID.fuel_canister &&
        canisterFuel.data == 6 &&
        this.data.liquid <= 40 &&
        this.data.energy >= 50)
    ) {
      if (canisterFuel.id == ItemID.bucket_of_fuel) {
        this.container.setSlot("canisterFuel", 325, 1, 0);
      } else if (
        canisterFuel.id == ItemID.fuel_canister &&
        canisterFuel.data == 6
      ) {
        this.container.setSlot(
          "canisterFuel",
          ItemID.empty_liquid_canister,
          1,
          0
        );
      }
      this.data.energy -= 50;

      this.data.liquid += 5;
      Bucket.play();
    }

  //  if(rocketActive==true&&fuel<500&&fuel>=0&&this.data.liquid>=1){
  //   fuel++;
  //   this.data.liquid--;
  //  if(rocket_storage.isOpened) rocket_storage.setScale("fuelScale",fuel/500)
  //  }
    
  }

  

}

SpacesMachine.registerStandartMachine(
  BlockID.fuel_loader,
  new FuelLoader(FuelLoaderUI)
  //     {
  //     useNetworkItemContainer: true,
  //     getScreenName() {
  //         return "main";
  //     },
  //     getScreenByName() {
  //         return FuelLoader
  //     },
  //     defaultValues: {
  //         progress: 0,
  //         progressMax: 0,
  //         active: false,
  //         energy: 0,
  //         energyMax: 1000,
  //         liquid: 0,
  //     },
  //     energyReceive: function(type, amount, voltage) {
  //         amount = Math.min(amount, 950)
  //         var add = Math.min(amount, this.getCapacity() - this.data.energy);
  //         this.data.energy += add
  //         return add
  //     },
  //     canReceiveEnergy: function(type, side) {
  //         return true;
  //     },
  //     getCapacity: function() {
  //         return 1000
  //     },
  //     tick: function() {
  //         this.container.sendChanges();
  //         battery.add(this.container, this.data, "EnergySlot");
  //        battery.addInfinite(this.container,this.data,"EnergySlot")

  //     },
  //     energyTick: function(type, src) {

  //         let output = Math.min(950, this.data.energy)
  //         this.data.energy += src.add(output) - output;

  //     },click: function(id, count, data, coords){

  //           if(id==ItemID["Space wrench"]){

  //                     this.blockSource.setBlock(
  //         this.x,
  //         this.y,
  //         this.z,
  //         BlockID.fuel_loader, this.blockSource.getBlockData(
  //             this.x,
  //             this.y,
  //             this.z
  //               )+1);

  //           }

  //      }
  // }
);
