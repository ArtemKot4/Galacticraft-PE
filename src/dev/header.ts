IMPORT("RenderUtil");
IMPORT("EnergyNet");
IMPORT("TextureWorker");
IMPORT("StorageInterface");
IMPORT("BlockEngine");
IMPORT("ParticlesCore");
IMPORT("ConnectedTexture");

const EMPTY_ITEM:ItemInstance = {id: 0, count: 0, data: 0};

interface IItem {
	setShouldDespawn(id: number, value: boolean): void;
}

let JavaItem: IItem = WRAP_JAVA("com.reider745.appliedenergistics.Item");


const EU = EnergyTypeRegistry.assureEnergyType("Eu", 1);
const Ae = EnergyTypeRegistry.assureEnergyType("Ae", 1);

const SIZE = 2/16;
let CacheFacede = new RenderUtil.ModelsCache("facede");

const COLORS = ["transparent", "black", "blue", "brown", "cyan", "gray", "green", "lime", "magenta", "orange", "pink", "purple", "red", "white", "yellow"];

function splitImage(path, size, name){
	let input = FileTools.ReadImage(path);
	for(let i = 0;i < input.getHeight() / size;i++)
		FileTools.WriteImage(__dir__+name+"_"+i+".png", android.graphics.Bitmap.createBitmap(input, 0, i*size, size, size));
}
//splitImage(__dir__+"controller_lights.png", 16, "controller_lights");

function pushToArray(arr1, arr2){
	for(let i in arr2)
		arr1.push(arr2[i]);
}

ItemModel.setCurrentCacheGroup("AppliedEnergistics", "pre-alpha 0.1");

function addConnect(id, data: number = -1, group: string = "ae"){
	ICRender.getGroup(group).add(id, data);
}

function funcAddedFacede(pos, item, block, player){
	if(AppliedEnergistics.isFlag(block.id, "cable")){
		let region = BlockSource.getDefaultForActor(player);
		let tile = TileEntity.getTileEntity(pos.x, pos.y, pos.z, region);
		if(!tile) tile = TileEntity.addTileEntity(pos.x, pos.y, pos.z, region);
		if(tile){
			tile.data.del = false;
			if(tile.canAdded(item.id, pos.side)){
				tile.add(item.id, pos.side);
				if(Game.isItemSpendingAllowed(player)) Entity.setCarriedItem(player, item.id, item.count-1, item.data);
				return tile;
			}
		}
	}
	return false;
}
const CALBLE_TICK = function(){
	getController(this).useAll("tick");
};

ItemRegistry.createItem("icon_info", {
	name: "",
	icon: "icon_info",
	inCreative: true
});