class Station extends Satellite {
    public getIcon(): string {
        return "environment.station";
    }
    
    public canHasStation(): boolean {
        return false;
    }
}