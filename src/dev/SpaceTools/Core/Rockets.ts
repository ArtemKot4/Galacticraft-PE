IDRegistry.genItemID("rocket_tier_1");
Item.createItem("rocket_tier_1", "Rocket Tier 1", {
    name: "rocket_tierik1", meta: 0
}, {
    stack: 1, isTech: true
});
Translation.addTranslation("Rocket Tier 1", {
    ru: "Ракета 1-го уровня"
});



Item.registerUseFunction("rocket_tier_1", function(coords, item, block, player) {
    if (block.id == BlockID.rocket_padding_completed) {

        var region = BlockSource.getDefaultForActor(player);

        var place = coords.relative

        region.spawnEntity(
            place.x+0.6,
            place.y,
            place.z-0.5,
            "galacticraft:rocket_1")

        Entity.setCarriedItem(
            player,
            item.id,
            item.count - 1,
            item.data);
        // Game.message("§7Ракета первого уровня успешно состыкована с посадочной площадкой")
    }
});
var SPC_b1 = new UI.Container();
var SPC_b2 = new UI.Container();
var SPC_b3 = new UI.Container();
var InterFace = new UI.Container();
var Roket = new UI.Container();
/*Callback.addCallback("ItemUse", function (coords, item, block) {
	if(block.id === BlockID.rocket_1_tier){
		Player.setPosition(coords.x, coords.y + 2, coords.z);
	SPC_b1.openAs(wrum);
		SPC_b2.openAs(exit);
	SPC_b3.openAs(rocketgui);
		Player.addEffect(Player.get(), Native.PotionEffect.movementSlowdown, 100000, 100000000);
		Player.setFlyingEnabled(true);
		Player.setFlying(true);
		Game.message("§c§lВы находитесь в ракете,убедитесь что вы надели скафандр,загрузили и заправили ракету.")
	}
 });*/


Callback.addCallback('EntityInteract', function (entity, player,coords) {
    if (Entity.getTypeName(entity)=="galacticraft:rocket_1<>") {

        alert("DEBUG");
          Game.message(Translation.translate("§cYou are in a rocket, make sure you put on a spacesuit, loaded and refueled the rocket"))
      /*  Entity.setVelocity(coords.x, coords.y+0.3, coords.z, "spacescraft:rocket_1");
        Entity.addPosition("spacescraft:rocket_1", coords.x , coords.y+0.1, coords.z);*/
		 if (__config__.getBool("Gameplay.Special_Effects")==true) {
			 if(Entity.getPosition(entity)){
                Particles.addParticle(
                    rocket_particle, this.x + 0.5,
                    this.y - 1,
                    this.z + 0.5,
                    Math.random()/20,
                    Math.random()/20,
                    Math.random()/20);
		 }}
         alert("Congratulations ArtemOn!")
    }
	
   /* if (
        Entity.getSneaking(player) &&
        Entity.getTypeName(
            "spacescraft:rocket_1"
        )
    ) {
        let window = getWindow
        (BlockID.Pad_Normal,
            Rocketry);
        Roket.openAs(window)

    }*/
});



// let Rocketry = new UI.StandartWindow({
//     standard: {
//         header: {
//             text: {
//                 text: Translation.translate("Хранилище топлива")
//             },
//         },
//         inventory: {
//             standard: true
//         },
//         background: {
//             standard: true
//         }
//     },
//     drawing: [{
//         type: "bitmap",
//         x: 500,
//         y: 130,
//         bitmap: "RocketStorage1",
//         scale: 5.4
//     }],
//     elements: {
//         fuelScale: {
//             type: "scale",
//             x: 500,
//             y: 130,
//             bitmap: "RocketStorage2",
//             scale: 5.4
//         }}});

