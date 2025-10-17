import { forwardRef, useImperativeHandle } from "react";
import {
  FlowEditorCanvas,
  useDocumentJson,
  useExport,
  useImport,
  useSearchNode,
  useSetJson,
} from "@lucksoft/aiflow-editor";

export const WorkFlowEditorInner = forwardRef((props, ref) => {
  const { className = "", style, ...other } = props;
  const exportJson = useExport();
  const importJson = useImport();
  const getDocumentJson = useDocumentJson();
  const setJson = useSetJson();
  const searchNodeByAgentTitle = useSearchNode();

  useImperativeHandle(
    ref,
    () => ({
      getDocumentJson,
      importJson,
      exportJson,
      setJson,
      searchNodeByAgentTitle,
    }),
    [exportJson, getDocumentJson, importJson, searchNodeByAgentTitle, setJson]
  );

  return (
    <div
      className={`workflow-editor-inner ${className}`.trim()}
      style={{
        display: "flex",
        flexDirection: "column",
        flex: 1,
        minHeight: 0,
        backgroundColor: "var(--workflow-editor-bg, #fff)",
        color: "var(--workflow-editor-text, inherit)",
        ...style,
      }}
      {...other}
    >
      <FlowEditorCanvas />
    </div>
  );
});
