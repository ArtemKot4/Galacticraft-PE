const slot = Equi.getSlot;
let isOpen: boolean = false;

const component = () => {
  if (
    slot("Glass").id == ItemID["oxygen_mask"] &&
    slot("Module").id == ItemID["oxygen_gear"]
  )
    return true;
};

const damage = () => {
    Entity.damageEntity(Player.get(), 2);
    Game.tipMessage(Translation.translate("§4Warning!Air is not"));
}

const OxygenTick = () => {
  if (!O2UI.isOpened() && isOpen == false && component()) {
    isOpen = true;
  }
  if (isOpen == true) {
    O2UI.openAs(OxygenTILE);
  }; 
  if(!component() && O2UI.isOpened()){
    O2UI.close(); 
    isOpen = false;
    return;
  };
  if(!O2UI.isOpened() && Game.getGameMode()==0) damage();
  Ballone.onTick();
};

Saver.addSavesScope(
  "Equi",
  function read(scope): void {
    Equi = scope ? scope.SaveItems : UI.Container;
  },
  function save() {
    return {
      SaveItems: Equi,
    };
  }
);

//C:\\Users\\\u041f\u043e\u043b\u044c\u0437\u043e\u0432\u0430\u0442\u0435\u043b\u044c\\Desktop\\\u0418\u0433\u0440\u044b\\HORIZON MODDING KERNEL\\Galacticraft 4 PE developing\\toolchain\\build\\project\\sources\\main.js
