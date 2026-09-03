export const PROCESS_STAGES = [
  "REGISTRATION",
  "AGREEMENT",
  "PANEL_PURCHASE_TOKEN_ACTIVATION",
  "VISITING_TEAM",
  "WORK_SETUP",
] as const;

export type ProcessStage = (typeof PROCESS_STAGES)[number];

export const PROCESS_STAGE_LABELS: Record<ProcessStage, string> = {
  REGISTRATION: "Registration",
  AGREEMENT: "Agreement",
  PANEL_PURCHASE_TOKEN_ACTIVATION: "Panel Purchase and Token Activation",
  VISITING_TEAM: "Visiting Team",
  WORK_SETUP: "Work Setup",
};

export function stageIndex(stage: string): number {
  return (PROCESS_STAGES as readonly string[]).indexOf(stage);
}
