import React, { useEffect, useState } from 'react';
import Lineage from './components/lineage';
import { IColumn, IFlowTable, IFlowTables } from './components/lineageFlow/types';
import { RolloutProps } from './components/lineage/types';
import { DEFAULT_FLOW_TABLES } from './components/lineage/constants';

interface AppProps {
}
const App: React.FC<AppProps> = (props) => {
  const [source, setSource] = useState<string>();
  const [tables, setTables] = useState<IFlowTables>({});

  const getTablesList = (rolloutData: RolloutProps) => {
    const tablesList: IFlowTable[] = rolloutData.orchestratedSteps
    // .filter((step) => step.targetType === "ServiceResourceDefinition")
    .map((step) => {
      const children = rolloutData.orchestratedSteps
        .filter((child) => child.DependsOn?.includes(step.name) || child.dependsOn?.includes(step.name))
        .map((child) => child.name);

      const sources = step.DependsOn ?? step.dependsOn ?? [];
      return {
        id: step.name,
        name: step.targetName,
        sources: sources,
        children: children,
        columns: {}
      }
    });

    return tablesList;
  }

  const DEMO0 = async () => {
    let newTables: IFlowTables = DEFAULT_FLOW_TABLES();
    setTables(newTables);
  }

  const DEMO1 = async () => {
      const newTables: IFlowTables = {};
      const tablesList = getTablesList(await import("./data/Resources.PRD.INC0A.RolloutSpec.json"));
      tablesList.forEach((table) => {
        newTables[table.id] = table;
      });
      setTables(newTables);
  }

  const DEMO2 = async () => {
    const newTables: IFlowTables = {};
    const tablesList = getTablesList(await import("./data/IngestionRegionAgnosticEnv_AllResources.Buildout.json"));
    tablesList.forEach((table) => {
      newTables[table.id] = table;
    });

    const scopeBindings = await import("./data/IngestionRegionAgnosticEnv.ScopeBindings.json");

    scopeBindings.default.scopeBindings.forEach((scopeBinding) => {
      scopeBinding.bindings.forEach((binding) => {
        
      });

      const columnsList: IColumn[] = scopeBinding.bindings.map((binding) => {
        return {
          id: scopeBinding.scopeTagName + "_P_" + binding.find,
          name: binding.find,
          sources: [],
          children: []
        }
      });

      if (newTables[scopeBinding.scopeTagName]) {
        columnsList.forEach((column) => {
          newTables[scopeBinding.scopeTagName].columns[column.id] = column;
        });
      }
    });

    setTables(newTables);
  }

  useEffect(() => {
    // const tables = DEFAULT_FLOW_TABLES();
    // setTables(tables);
    async function getTables() {
      // await DEMO0();
      // await DEMO1();
      await DEMO2();
    }

    // getTables();
  }, []);

  return (
    <>
      <div className="flex flex-col justify-content items-center h-screen w-screen">

        {Object.keys(tables).length > 0 ? 
          <div className="flex flex-row flex-1">
          <Lineage tables={tables} source={source} setSource={setSource} />
        </div>
      : 
        <div className="flex flex-col m-auto gap-8 justify-between p-8">
          <h2 className='text-2xl'> Please choose the demo! </h2>
          <button className='btn btn-primary' onClick={() => {DEMO0()}}> Demo Resources </button>
          <button className='btn btn-secondary' onClick={() => {DEMO1()}}> SQL Resources </button>
          <button className='btn btn-accent' onClick={() => {DEMO2()}}> Sample app resources </button>
        </div>
        }

      </div>
    </>
  )
}

export default App;
