import { memo, useEffect, useState } from "react";
import { useTranslate } from "@lucksoft/aiflow-editor";
import { Checkbox, Input } from "antd";
import { FormCard, FormCardContent } from "./FormCard";

const { TextArea } = Input;

const buildDefaultConfig = () => ({
  key: "",
  title: "",
  pretreatment: false,
  level: "",
  rule: {
    decisionRules: "",
    question: "",
    example: "",
    reference: "",
    thinking: false,
    enabled: true,
    loopParagraph: false,
    extraPrompt: "",
    targetText: "",
    targetLevel: "",
    targetComment: "",
  },
  directory: [],
});

export const RulePanel = memo((props) => {
  const t = useTranslate();
  const [config, setConfig] = useState(() => {
    const defaults = buildDefaultConfig();
    if (!props.value) {
      return defaults;
    }
    return mergeConfig(defaults, props.value);
  });

  useEffect(() => {
    if (props.value) {
      const defaults = buildDefaultConfig();
      setConfig((prev) =>
        mergeConfig({ ...defaults, key: prev.key, pretreatment: prev.pretreatment }, props.value)
      );
    }
  }, [props.value]);

  const emitChange = (updater) => {
    setConfig((prev) => {
      const updated = updater(prev);
      props.onChange?.(updated);
      return updated;
    });
  };

  const updateRule = (change) => {
    emitChange((prev) => ({
      ...prev,
      rule: {
        ...prev.rule,
        ...change,
      },
    }));
  };

  return (
    <div className="rule-panel">
      <FormCard title={t("ruleName")}>
        <Input
          value={config.title}
          placeholder={t("pleaseSelectRuleName")}
          onChange={(e) =>
            emitChange((prev) => ({
              ...prev,
              title: e.target.value,
            }))
          }
        />
      </FormCard>

      <FormCard title={t("ruleClassification")}>
        <Input
          value={config.level}
          placeholder={t("pleaseSelectRuleClassification")}
          onChange={(e) =>
            emitChange((prev) => ({
              ...prev,
              level: e.target.value,
            }))
          }
        />
      </FormCard>

      <FormCard title={t("problemConfiguration")}>
        <TextArea
          value={config.rule.question}
          placeholder={t("pleaseSelectProblemConfiguration")}
          rows={4}
          onChange={(e) => updateRule({ question: e.target.value })}
        />
      </FormCard>

      <FormCard title={t("judgementRule")}>
        <TextArea
          value={config.rule.decisionRules}
          placeholder={t("pleaseSelectJudgementRule")}
          rows={4}
          onChange={(e) => updateRule({ decisionRules: e.target.value })}
        />
      </FormCard>

      <FormCard title={t("correctExample")}>
        <TextArea
          value={config.rule.example}
          placeholder={t("pleaseSelectCorrectExample")}
          rows={4}
          onChange={(e) => updateRule({ example: e.target.value })}
        />
      </FormCard>

      <FormCard title={t("reference")}>
        <TextArea
          value={config.rule.reference}
          placeholder={t("pleaseSelectReference")}
          rows={4}
          onChange={(e) => updateRule({ reference: e.target.value })}
        />
      </FormCard>

      <FormCard title={t("extraPrompt")}>
        <TextArea
          value={config.rule.extraPrompt}
          placeholder={t("pleaseSelectExtraPrompt")}
          rows={3}
          onChange={(e) => updateRule({ extraPrompt: e.target.value })}
        />
      </FormCard>

      <FormCard title={t("targetLevel")}>
        <TextArea
          value={config.rule.targetLevel}
          placeholder={t("pleaseSelectTargetLevel")}
          rows={2}
          onChange={(e) => updateRule({ targetLevel: e.target.value })}
        />
      </FormCard>

      <FormCard title={t("targetText")}>
        <TextArea
          value={config.rule.targetText}
          placeholder={t("pleaseSelectTargetText")}
          rows={2}
          onChange={(e) => updateRule({ targetText: e.target.value })}
        />
      </FormCard>

      <FormCard title={t("targetComment")}>
        <TextArea
          value={config.rule.targetComment}
          placeholder={t("pleaseSelectTargetComment")}
          rows={2}
          onChange={(e) => updateRule({ targetComment: e.target.value })}
        />
      </FormCard>

      <FormCard title={t("ruleManagement")}>
        <FormCardContent>
          <Checkbox
            checked={config.rule.enabled}
            onChange={(e) => updateRule({ enabled: e.target.checked })}
          >
            {t("enableEnabled")}
          </Checkbox>
          <Checkbox
            checked={config.rule.thinking}
            onChange={(e) => updateRule({ thinking: e.target.checked })}
          >
            {t("enableThinking")}
          </Checkbox>
          <Checkbox
            checked={config.rule.loopParagraph}
            onChange={(e) => updateRule({ loopParagraph: e.target.checked })}
          >
            {t("enableLoopParagraph")}
          </Checkbox>
        </FormCardContent>
      </FormCard>

      <FormCard title={t("ruleChapter")}>
        <TextArea
          value={config.directory.join("\n")}
          placeholder={t("pleaseSelectRuleChapter")}
          rows={4}
          onChange={(e) =>
            emitChange((prev) => ({
              ...prev,
              directory: e.target.value.split("\n"),
            }))
          }
        />
      </FormCard>
    </div>
  );
});

function mergeConfig(defaults, incoming) {
  return {
    ...defaults,
    ...incoming,
    rule: {
      ...defaults.rule,
      ...(incoming.rule || {}),
      thinking:
        incoming?.rule?.thinking ??
        incoming?.thinking ??
        defaults.rule.thinking,
      enabled:
        incoming?.rule?.enabled ??
        incoming?.enabled ??
        defaults.rule.enabled,
      loopParagraph:
        incoming?.rule?.loopParagraph ??
        incoming?.loopParagraph ??
        defaults.rule.loopParagraph,
    },
    directory: Array.isArray(incoming?.directory)
      ? [...incoming.directory]
      : typeof incoming?.directory === "string"
      ? [incoming.directory]
      : [],
    key: incoming?.key ?? defaults.key,
    pretreatment:
      incoming?.pretreatment ?? defaults.pretreatment ?? false,
  };
}
