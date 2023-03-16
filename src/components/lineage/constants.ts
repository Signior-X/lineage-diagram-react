import { IFlowTable, IFlowTables } from "../lineageFlow/types";

export const DEFAULT_FLOW_TABLES = () => {
    const tables: IFlowTables = {};

    for (let i = 0; i <= 10; i++) {
        const id = "table" + i;
        const name = "Table " + i;
        const table: IFlowTable = {
            id: id,
            name: name,
            sources: [],
            children: [],
            columns: {}
        }
        tables[id] = table;
    }

    const addEdge = (source: string, child: string) => {
        tables[source].children.push(child);
        tables[child].sources.push(source);
    }

    addEdge("table0", "table1");
    addEdge("table1", "table2");
    addEdge("table1", "table3");
    addEdge("table2", "table9");
    addEdge("table3", "table9");
    addEdge("table4", "table3");
    addEdge("table9", "table5");
    addEdge("table3", "table6");
    addEdge("table3", "table7");
    addEdge("table9", "table8");
    addEdge("table6", "table8");
    addEdge("table5", "table10");
    addEdge("table8", "table10");

    tables["table3"].columns = {
        "column1": {
            id: "column1",
            name: "Column 1",
            sources: [
                {
                    tableId: "table4",
                    columnId: "column1",
                }
            ],
            children: [
                {
                    tableId: "table7",
                    columnId: "column1",
                },
                {
                    tableId: "table9",
                    columnId: "column3"
                }
            ],
        },
        "column2": {
            id: "column2",
            name: "Column 2",
            sources: [],
            children: [
                {
                    tableId: "table7",
                    columnId: "column2",
                }
            ],
        },
    };

    tables["table7"].columns = {
        "column1": {
            id: "column1",
            name: "Column 1",
            sources: [
                {
                    tableId: "table1",
                    columnId: "column1",
                }
            ],
            children: [],
        },
        "column2": {
            id: "column2",
            name: "Column 2",
            sources: [
                {
                    tableId: "table1",
                    columnId: "column2",
                }
            ],
            children: [],
        },
    };

    tables["table9"].columns = {
        "column3": {
            id: "column3",
            name: "Column 3",
            sources: [
                {
                    tableId: "table3",
                    columnId: "column1",
                }
            ],
            children: [
                {
                    tableId: "table5",
                    columnId: "column1",
                }
            ],
        }
    }

    tables["table5"].columns = {
        "column1": {
            id: "column1",
            name: "Column 1",
            sources: [
                {
                    tableId: "table9",
                    columnId: "column3",
                }
            ],
            children: [],
        }
    }

    tables["table4"].columns = {
        "column1": {
            id: "column1",
            name: "Column 1",
            sources: [],
            children: [
                {
                    tableId: "table3",
                    columnId: "column1",
                }
            ]
        }
    }

    return tables;
}