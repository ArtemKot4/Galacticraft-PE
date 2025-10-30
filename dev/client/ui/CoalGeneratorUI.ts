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
		},
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
		coal_slot: {
			type: "slot",
			x: 400,
			y: 110,
			bitmap: "coal_slot",
			size: 70
		},
		progress_scale: {
			type: "scale",
			x: 490,
			y: 110,
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
			x: 400,
			y: 190,
			width: 100,
			height: 30,
			text: "0/0 gJ"
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
