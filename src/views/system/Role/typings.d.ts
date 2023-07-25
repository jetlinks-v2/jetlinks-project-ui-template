export type RoleItem = {
    id?: string | undefined;
    name: string;
    state?: {
        text: string;
        value: string;
    };
    description: string;
};

export type RoleType = {
    data: RoleItem;
    menus: any[];
}