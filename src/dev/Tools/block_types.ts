
var BLOCK_TYPE_STAIRS_GL = Block.createSpecialType({
    lightopacity: 1,
    destroytime: .4,
    sound: "glass"
});

var BLOCK_TYPE_FENCE_GL = Block.createSpecialType({
    lightopacity: 1,
    renderlayer: 1,
    rendertype: 11,
    sound: "glass"
});

var BLOCK_TYPE_FENCEE_GL = Block.createSpecialType({
    lightopacity: 1,
    renderlayer: 1,
    rendertype: 32,
    sound: "glass"
});

var BLOCK_TYPE_GLASS = Block.createSpecialType({
    explosionres: 0.5,
    lightopacity: 1,
    destroytime: .4,
    renderlayer: 1,
    sound: "glass"
});

var BLOCK_TYPE_STAIRS = Block.createSpecialType({
    lightopacity: 15,
    destroytime: .6,
    material: 4
});

var BLOCK_TYPE_FENCE = Block.createSpecialType({

    renderlayer: 2,
    rendertype: 11
});

var BLOCK_TYPE_FENCEE = Block.createSpecialType({

    renderlayer: 2,
    rendertype: 32
});

var BLOCK_TYPE_PLANE = Block.createSpecialType({
    lightopacity: 15,
    renderlayer: 1,
    rendertype: 87,
    translucency: 1,
    sound: "glass"
});

var BLOCK_TYPE_STAIRS_WD = Block.createSpecialType({

    destroytime: .4,
    sound: "wood",
    material: 4
});

var BLOCK_TYPE_FENCE_WD = Block.createSpecialType({

    renderlayer: 2,
    rendertype: 11,
    sound: "wood",
    material: 4
});

const TORCH_SPACETYPE = Block.createSpecialType({
    destroytime: 0,
    explosionres: 0,
    renderlayer: 3,
    rendertype: 2,
    translucency: 1,
    lightopacity: 15,
    lightlevel: 14,
    material: 4
});

const TORCH_OFFSPACETYPE = Block.createSpecialType({
    destroytime: 0,
    explosionres: 0,
    renderlayer: 3,
    rendertype: 2,
    translucency: 1,
    lightlevel: 0,
    material: 4
});

const TORCH_SPACESTYPE = Block.createSpecialType({
    destroytime: 0,
    explosionres: 0,
    rendertype: 91,
    translucency: 1,
    lightopacity: 15,
    lightlevel: 14,
    material: 4
});

const WEB = Block.createSpecialType({
    explosionres: 20,
    rendertype: 91,
    translucency: 0.8,
    lightopacity: 1,
    sound: "grass",
    solid: false,
    material: 4
});

var STONE = Block.createSpecialType({
    solid: true,
    material: 4,
    destroytime: 5,
    renderlayer: 3,
    rendertype: 0,
    translucency: 0,
    lightopacity: 15
});

const WPPTYPE = Block.createSpecialType({
    destroytime: 0,
    explosionres: 0,
    translucency: 1,
    lightopacity: 15,
    lightlevel: 7
});





BlockRegistry.createBlockType("oxygentile_stairs", {
    renderLayer: 3,
});

