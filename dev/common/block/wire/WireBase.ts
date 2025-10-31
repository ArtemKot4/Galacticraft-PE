abstract class WireBase extends BasicBlock {
    public render: ICRender.Model;
    public shape: ICRender.CollisionShape;

    public constructor(stringID: string, variationList?: Block.BlockVariation[]) {
        super(stringID, variationList);
        this.getEnergyTypes().forEach(type => EnergyTileRegistry.addEnergyTypeForId(this.id, type));
        this.doModel();
    }

    public doModel(): void {
        this.render = new ICRender.Model();
		this.shape = new ICRender.CollisionShape();

        this.getGroup().add(this.id, -1);
        this.setWireConnecting()
        this.setMachineConnecting();
        BlockRenderer.setStaticICRender(this.id, -1, this.render);
        BlockRenderer.setCustomCollisionAndRaycastShape(this.id, -1, this.shape);
    }

    abstract getEnergyTypes(): EnergyType[];

    public getWidth(): number {
        return 2 / 8;
    }

    public setWireConnecting(): void {
        const width = this.getWidth() / 2;
		const boxes = [
			{ side: [1, 0, 0], box: [0.5 + width, 0.5 - width, 0.5 - width, 1, 0.5 + width, 0.5 + width] },
			{ side: [-1, 0, 0], box: [0, 0.5 - width, 0.5 - width, 0.5 - width, 0.5 + width, 0.5 + width] },
			{ side: [0, 1, 0], box: [0.5 - width, 0.5 + width, 0.5 - width, 0.5 + width, 1, 0.5 + width] },
			{ side: [0, -1, 0], box: [0.5 - width, 0, 0.5 - width, 0.5 + width, 0.5 - width, 0.5 + width] },
			{ side: [0, 0, 1], box: [0.5 - width, 0.5 - width, 0.5 + width, 0.5 + width, 0.5 + width, 1] },
			{ side: [0, 0, -1], box: [0.5 - width, 0.5 - width, 0, 0.5 + width, 0.5 + width, 0.5 - width] }
		];

		for(const box of boxes) {
			const condition = ICRender.BLOCK(box.side[0], box.side[1], box.side[2], this.getGroup(), false);
            
            this.render.addEntry(new BlockRenderer.Model(box.box[0], box.box[1], box.box[2], box.box[3], box.box[4], box.box[5], this.id, -1))
            .setCondition(condition);
			this.shape.addEntry()
            .setCondition(condition)
            .addBox(box.box[0], box.box[1], box.box[2], box.box[3], box.box[4], box.box[5]);
		}
		this.render.addEntry(new BlockRenderer.Model(0.5 - width, 0.5 - width, 0.5 - width, 0.5 + width, 0.5 + width, 0.5 + width, this.id, -1));
        this.shape.addEntry().addBox(0.5 - width, 0.5 - width, 0.5 - width, 0.5 + width, 0.5 + width, 0.5 + width);
    
        const itemModel = new BlockRenderer.Model(0, 0.5 - width, 0.5 - width, 1, 0.5 + width, 0.5 + width, this.id, -1);
		ItemModel.getFor(this.id, -1).setHandModel(itemModel);
		ItemModel.getFor(this.id, -1).setUiModel(itemModel);
    }

    abstract getMachineGroupCommonName(): string;
    abstract getMachineConnectingData(): Galacticraft.IWireBoxDescription[];

    public setMachineConnecting(): void {
        for(const box of this.getMachineConnectingData()) {
            const wireModel = new BlockRenderer.Model(box.box[0], box.box[1], box.box[2], box.box[3], box.box[4], box.box[5], this.id, -1);
            const condition = ICRender.BLOCK(box.side[0], 0, box.side[1], ICRender.getGroup(this.getMachineGroupCommonName() + "_" + box.data), false);

            this.render.addEntry(wireModel).setCondition(condition);
            this.shape.addEntry().setCondition(condition).addBox(box.box[0], box.box[1], box.box[2], box.box[3], box.box[4], box.box[5]);
        }
    }
    abstract getGroup(): ICRender.Group;
}
