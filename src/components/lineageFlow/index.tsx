import { useState, useEffect, FC, useMemo } from 'react';
import ReactFlow, {
  Controls,
  Background,
  Edge,
  Node,
} from 'reactflow';
import 'reactflow/dist/style.css';
import LineageNode from './LineageNode';
import { getNodeAndEdgesFromExpanded, getLayoutedElements, getNodeAndEdgesUsingSource } from './utils';
import { IFlowTables, LineageNodeData } from './types';

interface Expanded {
  [key: string]: boolean;
}

interface LineageFlowProps {
  tables: IFlowTables;
  sources: string[];
}
const LineageFlow: FC<LineageFlowProps> = (props) => {
  const { tables, sources } = props;

  const [edges, setEdges] = useState<{ [key: string]: Edge}>({});
  const [nodes, setNodes] = useState<{ [key: string]: Node<LineageNodeData>}>({});
  const [expanded, setExpanded] = useState<Expanded>({});

  const nodeTypes = useMemo(
    () => ({
      lineageNode: LineageNode,
    }),
    []
  );

  const handleUpClick = (id: string) => {
    console.log("Up click: ", id);

    const newExpanded = { ...expanded };
    let toExpand = true;

    for (const source of tables[id].sources) {
      if (newExpanded[source]) {
        toExpand = false;
        break;
      }
    }

    for (const source of tables[id].sources) {
      newExpanded[source] = toExpand;
    }

    setExpanded(newExpanded);
  }

  const handleDownClick = (id: string) => {
    console.log("Down click: ", id);

    const newExpanded = { ...expanded };
    newExpanded[id] = !expanded[id];
    setExpanded(newExpanded);
  }

  useEffect(() => {
    // The logic will be - First find all the source nodes
    // And then if the source node is in expanded, stop the traversal
    // Else traverse and add in the list of nodes
    // Then we use dagre to position the graph and show
    const { nodes: tableNodes, edges: tableEdges } = getNodeAndEdgesUsingSource(tables, sources, handleUpClick, handleDownClick);
    const { nodes: layoutedNodes } = getLayoutedElements(Object.values(tableNodes), Object.values(tableEdges), 'LR');

    layoutedNodes.forEach((node) => {
      tableNodes[node.id].position = node.position;
    });

    const { nodes: newNodes, edges: newEdges } = getNodeAndEdgesFromExpanded(tableNodes, tableEdges, sources, expanded, handleUpClick, handleDownClick);

    setNodes(newNodes);
    setEdges(newEdges);
  }, [tables, sources]);

  useEffect(() => {
    console.log("Expanded: ", expanded);
    const { nodes: newNodes, edges: newEdges } = getNodeAndEdgesFromExpanded(nodes, edges, sources, expanded, handleUpClick, handleDownClick);
    setNodes(newNodes);
    setEdges(newEdges);
  }, [expanded]);

  return (
    <ReactFlow
      nodes={Object.values(nodes)}
      nodeTypes={nodeTypes}
      edges={Object.values(edges)}
      fitView={true}
    >
      {/* <MiniMap /> */}
      <Background />
      <Controls />
    </ReactFlow>
  );
}

export default LineageFlow;
