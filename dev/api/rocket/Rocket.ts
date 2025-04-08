interface IRocketTargetContainer {
    galaxy: string;
    system: string;
    planet: string[];
}

abstract class Rocket {
    abstract getTier(): number;
    abstract getFuelCapacity(): number;
    abstract getTargetList(): IRocketTargetContainer[];

    public entity: number;
    public container: ItemContainer;
    public fuel: number;
    public launched: boolean;
    
    public constructor(entity: number) {
        this.entity = entity;
        this.launched = false;
        this.container = new ItemContainer();
        this.container.setGlobalSlotSavingEnabled(true);
        this.container.setClientContainerTypeName("galacticraft.rocket:" + entity);

        Network.sendToAllClients("packet.galacticraft.register_rocket_screen_factory", { entity });
    };

    public getPosition(): Vector {
        const pos = Entity.getPosition(this.entity);
        return { x: pos.x + 0.5, y: pos.y, z: pos.z + 0.5 };
    };
};

Network.addClientPacket("packet.galacticraft.register_rocket_screen_factory", (data: { entity: number }) => {
    ItemContainer.registerScreenFactory("galacticraft.rocket:" + data.entity, (container, screenName) => {
        if(screenName === "fuel_storage") {
            return new UI.StandardWindow();
        };
    });
});