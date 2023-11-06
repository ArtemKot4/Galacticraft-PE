//Переменные для брони
var boots = new ActorRenderer("boots");
var leggings = new ActorRenderer("leggings");
var chestplate = new ActorRenderer("chestplate");
var helmet = new ActorRenderer("helmet");



//контейнер базовых значений
let armor_container = [];

//регистрация брони
function ThermalArmor(id: string, name: string,texture: string, type: string, ) {
  IDRegistry.genItemID(id);
  Item.createItem(id, "§2"+Translation.translate(name), { name: id.slice(0,id.length-2), meta: Number(id.slice(id.length-1)) }, { stack: 1 });
  armor_container.push({ id: ItemID[id], type: type, texture: texture });
  
}

//Присваивание текстур
for(var i in armor_container){
    boots.setTexture(armor_container[i].texture);
    leggings.setTexture(armor_container[i].texture);
    chestplate.setTexture(armor_container[i].texture);
    helmet.setTexture(armor_container[i].texture);
}

//Регистрация брони
new ThermalArmor("thermal_boots_0","Thermal boots","thermal_padding_0","boots")
new ThermalArmor("thermal_leggings_0","Thermal leggings","thermal_padding_0","leggings")
new ThermalArmor("thermal_chestplate_0","Thermal chestplate","thermal_padding_0","leggings")
new ThermalArmor("thermal_helmet_0","Thermal boots","thermal_padding_0","helmet")

new ThermalArmor("thermal_boots_1","Thermal boots","thermal_padding_1","boots")
new ThermalArmor("thermal_leggings_1","Thermal leggings","thermal_padding_1","leggings")
new ThermalArmor("thermal_chestplate_1","Thermal chestplate","thermal_padding_1","leggings")
new ThermalArmor("thermal_helmet_1","Thermal helmet","thermal_padding_1","helmet")

new ThermalArmor("thermal_boots_2","Thermal boots","thermal_padding_2","boots")
new ThermalArmor("thermal_leggings_2","Thermal leggings","thermal_padding_2","leggings")
new ThermalArmor("thermal_chestplate_2","Thermal chestplate","thermal_padding_2","leggings")
new ThermalArmor("thermal_helmet_2","Thermal helmet","thermal_padding_2","helmet")

function isThermal(){
    if(Player.getDimension()==Venus.id||Player.getDimension()==Mars.id){
        Entity.setFire(Player.getLocal(),10,true)
    }
}

//работа в тике
Callback.addCallback("LocalTick", () => {
  if (World.getThreadTime() % 20 == 0) {
    var sl = Equi;
    var b = new AttachableRender(Player.get());
    var l = new AttachableRender(Player.get());
    var c = new AttachableRender(Player.get());
    var h = new AttachableRender(Player.get());
    for (var i in armor_container) {
      var ac = armor_container[i];
      if (sl.getSlot("Foots").id == ac.id && ac.type == "boots") {
        alert("Done")
        b.setRenderer(boots);
      } else {
        isThermal()
       
        b.destroy();
      }
      if (sl.getSlot("Legs").id == ac.id && ac.type == "leggings") {
        
        l.setRenderer(leggings);
      } else {
        isThermal()
        l.destroy();
      }
      if (sl.getSlot("Body").id == ac.id && ac.type == "chestplate") {
       
        c.setRenderer(chestplate);
      } else {
        c.destroy();
        isThermal()}
      if (sl.getSlot("Head").id == ac.id && ac.type == "helmet") {
      
        h.setRenderer(helmet);
      } else {
        isThermal()
        h.destroy();
      
      }
    }
  }
});

