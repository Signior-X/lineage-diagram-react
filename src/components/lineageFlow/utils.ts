import dagre from 'dagre';
import { Edge, HandleType, MarkerType, Node, Position } from 'reactflow';
import { IEdges, IExpanded, IFlowTable, IFlowTables, ILineageNodes, LineageNodeData, SetState } from './types';
import { getNodeWidth } from '../ui-utils';

export const getLayoutedElements = (nodes: Node[], edges: Edge[], direction = 'TB') => {
  const dagreGraph = new dagre.graphlib.Graph();
  dagreGraph.setDefaultEdgeLabel(() => ({}));

  const isHorizontal = direction === 'LR';
  dagreGraph.setGraph({ rankdir: direction });

  nodes.forEach((node) => {
    dagreGraph.setNode(node.id, { width: node.width, height: node.height });
  });

  edges.forEach((edge) => {
    dagreGraph.setEdge(edge.source, edge.target);
  });

  dagre.layout(dagreGraph);

  nodes.forEach((node: Node) => {
    const nodeWithPosition = dagreGraph.node(node.id);
    node.targetPosition = isHorizontal ? Position.Left : Position.Top;
    node.sourcePosition = isHorizontal ? Position.Right : Position.Bottom;

    // We are shifting the dagre node position (anchor=center center) to the top left
    // so it matches the React Flow node anchor point (top left).
    node.position = {
      x: nodeWithPosition.x - (node.width ? node.width / 2 : 0),
      y: nodeWithPosition.y - (node.height ? node.height / 2 : 0),
    };

    return node;
  });

  return { nodes, edges };
};

