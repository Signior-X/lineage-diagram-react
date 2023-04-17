import React, { useEffect, useState } from 'react'
import { DEFAULT_FLOW_TABLES } from './constants';
import { IFlowTables } from '../lineageFlow/types';
import LineageFlow from '../lineageFlow';

interface LineageProps {
}
const Lineage: React.FC<LineageProps> = (props) => {
  const [tables, setTables] = useState<IFlowTables>({});
  const [source, setSource] = useState<string>("table3");

  useEffect(() => {
    const tables = DEFAULT_FLOW_TABLES();
    setTables(tables);
  }, []);

  return (
    <div className='flex flex-col h-screen w-screen'>
      <div className='flex items-center justify-center gap-2 h-4'>
        <label> Choose source </label>
        <select value={source} onChange={(e) => {setSource(e.target.value)}}>
          {Object.values(tables).map((table) => {
            return <option key={table.id} value={table.id}> {table.id} </option>
          })}
        </select>
      </div>
      <div className='flex flex-1'>
        <LineageFlow tables={tables} sources={[source]} />
      </div>
    </div>
  );
}

export default Lineage;
