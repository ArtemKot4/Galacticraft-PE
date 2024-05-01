class RocketStorageUIBuilder {
  public container = new ItemContainer();
  public fuel: int = 0;
  public ui: UI.StandardWindow 
  protected UIObject = {
    standard: {
      header: {
        text: {
          text: Translation.translate("ui.galacticraft.rocket_storage_ui"),
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
        x: 510,
        y: 110,
        bitmap: "rocket.fuel_storage_1",
        scale: 4.2,
      },
    ],
    elements: {
      fuel_scale: {
        type: "scale",
        x: 510,
        y: 110,
        scale: 4.2,
        direction: 0,
        bitmap: "rocket.fuel_storage_0",
        clicker: {
          onClick: function () {
            alert("Клик")
          },
        },
      },
    }
  } as UI.StandardWindowContent;

  constructor(public fuel_max: int) {

  };

  public onTick() {
    this.container.setScale("fuel_scale", this.fuel / this.fuel_max);
  }
  public openFor(client: NetworkClient) {
    return this.container.openFor(client, "galacticraft.rocket_storage.ui");
  }
  protected setElement() {
        
  };
  public build() {
    this.ui = new UI.StandardWindow(this.UIObject);
  ItemContainer.registerScreenFactory("galacticraft.rocket_storage.ui", function(container, screenName) { 
 return this.ui; 
 });
  }
}