export const getNodeAndEdgesUsingSource = (
  tables: IFlowTables,
  sources: string[],
  setNodes: SetState<ILineageNodes>,
  setExpanded: SetState<IExpanded>,
  setActiveTable: SetState<string | undefined>,
  setActiveColumn: SetState<string | undefined>
) => {
  const nodes: ILineageNodes = {};
  const edges: IEdges = {};

  // 1. Create some utility functions
  const addNode = (table: IFlowTable, showUpButton: boolean, showDownButton: boolean, hidden: boolean) => {
    if (!table) return;
    if (nodes[table.id]) return;

    const nodeData: LineageNodeData = {
      id: table.id,
      table: table,
      setNodes: setNodes,
      setExpanded,
      showUpButton: showUpButton && table.sources.length > 0,
      expandedUp: false,
      showDownButton: showDownButton && table.children.length > 0,
      expandedDown: false,
      showColumns: true,
      setActiveTable,
      setActiveColumn,
      activeColumns: {},
    }

    nodes[table.id] = {
      id: table.id,
      type: 'lineageNode',
      data: nodeData,
      position: { x: 0, y: 0 },   // Just passing, will be updated by dagre
      width: getNodeWidth(table.name) + 160,
      height: 200 + (Object.keys(table.columns).length * 24),
      hidden: hidden,
    };
  }

  const addEdge = (tableFromId: string, tableToId: string) => {
    const edgeId = getEdgeIdTables(tableFromId, tableToId);

    edges[edgeId] = {
      id: edgeId,
      source: tableFromId,
      sourceHandle: getHandleId("source", tableFromId),
      target: tableToId,
      targetHandle: getHandleId("target", tableToId),
      markerEnd: {
        strokeWidth: 2,
        height: 20,
        width: 20,
        type: MarkerType.Arrow,
      },
      hidden: true,
    };
  }

  const addColumnEdge = (tableFromId: string, columnFromId: string,
    tableToId: string, columnToId: string) => {
    const edgeId = getEdgeIdColumns(tableFromId, columnFromId, tableToId, columnToId);

    edges[edgeId] = {
      id: edgeId,
      source: tableFromId,
      sourceHandle: getHandleId("source", tableFromId, columnFromId),
      target: tableToId,
      targetHandle: getHandleId("target", tableToId, columnToId),
      markerEnd: {
        strokeWidth: 2,
        height: 20,
        width: 20,
        type: MarkerType.Arrow,
      },
      hidden: true,
      style: {
        stroke: "grey"
      }
    };

    return;
  }

  const processed: { [key: string]: boolean } = {};
  const processing: { [key: string]: boolean } = {};

  const cleanDfs = () => {
    Object.keys(processed).forEach(key => {
      delete processed[key];
    });
    Object.keys(processing).forEach(key => {
      delete processing[key];
    });
  }

  const dfsUp = (tableId: string) => {
    const table = tables[tableId];
    if (!table) return;                  // Can happen if table with this id not exists
    if (processed[tableId]) return;      // If already processed
    if (processing[tableId]) return;      // Cycles, we right now ignore
    processing[tableId] = true;

    addNode(table, true, false, true);

    // Now process the child nodes
    const sources = table.sources;
    sources.forEach((tableSource) => {
      dfsUp(tableSource);
    });

    processing[tableId] = false;
    processed[tableId] = true;
  }

  const dfsDown = (tableId: string) => {
    const table = tables[tableId];
    if (!table) return;                  // Can happen if table with this id not exists

    addNode(table, false, true, true);
    if (processed[tableId]) return;      // If already processed
    if (processing[tableId]) return;      // Cycles, we right now ignore
    processing[tableId] = true;

    // Now process the child nodes
    const references = table.children;
    references.forEach((tableReference) => {
      // Add all the edges here
      dfsDown(tableReference);
    });

    processing[tableId] = false;
    processed[tableId] = true;
  }

  // 3. Finally, all set create the graph!
  cleanDfs();
  sources.forEach((id) => {
    addNode(tables[id], true, true, false);
    dfsDown(id);
  });

  cleanDfs();
  sources.forEach((id) => {
    dfsUp(id);
  });

  // 4. Add edges for the nodes which are not hidden
  Object.values(nodes).forEach((node) => {
    const children = node.data.table.children;
    children.forEach((tableToId) => {
      const nodeTo = nodes[tableToId];
      if (nodeTo) {
        addEdge(node.id, tableToId);
      }
    });

    const columns = node.data.table.columns;
    Object.values(columns).forEach((column) => {
      const children = column.children;
      children.forEach((child) => {
        if (nodes[child.tableId]) {
          addColumnEdge(node.id, column.id, child.tableId, child.columnId);
        }
      });
    });
  });

  return { nodes, edges }
}

