import {
  ContentPlaceholder,
  NodeType,
} from "@lucksoft/aiflow-editor";
import { ApproverPanel } from "./setters/ApproverPanel";
import { AuditPanel } from "./setters/AuditPanel";
import { ConditionPanel } from "./setters/ConditionPanel";
import { NotifierPanel } from "./setters/NotifierPanel";
import { StartPanel } from "./setters/StartPanel";
import { RulePanel } from "./setters/RulePanel";

export const materialUis = {
  [NodeType.approver]: {
    viewContent: (_node, { t }) => (
      <ContentPlaceholder secondary text={t("pleaseChooseApprover")} />
    ),
    settersPanel: ApproverPanel,
    validate: (node, { t }) => {
      if (!node.config) {
        return t("noSelectedApprover");
      }
      return true;
    },
  },
  [NodeType.audit]: {
    viewContent: (_node, { t }) => (
      <ContentPlaceholder secondary text={t("pleaseChooseDealer")} />
    ),
    settersPanel: AuditPanel,
    validate: (node, { t }) => {
      if (!node.config) {
        return t("noSelectedDealer");
      }
      return true;
    },
  },
  [NodeType.condition]: {
    viewContent: (_node, { t }) => (
      <ContentPlaceholder text={t("conditionBranch")} />
    ),
    settersPanel: ConditionPanel,
    validate: (node, { t }) => {
      if (!node.config) {
        return t("noSetCondition");
      }
      return true;
    },
    canOpenSettings: false,
  },
  [NodeType.notifier]: {
    viewContent: (_node, { t }) => (
      <ContentPlaceholder text={t("pleaseChooseNotifier")} />
    ),
    settersPanel: NotifierPanel,
  },
  [NodeType.start]: {
    viewContent: (_node, { t }) => (
      <ContentPlaceholder text={t("theWholeDocument")} />
    ),
    settersPanel: StartPanel,
    canOpenSettings: false,
  },
  [NodeType.rule]: {
    viewContent: (node, { t }) => (
      <ContentPlaceholder text={node.agent?.title || t("rule")} />
    ),
    settersPanel: RulePanel,
    canOpenSettings: true,
  },
  [NodeType.spellCheck]: {
    viewContent: (_node, { t }) => (
      <ContentPlaceholder text={t("spellCheck")} />
    ),
    canOpenSettings: false,
  },
  [NodeType.generateComment]: {
    viewContent: (_node, { t }) => (
      <ContentPlaceholder text={t("generateComment")} />
    ),
    canOpenSettings: false,
  },
  [NodeType.typoCheck]: {
    viewContent: (_node, { t }) => (
      <ContentPlaceholder text={t("typoCheck")} />
    ),
    canOpenSettings: false,
  },
  [NodeType.annotateReferencesAgent]: {
    viewContent: (_node, { t }) => (
      <ContentPlaceholder text={t("annotateReferencesAgent")} />
    ),
    canOpenSettings: false,
  },
  [NodeType.chapterContinuityCheckerAgent]: {
    viewContent: (_node, { t }) => (
      <ContentPlaceholder text={t("chapterContinuityCheckerAgent")} />
    ),
    canOpenSettings: false,
  },
};
