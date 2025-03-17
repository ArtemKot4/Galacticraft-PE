namespace ItemList {
    export const CANISTER = new Canister();
    export const MACHINE_WRENCH = new MachineWrench();
    export const PRELAUNCH_CHECKLIST = new PrelaunchChecklist();
    export const ALIEN_FLESH = new BasicItem<Item.FoodParams>("alien_flesh", {
        name: "alien_flesh",
        meta: 0
    }, {
        food: 6
    });
};