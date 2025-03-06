import { IFlowTable, IFlowTables } from "../lineageFlow/types";

// Consider Tables as resource
// Consider columns as parameters
export const DEFAULT_FLOW_TABLES = () => {
    const tables: IFlowTables = {};

    for (let i = 0; i <= 10; i++) {
        const id = "resource" + i;
        const name = "Resource " + i;
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

    addEdge("resource0", "resource1");
    addEdge("resource1", "resource2");
    addEdge("resource1", "resource3");
    addEdge("resource2", "resource9");
    addEdge("resource3", "resource9");
    addEdge("resource4", "resource3");
    addEdge("resource9", "resource5");
    addEdge("resource3", "resource6");
    addEdge("resource3", "resource7");
    addEdge("resource9", "resource8");
    addEdge("resource6", "resource8");
    addEdge("resource5", "resource10");
    addEdge("resource8", "resource10");

    tables["resource3"].columns = {
        "column1": {
            id: "column1",
            name: "Parameter 1",
            sources: [
                {
                    tableId: "resource4",
                    columnId: "column1",
                }
            ],
            children: [
                {
                    tableId: "resource7",
                    columnId: "column1",
                },
                {
                    tableId: "resource9",
                    columnId: "column3"
                }
            ],
        },
        "column2": {
            id: "column2",
            name: "Parameter 2",
            sources: [],
            children: [
                {
                    tableId: "resource7",
                    columnId: "column2",
                }
            ],
        },
    };

    tables["resource7"].columns = {
        "column1": {
            id: "column1",
            name: "Parameter 1",
            sources: [
                {
                    tableId: "resource1",
                    columnId: "column1",
                }
            ],
            children: [],
        },
        "column2": {
            id: "column2",
            name: "Parameter 2",
            sources: [
                {
                    tableId: "resource1",
                    columnId: "column2",
                }
            ],
            children: [],
        },
    };

    tables["resource9"].columns = {
        "column3": {
            id: "column3",
            name: "Parameter 3",
            sources: [
                {
                    tableId: "resource3",
                    columnId: "column1",
                }
            ],
            children: [
                {
                    tableId: "resource5",
                    columnId: "column1",
                }
            ],
        }
    }

    tables["resource5"].columns = {
        "column1": {
            id: "column1",
            name: "Parameter 1",
            sources: [
                {
                    tableId: "resource9",
                    columnId: "column3",
                }
            ],
            children: [],
        }
    }

    tables["resource4"].columns = {
        "column1": {
            id: "column1",
            name: "Parameter 1",
            sources: [],
            children: [
                {
                    tableId: "resource3",
                    columnId: "column1",
                }
            ]
        }
    }

    return tables;
}