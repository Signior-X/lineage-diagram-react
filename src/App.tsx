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

    getTables();
  }, []);

  return (
    <Lineage tables={tables} source={source} setSource={setSource} />
  )
}

export default App;
