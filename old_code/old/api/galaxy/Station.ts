interface IStationBox {
    texture: string;
    scale: number;
    distance: number;
    station_id: number;
    mesh: string
};

interface IStationMeshData {
    x?: number;
    y?: number;
    z?: number;
    vertexes?: [x: number, y: number, z: number, u: number, v: number][];
    model_path?: string;
    import_params?: com.zhekasmirnov.innercore.api.NativeRenderMesh.ImportParams;
};

abstract class Station extends Satellite {
    public name: string;
    public owner: number;
    public residents: number[];

    public constructor(name: string) {
        if(Dimensions.getDimensionByName(name)) {
            name = name + "_copy";
        };

        super(1024, name);
        this.name = name;
    };

    public addResident(player: number): void {
        if(!this.residents.includes(player)) {
            this.residents.push(player);
        } else {
            Debug.error("Error in Station.addResident: resident already added");
        };
    };

    public deleteResident(player: number): void {
        if(this.residents.includes(player)) {
            this.residents.splice(this.residents.indexOf(player), 1);
        };
    };

    public changeOwner(player: number): void {
        this.owner = player;
    };

    public getName(): string {
        return this.name;
    };

    public getOwnerName(): string {
        return Entity.getNameTag(this.owner);
    };

    public getResidentsName(): string[] {
        return this.residents.map((resident: number): string => Entity.getNameTag(resident));
    };

    public canBeTransfered(player: number): boolean {
        return this.owner === player || this.residents.includes(player);
    };

    public getTexturePath(): string {
        return "gui/";
    };

    public getBoxTexture(): string {
        return this.getCelestialBody().bitmap.replace(".", "/");
    };

    public getFormatTexture(): string {
        return this.getTexturePath() + this.getBoxTexture() + ".png";
    };

    public getBoxScale(): number {
        return 350;
    };

    /**
     * 
     * @returns the distance between the box and player by y angle;
     */
    public getBoxDistance(): number {
        return 100;
    };

    public getBoxData(): IStationBox {
        return {
            scale: this.getBoxScale(),
            texture: this.getFormatTexture(),
            distance: this.getBoxDistance(),
            station_id: this.id,
            mesh: JSON.stringify(this.getBoxMeshesData())
        };
    };

    public getBoxMeshesData(): IStationMeshData[] {
        const pos = 8 / 16;

        return [{
            x: 0,
            y: 0,
            z: 0,
            vertexes: [
                [-pos, 0, -pos, 0, 0], 
                [pos, 0, -pos, 1, 0], 
                [-pos, 0, pos, 0, 1], 
                [pos, 0, -pos, 1, 0],
                [-pos, 0, pos, 0, 1],
                [pos, 0, pos, 1, 1]
            ]
        }];
    };

    public override hasStars(): boolean {
        return true;
    };

    public override hasBedrockLayer(): boolean {
        return false;
    };

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
                cover: BlockList.SPACE.id,
                }
            }
        ];
    };

    public override getSkyColor(): number[] {
        return [0, 0, 0];
    };

    public override getFogColor(): number[] {
        return [0, 0, 0];
    };

    public override insidePlayerDimensionTransfer(playerUid: number, from: number): void {
        const client = Network.getClientForPlayer(playerUid);
        if(client) {
            client.send("packet.galacticraft.create_station_animation", this.getBoxData());
        };
    };
};

Network.addClientPacket("packet.galacticraft.create_station_animation", (packetData: IStationBox) => {
    if(!packetData) return;
    const position = Player.getPosition();
    const animation = new Animation.Base(position.x, position.y - packetData.distance, position.z);
    
    const meshData = JSON.parse(packetData.mesh) as IStationMeshData[];
    const resultMesh = new RenderMesh();

    for(const i in meshData) {
        const data = meshData[i]
        const mesh = new RenderMesh();
        if("model_path" in data) {
            mesh.importFromFile(data.model_path, "obj", data.import_params || {
                invertV: false,
                noRebuild: false
            });
        } else if("vertexes" in data) {
            for(const k in data.vertexes) {
                const vertex = data.vertexes[k];
                mesh.addVertex(vertex[0], vertex[1], vertex[2], vertex[3], vertex[4]);
            };
        };
        resultMesh.addMesh(mesh, data.x || 0, data.y || 0, data.z || 0);
    };

    animation.describe({
        mesh: resultMesh,
        skin: packetData.texture,
        scale: packetData.scale,
    });

    animation.load();
   
    Updatable.addLocalUpdatable({
        update() {
            if(World.getThreadTime() % 60 === 0 && Player.getDimension() !== packetData.station_id) {
                animation.destroy();
                this.remove = true;
            };
            const pos = Player.getPosition();
            animation.setPos(pos.x, pos.y - packetData.distance, pos.z);
        }
    });
});
