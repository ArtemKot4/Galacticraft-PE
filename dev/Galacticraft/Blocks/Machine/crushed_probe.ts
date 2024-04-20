
Translation.addTranslation("Crashed probe", {
    ru: "§aРазбившийся зонд"
});
 
TileEntity.registerPrototype(BlockID.crashed_probe, {
    useNetworkItemContainer: true,
    getScreenName() { return "main"; },
    getScreenByName() { return CrashedProbeUI }, 
});

Block.registerDropFunction("ore_silicon", function(coords, blockID){
    return [[ItemID.radioisotope_core, 1, 0]] 
});
