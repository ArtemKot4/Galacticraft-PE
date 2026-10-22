declare const ToolType: Record<string, any>;

declare namespace ToolAPI {
    function addToolMaterial(name: string, material: { durability: number, level: number, efficiency: number, damage: number }): void;
}

interface SyncedNetworkData {
    putBoolean(key: string, value: boolean): void;
    getBoolean(key: string, defaultValue?: boolean): boolean;
    putInt(key: string, value: number): void;
    getInt(key: string, defaultValue?: number): number;
    putString(key: string, value: string): void;
    getString(key: string, defaultValue?: string): string;
    sendChanges(): void;
    addVerifier(key: string, verifier: (key: string, value: any) => Nullable<object>): void;
    setGlobalVerifier(verifier: (key: string, value: any) => Nullable<object>): void;
}
