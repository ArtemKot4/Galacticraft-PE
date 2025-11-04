namespace Galacticraft {
    export namespace Renderer {
        export interface IWireBoxDescription {
            side: [x: number, z: number], 
            box: [number, number, number, number, number, number], 
            data: number
        }

        export function addMachineConnecting(id: number, boxes: Galacticraft.Renderer.IWireBoxDescription[], render: ICRender.Model, shape: ICRender.CollisionShape, commonGroupName: string): void {
            for(const box of boxes) {
                const wireModel = new BlockRenderer.Model(box.box[0], box.box[1], box.box[2], box.box[3], box.box[4], box.box[5], id, -1);
                const condition = ICRender.BLOCK(box.side[0], 0, box.side[1], ICRender.getGroup(commonGroupName + "_" + box.data), false);
    
                render.addEntry(wireModel).setCondition(condition);
                shape.addEntry().setCondition(condition).addBox(box.box[0], box.box[1], box.box[2], box.box[3], box.box[4], box.box[5]);
            }
        }
    }
}