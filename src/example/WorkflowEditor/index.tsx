import { memo } from "react"
import { WorkFlowEditorInner } from "./WorkFlowEditorInner"
import { ILocales } from "@rxdrag/locales"
import { IThemeToken } from "../../workflow-editor"
import { IMaterialUIs, FlowEditorScope } from "../../workflow-editor/"
import { IFlowJson } from "../../workflow-editor/hooks/useImport"

export type WorkflowEditorProps = {
  themeMode?: 'dark' | 'light',
  themeToken?: IThemeToken,
  lang?: string,
  locales?: ILocales,
  materialUis?: IMaterialUIs,
  initialJson?: IFlowJson | any,
  jsonString?: string,
}

export const WorkflowEditor = memo((props: WorkflowEditorProps) => {
  const { themeMode, themeToken, lang, locales, materialUis, initialJson, jsonString, ...other } = props;
  return (
    <FlowEditorScope
      mode={themeMode}
      themeToken={themeToken}
      lang={lang}
      locales={locales}
      materialUis={materialUis}
      initialJson={initialJson}
      jsonString={jsonString}
    >
      <WorkFlowEditorInner {...other} />
    </FlowEditorScope>
  )
})