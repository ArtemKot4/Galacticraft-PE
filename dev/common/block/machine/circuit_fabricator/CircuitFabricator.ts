@ElectricMachine(EElectricMachineType.RECEIVER)
class CircuitFabricator extends ProcessingBlock {
    public static tile = new CircuitFabricatorTile();

	public constructor() {
		super("circuit_fabricator", [{
            name: "tile.galacticraft.circuit_fabricator",
            texture: [["machine", 0], ["machine", 0], ["machine", 0], ["circuit_fabricator_gc", 0], ["machine_input", 0], ["machine", 0]],
            inCreative: true
		}]);
	}

    public override getStorageInterface(): StorageDescriptor {
        return {
            getInputSlots: () => ["diamond_slot", "fabricator_slot_1", "fabricator_slot_2", "dust_slot", "plate_slot"]
        }
    }

	public override getTileEntity(): ProcessingTile {
        return CircuitFabricator.tile;
	}
}
// производитель микросхем ест 400 gJ в секунду, 
// кислородный декомпрессор 200,
// кислородный компрессор 300, 
// кислородный сборщик 200
// очистительный завод 1200 
// синтезатор метана 900 
// терраформер 600 
// деконструктор 1500 
// электрическая дуговая печь 1200 
// сжижитель метана 1200 
// короткодистанционный телепорт 1000
// загрузчик топлива 600

// обычная батарейка хранит 15000

// 18 36 54 стандартные размеры хранилищ ракеты
// баллоны 900 1800 2700
// канистра хранит 1000 топлива, ведро тоже
// из канистр жидкость сливается мнгновенно
// в очистительном заводе плавно заполняется канистра с топливом

// максимум можно заливать 12000 мб (12 вёдер)