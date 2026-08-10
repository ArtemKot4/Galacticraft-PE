const CompressorUI = new UI.StandartWindow({
	standard: {
		header: {
			text: {
				text: Translation.translate("tile.galacticraft.compressor"),
			},
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
			scale: 4.2
		},
		{
			type: "bitmap",
			x: 630,
			y: 150,
			bitmap: "machine.fire_scale_empty",
			scale: 4.1
		}
	],
	elements: {
		progress_scale: {
			type: "scale",
			x: 590,
			y: 150,
			direction: 0,
			bitmap: "machine.compressor.progress_scale_full",
			scale: 4.2,
			//   clicker: {
			//     onClick: function () {
			//       RV && RV.RecipeTypeRegistry.openRecipePage("Compressor");
			//     },
			//   },
		},
		burning_scale: {
			type: "scale",
			x: 630,
			y: 150,
			direction: 1,
			bitmap: "machine.fire_scale_full",
			scale: 4.1
		},
		fuel_slot: {
			type: "slot",
			x: 530,
			y: 300,
			bitmap: "machine.coal_generator.slot",
			size: 60,
			iconScale: 0.9
		},
		slot_1: {
			type: "slot",
			x: 410,
			y: 110,
			size: 60,
			iconScale: 0.9
		},
		slot_2: {
			type: "slot",
			x: 470,
			y: 110,
			size: 60,
			iconScale: 0.9
		},
		slot_3: {
			type: "slot",
			x: 530,
			y: 110,
			size: 60,
			iconScale: 0.9
		},
		slot_4: {
			type: "slot",
			x: 410,
			y: 170,
			size: 60,
			iconScale: 0.9
		},
		slot_5: {
			type: "slot",
			x: 470,
			y: 170,
			size: 60,
			iconScale: 0.9
		},
		slot_6: {
			type: "slot",
			x: 530,
			y: 170,
			size: 60,
			iconScale: 0.9
		},
		slot_7: {
			type: "slot",
			x: 410,
			y: 230,
			size: 60,
			iconScale: 0.9
		},
		slot_8: {
			type: "slot",
			x: 470,
			y: 230,
			size: 60,
			iconScale: 0.9
		},
		slot_9: {
			type: "slot",
			x: 530,
			y: 230,
			size: 60,
			iconScale: 0.9
		},
		result_slot: {
			type: "slot",
			x: 830,
			y: 190,
			size: 70,
		},
		/*status: {
			type: "text",
			x: 650,
			y: 290,
			width: 100,
			height: 30,
			text: "Status: "
		}*/
	}
});
