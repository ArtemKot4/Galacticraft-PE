const RefineryUI = new UI.StandartWindow({
	standard: {
		header: {
			text: {
				text: Translation.translate("tile.galacticraft.refinery"),
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
			x: 268,
			y: 190,
			bitmap: "machine.liquid_scale",
			scale: 3.8
		},
		{
			type: "bitmap",
			x: 769,
			y: 190,
			bitmap: "machine.liquid_scale",
			scale: 3.8
		},
		{
			type: "bitmap",
			x: 500,
			y: 70,
			bitmap: "machine.energy_bar_empty",
			scale: 3
		},
		{
			type: "bitmap",
			x: 640,
			y: 70,
			bitmap: "machine.energy_icon_off",
			scale: 3,
		},
	],
	elements: {
		oil_liquid_slot: {
			type: "slot",
			x: 355,
			y: 120,
			size: 70,
			bitmap: "machine.canister_slot",
            iconScale: 0.9
		},
		oil_liquid_scale: {
			type: "scale",
			x: 268,
			y: 190,
			bitmap: "machine.oil_scale",
			scale: 3.8,
			direction: 1,
			clicker: {
				onClick: function () {
					/* RV && RV.RecipeTypeRegistry.openRecipePage("refinery");*/
				}
			}
		},
		fuel_liquid_scale: {
			type: "scale",
			x: 769,
			y: 190,
			bitmap: "machine.fuel_scale",
			scale: 3.8,
			direction: 1,
			clicker: {
				onClick: function () {
					/* RV && RV.RecipeTypeRegistry.openRecipePage("refinery");*/
				}
			}
		},
		fuel_liquid_slot: {
			type: "slot",
			x: 855,
			y: 120,
			size: 70,
			bitmap: "machine.canister_slot",
            iconScale: 0.9
		},
		energy_bar: {
			type: "scale",
			x: 500,
			y: 70,
			bitmap: "machine.energy_bar_full",
			scale: 3,
			direction: 0
		},
		energy_icon: {
			type: "scale",
			x: 640,
			y: 70,
			bitmap: "machine.energy_icon_on",
			scale: 3,
			direction: 1
		},
		// energy_display: {
		// 	type: "text",
		// 	x: 690,
		// 	y: 80,
		// 	width: 100,
		// 	height: 30,
		// 	text: "Space Joule"
		// },
		energy_slot: {
			type: "slot",
			x: 455,
			y: 260,
			size: 70,
			bitmap: "machine.energy_slot"
		}
	}
});