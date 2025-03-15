abstract class Generator extends Machine {
    public override data = {
        energy: 0
    };

    public canReceiveEnergy(): boolean {
        return false;
    };

    public canExtractEnergy(): boolean {
        return true;
    };
};
