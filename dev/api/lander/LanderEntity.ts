/**
 * Server-side lander wrapper. Minimal skeleton: identity fields and cargo
 * container only.
 */
class LanderEntity {
	/**
	 * Numeric entity uid in the world.
	 */
	public entityUid: number;
	/**
	 * Unique id used for persistence/deduplication.
	 */
	public stableId: Nullable<string> = null;
	/**
	 * Current dimension.
	 */
	public dimension: Nullable<number> = null;
	/**
	 * Owner captured from the payload.
	 */
	public ownerUid: Nullable<number> = null;
	/**
	 * Current rider.
	 */
	public riderUid: Nullable<number> = null;
	/**
	 * Lander cargo container.
	 */
	public container: ItemContainer;
	/**
	 * Number of lander slots.
	 */
	public slotCount: number = 3;

	/**
	 * Initializes the lander wrapper from an entity uid.
	 */
	public init(entityUid: number): this {
		this.entityUid = entityUid;
		this.dimension = Entity.getDimension(entityUid);
		this.container = new ItemContainer();
		this.container.setGlobalSlotSavingEnabled(true);
		return this;
	}
}
