import React, { useRef } from 'react';
import './App.css';
import { WorkflowEditor } from './WorkflowEditor';
import { WorkflowEditorRef } from './WorkflowEditor/WorkFlowEditorInner';
import { IWorkFlowNode } from '../workflow-editor/interfaces';

function App() {
  const editorRef = useRef<WorkflowEditorRef>(null);

  // 节点调试回调函数
  const handleNodeDebug = (node: IWorkFlowNode) => {
    console.log('调试节点信息:', node);
    alert(`调试节点: ${node.name || '未命名节点'}\nID: ${node.id}\n类型: ${node.nodeType}`);
  };

  return (
    <div className="App">
      <WorkflowEditor 
        ref={editorRef}
        themeMode="light"
        lang="zh-CN"
        onNodeDedug={handleNodeDebug}
      />
    </div>
  );
}

export default App; 