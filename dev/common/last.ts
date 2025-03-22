ModAPI.registerAPI("GalacticraftAPI", {
    Galacticraft,
    GalacticraftItem,
    GalacticraftBlock,
    battery: Battery,
    requireGlobal: function (command) {
        return eval(command);
    }
});

