import { useState, useRef, useCallback, useEffect } from 'react'
import { WorkflowEditor } from '@lucksoft/aiflow-editor'
import { Button, Space, message, Upload, Input, Modal } from 'antd'
import { UploadOutlined, FileOutlined, CodeOutlined, SaveOutlined, ImportOutlined, ExportOutlined } from '@ant-design/icons'
import './App.css'

// 示例数据
const sampleFlowJson = {
  startNode: {
    nodeType: "start",
    agent: {
      key: "ExtractDocumentAgent",
      title: "文档提取",
      pretreatment: "true",
      level: "文档结构分析",
      rule: {
        decisionRules: "",
        question: "",
        example: ""
      },
      directory: []
    },
    id: "start"
  }
};

function App() {
  const editorRef = useRef(null);
  const [flowJson, setFlowJson] = useState(null);
  const [themeMode, setThemeMode] = useState("light");
  const [lang, setLang] = useState("zh-CN");
  const [initialJson, setInitialJson] = useState(undefined);
  const [jsonString, setJsonString] = useState(undefined);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [jsonTextArea, setJsonTextArea] = useState("");

  // 同步主题模式
  useEffect(() => {
    document.body.setAttribute('data-theme-mode', themeMode);
  }, [themeMode]);

  // 切换主题
  const handleToggleTheme = useCallback(() => {
    setThemeMode(mode => mode === "light" ? "dark" : "light");
  }, []);

  // 切换语言
  const handleSwitchLang = useCallback(() => {
    setLang(lang => lang === "zh-CN" ? "en-US" : "zh-CN");
  }, []);

  // 获取当前流程图数据
  const handleGetData = useCallback(() => {
    if (editorRef.current) {
      const data = editorRef.current.getDocumentJson();
      setFlowJson(data);
      console.log('获取到的流程数据:', data);
      message.success('获取流程数据成功，请查看控制台');
    }
  }, []);

  // 加载示例数据
  const handleLoadSample = useCallback(() => {
    setJsonString(undefined);
    setInitialJson(sampleFlowJson);
    message.success('示例数据加载成功');
    console.log('初始化编辑器使用示例数据:', sampleFlowJson);
  }, []);

  // 处理上传文件
  const handleUpload = useCallback((info) => {
    const { status, originFileObj } = info.file;
    if (status !== 'uploading') {
      console.log(info.file, info.fileList);
    }
    if (status === 'done') {
      const reader = new FileReader();
      reader.readAsText(originFileObj);
      reader.onload = () => {
        try {
          const json = JSON.parse(reader.result);
          if (json.startNode) {
            setJsonString(undefined);
            setInitialJson(json);
            message.success(`${info.file.name} 文件上传成功`);
          } else {
            message.error('无效的文档结构');
          }
        } catch (error) {
          console.error(error);
          message.error('解析JSON失败');
        }
      };
    } else if (status === 'error') {
      message.error(`${info.file.name} 文件上传失败`);
    }
  }, []);

  // 打开JSON编辑器模态框
  const handleOpenJsonEditor = useCallback(() => {
    if (initialJson) {
      setJsonTextArea(JSON.stringify(initialJson, null, 2));
    } else {
      setJsonTextArea(JSON.stringify({
        startNode: {
          nodeType: "start",
          agent: {
            key: "ExtractDocumentAgent",
            title: "文档提取",
            pretreatment: "true",
            level: "文档结构分析",
            rule: {
              decisionRules: "",
              question: "",
              example: ""
            },
            directory: []
          },
          id: "start"
        }
      }, null, 2));
    }
    setIsModalVisible(true);
  }, [initialJson]);

  // 处理JSON文本变化
  const handleJsonTextChange = useCallback((e) => {
    setJsonTextArea(e.target.value);
  }, []);

  // 应用JSON字符串
  const handleApplyJsonString = useCallback(() => {
    if (jsonTextArea.trim()) {
      setInitialJson(undefined);
      setJsonString(jsonTextArea);
      setIsModalVisible(false);
      message.success('已应用JSON字符串');
    } else {
      message.warning('JSON字符串不能为空');
    }
  }, [jsonTextArea]);

  // 使用ref调用导出方法
  const handleExport = useCallback(() => {
    if (editorRef.current) {
      editorRef.current.exportJson();
      console.log('通过ref调用导出方法');
    } else {
      message.error('编辑器实例未准备好');
    }
  }, []);

  // 使用ref调用导入方法
  const handleImport = useCallback(() => {
    if (editorRef.current) {
      editorRef.current.importJson();
      console.log('通过ref调用导入方法');
    } else {
      message.error('编辑器实例未准备好');
    }
  }, []);

  const { TextArea } = Input;

  return (
    <div className="shell-container">
      <div className="toolbar">
        <span>WorkflowEditor 测试 (React 18.3.1)</span>
        <Space>
          <Button 
            icon={<FileOutlined />} 
            onClick={handleLoadSample}
          >
            使用示例数据
          </Button>
          <Button
            icon={<CodeOutlined />}
            onClick={handleOpenJsonEditor}
          >
            JSON编辑器
          </Button>
          <Button
            icon={<SaveOutlined />}
            onClick={handleGetData}
          >
            获取当前JSON
          </Button>
          <Button
            icon={<ImportOutlined />}
            onClick={handleImport}
          >
            导入
          </Button>
          <Button
            icon={<ExportOutlined />}
            onClick={handleExport}
          >
            导出
          </Button>
          <Upload 
            name="file"
            showUploadList={false}
            customRequest={({ file, onSuccess }) => {
              setTimeout(() => {
                onSuccess("ok");
              }, 0);
            }}
            onChange={handleUpload}
            accept=".json"
          >
            <Button icon={<UploadOutlined />}>导入JSON</Button>
          </Upload>
          <Button onClick={handleToggleTheme}>主题切换</Button>
          <Button onClick={handleSwitchLang}>{lang === "zh-CN" ? "English" : "中文"}</Button>
        </Space>
      </div>
      
      <div className="editor-wrapper">
        <WorkflowEditor
          ref={editorRef}
          themeMode={themeMode}
          themeToken={themeMode === 'dark' ? {
            colorTextSecondary: 'rgba(255, 255, 255, 0.65)',
            colorBgContainer: '#2a2a2a',
            colorBorder: 'transparent',
            colorText: '#ffffff',
            colorPrimary: '#1668dc',
            colorBgBase: '#1f1f1f'
          } : undefined}
          lang={lang}
          initialJson={initialJson}
          jsonString={jsonString}
          style={{ width: '100%', height: '100%' }}
        />
      </div>

      <Modal
        title="JSON编辑器"
        open={isModalVisible}
        onOk={handleApplyJsonString}
        onCancel={() => setIsModalVisible(false)}
        width={800}
        okText="应用"
        cancelText="取消"
      >
        <TextArea
          value={jsonTextArea}
          onChange={handleJsonTextChange}
          rows={20}
          placeholder="输入有效的JSON字符串"
        />
      </Modal>
    </div>
  )
}

export default App
