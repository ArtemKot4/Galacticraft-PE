const WIRE = Block.createSpecialType({
  destroytime: 0.1,
  explosionres: 0.5,
  sound: "cloth",
});

const PIPE = Block.createSpecialType({
  destroytime: 0.1,
  explosionres: 0.5,
  sound: "glass",
});

const STANDART_CABLE_WIDTH = (2 / 8);

class Cable {
  public id: string;

  public static colors_to_paint = [
    "blue",
    "black",
    "white",
    "gray",
    "green",
    "lime",
    "blue",
    "orange",
    "magenta",
    "pink",
    "red",
    "yellow",
    "purple",
    "cyan",
    "brown",
    "light_blue",
    "light_gray",
  ] as const;

  constructor(public color: string) {}

  public createByPrototype(
    id: string,
    group: string,
    energy_type: EnergyType,
    energy_provide: int,
    block_type: string | Block.SpecialType,
    cable_width: int = STANDART_CABLE_WIDTH
  ) {
    this.id = id;
    return (
      new GBlock(
        id,
        [
          {
            name: id,
            texture: [[id, 0]],
            inCreative: false,
          },
        ],
        block_type
      ).create(),
      TileRenderer.setupWireModel(BlockID[id], 0, cable_width, group),
      energy_type.registerWire(BlockID[id], energy_provide),
      this.setColorByDye()
    );
  }

  public setColorByDye() {
    const splited_id = this.id.split("_");
    return Block.registerClickFunctionForID(
      BlockID[this.id],
      (coords, item, block, player) => {
        for (const color of Cable.colors_to_paint) {
          const result_id = splited_id
            .slice(0, splited_id.length - 1)
            .concat(color)
            .join("_");

            if (item.id === VanillaItemID[color + "_dye"]) {

              try {
                const actor = new PlayerActor(player);
              Particles.addParticle(
                EParticleType.CLOUD,
                coords.x + 0.5,
                coords.y + 0.5,
                coords.z + 0.5,
                0,
                0.01,
                0
              );

              BlockSource.getDefaultForActor(player).setBlock(
                coords.x,
                coords.y,
                coords.z,
                BlockID[result_id],
                0
              );
             if(actor.getGameMode() !== EGameMode.CREATIVE) Entity.setCarriedItem(
                player,
                item.id,
                item.count - 1,
                item.data,
                item.extra
              );
            }
           catch {
          Particles.addParticle(EParticleType.FLAME, coords.x + 0.5, coords.y + 0.5, coords.z + 0.5, 0, 0.01, 0)
          Game.tipMessage(MathHelper.randomValue(Native.Color.GREEN, Native.Color.RED) + Translation.translate("gc.message.cable.painting_warning"))
          }
        }
      }
      }
    );
  }

  public createWire() {
    return this.createByPrototype(
      "aluminum_wire_" + this.color,
      "gc-wire",
      GJ,
      200,
      WIRE,
      2 / 10
    );
  }

  public createImprovedWire() {
    return this.createByPrototype(
      "improved_aluminum_wire_" + this.color,
      "gc-improved-wire",
      GJ,
      400,
      WIRE,
      2 / 8
    );
  }

  public createPipe() {
    return this.createByPrototype(
      "pipe_oxygen_" + this.color,
      "gc-oxygen-pipe",
      OB,
      400,
      PIPE
    );
  }
  public getBlockID() {
    return BlockID[this.id];
  }
}

const cableColors = [
  "black",
  "blue",
  "dark_blue",
  "white",
  "dark_gray",
  "dark_green",
  "dark_orange",
  "dark_lime",
  "gray",
  "green",
  "light_blue",
  "magenta",
  "pink",
  "red",
  "yellow",
  "orange",
  "purple",
  "cyan",
  "brown",
  "light_gray",
];

const pipeColors = [
  "black",
  "blue",
  "brown",
  "cyan",
  "gray",
  "green",
  "light_blue",
  "lime",
  "magenta",
  "orange",
  "pink",
  "purple",
  "red",
  "light_gray",
  "yellow",
  "white"
];

for (const color of cableColors) {
  const cable = new Cable(color);
  cable.createImprovedWire();
}

for (const color of pipeColors) {
  const cable = new Cable(color);
  cable.createPipe();
}

new Cable(null).createByPrototype(
  "pipe_hydrogen",
  "gc-hydrogen-pipe",
  OB,
  400,
  PIPE
);

Item.addToCreative(BlockID["improved_aluminum_wire_gray"], 1, 0);

Item.addToCreative(BlockID["pipe_hydrogen"], 1, 0);

Item.addToCreative(BlockID["pipe_oxygen_gray"], 1, 0);


