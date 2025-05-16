import { memo, useCallback, forwardRef, useImperativeHandle } from "react"
import { styled } from "styled-components"
import classNames from "classnames"
import { FlowEditorCanvas, useImport } from "../../workflow-editor"
import { useExport, useDocumentJson } from "../../workflow-editor"

const Container = styled.div`
  flex:1;
  display: flex;
  flex-flow: column;
  background-color: ${props => props.theme.token?.colorBgBase};
  color: ${props => props.theme.token?.colorText};
  height: 0;
`

/**
 * WorkflowEditor对外暴露的接口定义
 * 
 * 提供了三个核心方法，用于获取文档结构、导入和导出JSON数据
 */
export interface WorkflowEditorRef {
  /**
   * 获取当前编辑器中的文档JSON结构
   * 
   * @returns {any} 返回当前文档的完整JSON结构
   * @example
   * ```ts
   * const json = editorRef.current.getDocumentJson();
   * console.log('当前文档结构:', json);
   * ```
   */
  getDocumentJson: () => any;
  
  /**
   * 导入JSON数据
   * 
   * 打开文件选择对话框，允许用户选择一个JSON文件导入到编辑器
   * 
   * @returns {void}
   * @example
   * ```ts
   * editorRef.current.importJson();
   * ```
   */
  importJson: () => void;
  
  /**
   * 导出JSON数据
   * 
   * 将当前编辑器中的文档结构导出为JSON文件并下载
   * 
   * @returns {void}
   * @example
   * ```ts
   * editorRef.current.exportJson();
   * ```
   */
  exportJson: () => void;
}

/**
 * 工作流编辑器内部实现组件
 * 
 * 该组件负责渲染编辑器画布，并通过ref暴露核心功能接口
 * 
 * @internal 这是一个内部组件，应该通过WorkflowEditor来使用
 */
export const WorkFlowEditorInner = forwardRef<WorkflowEditorRef, {
  className?: string
}>((props, ref) => {
  const { className, ...other } = props
  const exportJson = useExport()
  const importJson = useImport()
  const getDocumentJson = useDocumentJson()

  // 暴露接口给外部
  useImperativeHandle(ref, () => ({
    getDocumentJson,
    importJson,
    exportJson
  }), [getDocumentJson, importJson, exportJson]);

  return (
    <Container className={classNames("workflow-editor", className || "")} {...other}>
      <FlowEditorCanvas />
    </Container>
  )
})