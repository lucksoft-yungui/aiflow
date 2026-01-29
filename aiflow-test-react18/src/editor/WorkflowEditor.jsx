import { forwardRef } from "react";
import { FlowEditorScope } from "@lucksoft/aiflow-editor";
import { WorkFlowEditorInner } from "./WorkFlowEditorInner";
import { materialUis } from "./materialUis";
import { workflowEditorDefaultLocales } from "./locales";
import "./nodeTypes";
import "./defaultMaterials";
import "./setters/FormCard/index.css";

export const WorkflowEditor = forwardRef((props, ref) => {
  const {
    themeMode,
    themeToken,
    lang,
    locales,
    initialJson,
    jsonString,
    onNodeDedug,
    readOnly,
    ...other
  } = props || {};

  return (
    <FlowEditorScope
      mode={themeMode}
      themeToken={themeToken}
      lang={lang}
      defaultLocales={workflowEditorDefaultLocales}
      locales={locales}
      materialUis={materialUis}
      initialJson={initialJson}
      jsonString={jsonString}
      onNodeDedug={onNodeDedug}
      readOnly={readOnly}
    >
      <WorkFlowEditorInner ref={ref} {...other} />
    </FlowEditorScope>
  );
});
