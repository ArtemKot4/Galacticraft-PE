
/**
 * IMP-703: oxygen tank HUD - only the bars (no warning pulse, no suffocation).
 * Shows one bar per oxygen tank found in the player inventory (up to 3), client-side only.
 */
const OxygenTanksHud = (() => {
    const MAX_BARS = 3;
    const drawing: any[] = [];
    const elements: Record<string, any> = {};

    for(let i = 0; i < MAX_BARS; i++) {
        const y = 10 + i * 26;

        drawing.push({
            type: "bitmap",
            x: 10,
            y: y,
            bitmap: "machine.bar_empty",
            scale: 2
        });
        elements["o2_bar_" + i] = {
            type: "scale",
            x: 10,
            y: y,
            bitmap: "machine.energy_bar_full",
            scale: 2,
            direction: 1,
            value: 0
        };
    }

    const window = new UI.Window({
        location: {
            x: 6,
            y: 180,
            width: 190,
            height: 100
        },
        drawing: drawing,
        elements: elements
    });
    window.setAsGameOverlay(true);
    window.setTouchable(false);

    return {
        window: window,
        opened: false,

        update(): void {
            try {
                const tankIds = [
                    ItemList.OXYGEN_TANK_LIGHT.id,
                    ItemList.OXYGEN_TANK_MEDIUM.id,
                    ItemList.OXYGEN_TANK_HEAVY.id,
                    ItemList.INFINITE_OXYGEN_TANK.id
                ];
                const tanks: { stored: number, max: number }[] = [];

                for(let slot = 0; slot < 36 && tanks.length < MAX_BARS; slot++) {
                    const item = Player.getInventorySlot(slot);

                    if(item == null || item.id == 0 || tankIds.indexOf(item.id) < 0) {
                        continue;
                    }
                    const max = ChargeItemRegistry.getMaxCharge(item.id, Galacticraft.EnergyTypes.OXYGEN.name) || 1;
                    let stored = ChargeItemRegistry.getEnergyStored(item, Galacticraft.EnergyTypes.OXYGEN.name) || 0;

                    if(!isFinite(stored)) {
                        stored = 0;
                    }
                    tanks.push({ stored: Math.min(stored, max), max: max });
                }
                for(let i = 0; i < MAX_BARS; i++) {
                    const scale: any = this.window.getContent().elements["o2_bar_" + i];

                    if(scale != null) {
                        scale.value = i < tanks.length ? (tanks[i].stored / tanks[i].max) : 0;
                    }
                }
                if(tanks.length > 0 && this.opened == false) {
                    this.opened = true;
                    this.window.open();
                } else if(tanks.length == 0 && this.opened == true) {
                    this.opened = false;
                    this.window.close();
                }
                if(this.opened == true) {
                    this.window.refresh();
                }
            } catch(error) {
                Logger.Log("OxygenTanksHud update failed: " + error, "WARNING");
            }
        }
    };
})();

//code below is useless for future
// Callback.addCallback("LocalTick", function() {
//     if(World.getThreadTime() % 20 == 0) {
//         OxygenTanksHud.update();
//     }
// });
