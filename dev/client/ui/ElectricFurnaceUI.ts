
function createGalacticraftFurnaceUI(titleKey: string, showSecondOutput: boolean = true): UI.IWindow {
	const elements: Record<string, any> = {
		battery_slot_discharge: {
			type: "slot",
			x: 340,
			y: 190,
			size: 60,
			bitmap: "machine.energy_slot",
		},
		input_slot: {
			type: "slot",
			x: 430,
			y: 90,
			size: 70,
		},
		result_slot: {
			type: "slot",
			x: 650,
			y: 90,
			size: 70,
		},
		progress_scale: {
			type: "scale",
			x: 540,
			y: 100,
			scale: 4.2,
			direction: 0,
			bitmap: "arrow_bar_scale",
			clicker: {
				onClick: function (): void {
					RV && RV.RecipeTypeRegistry.openRecipePage("furnace");
				}
			}
		},
		energy_bar: {
			type: "scale",
			x: 350,
			y: 270,
			bitmap: "machine.energy_bar_full",
			scale: 3,
			direction: 0,
		},
	};

	if(showSecondOutput) {
		elements["result_slot_2"] = {
			type: "slot",
			x: 730,
			y: 90,
			size: 70,
		};
	}

	return new UI.StandartWindow({
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
				x: 540,
				y: 100,
				bitmap: "arrow_bar_1",
				scale: 4.2,
			},
			{
				type: "bitmap",
				x: 350,
				y: 270,
				bitmap: "machine.bar_empty",
				scale: 3,
			},
		],
		elements: elements,
	});
}

const ElectricFurnaceUI = createGalacticraftFurnaceUI("tile.galacticraft.electric_furnace", false);
const ArcFurnaceUI = createGalacticraftFurnaceUI("tile.galacticraft.arc_furnace", true);
