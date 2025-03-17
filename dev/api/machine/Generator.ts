abstract class Generator extends MachineTile {
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
