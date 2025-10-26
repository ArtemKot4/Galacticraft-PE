const Oxygen = {
  container: new UI.Container(),
  component: () => {
    const slot = Oxygen.container.getSlot;
    if (
      slot("Glass").id != ItemID["oxygen_mask"] &&
      slot("Module").id != ItemID["oxygen_gear"]
    ) {
      return false;
    }
    return true;
  },
  damage: () => {
    Entity.damageEntity(Player.get(), 2);
    Game.tipMessage(Translation.translate("§4Warning!Air is not"));
  },
  isOpen: false,
  update: () => {
    let op = Oxygen.isOpen;
    if (!O2UI.isOpened() && op == false && Oxygen.component()) {
      op = true;
    }
    if (op == true) {
      O2UI.openAs(OxygenTILE);
    }
    if (!Oxygen.component() && O2UI.isOpened()) {
      O2UI.close();
      op = false;
      return;
    }
    if (!O2UI.isOpened() && Game.getGameMode() == 0) Oxygen.damage();
    Ballone.onTick(Oxygen.container);
  },
};

Saver.addSavesScope(
  "Equi",
  function read(scope): void {
    Oxygen.container = scope ? scope.SaveItems : UI.Container;
  },
  function save() {
    return {
      SaveItems: Oxygen.container,
    };
  }
);

//C:\\Users\\\u041f\u043e\u043b\u044c\u0437\u043e\u0432\u0430\u0442\u0435\u043b\u044c\\Desktop\\\u0418\u0433\u0440\u044b\\HORIZON MODDING KERNEL\\Galacticraft 4 PE developing\\toolchain\\build\\project\\sources\\main.js
