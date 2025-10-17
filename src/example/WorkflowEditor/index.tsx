import { forwardRef } from "react"
import { WorkFlowEditorInner, WorkflowEditorRef } from "./WorkFlowEditorInner"
import { ILocales } from "@rxdrag/locales"
import { IThemeToken } from "../../workflow-editor"
import { FlowEditorScope } from "../../workflow-editor/"
import { IFlowJson } from "../../workflow-editor/hooks/useImport"
import { IWorkFlowNode } from "../../workflow-editor/interfaces"
import { materialUis } from "./materialUis"
import "./nodeTypes"
import "./defaultMaterials"
import { workflowEditorDefaultLocales } from "./locales"

/**
 * WorkflowEditor组件的属性定义
 * 
 * @property {('dark'|'light')} [themeMode] - 主题模式，可选择深色或浅色
 * @property {IThemeToken} [themeToken] - 主题令牌，用于自定义主题
 * @property {string} [lang] - 当前语言代码，例如 'zh-CN' 或 'en-US'
 * @property {ILocales} [locales] - 本地化资源
 * @property {IFlowJson|any} [initialJson] - 初始化编辑器的JSON对象
 * @property {string} [jsonString] - 初始化编辑器的JSON字符串，会被解析成对象
 */
export type WorkflowEditorProps = {
  themeMode?: 'dark' | 'light',
  themeToken?: IThemeToken,
  lang?: string,
  locales?: ILocales,
  initialJson?: IFlowJson | any,
  jsonString?: string,
  onNodeDedug?: (node: IWorkFlowNode) => void,
}

/**
 * 工作流编辑器组件
 * 
 * 一个功能完整的审批流编辑器，支持通过JSON对象或字符串初始化，
 * 并通过ref暴露接口给外部调用。
 *
 * @example
 * ```tsx
 * // 使用ref调用编辑器方法
 * const editorRef = useRef<WorkflowEditorRef>(null);
 * 
 * // 获取当前文档结构
 * const handleGetJson = () => {
 *   if (editorRef.current) {
 *     const json = editorRef.current.getDocumentJson();
 *     console.log(json);
 *   }
 * };
 * 
 * return (
 *   <WorkflowEditor 
 *     ref={editorRef}
 *     themeMode="light"
 *     lang="zh-CN"
 *     initialJson={initialData}
 *   />
 * )
 * ```
 * 
 * @see {@link WorkflowEditorRef} 了解可用的接口方法
 */
export const WorkflowEditor = forwardRef<WorkflowEditorRef, WorkflowEditorProps>((props, ref) => {
  const { themeMode, themeToken, lang, locales, initialJson, jsonString, onNodeDedug, ...other } = props;
  
  // 使用从文件导入的materialUis
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
    >
      <WorkFlowEditorInner ref={ref} {...other} />
    </FlowEditorScope>
  )
})
