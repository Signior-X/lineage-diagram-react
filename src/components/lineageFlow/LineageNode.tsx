import { FC } from 'react';
import { Handle, Position } from 'reactflow';
import { LineageNodeData } from './types';
import { getHandleId } from './utils';

interface LineageNodeProps {
  data: LineageNodeData;
}
const LineageNode: FC<LineageNodeProps> = (props) => {
  const { data } = props;

  return (
    <>
      <div className='flex flex-col bg-neutral-focus'>
        <div className="flex flex-row relative gap-2">
          <Handle id={getHandleId("target", data.table.id)} type="target" position={Position.Left} />
          {data.up ?
            <div className="flex items-center">
              <button onClick={() => data.upClick(data.id)} className="rounded-3xl bg-neutral text-neutral-content w-8 text-2xl"
                style={
                  data.expandedUp ? {
                    transition: "transform 0.5s",
                    transform: "rotateZ(45deg)",
                  } : {
                    transition: "transform 0.5s",
                  }}>
                {"-"}
              </button>
            </div>
            : null}
          <div className='card rounded-sm bg-neutral text-neutral-content shadow-xl'>
            <div className="card-body">
              <h2 className="card-title">
                {data.table.name}
                <div className="badge badge-secondary">NEW</div>
              </h2>
              <p>{data.id}</p>
              <div className="card-actions justify-end">
                <div className="badge badge-sm badge-outline">Fashion</div>
                <div className="badge badge-sm badge-outline">Products</div>
              </div>
            </div>
          </div>
          {data.down ?
            <div className="flex items-center">
              <button onClick={() => data.downClick(data.id)} className="rounded-3xl bg-neutral text-neutral-content w-8 text-2xl"
                style={
                  data.expandedDown ? {
                    transition: "transform 0.5s",
                    transform: "rotateZ(45deg)",
                  } : {
                    transition: "transform 0.5s",
                  }}>
                {"+"}
              </button>
            </div>
            : null}
          <Handle id={getHandleId("source", data.table.id)} type="source" position={Position.Right} />
        </div>
        <div className="flex flex-col">
          {Object.values(data.table.columns).map((column) => {
            return (
              <div key={column.id} className="relative px-2 border">
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
              </div>
            )
          })}
        </div>
      </div>
    </>
  );
}

export default LineageNode;
