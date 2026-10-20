abstract class ProcessingTile extends CommonTileEntity {
    public override data: Scriptable & { energy?: number, progress: number, active: boolean, disabled?: boolean };
    abstract inputSlots: string[];
    abstract outputSlots: string[];
    public currentRecipeIndex: string;
    public currentRecipe: ReturnType<typeof RecipeModule.Factory.prototype.getRecipe>;
    public openListenerRegistered?: boolean;

    public override getScreenName(player?: PlayerActor, coords?: Vector3): string {
        return TileAccess.isPlayerInRange(player, coords) ? "main" : null;
    }

    public override onInit(): void {
        this.data.active = this.data.active || false;
        this.data.progress = this.data.progress || 0;
        if(this.openListenerRegistered != true) {
            this.openListenerRegistered = true;
            this.container.addServerOpenListener(function(container) {
                container.markAllSlotsDirty();
                container.sendChanges();
            });
        }
    }

    protected getSpendEnergyAmount(): number {
        return 5;
    }

    protected spendRecipeEnergy(): void {
        if(World.getThreadTime() % 20 == 0) {
            this.data.energy = Math.max(0, this.data.energy - this.getRecipeEnergyAmount());
        }
    }

    protected getRecipeEnergyPerTick(): number {
        return this.getRecipeEnergyAmount() / 20;
    }

    protected spendEnergyCommon(): void {
        if(World.getThreadTime() % 8 == 0) {
            this.data.energy = Math.max(0, this.data.energy - this.getSpendEnergyAmount());
        }
    }

    public clearProgressIfWrong(): boolean {
        if(this.data.disabled == true || this.data.energy < this.getRecipeEnergyPerTick() || this.data.active == false) {
            this.data.progress = 0;
            return true;
        }
        return false;
    }

    public doProgress(): boolean {
        if(this.data.progress < this.getProgressMax()) {
            this.data.energy = Math.max(0, this.data.energy - this.getRecipeEnergyPerTick());
            this.data.progress++;
            return true;
        }
    }

    public override onTick(): void {
        if(this.data.disabled == true) {
            return;
        }
        const addedItem = StorageInterface.checkHoppers(this);
        if(addedItem == true) {
            this.setActiveIfNeeded();
        }
        this.container.validateAll();
        this.container.sendChanges();
        this.insideTick(addedItem);

        if(!this.clearProgressIfWrong() && !this.doProgress()) {
            this.recipeComplete();
        }
    }

    protected setActiveIfNeeded(additionalSlotStorage: Record<string, ItemInstance> = {}): void {
        if(this.isValidRecipe(additionalSlotStorage)) {   
            this.data.active = (this.getFactory().getContainerManager() as RecipeModule.DefaultContainerManager).hasValidOutputSlots(this.outputSlots, this.currentRecipe, this.container);
        }
    }

    protected getSlot(name: string, additionalSlotStorage: Record<string, ItemInstance> = {}) {
        if(name in additionalSlotStorage) {
            return new ItemStack(additionalSlotStorage[name]);
        }
        return this.container.getSlot(name);
    }

    /**
     * @returns recipe is null or not
     */
    protected isValidRecipe(additionalSlotStorage: Record<string, ItemInstance> = {}): boolean {
        if((
            this.currentRecipe = this.getFactory()
            .getRecipe(this, (name: string) => this.getSlot(name, additionalSlotStorage))) == null
        ) {
            this.stop();
            return false;
        }
        return true;
    }

    protected recipeComplete(): void {
        const manager = this.getFactory().getContainerManager() as RecipeModule.DefaultContainerManager;

        if(this.currentRecipe == null || !manager.hasValidOutputSlots(this.outputSlots, this.currentRecipe, this.container)) {
            this.stop();
            return;
        }
        manager.decreaseInputSlots(this.inputSlots, this.currentRecipe, this.container);
        manager.setOutput(this.outputSlots, this.currentRecipe, this.container);
        this.stop();
        this.setActiveIfNeeded();
    }

    protected getRecipeEnergyAmount(): number {
        return 1500;
    }

    protected getProgressMax(): number {
        return 150;
    }

    protected stop(): void {
        this.data.active = false;
        this.data.progress = 0;
    }

    public getCapacity(): number {
        return 16000;
    }

    public override onLoad(): void {
        this.setActiveIfNeeded();
    }

    public insideTick(addedHopperItem?: boolean) {
        this.container.setScale("progress_scale", this.data.progress / this.getProgressMax());
        this.spendEnergyCommon();
    }

    public abstract getFactory(): RecipeModule.Factory<unknown> & RecipeModule.IManageContainer;
}

interface ProcessingTile {
    getPowerTier?(): number;
}

/*
Описываю архитектуру для себя же

Короче есть ProcessingBlock, он назначает политику добавления и отнимания предметов для контейнера, вместе с тем помечает,
что пора начать двигать шкалу прогресса в плюс если рецепт валидный при помощи изменения маркера active, или если не валидный
помечает, что нужно сбрасывать прогресс.

В конце просто маркер делается false если рецепт для предметов в слотах не существует.

Поэтому оптимизация сводится к маркеру active, вместо того чтобы крутить циклы
каждую секунду 20 раз, как это обычно делается.
*/