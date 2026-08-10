const CoalGeneratorUI = new UI.StandartWindow({
	standard: {
		header: {
			text: {
				text: Translation.translate("tile.galacticraft.coal_generator")
			}
		},
		inventory: {
			standard: true
		},
		background: {
			standard: true
		}
	},
	drawing: [
		{
			type: "bitmap",
			x: 490,
			y: 110,
			bitmap: "arrow_bar_1",
			scale: 4.2
		}
	],
	elements: {
		fuel_slot: {
			type: "slot",
			x: 400,
			y: 110,
			bitmap: "machine.coal_generator.slot",
			size: 70
		},
		progress_scale: {
			type: "scale",
			x: 490,
			y: 115,
			scale: 4.2,
			direction: 0,
			bitmap: "arrow_bar_scale"
			// clicker: {
			// 	onClick: function () {
			// 		RV && RV.RecipeTypeRegistry.openRecipePage("generator 2");
			// 	}
			// }
		},
		energy_display: {
			type: "text",
			x: 690,
			y: 130,
			width: 100,
			height: 30,
			text: "0/0 gJ",
			font: {
				color: android.graphics.Color.DKGRAY
			}
		},
		// status: {
		// 	type: "text",
		// 	x: 400,
		// 	y: 220,
		// 	width: 100,
		// 	height: 30,
		// 	text: "Status"
		// }
	}
});
