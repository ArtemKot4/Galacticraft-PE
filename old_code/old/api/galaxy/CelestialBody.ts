class CelestialBody implements ILocalizeable {
    public type: ECelestialType;
    public x: number;
    public y: number;
    public bitmap: string;
    public scale: number;
    public name: string;
    public localizedName: string;
    public description: string;

    public getName(): string {
        return this.name;
    };

    public getLocalizedName(): string {
        return this.localizedName;
    };

    public getDescription(): string {
        return this.description;
    };

    public getSpeed(): number {
        return 1.0;
    };

    public getType(): ECelestialType {
        return this.type;
    };

    public getLink(): unknown {
        return null;
    };

    public getPath(): string {
        return "gui/planet/";
    };

    public getBitmap(): string {
        return this.getPath().replace("/", ".") + this.bitmap + ".png";
    };

    public getTexture(): string {
        return this.getPath() + this.bitmap + ".png";
    };

    public setBitmap(bitmap: string): this {
        this.bitmap = bitmap;
        return this;
    };

    public constructor(object?: ILocalizeable) {
        const type = this.getType();
        const link = this.getLink();
        if(object) {
            if(object instanceof Satellite) this.type = ECelestialType.SATELLITE;
            else if(object instanceof Planet) this.type = ECelestialType.PLANET;
            if(object instanceof SpaceSystem) this.type = ECelestialType.SYSTEM;
            if(object instanceof Galaxy) this.type = ECelestialType.GALAXY;
            this.name = object.getName();
            this.localizedName = object.getLocalizedName();
            if(!this.bitmap) this.setBitmap(this.name);
        };
    };
};