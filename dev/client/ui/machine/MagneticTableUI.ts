
const MagneticTableUI = new UI.StandartWindow({
	standard: {
		header: {
			text: {
				text: Translation.translate("tile.galacticraft.magnetic_table"),
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
			x: 561,
			y: 130.5,
			bitmap: "arrow_bar_1",
			scale: 2.6,
		},
	],
	elements: {
		rv_arrow: {
			type: "scale",
			x: 561,
			y: 129.2,
			bitmap: "arrow_bar_scale",
			scale: 2.6,
			direction: 0,
			clicker: {
				onClick: function (): void {
					RV && RV.RecipeTypeRegistry.openRecipePage("workbench");
				}
			}
		},
		slot_0: { type: "slot", x: 380, y: 60, size: 60 },
		slot_1: { type: "slot", x: 440, y: 60, size: 60 },
		slot_2: { type: "slot", x: 500, y: 60, size: 60 },
		slot_3: { type: "slot", x: 380, y: 120, size: 60 },
		slot_4: { type: "slot", x: 440, y: 120, size: 60 },
		slot_5: { type: "slot", x: 500, y: 120, size: 60 },
		slot_6: { type: "slot", x: 380, y: 180, size: 60 },
		slot_7: { type: "slot", x: 440, y: 180, size: 60 },
		slot_8: { type: "slot", x: 500, y: 180, size: 60 },
		result_slot: { type: "slot", x: 620, y: 120, size: 70 },
		container_slot_0: { type: "slot", x: 380, y: 250, size: 40, iconScale: 0.8 },
		container_slot_1: { type: "slot", x: 420, y: 250, size: 40, iconScale: 0.8 },
		container_slot_2: { type: "slot", x: 460, y: 250, size: 40, iconScale: 0.8 },
		container_slot_3: { type: "slot", x: 500, y: 250, size: 40, iconScale: 0.8 },
		container_slot_4: { type: "slot", x: 540, y: 250, size: 40, iconScale: 0.8 },
		container_slot_5: { type: "slot", x: 580, y: 250, size: 40, iconScale: 0.8 },
		container_slot_6: { type: "slot", x: 620, y: 250, size: 40, iconScale: 0.8 },
		container_slot_7: { type: "slot", x: 660, y: 250, size: 40, iconScale: 0.8 },
		container_slot_8: { type: "slot", x: 700, y: 250, size: 40, iconScale: 0.8 },
		clear_button: {
			type: "button",
			x: 380,
			y: 300,
			scale: 1.4,
			bitmap: "Button",
			bitmap2: "button_1",
			clicker: {
				onClick: function (_: any, container: any): void {
					container.sendEvent("clearGrid", {});
				}
			}
		},
	},
});
