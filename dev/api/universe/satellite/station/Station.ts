class Station extends Satellite {
    public owner: number;
    public members: Record<number, IStationMemberPermissions> = {};

    public override getLayers(): Dimensions.TerrainLayerParams[] {
        return [
            {
                minY: 0,
                maxY: 1,
                material: {
                    base: BlockList.SPACE.id,
                    surface: {
                        id: BlockList.SPACE.id,
                        data: 0,
                        width: 1,
                    },
                    cover: BlockList.SPACE.id
                }
            }
        ];
    }

    public override getIcon(): string {
        return "environment.station";
    }
    
    public override canHasStation(): boolean {
        return false;
    }

    public override showStarsAlways(): boolean {
        return true;
    }

    public changeOwner(ownerUid: number): void {
        this.owner = ownerUid;
    }

    public static getDefaultMemberPermissions(): IStationMemberPermissions {
        return {
            breakBlocks: true,
            attackEntities: false
        }
    }
}

interface IStationMemberPermissions {
    breakBlocks: boolean,
    attackEntities: boolean
}