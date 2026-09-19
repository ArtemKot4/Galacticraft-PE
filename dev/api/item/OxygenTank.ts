class OxygenTank extends Battery {
    public override getEnergyType(): string {
        return Galacticraft.EnergyTypes.OXYGEN.name;
    }

    public override getSpecialTypeKey(): string {
        return "oxygen_tank.special_type";
    }

    public override getEmptyName(): string {
        return "item.galacticraft.empty_oxygen_tank";
    }
}