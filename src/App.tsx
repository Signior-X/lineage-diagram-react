import React, { useEffect, useState } from 'react';
import Lineage from './components/lineage';
import { IFlowTable, IFlowTables } from './components/lineageFlow/types';
import { RolloutProps } from './components/lineage/types';
import { DEFAULT_FLOW_TABLES } from './components/lineage/constants';

interface AppProps {
}
const App: React.FC<AppProps> = (props) => {
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

  useEffect(() => {
    // const tables = DEFAULT_FLOW_TABLES();
    // setTables(tables);
    async function getTables() {
      const newTables: IFlowTables = DEFAULT_FLOW_TABLES();  
      // const tablesList = getTablesList(await import("./data/Resources.PRD.INC0A.RolloutSpec.json"));
      // tablesList.forEach((table) => {
      //   newTables[table.id] = table;
      // });

      setTables(newTables);
    }

    getTables();
  }, []);

  return (
    <Lineage tables={tables} />
  )
}

export default App;
