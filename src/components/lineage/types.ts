export interface RolloutProps {
    orchestratedSteps: OrchestratedSteps[];
}

interface OrchestratedSteps {
    name: string;
    targetType: string;
    targetName: string;
    actions: string[];
    dependsOn?: string[]; // Both of these are valid so having
    DependsOn?: string[];
}