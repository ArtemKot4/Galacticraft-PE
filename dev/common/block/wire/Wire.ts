class Wire extends BasicWire {
    public override getWidth(): number {
        return 2 / 10;
    }

    public override getGroup(): ICRender.Group {
        return ICRender.getGroup("galacticraft.wire");
    }

    public override getEnergyTypes(): EnergyType[] {
        return [Galacticraft.EnergyTypes.JOULE];
    }
    
    public override getMachineGroupCommonName(): string {
        return "galacticraft.machine_energy_connecting";
    }

    public override getMachineConnectionData(): Galacticraft.Renderer.IWireBoxDescription[] {
        const width = this.getWidth() / 2;

        return [
            {
                data: 1,
                side: [-1, 0],
                box: [0, 0.5 - width, 0.5 - width, 0.5 - width, 0.5 + width, 0.5 + width]
            },
            {
                data: 2,
                side: [0, -1],
                box: [0.5 - width, 0.5 - width, 0, 0.5 + width, 0.5 + width, 0.5 - width]
            },
            {
                data: 0,
                side: [1, 0],
                box: [0.5 + width, 0.5 - width, 0.5 - width, 1, 0.5 + width, 0.5 + width]
            },
            {
                data: 3,
                side: [0, 1],
                box: [0.5 - width, 0.5 - width, 0.5 + width, 0.5 + width, 0.5 + width, 1]
            }
        ];
    }
}