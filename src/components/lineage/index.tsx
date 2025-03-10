import React, { useEffect, useState } from 'react'
import { IFlowTable, IFlowTables } from '../lineageFlow/types';
import LineageFlow from '../lineageFlow';

interface LineageProps {
  tables: IFlowTables;
  source: string | undefined;
  setSource: (source: string | undefined) => void;
}
const Lineage: React.FC<LineageProps> = (props) => {
  const { tables, source, setSource } = props;
  const [sources, setSources] = useState<string[]>([]);

  useEffect(() => {
    const sources: string[] = source ? [source] : [];
    setSources(sources);
  }, [source]);

  return (
    <div className='relative flex flex-col h-screen w-screen'>
      <div className='absolute z-[90] top-0 left-0 p-4 bg-black'>
      <div className='flex items-center justify-center gap-2'>
        <label> Choose source </label>
        <select className='select select-sm ml-2' value={source} onChange={(e) => {setSource(e.target.value)}}>
          <option disabled selected>Pick a source</option>
          {Object.values(tables).map((table) => {
            return <option key={table.id} value={table.id}> {table.id} </option>
          })}
        </select>
      </div>
      </div>
      <div className='flex flex-1'>
        <LineageFlow tables={tables} sources={sources} />
      </div>
    </div>
  );
}

export default Lineage;
