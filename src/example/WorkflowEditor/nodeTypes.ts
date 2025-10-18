import { setNodeTypeConfig, INodeTypeConfig } from "../../workflow-editor/interfaces";

const nodeTypeConfig: INodeTypeConfig = {
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
  task: "task",
};

setNodeTypeConfig(nodeTypeConfig);

export { nodeTypeConfig };
