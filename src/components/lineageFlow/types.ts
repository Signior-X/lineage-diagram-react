import { Dispatch, SetStateAction } from "react";
import { Edge, Node } from "reactflow";

export type SetState<T> = Dispatch<SetStateAction<T>>;

export interface LineageNodeData {
    id: string;
    setNodes: SetState<ILineageNodes>;
    setExpanded: SetState<IExpanded>;
    table: IFlowTable;
    showUpButton: boolean;
    expandedUp: boolean;
    showDownButton: boolean;
    expandedDown: boolean;
    showColumns: boolean;
    setActiveTable: SetState<string | undefined>;
    setActiveColumn: SetState<string | undefined>;
    activeColumns: { [key: string]: boolean };
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

export interface ILineageNodes {
    [index: string]: Node<LineageNodeData>
}

export interface IEdges {
    [index: string]: Edge
}

export interface IExpanded {
    [key: string]: boolean;
}
