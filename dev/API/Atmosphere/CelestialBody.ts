interface CelestialBodyDescriptor {
    name: string,
    picture: string,
};


class CelestialBody {

    public static readonly last_coord: [right: int, left: int] = [0, 0]
    public static data: CelestialBodyDescriptor[] = [];

}

class CelestialBorderUI {
    
}
