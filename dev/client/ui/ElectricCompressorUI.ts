const ElectricCompressorUI = new UI.StandartWindow({
	standard: {
		header: {
			text: {
				text: Translation.translate("tile.galacticraft.electric_compressor"),
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
			x: 590,
			y: 150,
			bitmap: "machine.compressor.progress_scale_empty",
			scale: 4.2,
		},
		{
			type: "bitmap",
			x: 346,
			y: 320,
			bitmap: "machine.energy_bar_empty",
			scale: 3,
		},
		{
			type: "bitmap",
			x: 335,
			y: 320,
			bitmap: "machine.energy_icon_off",
			scale: 3,
		},
	],
	elements: {
		progress_scale: {
			type: "scale",
			x: 590,
			y: 150,
			direction: 0,
			bitmap: "machine.compressor.progress_scale_full",
			scale: 4.2,
			// clicker: {
			//   onClick: function () {
			//     RV && RV.RecipeTypeRegistry.openRecipePage("Compressor");
			//   },
			// },
		},
		// Elect4: {
		// 	type: "scale",
		// 	x: 630,
		// 	y: 150,
		// 	direction: 1,
		// 	bitmap: "fire_scale",
		// 	scale: 4.1,
		// },
		energy_slot: {
			type: "slot",
			x: 530,
			y: 300,
			bitmap: "machine.energy_slot",
			size: 60
		},
		slot_1: {
			type: "slot",
			x: 410,
			y: 110,
			size: 60
		},
		slot_2: {
			type: "slot",
			x: 470,
			y: 110,
			size: 60
		},
		slot_3: {
			type: "slot",
			x: 530,
			y: 110,
			size: 60
		},
		slot_4: {
			type: "slot",
			x: 410,
			y: 170,
			size: 60
		},
		slot_5: {
			type: "slot",
			x: 470,
			y: 170,
			size: 60
		},
		slot_6: {
			type: "slot",
			x: 530,
			y: 170,
			size: 60
		},
		slot_7: {
			type: "slot",
			x: 410,
			y: 230,
			size: 60
		},
		slot_8: {
			type: "slot",
			x: 470,
			y: 230,
			size: 60
		},
		slot_9: {
			type: "slot",
			x: 530,
			y: 230,
			size: 60
		},
		energy_bar: {
			type: "scale",
			x: 346,
			y: 320,
			bitmap: "machine.energy_bar_full",
			scale: 3,
			direction: 0
		},
		energy_icon: {
			type: "scale",
			x: 335,
			y: 320,
			bitmap: "machine.energy_icon_on",
			scale: 3,
			direction: 1,
		},
		result_slot_1: {
			type: "slot",
			x: 830,
			y: 221,
			size: 60,
		},
		result_slot_2: {
			type: "slot",
			x: 830,
			y: 161,
			size: 60,
		},
		// Status: {
		// 	type: "text",
		// 	x: 650,
		// 	y: 290,
		// 	width: 100,
		// 	height: 30,
		// 	text: "Статус: ",
		// },
	}
});
