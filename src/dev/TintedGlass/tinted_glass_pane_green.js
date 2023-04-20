
var glss = ["green","black","blue","brown","cyan","gray","light_blue","lime","magenta","orange","pink","purple","red","silver","white","yellow"]
var glsss = ["Green","Black","Blue","Brown","Cyan","Gray","Light Blue","Lime","Magenta","Orange","Pink","Purple","Red","Silver","White","Yellow"]
for(let i in glss){var gl = glss[i]; var g = glsss[i]
IDRegistry.genBlockID("tinted_glass_pane_" + gl);
Block.createBlock("tinted_glass_pane_" + gl,[{name: "Tinted Glass Pane " + g, texture: [["Tinted Glass Pane " + g, 0]], inCreative: true} ], BLOCK_TYPE_GLASS);

IDRegistry.genBlockID("tinted_glass_plane_" + gl);
Block.createBlock("tinted_glass_plane_" + gl,[{name: "Tinted Glass Plane " + g, texture: [["Tinted Glass Pane " + g, 0]], inCreative: true} ], BLOCK_TYPE_PLANE);

IDRegistry.genBlockID("tinted_glass_pane_fence_" + gl);
Block.createBlock("tinted_glass_pane_fence_" + gl,[{name: "Tinted Glass Pane Fence " + g, texture: [["Tinted Glass Pane " + g, 0]], inCreative: true} ], BLOCK_TYPE_FENCE_GL);
	
	IDRegistry.genBlockID("tinted_glass_pane_big_fence_" + gl);
Block.createBlock("tinted_glass_pane_big_fence_" + gl,[{name: "Tinted Glass Pane Big Fence " + g, texture: [["Tinted Glass Pane " + g, 0]], inCreative: true} ], BLOCK_TYPE_FENCEE_GL);

/*IDRegistry.genBlockID("tinted_glass_pane_stairs_" + gl);
BlockRegistry.createStairs("tinted_glass_pane_stairs_" + gl,[{name: "Tinted Glass Pane Stairs " + g, texture: [["Tinted Glass Pane " + g, 0]], inCreative: true} ],BLOCK_TYPE_GLASS);


IDRegistry.genBlockID("tinted_glass_pane_slab_" + gl);
Block.createBlock("tinted_glass_pane_slab_" + gl,[{name: "Tinted Glass Pane Slab" + g, texture: [["Tinted Glass Pane " + g, 0]], inCreative: true} ]);


TileRenderer.makeSlab(BlockID.tinted_glass_pane_slab_ + [gl], BlockID.tinted_glass_pane_ + [gl]);*/
}
Translation.addTranslation("Tinted Glass Pane Green",{
ru: "Зелёное тонированное стекло"
})


Translation.addTranslation("Tinted Glass Pane Black",{
ru: "Чёрное тонированное стекло"
})


Translation.addTranslation("Tinted Glass Pane Blue",{
ru: "Синее тонированное стекло"
})

Translation.addTranslation("Tinted Glass Pane Brown",{
ru: "Коричневое тонированное стекло"
})

Translation.addTranslation("Tinted Glass Pane Cyan",{
ru: "Бирюзовое тонированное стекло"
});

Translation.addTranslation("Tinted Glass Pane Gray",{
ru: "Серое тонированное стекло"
})

Translation.addTranslation("Tinted Glass Pane Light Blue",{
ru: "Голубое тонированное стекло"
});

Translation.addTranslation("Tinted Glass Pane Lime",{
ru: "Лаймовое тонированное стекло"
})

Translation.addTranslation("Tinted Glass Pane Magenta",{
ru: "Пурпурное тонированное стекло"
})

Translation.addTranslation("Tinted Glass Pane Red",{
ru: "Красное тонированное стекло"
})

Translation.addTranslation("Tinted Glass Pane Silver",{
ru: "Серебристое тонированное стекло"
})

Translation.addTranslation("Tinted Glass Pane White",{
ru: "Белое тонированное стекло"
});

Translation.addTranslation("Tinted Glass Pane Yellow",{
ru: "Жёлтое тонированное стекло"
})

Translation.addTranslation("Tinted Glass Pane Pink",{
ru: "Розовое тонированное стекло"
});

Translation.addTranslation("Tinted Glass Pane Orange",{
ru: "Оранжевое тонированное стекло"
})




Translation.addTranslation("Tinted Glass Plane Green",{
ru: "Панель из зелёного тонированного секла"
})


Translation.addTranslation("Tinted Glass Plane Black",{
ru: "Панель из чёрного тонированного стекла"
})


Translation.addTranslation("Tinted Glass Plane Blue",{
ru: "Панель из синего тонированного стекла"
})

Translation.addTranslation("Tinted Glass Plane Brown",{
ru: "Панель из коричневого тонированного стекла"
})

Translation.addTranslation("Tinted Glass Plane Cyan",{
ru: "Панель из бирюзового тонированного стекла"
});

Translation.addTranslation("Tinted Glass Plane Gray",{
ru: "Панель из серого тонированного стекла"
})

Translation.addTranslation("Tinted Glass Plane Light Blue",{
ru: "Панель из чёрного тонированного стекла"
});

Translation.addTranslation("Tinted Glass Plane Lime",{
ru: "Панель из лаймового тонированного стекла"
})

Translation.addTranslation("Tinted Glass Plane Magenta",{
ru: "Панель из пурпурного тонированного стекла"
})

Translation.addTranslation("Tinted Glass Plane Red",{
ru: "Панель из красного тонированного стекла"
})

Translation.addTranslation("Tinted Glass Plane Silver",{
ru: "Панель из серебристого тонированного стекла"
})

Translation.addTranslation("Tinted Glass Plane White",{
ru: "Панель из белого тонированного стекла"
});

Translation.addTranslation("Tinted Glass Plane Yellow",{
ru: "Панель из жёлтого тонированного стекла"
})

Translation.addTranslation("Tinted Glass Plane Orange",{
ru: "Панель из оранжевого тонированного стекла"
});

Translation.addTranslation("Tinted Glass Plane Pink",{
ru: "Панель из розового тонированного стекла"
})

