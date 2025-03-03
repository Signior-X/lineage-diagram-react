import { FC } from 'react';
import { Handle, Position } from 'reactflow';
import { IExpanded, ILineageNodes, LineageNodeData } from './types';
import { getHandleId } from './utils';
import { ArrowLeftCircle, Plus, PlusCircle } from 'lucide-react';
import { getNodeWidth } from '../ui-utils';

interface LineageNodeProps {
  data: LineageNodeData;
}
const LineageNode: FC<LineageNodeProps> = (props) => {
  const { data } = props;

  const handleUpClick = () => {
    console.log("Up click: ", data.id);

    data.setExpanded((expanded: IExpanded) => {
      const newExpanded = { ...expanded };
      let toExpand = true;

      for (const source of data.table.sources) {
        if (newExpanded[source]) {
          toExpand = false;
          break;
        }
      }

      for (const source of data.table.sources) {
        newExpanded[source] = toExpand;
      }

      return newExpanded;
    });
  }

  const handleDownClick = () => {
    console.log("Down click: ", data.id);

    data.setExpanded((expanded: IExpanded) => {
      const newExpanded = { ...expanded };
      newExpanded[data.id] = !expanded[data.id];
      return newExpanded;
    });
  }

  const handleShowColumns = () => {
    data.setNodes((nodes: ILineageNodes) => {
      const newNodes = { ...nodes };

      Object.values(newNodes).forEach((node) => {
        if (node.id === data.id) {
          node.data.showColumns = !node.data.showColumns;
        }
      });

      return newNodes;
    });
  }

  const setActiveColumn = (colId: string) => {
    data.setActiveTable(data.table.id);
    data.setActiveColumn(colId);
  }

  return (
    <>
      <div className='flex flex-col bg-neutral/40'>
        <div className="flex flex-row relative gap-2">
          <Handle id={getHandleId("target", data.table.id)} type="target" position={Position.Left} />
          {(data.showUpButton) ?
            <div className="flex items-center">
              <button onClick={() => handleUpClick()} className="flex flex-row justify-end rounded-3xl bg-neutral text-neutral-content w-8">
                <ArrowLeftCircle style={
                  data.expandedUp ? {
                    transition: "transform 0.5s",
                    transform: "rotateZ(45deg)",
                  } : {
                    transition: "transform 0.5s",
                  }} />
              </button>
            </div>
            : null}
          <div className='card rounded-sm bg-neutral text-neutral-content shadow-xl'>
            <div className="card-body" style={{ width: `${getNodeWidth(data.table.name)}px` }}>
              <div className='flex flex-col gap-0'>
              <h2 className="card-title">
                {data.table.name}
                {/* <div className="badge badge-secondary">NEW</div> */}
              </h2>
              <p>{data.id}</p>
              </div>
              <div className="card-actions justify-end">
                {Object.keys(data.table.columns).length > 0 ?
                  <button onClick={() => handleShowColumns()} className={"badge leading-[inherit]" + (data.showColumns ? " badge-outline" : " badge-primary")}>
                    {data.showColumns ? "Collapse" : "Expand"}
                  </button>
                  : null}
              </div>
            </div>
          </div>
          {(data.showDownButton) ?
            <div className="flex items-center">
              <button onClick={() => handleDownClick()} className="rounded-3xl bg-neutral text-neutral-content w-8">
                <PlusCircle style={
                  data.expandedDown ? {
                    transition: "transform 0.5s",
                    transform: "rotateZ(45deg)",
                  } : {
                    transition: "transform 0.5s",
                  }} />
              </button>
            </div>
            : null}
          <Handle id={getHandleId("source", data.table.id)} type="source" position={Position.Right} />
        </div>

        {data.showColumns ?
          <div className="flex flex-col">
            {Object.values(data.table.columns).map((column) => {
              return (
                <button
                  onClick={() => setActiveColumn(column.id)}
                  key={column.id}
                  className={`relative px-2 border my-0.5 py-1 ${data.activeColumns[column.id] ? "border-yellow-200" : "border-slate-500"}`}
                >
                  <Handle
                    id={getHandleId("target", data.table.id, column.id)}
                    type="target"
                    position={Position.Left}
                  />
                  {column.name}
                  <Handle
                    id={getHandleId("source", data.table.id, column.id)}
                    type="source"
                    position={Position.Right}
                  />
                </button>
              )
            })}
          </div>
          : null}
      </div>
    </>
  );
}

export default LineageNode;
