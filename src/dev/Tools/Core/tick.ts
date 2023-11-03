// Callback.addCallback("LocalTick", function(container) {


// })

Saver.addSavesScope("Fuel", function read(scope): void {
    
    rocket_storage = scope? scope.storageRocket: UI.Container;
}, function save() {
    return {
        StorageRocket: rocket_storage
    }
});