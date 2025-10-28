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

class Cable {
  public static STANDART_CABLE_WIDTH = 2 / 8;
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

  constructor(public id: string) {}

  public createByPrototype(
    group: string,
    energy_type: EnergyType,
    energy_provide: int,
    block_type: string | Block.SpecialType,
    cable_width: int = Cable.STANDART_CABLE_WIDTH
  ) {
    return (color?: (typeof Cable.colors_to_paint)[int]) => {
      const _id = `${this.id + (color ? "_" + color : "")}`;
      return (
        new GBlock(
          _id,
          [
            {
              name: _id,
              texture: [[_id, 0]],
              inCreative: false,
            },
          ],
          block_type
        ).create(),
        TileRenderer.setupWireModel(BlockID[_id], 0, cable_width, group),
        energy_type.registerWire(BlockID[_id], energy_provide),
        this.setColorByDye(color)
      );
    };
  }

  public setColorByDye(id_color: (typeof Cable.colors_to_paint)[number]) {
    Block.registerClickFunctionForID(
      BlockID[this.id + "_" + id_color ?? this.id],
      (coords, item, block, player) => {
        const entity = new PlayerEntity(player);
        for (const color of Cable.colors_to_paint) {
          if (item.id === VanillaItemID[color + "_dye"]) {
            try {
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
                BlockID[this.id + "_" + color],
                0
              );
              if (entity.getGameMode() !== EGameMode.CREATIVE)
                entity.decreaseCarriedItem(1);
              return;
            } catch {
              Particles.addParticle(
                EParticleType.CRIT,
                coords.x + 0.5,
                coords.y + 0.5,
                coords.z + 0.5,
                0,
                0.01,
                0
              );
              Game.tipMessage(
                MathHelper.randomValue(Native.Color.GREEN, Native.Color.RED) +
                  Translation.translate("gc.message.cable.painting_warning")
              );
            }
          }
        }
      }
    );
  }
  public getBlockID() {
    return BlockID[this.id];
  }
}

//oxygen pipes and wires cans to painted to colors
for (const color of Cable.colors_to_paint) {
  new Cable("improved_aluminum_wire").createByPrototype(
    "gc.wire",
    GJ,
    200,
    WIRE
  )(color);

  new Cable("pipe_oxygen").createByPrototype(
    "gc.oxygen-pipe",
    OB,
    400,
    PIPE
  )(color);
}

//hydrogen pipe
new Cable("pipe_hydrogen").createByPrototype(
  "gc.hydrogen-pipe",
  OB,
  400,
  PIPE
)();

Item.addToCreative(BlockID["improved_aluminum_wire_gray"], 1, 0);

Item.addToCreative(BlockID["pipe_hydrogen"], 1, 0);

Item.addToCreative(BlockID["pipe_oxygen_gray"], 1, 0);
