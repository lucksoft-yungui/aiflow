import { useState, useRef } from 'react'
import { WorkflowEditor } from '@lucksoft/aiflow-editor'
import { Button, Space, message } from 'antd'
import './App.css'

function App() {
  const editorRef = useRef(null);
  const [flowJson, setFlowJson] = useState(null);

  // 获取当前流程图数据
  const handleGetData = () => {
    if (editorRef.current) {
      const data = editorRef.current.getDocumentJson();
      setFlowJson(data);
      console.log('获取到的流程数据:', data);
      message.success('获取流程数据成功，请查看控制台');
    }
  };

  return (
    <div className="app-container">
      <h1>WorkflowEditor 测试 (React 18.3.1)</h1>
      
      <Space style={{ marginBottom: 16 }}>
        <Button type="primary" onClick={handleGetData}>
          获取流程图数据
        </Button>
      </Space>
      
      <div className="editor-container">
        <WorkflowEditor
          ref={editorRef}
          style={{ height: 600, border: '1px solid #d9d9d9' }}
        />
      </div>
      
      {flowJson && (
        <div className="json-container">
          <h3>流程图数据</h3>
          <pre>{JSON.stringify(flowJson, null, 2)}</pre>
        </div>
      )}
    </div>
  )
}

export default App
