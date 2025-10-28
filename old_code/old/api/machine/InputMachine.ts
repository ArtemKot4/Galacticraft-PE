abstract class InputMachine extends MachineTile {
    public canReceiveEnergy(type: number, side: string): boolean {
        return true;
    }

    public canExtractEnergy(): boolean {
        return false;
    }
}
