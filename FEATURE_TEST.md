# 节点调试功能测试

## 功能描述
新增了节点调试功能，允许WorkflowEditor组件接收一个`onNodeDedug`回调函数，当用户点击节点标题栏的调试按钮时，会调用这个回调函数并传入当前节点的信息。回调函数参数使用了精确的`IWorkFlowNode`类型，提供完整的类型安全。

## 实现细节

### 1. WorkflowEditor组件
- 新增了`onNodeDedug?: (node: IWorkFlowNode) => void`属性
- 将此属性传递给FlowEditorScope组件

### 2. FlowEditorScope组件
- 接收`onNodeDedug`属性并传递给FlowEditorScopeInner组件

### 3. FlowEditorScopeInner组件
- 接收`onNodeDedug`属性并设置到EditorEngine实例上

### 4. EditorEngine类
- 新增了`onNodeDedug?: (node: IWorkFlowNode) => void`属性

### 5. NodeTitle组件
- 修改了`handleNodeDebug`函数，优先调用EditorEngine中的`onNodeDedug`方法
- 如果没有设置回调函数，则回退到原来的console.log行为

## 测试步骤

1. 启动开发服务器：`npm start`
2. 在浏览器中打开应用
3. 在工作流编辑器中，将鼠标悬停在任意节点的标题栏上
4. 点击调试图标（debug icon）
5. 应该会弹出一个alert对话框，显示节点的基本信息
6. 同时在浏览器控制台中也会输出详细的节点信息

## 使用示例

```tsx
import { WorkflowEditor } from './WorkflowEditor';
import { WorkflowEditorRef } from './WorkflowEditor/WorkFlowEditorInner';
import { IWorkFlowNode } from '../workflow-editor/interfaces';

function App() {
  const editorRef = useRef<WorkflowEditorRef>(null);

  const handleNodeDebug = (node: IWorkFlowNode) => {
    console.log('调试节点信息:', node);
    alert(`调试节点: ${node.name || '未命名节点'}\nID: ${node.id}\n类型: ${node.nodeType}`);
  };

  return (
    <WorkflowEditor 
      ref={editorRef}
      themeMode="light"
      lang="zh-CN"
      onNodeDedug={handleNodeDebug}
    />
  );
}
```

## 注意事项
- 回调函数会接收完整的节点对象作为参数，类型为`IWorkFlowNode`
- 节点对象包含以下主要属性：`id`、`name`、`nodeType`、`desc`、`childNode`、`config`、`agent`等
- 如果没有提供`onNodeDedug`回调函数，点击调试按钮会回退到默认的console.log行为
- 此功能适用于所有类型的节点（开始节点、普通节点、条件节点等）
- 使用TypeScript时，可以获得完整的类型提示和类型检查 