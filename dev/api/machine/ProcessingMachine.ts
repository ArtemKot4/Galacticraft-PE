abstract class ProcessingMachine extends InputMachine {
    public data = {
        energy: 0,
        progress: 0
    };

    abstract getProgressMax(): number;

    public isValid(recipe: Record<string, unknown>): boolean {
        return (
            recipe != null && 
            this.data.energy >= (this.getCapacity() / 2) && 
            this.data.progress < this.getProgressMax()
        );
    };

    public setProgress(recipe: Record<string, unknown>) {
        if(this.isValid(recipe)) {
            this.data.progress++;
        };
    };

    public isFullProgress(): boolean {
        return this.data.progress >= this.getProgressMax();
    };

    public clearProgress(): void {
        this.data.progress = 0;
    };
};