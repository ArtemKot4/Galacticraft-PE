const DeconstructorUI = new UI.StandartWindow({
	standard: {
		header: {
			text: {
				text: Translation.translate("tile.galacticraft.deconstructor"),
			},
		},
		inventory: {
			standard: true,
		},
		background: {
			standard: true,
		},
	},
	drawing: [
		{
			type: "bitmap",
			x: 469,
			y: 63.5,
			bitmap: "arrow_bar_1",
			scale: 4.2,
		},
		{
			type: "bitmap",
			x: 360,
			y: 230,
			bitmap: "machine.energy_bar_empty",
			scale: 3,
		},
	],
	elements: {
		input_slot: {
			type: "slot",
			x: 370,
			y: 60,
			size: 70,
		},
		battery_slot_discharge: {
			type: "slot",
			x: 370,
			y: 150,
			size: 60,
			bitmap: "machine.energy_slot",
		},
		energy_bar: {
			type: "scale",
			x: 360,
			y: 230,
			bitmap: "machine.energy_bar_full",
			scale: 3,
			direction: 0,
		},
		progress_scale: {
			type: "scale",
			x: 469,
			y: 61.4,
			scale: 4.2,
			direction: 0,
			bitmap: "arrow_bar_scale",
		},
		output_slot_1: { type: "slot", x: 590, y: 60, size: 60 },
		output_slot_2: { type: "slot", x: 650, y: 60, size: 60 },
		output_slot_3: { type: "slot", x: 710, y: 60, size: 60 },
		output_slot_4: { type: "slot", x: 590, y: 120, size: 60 },
		output_slot_5: { type: "slot", x: 650, y: 120, size: 60 },
		output_slot_6: { type: "slot", x: 710, y: 120, size: 60 },
		output_slot_7: { type: "slot", x: 590, y: 180, size: 60 },
		output_slot_8: { type: "slot", x: 650, y: 180, size: 60 },
		output_slot_9: { type: "slot", x: 710, y: 180, size: 60 },
	},
});
