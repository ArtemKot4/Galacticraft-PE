abstract class BasicWire extends BasicBlock implements IClickCallback {
    public constructor(stringID: string) {
        super(stringID, null);
    }

    public override build(): void {
        this.variationList = [];
        const colors = this.getColors();
        for(const colorIndex in colors) {
            this.variationList[colorIndex] = {
                name: `block.galacticraft.${this.stringID + "_" + colors[colorIndex]}`,
                texture: [[this.getBaseTexture() + "_" + colors[colorIndex], 0]],
                inCreative: false
            };
        }
        super.build();
        this.getEnergyTypes().forEach(type => type.registerWire(this.id, 500));
        Item.addToCreative(this.id, 1, this.getDefaultColorIndex());
        this.setModel();
    }

    protected getDefaultColorIndex(): number {
        const colors = this.getColors();
        if(colors.includes("gray")) {
            return colors.indexOf("gray");
        }
        return 0;
    }

    protected abstract getBaseTexture(): string;

    public onClick(coords: Callback.ItemUseCoordinates, item: ItemStack, block: Tile, playerUid: number): void {
        if(item.id == 0) {
            return;
        }
        const colors = this.getColors();
        const coloredData = colors.findIndex((color) => item.id == VanillaItemID[color + "_dye"]);
        if(coloredData > -1 && block.data != coloredData) {
            new PlayerUser(playerUid).decreaseCarriedItem(1);
            BlockSource.getDefaultForActor(playerUid).setBlock(coords.x, coords.y, coords.z, this.id, coloredData);
            NetworkHelper.sendToPlayer(playerUid, "send_particles", { type: EParticleType.CLOUD, x: coords.x + 0.5, y: coords.y + 0.5, z: coords.z + 0.5, vx: 0, vy: 0.01, vz: 0 });
        }
    }

    public setModel(): void {
        this.getGroup().add(this.id, -1);
        const colors = this.getColors();

        for(let data = 0; data < colors.length; data++) {   
            const shape = new ICRender.CollisionShape(); 
            const render = new ICRender.Model();

            this.addWireConnecting(data, render, shape);
            Galacticraft.Renderer.addMachineConnecting(this.id, this.getMachineConnectionData(), render, shape, this.getMachineGroupCommonName(), data);
            BlockRenderer.setStaticICRender(this.id, data, render);
            BlockRenderer.setCustomCollisionAndRaycastShape(this.id, data, shape);
        } 
    }

    public getWidth(): number {
        return 2 / 8;
    }

    public addWireConnecting(data: number, render: ICRender.Model, shape: ICRender.CollisionShape): void {
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
            
            render.addEntry(new BlockRenderer.Model(box.box[0], box.box[1], box.box[2], box.box[3], box.box[4], box.box[5], this.id, data))
            .setCondition(condition);
			shape.addEntry()
            .setCondition(condition)
            .addBox(box.box[0], box.box[1], box.box[2], box.box[3], box.box[4], box.box[5]);
		}
		render.addEntry(new BlockRenderer.Model(0.5 - width, 0.5 - width, 0.5 - width, 0.5 + width, 0.5 + width, 0.5 + width, this.id, data));
        shape.addEntry().addBox(0.5 - width, 0.5 - width, 0.5 - width, 0.5 + width, 0.5 + width, 0.5 + width);
    
        const itemModel = new BlockRenderer.Model(0, 0.5 - width, 0.5 - width, 1, 0.5 + width, 0.5 + width, this.id, data);
		ItemModel.getFor(this.id, data).setHandModel(itemModel);
		ItemModel.getFor(this.id, data).setUiModel(itemModel);
    }
    
    public getMachineGroupCommonName(): string {
        return "galacticraft.wire";
    }

    /**
     * Max can be 16
     */
    public getColors(): string[] {
        return ['gray', 'yellow', 'black', 'blue', 'brown', 'cyan', 'green', 'light_blue', 'light_gray', 'lime', 'magenta', 'orange', 'pink', 'purple', 'red', 'white'];
    }

    abstract getEnergyTypes(): EnergyType[];
    abstract getMachineConnectionData(): Galacticraft.Renderer.IWireBoxDescription[];
    abstract getGroup(): ICRender.Group;
}
