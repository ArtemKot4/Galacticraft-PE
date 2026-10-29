/**
 * Current phase of a Moon lander.
 *
 * server-side state machine proposed in the Moon Lander port plan.
 */
enum ELanderPhase {
	/**
	 * Lander hovers after spawn; no movement is applied.
	 */
	HOVER,
	/**
	 * Lander descends towards the Moon surface.
	 */
	DESCENT,
	/**
	 * Lander touched the ground safely and remains as a vehicle/container.
	 */
	LANDED,
	/**
	 * Lander hit the ground too fast; it is removed after cleanup.
	 */
	CRASHED
}
