import React, { useEffect, useState } from 'react'
import { DEFAULT_FLOW_TABLES } from './constants';
import { IFlowTable, IFlowTables } from '../lineageFlow/types';
import LineageFlow from '../lineageFlow';
// import RolloutData from "../../data/IngestionRegionAgnosticEnv_AllResources.Buildout.json";
// import RolloutData from "../../data/Resources.PRD.INC0A.RolloutSpec.json";

interface LineageProps {
}
const Lineage: React.FC<LineageProps> = (props) => {
  const [tables, setTables] = useState<IFlowTables>({});
  const [source, setSource] = useState<string>();

  useEffect(() => {
    const tables = DEFAULT_FLOW_TABLES();
    setTables(tables);

    // console.log("RolloutData", RolloutData.orchestratedSteps);
    // const newTables: IFlowTables = {}
    
    // const tablesList: IFlowTable[] = RolloutData.orchestratedSteps
    // // .filter((step) => step.targetType === "ServiceResourceDefinition")
    // .map((step) => {
    //   const children = RolloutData.orchestratedSteps
    //     .filter((child) => child.DependsOn?.includes(step.name))
    //     .map((child) => child.name);

    //   return {
    //     id: step.name,
    //     name: step.targetName,
    //     sources: step.DependsOn ?? [],
    //     children: children,
    //     columns: {}
    //   }
    // });

    // tablesList.forEach((table) => {
    //   newTables[table.id] = table;
    // });

    // setSource("");
    // setTables(newTables);
  }, []);

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
        <LineageFlow tables={tables} sources={[source ?? ""]} />
      </div>
    </div>
  );
}

export default Lineage;
