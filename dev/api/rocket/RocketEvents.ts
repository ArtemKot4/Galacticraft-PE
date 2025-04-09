class RocketEvents {
    @SubscribeEvent
    public onEntityAdded(entity: number) {
        if(RocketManager.isRocket(entity)) {
            RocketManager.addRocket(entity);
        };
    };

    @SubscribeEvent
    public onEntityInteract(entity: number, player: number, coords: Vector): void {
        if(RocketManager.isRocket(entity)) {
            const rocket = RocketManager.addRocket(entity);

            if(Entity.getSneaking(player) === true) {
                Game.prevent();
                const client = Network.getClientForPlayer(player);

                if(client) rocket.container.openFor(client, "fuel_storage");
            } else {
                //debug next string:
                return rocket.launch(player);
            }
        };
    };

    @SubscribeEvent
    public onEntityHurt(attacker: number, entity: number, damageValue: number, damageType: Entity.DamageSource | number, armorReducesDamage: boolean) {
        const rocket = RocketManager.getRocket(entity);

        if(rocket != null && !Entity.getSneaking(attacker)) {
            Game.prevent();
            rocket.finalize();
        };
    };
}

        // const mesh = new RenderMesh();

        // const pos = 8 / 16;

        // mesh.addVertex(-pos, -100, -pos, 0, 0);
        // mesh.addVertex(pos, -100, -pos, 1, 0);
        // mesh.addVertex(-pos, -100, pos, 0, 1);
        // mesh.addVertex(pos, -100, -pos, 1, 0);
        // mesh.addVertex(-pos, -100, pos, 0, 1);
        // mesh.addVertex(pos, -100, pos, 1, 1);