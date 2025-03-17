class CelestialBody {
  public static readonly last_coord: [right: int, left: int] = [0, 0];

  public static planetList: Record<string, int> = {};
  public static add(planet: int, icon: string) {
    CelestialBody.planetList[icon] = planet;
  }
  public static get(dimension: int): string {
    return Object.entries(CelestialBody.planetList).find(
      (v) => v[1] === dimension
    )[0];
  }
}

class CelestialBorder {
  public static content = {
    drawing: [
      {
        type: "bitmap",
        scale: 0.5,
        bitmap: "CelestialBorder.background",
      },
      {
        type: "bitmap",
        scale: 1,
        bitmap: "CelestialBorder.solar",
      },
    ],
  } as UI.WindowContent;

  protected static UI = new UI.Window(this.content);

  public static initCelestials(player: int, tier: int) {
    CelestialBorder.UI.content = CelestialBorder.content;
    CelestialBorder.UI.forceRefresh();

    const transferList = Rocket.descriptor.find(
      (v) => v.tier === tier
    ).transferList;

    const planetList = [];
    const departurePoint = CelestialBody.get(Entity.getDimension(player));

    if (transferList !== undefined && !transferList.includes(departurePoint)) {
      planetList.concat(departurePoint);
    }

    if (transferList === undefined) {
      throw new java.lang.RuntimeException(
        "celestial border cat't redraw ui: tier of rocket is not defined"
      );
    }

    planetList.concat(transferList);

    const list = Object.entries(CelestialBody.planetList);

    for (const i in list) {
      const arr = list[i];

      if (!planetList.includes(arr[0])) {
        continue;
      }

      for (let height = 1; height <= UI.getScreenHeight(); height++) {
        
        if (height % 70 === 0) {
          CelestialBorder.UI.content.elements[arr[0]] = {
            type: "button",
            x: 80,
            y: height,
            bitmap: arr[0],
            clicker: {
              onClick: () => {
                Dimensions.transfer(player, arr[1]);
              },
            },
            scale: 0.4,
          };
        }
      }
    }
    CelestialBorder.UI.forceRefresh();
  }
  public static open() {
    CelestialBorder.UI.open();
  }
}

Callback.addCallback("ItemUseNoTarget", (item, player) => {
  CelestialBorder.open();
});
