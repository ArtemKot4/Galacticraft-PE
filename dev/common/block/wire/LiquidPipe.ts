class LiquidPipe extends BasicWire {
    public constructor() {
        super("liquid_pipe", [{
            name: "block.galacticraft.liquid_pipe",
            texture: [["pipe_oxygen_light_gray", 0]],
            inCreative: true
        }]);
    }

    public override getEnergyTypes(): EnergyType[] {
        return [Galacticraft.EnergyTypes.OXYGEN];
    }
    
    public override getGroup(): ICRender.Group {
        return ICRender.getGroup("galacticraft.liquid_pipe");
    }

    public override getMachineGroupCommonName(): string {
        return "galacticraft.machine_liquid_connecting";
    }

    public override getMachineConnectionData(): Galacticraft.Renderer.IWireBoxDescription[] {
        const width = this.getWidth() / 2;

        return [
            {
                data: 0,
                side: [-1, 0],
                box: [0, 0.5 - width, 0.5 - width, 0.5 - width, 0.5 + width, 0.5 + width]
            },
            {
                data: 3,
                side: [0, -1],
                box: [0.5 - width, 0.5 - width, 0, 0.5 + width, 0.5 + width, 0.5 - width]
            },
            {
                data: 1,
                side: [1, 0],
                box: [0.5 + width, 0.5 - width, 0.5 - width, 1, 0.5 + width, 0.5 + width]
            },
            {
                data: 2,
                side: [0, 1],
                box: [0.5 - width, 0.5 - width, 0.5 + width, 0.5 + width, 0.5 + width, 1]
            }
        ]
    }
}