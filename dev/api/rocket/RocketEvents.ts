class RocketEvents {
    @SubscribeEvent
    public onEntityAdded(entity: number) {
        if(!RocketManager.hasRocket(entity)) {
            RocketManager.getRocketEntity(entity);
        };
    };

    @SubscribeEvent
    public onEntityInteract(entity: number, player: number, coords: Vector): void {
        if(RocketManager.isRocket(entity)) {
            let rocket = RocketManager.getRocketEntity(entity);

            if(rocket == null) {
                rocket = RocketManager.addRocketEntity(RocketManager.getRocketByEntity(entity), entity, 0, 0);
            };

            if(Entity.getSneaking(player) === true) {
                Game.prevent();
                if(!rocket.addFuelBy(player)) {
                    rocket.openContainer(player);
                };
            } else {
                //debug next string:
                return rocket.launch(player);
            };
        };
    };

    @SubscribeEvent
    public onEntityHurt(attacker: number, entity: number, damageValue: number, damageType: Entity.DamageSource | number, armorReducesDamage: boolean) {
        const rocket = RocketManager.getRocketEntity(entity);

        if(rocket != null) {
            Game.prevent();
            if(!Entity.getSneaking(attacker)) {
                rocket.finalize();
            };
        };
    };
};

        // const mesh = new RenderMesh();

        // const pos = 8 / 16;

        // mesh.addVertex(-pos, -100, -pos, 0, 0);
        // mesh.addVertex(pos, -100, -pos, 1, 0);
        // mesh.addVertex(-pos, -100, pos, 0, 1);
        // mesh.addVertex(pos, -100, -pos, 1, 0);
        // mesh.addVertex(-pos, -100, pos, 0, 1);
        // mesh.addVertex(pos, -100, pos, 1, 1);