export interface INodeTypeConfig {
  [key: string]: string;
  start: string;
  approver: string;
  notifier: string;
  audit: string;
  route: string;
  condition: string;
  rule: string;
  spellCheck: string;
  generateComment: string;
  typoCheck: string;
  annotateReferencesAgent: string;
  chapterContinuityCheckerAgent: string;
  agent: string;
}

const buildBuiltinNodeTypes = (): INodeTypeConfig => ({
  start: "start",
  approver: "approver",
  notifier: "notifier",
  audit: "audit",
  route: "route",
  condition: "condition",
  rule: "rule",
  spellCheck: "spellCheck",
  generateComment: "generateComment",
  typoCheck: "typoCheck",
  annotateReferencesAgent: "AnnotateReferencesAgent ",
  chapterContinuityCheckerAgent: "ChapterContinuityCheckerAgent",
  agent: "agent",
});

export const builtinNodeTypeConfig: INodeTypeConfig = buildBuiltinNodeTypes();

export let NodeType: INodeTypeConfig = { ...builtinNodeTypeConfig };

export type NodeTypeValue = INodeTypeConfig[keyof INodeTypeConfig];

export const setNodeTypeConfig = (config: INodeTypeConfig): void => {
  NodeType = { ...config };
};

export const resetNodeTypeConfig = (): void => {
  NodeType = { ...builtinNodeTypeConfig };
};
