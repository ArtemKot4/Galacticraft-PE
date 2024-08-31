interface ITransportDescriptor {
  model: string;
  texture: string;
}

class Padding {
  protected setPaddingModel(data: int, height: int) {
    Block.setShape(BlockID[this.id], 0, 0, 0, 1, height, 1, data);
    return;
  }

  protected placeFunction(
    coords: Vector,
    block: Tile,
    changedCoords: Vector,
    region: BlockSource
  ) {
    for (let i = -1; i <= 1; i++) {
      for (let k = -1; k <= 1; k++) {
        if (i === 0 && k === 0) {
          continue;
        }
        const block = region.getBlock(coords.x + i, coords.y + 1, coords.z + k);
        if (block.id !== BlockID[this.id] && block.data === 0) {
          return;
        }
      }
    }
    return region.setBlock(
      coords.x,
      coords.y + 1,
      coords.z,
      BlockID[this.id],
      1
    );
  }
  constructor(protected id: string) {
    const description = {
      name: "block.galacticraft." + id,
      texture: [[id, 0]],
      inCreative: true,
    } as Block.BlockVariation;

    new GBlock(id, [description, description]).create();

    Block.registerNeighbourChangeFunctionForID(
      BlockID[id],
      this.placeFunction.bind(this)
    );

    this.setPaddingModel(1, 5 / 16);
    this.setPaddingModel(0, 3 / 16);

    const raycastShape = new ICRender.CollisionShape();
    raycastShape.addEntry().addBox(0, 0, 0, 1, 4, 1);
    BlockRenderer.setCustomRaycastShape(BlockID[id], 1, raycastShape);
  }
}

class RocketPadding extends Padding {
  takeRocket(player: int, coords: Vector) {
    if (!Entity.getSneaking(player)) {
      return;
    }

    if (!RocketManager.isValid(coords)) {
      Game.message("Rocket is not valid");
    }

    const stack = Rocket.getItemStack(coords);

    if (!stack) {
      return;
    }

    new PlayerEntity(player).addItemToInventory(stack);

    return RocketManager.clear(coords);
  };

  putRocket(coords: Vector, item: ItemInstance, player: int, tier: int) {
    if (RocketManager.isValid(coords)) {
      return;
    }

    if (tier === null) {
      return;
    }

    if (typeof tier !== "number") {
      throw new java.lang.RuntimeException(
        "type of rocket tier is not a number"
      );
    }

    const entity = new PlayerEntity(player);

    if (entity.getGameMode() !== EGameMode.CREATIVE) {
     entity.decreaseCarriedItem();
    }

    RocketManager.create(item, coords, tier);
    return;
  }
  onClick(
    coords: Callback.ItemUseCoordinates,
    item: ItemInstance,
    block: Tile,
    player: number
  ): void {
    Game.message("" + player);
    const region = BlockSource.getDefaultForActor(player);

    if (region.getBlockData(coords.x, coords.y, coords.z) === 0) {
      return;
    }

    if (RocketManager.isValid(coords) && !Entity.getSneaking(player)) {
      return RocketManager.start(coords, player);
    }

    const tier = RocketManager.getTierForID(item.id);

    this.putRocket(coords, item, player, tier);

    this.takeRocket(player, coords);


    return;
  }
  constructor(id: string) {
    super(id);
    Block.registerClickFunctionForID(BlockID[id], this.onClick.bind(this));
  }
}

const ROCKET_PADDING = new RocketPadding("rocket_padding");
const BUGGY_PADDING = new Padding("buggy_padding");