// var rocketgui = new UI.Window({
//     location: {
//         x: 1000 / 2 - 80,
//         y: 273,
//         width: 48,
//         height: 24
//     },
//     drawing: [],
//     elements: {
//         "exit": {
//             type: "button",
//             text: "Спешиться",
//             x: 0,
//             y: 0,
//             bitmap: "SPC.SPC_button",
//             bitmap2: "SPC.SPC_button2",
//             scale: 250,
//             clicker: {
//                 onClick: function () {
//                     SPC_b1.close();
//                     SPC_b2.close();
//                     SPC_b3.close();
//                     let window = getWindow(BlockID.Pad_Normal, Rocketry);
//                     Roket.openAs(window);
//                 }
//             }
//         },
//     }
// });

/*var nextvariant = new UI.Window({
	location: {
    	x: 1000 / 2 - 80,
        y: 313,
        width: 660,
        height: 24
    },
    drawing: [],
    elements: {
        "next": {
        	type: "button",
			text: "варианты",
			x: 0,
			y: 0,
			bitmap: "SPC.SPC_nextleft",
			bitmap2: "SPC.SPC_nextleftPRESSED",
			scale: 2.1,
			clicker: {
            	onClick: function () {
					SPC_b1.close();
					SPC_b2.close();
					SPC_b3.close();
					Player.setFlying(false);
					Player.setPosition(Player.getPosition().x + 2, Player.getPosition().y, Player.getPosition().z);
					Player.clearEffects(Player.get());
                }
            }
		},
	}
});
*/





// var Rockemesh = new RenderMesh();
// Rockemesh.setBlockTexture("rocket_t2", 0);
// Rockemesh.importFromFile(__dir__+"/resources/models/rocket_tier2.obj", "obj", null);
// IDRegistry.genBlockID("rocket_2_tier");
// Block.createBlockWithRotation("rocket_2_tier", [{
//     name: "Rocket Tier 2",
//     texture: [["rocket_t2",
//         0],
//         ["rocket_t2",
//             1],
//         ["rocket_t2",
//             2],
//         ["rocket_t2",
//             3],
//         ["rocket_t2",
//             4],
//         ["rocket_t2",
//             5]],
//     inCreative: false
// }]);
// var Rockerender = new ICRender.Model();
// Rockerender.addEntry(new BlockRenderer.Model(Rockemesh));
// BlockRenderer.setStaticICRender(BlockID.rocket_2_tier, 0, Rockerender);

// IDRegistry.genItemID("rocket_2");
// Item.createItem("rocket_2", "Rocket Tier 2", {
//     name: "rocket_tierik2",
//     meta: 0
// }, {
//     stack: 1,
//     isTech: true
// });
// Translation.addTranslation("Rocket Tier 2", {
//     ru: "Ракета 2-го уровня"
// });

// Block.registerDropFunction("rocket_2_tier", function(coords, blockID) {
//     return [[ItemID.rocket_2,
//         1,
//         0]]
// });

// Item.registerUseFunction("rocket_2", function(coords, item, block, player) {
//     var region = BlockSource.getDefaultForActor(player);
//     var place = coords.relative;
//     if (region.getBlockId(place.x, place.y-1, place.z) == BlockID.Padding1lvl) {
//         region.setBlock(place.x, place.y-1, place.z, BlockID.rocket_2_tier,0);
//         Player.setCarriedItem(player, item.id, item.count - 1, item.extra);
//         Game.message("§7Ракета второго уровня успешно состыкована с посадочной площадкой")
//     }
// });

// var SPC_c1 = new UI.Container();
// var InterFacce = new UI.Container();
// Callback.addCallback("ItemUse", function (coords, item, block) {
//     if (block.id === BlockID.rocket_2_tier) {
//         Player.setPosition(coords.x, coords.y + 2, coords.z);
//         SPC_c1.openAs(vrum);
//         //SPC_b2.openAs(exit);
//         SPC_b3.openAs(rocketgui);
//         Player.addEffect(Player.get(), Native.PotionEffect.movementSlowdown, 100000, 100000000);
//         Player.setFlyingEnabled(true);
//         Player.setFlying(true);
//         Game.message("§c§lВы находитесь в ракете,убедитесь что вы надели скафандр,загрузили и заправили ракету.")
//     }
// });



