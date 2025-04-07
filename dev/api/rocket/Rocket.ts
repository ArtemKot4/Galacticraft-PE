abstract class Rocket {
    abstract getType(): string;
    abstract getFuelCapacity(): number;

    public entity: number;
    public container: ItemContainer;
    public fuel: number;
    
    public constructor(entity: number) {
        this.entity = entity;
        this.container = new ItemContainer();
        this.container.setGlobalSlotSavingEnabled(true);
        this.container.setClientContainerTypeName("galacticraft:rocket_" + entity);

        Network.sendToAllClients("packet.galacticraft.register_rocket_screen_factory", { entity });
    };

    public getPosition(): Vector {
        const pos = Entity.getPosition(this.entity);
        return { x: pos.x + 0.5, y: pos.y, z: pos.z + 0.5 };
    };
};