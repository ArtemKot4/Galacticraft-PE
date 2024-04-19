const WIRE = Block.createSpecialType({
  destroytime: 0.1,
  explosionres: 0.5,
  sound: "cloth",
});

const PIPE = Block.createSpecialType({
  destroytime: 0.1,
  explosionres: 0.5,
  sound: "glass",
});

const WIRE_COLORS = [
  "black",
  "blue",
  "dark_blue",
  "white",
  "dark_gray",
  "dark_green",
  "dark_lime",
  "dark_orange",
  "gray",
  "green",
  "light_blue",
  "magenta",
  "pink",
  "red",
  "yellow",
  "orange"
]




class Cable {
 public id: string;
  constructor(public color: string) {

  };
    public setColorByDye(color: string) {
 
        const splited_id = this.id.split("_");
        
        const result_id = BlockID[splited_id.slice(0, splited_id.length - 1).concat(color).join("_")];
        Game.message("Wire id: " + this.id + "\nSplited id: " + splited_id + "\nResult replaced id: " + result_id)
      Block.registerClickFunctionForID(BlockID[this.id], (coords, item, block, player) => {
        if(item.id === VanillaItemID[color + "_dye"]) {
          BlockSource.getDefaultForActor(player).setBlock(coords.x, coords.y, 
            coords.z,
             !!result_id ? result_id : BlockID[this.id], 0);
             !!result_id ? Entity.setCarriedItem(player, item.id, item.count - 1, item.data, item.extra) : null;
        }
      })
    };

private setupColors() {
  VanillaItemID.dye
       return this.setColorByDye("blue"),
       this.setColorByDye("black"),
       this.setColorByDye("white"),
       this.setColorByDye("gray"),
       this.setColorByDye("green"),
       this.setColorByDye("lime"),
       this.setColorByDye("blue"),
       this.setColorByDye("orange"),
       this.setColorByDye("blue"),
       this.setColorByDye("magenta"),
       this.setColorByDye("pink"),
       this.setColorByDye("red"), 
       this.setColorByDye("yellow")
}

  public createWire() {
    this.id = "aluminum_wire_" + this.color;
    new GBlock(
      "aluminum_wire_" + this.color,
      [
        {
          name: "aluminum_wire_" + this.color,
          texture: [["aluminum_wire_" + this.color, 0]],
          inCreative: true,
        },
      ],
      WIRE
    ).create();
    TileRenderer.setupWireModel(
      BlockID["aluminum_wire_" + this.color],
      0,
      2 / 10,
      "gc-wire"
    )
    GJ.registerWire(BlockID["aluminum_wire_" + this.color], 400);
    this.setupColors();
  }
  public createImprovedWire() {
    this.id = "improved_aluminum_wire_" + this.color;
    new GBlock(
      "improved_aluminum_wire_" + this.color,
      [
        {
          name: "improved_aluminum_wire_" + this.color,
          texture: [["improved_aluminum_wire_" + this.color, 0]],
          inCreative: true,
        },
      ],
      WIRE
    ).create();
    TileRenderer.setupWireModel(
      BlockID["improved_aluminum_wire_" + this.color],
      0,
      2 / 8,
      "gc-improved-wire"
    );
    GJ.registerWire(BlockID["improved_aluminum_wire_" + this.color], 200);
    this.setupColors();
  };

  createPipe() {
    this.id = "pipe_oxygen_" + this.color;
    new GBlock(
      "pipe_oxygen_" + this.color,
      [
        {
          name: "pipe_oxygen_" + this.color,
          texture: [["pipe_oxygen_" + this.color, 0]],
          inCreative: true,
        },
      ],
      PIPE
    ).create();
    TileRenderer.setupWireModel(
      BlockID["pipe_oxygen_" + this.color],
      0,
      2 / 8,
      "gc-oxygen-pipe"
    );
    OB.registerWire(BlockID["pipe_oxygen_" + this.color], 200);
    this.setupColors();
  }
}

for(const i in WIRE_COLORS) {
  new Cable(WIRE_COLORS[i]).createImprovedWire();
}

new Cable("black").createPipe();
new Cable("blue").createPipe();
new Cable("brown").createPipe();
new Cable("cyan").createPipe();
new Cable("gray").createPipe();
new Cable("green").createPipe();
new Cable("light_blue").createPipe();
new Cable("lime").createPipe();
new Cable("magenta").createPipe();
new Cable("orange").createPipe();
new Cable("pink").createPipe();
new Cable("purple").createPipe();
new Cable("red").createPipe();
new Cable("silver").createPipe();
new Cable("yellow").createPipe();



new GBlock("hydrogen_pipe", [
  { name: "Pipe Hydrogen", texture: [["pipe_hydrogen", 0]], inCreative: true },
], PIPE).create();

TileRenderer.setupWireModel(BlockID.hydrogen_pipe, 0, 2 / 8, "gc-hydrogen-pipe");
OB.registerWire(BlockID.hydrogen_pipe, 200);
Translation.addTranslation("Pipe Hydrogen", {
  ru: "§6Газовая труба",
});
