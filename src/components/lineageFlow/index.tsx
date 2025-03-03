import { useState, useEffect, FC, useMemo } from 'react';
import ReactFlow, {
  Controls,
  Background,
  Edge,
  Node,
  MiniMap,
  MarkerType,
  ReactFlowInstance,
} from 'reactflow';
import 'reactflow/dist/style.css';
import LineageNode from './LineageNode';
import { getNodeAndEdgesFromExpanded, getLayoutedElements, getNodeAndEdgesUsingSource, getEdgeIdColumns } from './utils';
import { IEdges, IExpanded, IFlowTable, IFlowTables, ILineageNodes, LineageNodeData } from './types';
import { Queue } from './queue';
import { table } from 'console';

interface LineageFlowProps {
  tables: IFlowTables;
  sources: string[];
}
const LineageFlow: FC<LineageFlowProps> = (props) => {
  const { tables, sources } = props;

  const [edges, setEdges] = useState<IEdges>({});
  const [nodes, setNodes] = useState<ILineageNodes>({});
  const [expanded, setExpanded] = useState<IExpanded>({});
  const [activeTable, setActiveTable] = useState<string>();
  const [activeColumn, setActiveColumn] = useState<string>();
  const [reactFlowInstance, setReactFlowInstance] = useState<ReactFlowInstance>();

  const nodeTypes = useMemo(
    () => ({
      lineageNode: LineageNode,
    }),
    []
  );

  useEffect(() => {
    // The logic will be - First find all the source nodes
    // And then if the source node is in expanded, stop the traversal
    // Else traverse and add in the list of nodes
    // Then we use dagre to position the graph and show
    const { nodes: tableNodes, edges: tableEdges } = getNodeAndEdgesUsingSource(tables, sources, setNodes, setExpanded, setActiveTable, setActiveColumn);
    const { nodes: layoutedNodes } = getLayoutedElements(Object.values(tableNodes), Object.values(tableEdges), 'LR');

    layoutedNodes.forEach((node) => {
      tableNodes[node.id].position = node.position;
    });

    const { nodes: newNodes, edges: newEdges } = getNodeAndEdgesFromExpanded(tableNodes, tableEdges, sources, {});

    setExpanded({});
    setActiveColumn(undefined);
    setActiveTable(undefined);
    setNodes(newNodes);
    setEdges(newEdges);
    setTimeout(() => window.requestAnimationFrame(() => reactFlowInstance?.fitView()), 0);
  }, [tables, sources, setExpanded, setActiveTable, setActiveColumn]);

  useEffect(() => {
    console.log("Expanded: ", expanded);
    const { nodes: newNodes, edges: newEdges } = getNodeAndEdgesFromExpanded(nodes, edges, sources, expanded);
    setNodes(newNodes);
    setEdges(newEdges);
  }, [expanded]);

  useEffect(() => {
    console.log("ActiveTable", "ActiveColumn", activeTable, activeColumn);
    const newEdges: IEdges = { ...edges };
    const activeEdges: { [key: string]: boolean } = {};
    const newNodes: ILineageNodes = { ...nodes };

    Object.values(newNodes).forEach((node) => {
      node.data = { ...node.data, activeColumns: {} };
    });

    // 1. Find all the edges that has to be active
    if (activeTable && activeColumn) {
      const queue = new Queue<{ table: string, column: string }>();  // activeTable, activeColumn
      queue.enqueue({ table: activeTable, column: activeColumn });
      const processed: { [key: string]: boolean } = {};

      while (queue.size > 0) {
        const first = queue.dequeue();
        console.log("BFS: ", first);
        if (!first) break;

        const key = JSON.stringify(first);
        if (processed[key]) continue;
        processed[key] = true;

        if (!nodes[first.table]) continue;
        if (!nodes[first.table].data.table.columns[first.column]) continue;

        // Make the node's column as active
        newNodes[first.table].data.activeColumns[first.column] = true;

        // Go Down
        const childColumns = nodes[first.table].data.table.columns[first.column].children;
        childColumns.forEach((columnRef) => {
          const columnEdgeId = getEdgeIdColumns(first.table, first.column, columnRef.tableId, columnRef.columnId);
          activeEdges[columnEdgeId] = true;

          queue.enqueue({ table: columnRef.tableId, column: columnRef.columnId });
        });

        // Go Up
        const sourceColumns = nodes[first.table].data.table.columns[first.column].sources;
        sourceColumns.forEach((columnRef) => {
          const columnEdgeId = getEdgeIdColumns(columnRef.tableId, columnRef.columnId, first.table, first.column);
          activeEdges[columnEdgeId] = true;

          queue.enqueue({ table: columnRef.tableId, column: columnRef.columnId });
        });
      }
    }

    // 2. Mark all the active edges stroke
    Object.values(newEdges).forEach((edge) => {
      edge.style = {
        ...edge.style,
        stroke: (activeEdges[edge.id] ? "yellow" : "grey"),
      };
    });

    setNodes(newNodes);
    setEdges(newEdges);
  }, [activeTable, activeColumn]);

  console.log("Nodes:", nodes);
  console.log("Edges:", edges);

  return (
    <ReactFlow
      onInit={(instance) => setReactFlowInstance(instance)}
      nodes={Object.values(nodes)}
      nodeTypes={nodeTypes}
      edges={Object.values(edges)}
      fitView={true}
      minZoom={0.2}
    >
      <MiniMap />
      <Background />
      <Controls />
    </ReactFlow>
  );
}

export default LineageFlow;
