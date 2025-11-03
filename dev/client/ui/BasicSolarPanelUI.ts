const BasicSolarPanelUI = new UI.StandardWindow({
	standard: {
		header: {
			text: {
				text: Translation.translate("Solar panel"),
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
			x: 380,
			y: 60,
			bitmap: "generators.sunscale_0",
			scale: 3.0,
		},
		{
			type: "bitmap",
			x: 460,
			y: 65,
			bitmap: "slace_en_0",
			scale: 3,
		},
		{
			type: "bitmap",
			x: 600,
			y: 65,
			bitmap: "en_noy",
			scale: 3,
		},
	],
	elements: {
		sunscale: {
			type: "scale",
			x: 380,
			y: 60,
			scale: 3.0,
			bitmap: "generators.sunscale_1",
			direction: 1,
		},
		ENERGYBar: {
			type: "scale",
			x: 460,
			y: 65,
			bitmap: "slace_en_1",
			scale: 3,
			direction: 0,
		},
		Energy: {
			type: "scale",
			x: 600,
			y: 65,
			bitmap: "en_yes",
			scale: 3,
			direction: 1,
		},
		EnergyText: {
			type: "text",
			x: 450,
			y: 110,
			width: 100,
			height: 30,
			text: "Space Joule",
		},

		Status: {
			type: "text",
			x: 450,
			y: 140,
			width: 100,
			height: 30,
			text: "Status",
		},
		LightLevel: {
			type: "text",
			x: 450,
			y: 170,
			width: 100,
			height: 30,
			text: "Status",
		},

		EnergySlot: {
			type: "slot",
			x: 700,
			y: 60,
			size: 50,
			bitmap: "Others.en_slot",
		},
	},
});
