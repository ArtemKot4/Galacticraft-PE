const CircuitFabricatorUI = new UI.StandardWindow({
	standard: {
		header: {
			text: {
				text: Translation.translate("tile.galacticraft.circuit_fabricator")
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
			x: 355,
			y: 65,
			bitmap: "machine.circuit_fabricator.line1_off",
			scale: 3.8
		},
		{
			type: "bitmap",
			x: 436,
			y: 295,
			bitmap: "machine.energy_bar_empty",
			scale: 3.2
		},
		{
			type: "bitmap",
			x: 425,
			y: 295,
			bitmap: "machine.energy_icon_off",
			scale: 3.2
		},
		{
			type: "bitmap",
			x: 568,
			y: 150,
			bitmap: "machine.circuit_fabricator.line2_off",
			scale: 3.8
		},
		{
			type: "bitmap",
			x: 720,
			y: 95,
			bitmap: "machine.circuit_fabricator.line3_off",
			scale: 3.8
		},
		{
			type: "bitmap",
			x: 565,
			y: 65,
			bitmap: "machine.circuit_fabricator.heat_scale_empty",
			scale: 3.2
		},
	],
	elements: {
		line_1: {
			type: "scale",
			x: 355,
			y: 65,
			bitmap: "machine.circuit_fabricator.line1",
			scale: 3.8,
			direction: 1
		},
		line_2: {
			type: "scale",
			x: 568,
			y: 150,
			bitmap: "machine.circuit_fabricator.line2",
			scale: 3.8,
			direction: 0
		},
		line_3: {
			type: "scale",
			x: 720,
			y: 95,
			bitmap: "machine.circuit_fabricator.line3",
			scale: 3.8,
			direction: 0
		},
        energy_slot: {
			type: "slot",
			x: 330,
			y: 290,
			size: 60,
			bitmap: "machine.energy_slot"
		},
		//diamond
		diamond_slot: {
			type: "slot",
			x: 340,
			y: 40,
			size: 60,
			bitmap: "machine.circuit_fabricator.diamond_slot"
		},
		//fabricator 1
		fabricator_slot_1: {
			type: "slot",
			x: 515,
			y: 135,
			size: 60,
			bitmap: "machine.circuit_fabricator.fabricator_slot"
		},
		//fabricator 2
		fabricator_slot_2: {
			type: "slot",
			x: 515,
			y: 195,
			size: 60,
			bitmap: "machine.circuit_fabricator.fabricator_slot"
		},
		//dust
		dust_slot: {
			type: "slot",
			x: 682,
			y: 130,
			size: 60,
			bitmap: "machine.circuit_fabricator.dust_slot"
		},
		//slot up
		plate_slot: {
			type: "slot",
			x: 745,
			y: 50,
			size: 60
		},
		result_slot: {
			type: "slot",
			x: 769,
			y: 278,
			size: 60
		},
		burning_scale: {
			type: "scale",
			x: 565,
			y: 65,
			bitmap: "machine.circuit_fabricator.heat_scale_full",
			scale: 3.2,
			direction: 0
		},
		energy_bar: {
			type: "scale",
			x: 436,
			y: 295,
			bitmap: "machine.energy_bar_full",
			scale: 3.2,
			direction: 0
		},
		energy_icon: {
			type: "scale",
			x: 425,
			y: 295,
			bitmap: "machine.energy_icon_on",
			scale: 3.2,
			direction: 1
		}
	}
});
