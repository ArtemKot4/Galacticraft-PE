
Callback.addCallback("NativeCommand", (command) => {
  const split = command.split("");
  if (command[0] === "/galacticraft") {
    if (command[1] === "info") {
      Game.prevent();
      if(!command[2]) {
        Game.message(Native.Color.RED + Translation.translate("message.galacticraft.unvalid_token"))
      }
      if (command[2] === "rocket") {
        for (const data of RocketManager.data.entries()) {
          const objs = data.map((v) => JSON.stringify(v));
          Game.message("pos: " + objs[0] + " -> " + objs[1]);
        }
      }
    }
  }
});

Translation.addTranslation("message.galacticraft.unvalid_token", {
  ru: "Извините, но вы забыли ввести ключ.",
  en: "Sorry, but you fotgot press key"
})