export const getNodeAndEdgesFromExpanded = (
  oldNodes: ILineageNodes,
  oldEdges: IEdges,
  sources: string[],
  expanded: { [key: string]: boolean },
): {
  edges: IEdges;
  nodes: ILineageNodes;
} => {
  const edges: IEdges = { ...oldEdges };
  const nodes: ILineageNodes = { ...oldNodes };

  // 1. Do a dfs with a list of processed nodes
  const visibleNodes: { [key: string]: boolean } = {};
  const visibleEdges: { [key: string]: boolean } = {};
  const processed: { [key: string]: boolean } = {};
  const processing: { [key: string]: boolean } = {};

  const cleanDfs = () => {
    Object.keys(processed).forEach(key => {
      delete processed[key];
    });
    Object.keys(processing).forEach(key => {
      delete processing[key];
    });
  }

  const dfsUp = (nodeId: string, visible: boolean) => {
    const node = oldNodes[nodeId];
    console.log("DFS Up: Node:", nodeId);
    if (!node) return;               // Can happen if table with this id not exists

    visibleNodes[nodeId] = Boolean(visibleNodes[nodeId] || visible);

    // Each node is processed at max two times -> n * (2 - visiblities)
    const key = nodeId + "__KEY__" + visible;
    if (processed[key]) return;      // If already processed
    if (processing[nodeId]) return;      // Cycles, we right now ignore

    processing[nodeId] = true;

    // Now process the child nodes
    const sources = node.data.table.sources;
    sources.forEach((source) => {
      if (!expanded[source]) {
        visible = false;
      }

      // Add all the edges here
      const edgeId = getEdgeIdTables(source, nodeId);
      visibleEdges[edgeId] = Boolean(visibleEdges[edgeId] || visible);

      // Add columns edges here
      const columns = node.data.table.columns;
      Object.values(columns).forEach((column) => {
        const columnSources = column.sources;
        columnSources.forEach((columnSource) => {
          if (nodes[columnSource.tableId]) {
            const columnEdgeId = getEdgeIdColumns(columnSource.tableId, columnSource.columnId, node.id, column.id);
            visibleEdges[columnEdgeId] = Boolean(visibleEdges[columnEdgeId] || visible);
          }
        });
      });

      dfsUp(source, visible);
    });

    processing[nodeId] = false;
    processed[nodeId] = true;
  }

  const dfsDown = (nodeId: string, visible: boolean) => {
    const node = oldNodes[nodeId];
    console.log("DFS Down: Node:", nodeId);
    if (!node) return;                  // Can happen if table with this id not exists

    visibleNodes[nodeId] = Boolean(visibleNodes[nodeId] || visible);

    // Each node is processed at max two times -> n * (2 - visiblities)
    const key = nodeId + "__KEY__" + visible;
    if (processed[key]) return;      // If already processed
    if (processing[nodeId]) return;      // Cycles, we right now ignore

    if (!expanded[nodeId]) {
      visible = false;
    }

    processing[nodeId] = true;

    const children = node.data.table.children;
    children.forEach((child) => {
      // Add all the edges here
      const edgeId = getEdgeIdTables(nodeId, child);
      visibleEdges[edgeId] = Boolean(visibleEdges[edgeId] || visible);

      // Add columns edges here
      const columns = node.data.table.columns;
      Object.values(columns).forEach((column) => {
        const columnChildren = column.children;
        columnChildren.forEach((columnChild) => {
          if (nodes[columnChild.tableId]) {
            const columnEdgeId = getEdgeIdColumns(node.id, column.id, columnChild.tableId, columnChild.columnId);
            visibleEdges[columnEdgeId] = Boolean(visibleEdges[columnEdgeId] || visible);
          }
        });
      });

      dfsDown(child, visible);
    });

    processing[nodeId] = false;
    processed[nodeId] = true;
  }

  // 3. Finally, all set create the graph!
  cleanDfs();
  sources.forEach((id) => {
    visibleNodes[id] = true;
    dfsDown(id, true);
  });

  cleanDfs();
  sources.forEach((id) => {
    dfsUp(id, true);
  });

  // 4. Use the above dfs information to update the nodes and edges
  // console.log("VISBLE NODES: ", visibleNodes);
  Object.values(nodes).forEach((node) => {
    node.hidden = Boolean(!visibleNodes[node.id]);
    const expandedUp = Boolean(node.data.table.sources.length > 0 && expanded[node.data.table.sources[0]]);
    node.data.expandedUp = expandedUp;
    node.data.expandedDown = expanded[node.id];
  });

  // console.log("VISIBLE EDGES: ", visibleEdges);
  Object.values(edges).forEach((edge) => {
    edge.hidden = Boolean(!visibleEdges[edge.id]);
  });

  return {
    edges,
    nodes,
  }
}

export const getHandleId = (handleType: HandleType, tableId: string, columnId: string | undefined = undefined) => {
  if (columnId === undefined) {
    return handleType + "__" + tableId;
  }
  return handleType + "__" + tableId + "_PRIYAM_" + columnId;
}

export const getEdgeIdTables = (tableFromId: string, tableToId: string) => {
  return `${tableFromId}-TO-${tableToId}`;
}

export const getEdgeIdColumns = (tableFromId: string, columnFromId: string, tableToId: string, columnToId: string) => {
  return `${tableFromId}_${columnFromId}-TO-${tableToId}_${columnToId}`;
}
