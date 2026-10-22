function createGalacticraftSolarPanelUI(titleKey: string): UI.IWindow {
	return new UI.StandardWindow({
		standard: {
			header: {
				text: {
					text: Translation.translate(titleKey),
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
				x: 126,
				y: 62,
				bitmap: "generators.sunscale_0",
				scale: 4.5,
			},
			{
				type: "bitmap",
				x: 234,
				y: 66,
				bitmap: "machine.energy_icon_off",
				scale: 4.5,
			},
			{
				type: "bitmap",
				x: 333,
				y: 57,
				bitmap: "machine.energy_bar_empty",
				scale: 4.5,
			},
		],
		elements: {
			sunscale: {
				type: "scale",
				x: 126,
				y: 62,
				scale: 4.5,
				bitmap: "generators.sunscale_1",
				direction: 1,
			},
			energy_icon: {
				type: "scale",
				x: 234,
				y: 66,
				bitmap: "machine.energy_icon_on",
				scale: 4.5,
				direction: 1,
			},
			energy_bar: {
				type: "scale",
				x: 333,
				y: 57,
				bitmap: "machine.energy_bar_full",
				scale: 4.5,
				direction: 0,
			},
			status_display: {
				type: "text",
				x: 180,
				y: 182,
				width: 480,
				height: 45,
				font: {
					size: 30,
				},
				text: "",
			},
			generating_display: {
				type: "text",
				x: 180,
				y: 227,
				width: 480,
				height: 45,
				font: {
					size: 30,
				},
				text: "",
			},
			boost_display: {
				type: "text",
				x: 180,
				y: 272,
				width: 480,
				height: 45,
				font: {
					size: 30,
				},
				text: "",
			},
			energy_display: {
				type: "text",
				x: 180,
				y: 317,
				width: 480,
				height: 45,
				font: {
					size: 30,
				},
				text: "",
			},
			battery_slot_charge: {
				type: "slot",
				x: 638,
				y: 65,
				size: 75,
				bitmap: "machine.energy_slot",
			},
		},
	});
}

const BasicSolarPanelUI = createGalacticraftSolarPanelUI("tile.galacticraft.basic_solar");
const AdvancedSolarPanelUI = createGalacticraftSolarPanelUI("tile.galacticraft.advanced_solar");
