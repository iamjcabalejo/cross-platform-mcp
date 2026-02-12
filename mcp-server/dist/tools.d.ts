import type { Platform } from "./platforms/index.js";
export interface ListItem {
    platform: Platform;
    uri: string;
    name: string;
    description?: string;
}
export interface GetResult {
    platform: Platform;
    id: string;
    name: string;
    content: string;
}
export declare function listCommands(): ListItem[];
export declare function listAgents(): ListItem[];
export declare function listSkills(): ListItem[];
export declare function listRules(): ListItem[];
export declare function listHooks(): ListItem[];
export declare function getCommand(id: string, platform?: Platform): GetResult | {
    error: string;
};
export declare function getAgent(id: string, platform?: Platform): GetResult | {
    error: string;
};
export declare function getSkill(id: string, platform?: Platform): GetResult | {
    error: string;
};
export declare function getRule(id: string, platform?: Platform): GetResult | {
    error: string;
};
export declare function getHook(id: string, platform?: Platform): GetResult | {
    error: string;
};
//# sourceMappingURL=tools.d.ts.map