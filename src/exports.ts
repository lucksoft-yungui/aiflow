// 导入所有样式文件
import './index.css';
import './App.css';
import './example/setters/FormCard/index.css';

// 导出主组件
export { WorkflowEditor } from './example/WorkflowEditor';
export type { WorkflowEditorProps } from './example/WorkflowEditor';
export type { WorkflowEditorRef } from './example/WorkflowEditor/WorkFlowEditorInner';

// 导出核心类型和接口
export { FlowEditorScope } from './workflow-editor';
export type { 
  IThemeToken,
  IMaterialUIs,
  IFlowJson
} from './workflow-editor'; 