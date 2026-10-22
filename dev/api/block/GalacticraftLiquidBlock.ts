class GalacticraftLiquidBlock extends LiquidBlock {
    // BasicBlock's constructor calls the virtual build() before LiquidBlock assigns
    // name/stillTexture/flowTexture, so the early call must be skipped and build()
    // re-run once after construction (fireflies FF-016).
    private buildCompleted = false;

    public constructor(stringID: string, stillTexture: string, flowTexture: string) {
        super(stringID, "block.galacticraft." + stringID, stillTexture, flowTexture);
        this.build();
    }

    public override build(): void {
        if(this.buildCompleted) {
            return;
        }
        if(this.stillTexture == null || this.flowTexture == null) {
            return;
        }
        this.buildCompleted = true;
        super.build();
    }
    
    // Both oil and fuel are finite liquids; they must not be renewable like water.
    public override isRenewable(): boolean {
        return false;
    }

    public override getBucket(): Block.LiquidDescriptor["bucket"] | [empty: LiquidRegistry.Bucket2LiquidMapping, full: LiquidRegistry.Bucket2LiquidMapping] {
        return {
            id: this.stringID + "_bucket_gc",
            emptyId: VanillaItemID.bucket,
            texture: { name: this.stringID + "_bucket_gc", meta: 0 }
        }
    }
}