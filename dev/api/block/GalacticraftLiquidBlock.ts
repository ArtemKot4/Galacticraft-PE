class GalacticraftLiquidBlock extends LiquidBlock {
    public constructor(stringID: string, stillTexture: string, flowTexture: string) {
        super(stringID, "block.galacticraft." + stringID, stillTexture, flowTexture);
    }
    
    public override getBucket(): Block.LiquidDescriptor["bucket"] | [empty: LiquidRegistry.Bucket2LiquidMapping, full: LiquidRegistry.Bucket2LiquidMapping] {
        return {
            id: this.stringID + "_bucket_gc",
            emptyId: VanillaItemID.bucket,
            texture: { name: this.stringID + "_bucket_gc", meta: 0 }
        }
    }
}