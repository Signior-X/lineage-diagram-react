export interface LineageNodeData {
    id: string;
    table: IFlowTable;
    up: boolean;
    upClick: (id: string) => void;
    expandedUp: boolean;
    down: boolean;
    downClick: (id: string) => void;
    expandedDown: boolean;
}

export interface IFlowTables {
    [index: string]: IFlowTable
}

export interface IFlowTable {
    id: string;
    name: string;
    sources: string[];
    children: string[];
    columns: IColumns;
}

export interface IColumns {
    [index: string]: IColumn;
}

export interface IColumn {
    id: string;
    name: string;
    sources: IColumnRef[];
    children: IColumnRef[];
}

export interface IColumnRef {
    tableId: string;
    columnId: string;
}