// var vrum = new UI.Window({
//     location: {
//         x: 1000 / 2 - 80,
//         y: 350,
//         width: 48,
//         height: 24
//     },
//     drawing: [],
//     elements: {
//         "btn": {
//             type: "button",
//             x: 0,
//             y: 0,
//             bitmap: "SPC.SPC_button",
//             bitmap2: "SPC.SPC_button2",
//             text: "полёт",
//             scale: 250,
//             clicker: {
//                 onClick: function () {},
//             }
//         }}});




// var Rocktmesh = new RenderMesh();
// Rocktmesh.setBlockTexture("rocket_t3", 0);
// Rocktmesh.importFromFile(__dir__+"/resources/models/rocket_tier3.obj", "obj", {
//     translate: [0.5, 0.5, 0.0],
//     invertV: false,
//     noRebuild: false
// });
// IDRegistry.genBlockID("rocket_3_tier");
// Block.createBlockWithRotation("rocket_3_tier", [{
//     name: "Rocket Tier 3",
//     texture: [["rocket_t3",
//         0],
//         ["rocket_t3",
//             1],
//         ["rocket_t3",
//             2],
//         ["rocket_t3",
//             3],
//         ["rocket_t3",
//             4],
//         ["rocket_t3",
//             5]],
//     inCreative: false
// }]);
// var Rocktrender = new ICRender.Model();
// Rocktrender.addEntry(new BlockRenderer.Model(Rocktmesh));
// BlockRenderer.setStaticICRender(BlockID.rocket_3_tier, 0, Rocktrender);

// IDRegistry.genItemID("rocket_3");
// Item.createItem("rocket_3", "Rocket Tier 3", {
//     name: "rocket_tierik3",
//     meta: 0
// }, {
//     stack: 1,
//     isTech: true
// });
// Translation.addTranslation("Rocket Tier 3", {
//     ru: "Ракета 3-го уровня"
// });

// Block.registerDropFunction("rocket_3_tier", function(coords, blockID) {
//     return [[ItemID.rocket_3,
//         1,
//         0]]
// });

// Item.registerUseFunction("rocket_3", function(coords, item, block, player) {
//     var region = BlockSource.getDefaultForActor(player);
//     var place = coords.relative;
//     if (region.getBlockId(place.x, place.y-1, place.z) == BlockID.Padding1lvl) {
//         region.setBlock(place.x, place.y-1, place.z, BlockID.rocket_3_tier,0);
//         Player.setCarriedItem(player, item.id, item.count - 1, item.extra);
//         Game.message("§7Ракета третьего уровня успешно состыкована с посадочной площадкой")
//     }
// });

// var SPC_d1 = new UI.Container();
// var InterFaccce = new UI.Container();
// Callback.addCallback("ItemUse", function (coords, item, block) {
//     if (block.id === BlockID.rocket_3_tier) {
//         Player.setPosition(coords.x, coords.y + 2, coords.z);
//         SPC_d1.openAs(wvrum);
//         //SPC_b2.openAs(exit);
//         //SPC_b3.openAs(rocketgui);
//         //Player.addEffect(Player.get(), Native.PotionEffect.movementSlowdown, 100000, 100000000);
//         Player.setFlyingEnabled(true);
//         Player.setFlying(true);
//         Game.message("§c§lВы находитесь в ракете,убедитесь что вы надели скафандр,загрузили и заправили ракету.")
//     }
// });



// var wvrum = new UI.Window({
//     location: {
//         x: 1000 / 2 - 80,
//         y: 350,
//         width: 48,
//         height: 24
//     },
//     drawing: [],
//     elements: {
//         "btn": {
//             type: "button",
//             x: 0,
//             y: 0,
//             bitmap: "SPC.SPC_button",
//             bitmap2: "SPC.SPC_button2",
//             text: "полёт",
//             scale: 250,
//             clicker: {
//                 onClick: function () {},
//             }
//         }}});