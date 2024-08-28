interface CelestialBodyDescriptor {
    name: string,
    picture: string,
};


class CelestialBody {
    public static readonly last_coord: [right: int, left: int] = [0, 0]
    public static data: CelestialBodyDescriptor[] = [];
    public static planetList: Record<string, int> = {};
    public static add(planet: int, icon: string) {
       CelestialBody.planetList[icon] = planet;
    };
    public static get(dimension: int): string {
        return Object.entries(CelestialBody.planetList).find((v) => v[1] === dimension)[0];
    }
}

class CelestialBorderUI {
    
}
