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
        width: UI.getScreenHeight() * 2,
        height: UI.getScreenHeight(),
        bitmap: "solar",
      },
      {
        type: "bitmap",
        width: UI.getScreenHeight() * 2,
        height: UI.getScreenHeight(),
        bitmap: "solar",
      },
    ],
  } as UI.WindowContent;
  public static UI = new UI.Window(this.content);
  public static initCelestials(player: int, tier: int) {
    const planetList = Rocket.descriptor.find(
      (v) => v.tier === tier
    ).transferList;
    if (planetList === undefined) {
      CelestialBorder.UI.content = CelestialBorder.content;
      CelestialBorder.UI.forceRefresh();

      throw new java.lang.RuntimeException(
        "celestial border cat't redraw ui: tier of rocket is not defined"
      );
    }
    const list = Object.entries(CelestialBody.planetList);
    for (const arr of list) {
      if (!planetList.includes(arr[0])) {
        continue;
      }
      for (let i = 1; i < UI.getScreenHeight(); i++) {
        if (i % 70 === 0) {
          CelestialBorder.UI.content.elements[arr[0]] = {
            type: "button",
            x: 80,
            y: i,
            bitmap: arr[0],
            clicker: {
              onClick: () => {
                Dimensions.transfer(player, arr[1]);
              },
            },
            scale: 1.4,
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
