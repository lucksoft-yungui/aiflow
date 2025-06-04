import { useState, useRef, useCallback, useEffect } from 'react'
import { WorkflowEditor } from '@lucksoft/aiflow-editor'
import { Button, Space, message, Upload, Input, Modal } from 'antd'
import { UploadOutlined, FileOutlined, CodeOutlined, SaveOutlined, ImportOutlined, ExportOutlined, SearchOutlined } from '@ant-design/icons'
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
    id: "start",
    childNode: {
      nodeType: "rule",
      agent: {
        key: "SemanticAnalysisAgent",
        title: "语义分析",
        pretreatment: false,
        level: "规则分类",
        rule: {
          decisionRules: "",
          question: "",
          example: ""
        },
        directory: []
      },
      id: "814f677a-8b8d-48e0-9ac6-1a01f758d00d",
      name: "规则校验",
      childNode: {
        nodeType: "spellCheck",
        agent: {
          key: "SpellCheckAgent",
          title: "拼写检查",
          pretreatment: false,
          level: "文档基础校验"
        },
        id: "d879d6b7-4eb2-407b-a28a-6cf7ea8d6f08",
        name: "错别字检查",
        childNode: {
          nodeType: "generateComment",
          agent: {
            key: "CommentAgent",
            title: "批注生成",
            pretreatment: false,
            level: "校验结果处理"
          },
          id: "abda31dc-9cf7-4888-9d33-b4dd40758cd0",
          name: "生成批注"
        }
      }
    }
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
  const [searchValue, setSearchValue] = useState("");

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

  // 搜索节点功能
  const handleSearchNode = useCallback(() => {
    if (!searchValue.trim()) {
      message.warning('请输入搜索内容');
      return;
    }
    
    if (editorRef.current) {
      const found = editorRef.current.searchNodeByAgentTitle(searchValue.trim());
      if (found) {
        message.success(`找到并选中了节点: ${searchValue}`);
      } else {
        message.warning(`未找到匹配的节点: ${searchValue}`);
      }
    } else {
      message.error('编辑器实例未准备好');
    }
  }, [searchValue]);

  // 处理搜索输入框回车
  const handleSearchKeyDown = useCallback((e) => {
    if (e.key === 'Enter') {
      handleSearchNode();
    }
  }, [handleSearchNode]);

  // 快速搜索预设值
  const handleQuickSearch = useCallback((title) => {
    setSearchValue(title);
    if (editorRef.current) {
      const found = editorRef.current.searchNodeByAgentTitle(title);
      if (found) {
        message.success(`找到并选中了节点: ${title}`);
      } else {
        message.warning(`未找到匹配的节点: ${title}`);
      }
    }
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

  // 使用ref设置JSON数据
  const handleSetJsonViaRef = useCallback(() => {
    if (editorRef.current) {
      if (jsonTextArea.trim()) {
        const success = editorRef.current.setJson(jsonTextArea);
        if (success) {
          message.success('通过ref设置JSON数据成功');
          setIsModalVisible(false);
        }
      } else {
        message.warning('JSON字符串不能为空');
      }
    } else {
      message.error('编辑器实例未准备好');
    }
  }, [jsonTextArea]);

  // 使用ref设置JSON数据（不存入历史记录）
  const handleSetJsonViaRefNoHistory = useCallback(() => {
    if (editorRef.current) {
      if (jsonTextArea.trim()) {
        const success = editorRef.current.setJson(jsonTextArea, false);
        if (success) {
          message.success('通过ref设置JSON数据成功（未存入历史记录）');
          setIsModalVisible(false);
        }
      } else {
        message.warning('JSON字符串不能为空');
      }
    } else {
      message.error('编辑器实例未准备好');
    }
  }, [jsonTextArea]);

  const { TextArea } = Input;

  return (
    <div className="shell-container">
      <div className="toolbar">
        <span>WorkflowEditor 测试 (React 18.3.1)</span>
        <div style={{ display: 'flex', alignItems: 'center', flex: 1, justifyContent: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginRight: '16px' }}>
            <Input
              placeholder="输入agent.title搜索节点"
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              onKeyDown={handleSearchKeyDown}
              style={{ width: 200 }}
              allowClear
            />
            <Button 
              icon={<SearchOutlined />} 
              onClick={handleSearchNode}
              type="primary"
            >
              搜索
            </Button>
            <Button size="small" onClick={() => handleQuickSearch('文档提取')}>
              文档提取
            </Button>
            <Button size="small" onClick={() => handleQuickSearch('语义分析')}>
              语义分析
            </Button>
            <Button size="small" onClick={() => handleQuickSearch('拼写检查')}>
              拼写检查
            </Button>
          </div>
        </div>
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
        onCancel={() => setIsModalVisible(false)}
        width={800}
        footer={[
          <Button key="cancel" onClick={() => setIsModalVisible(false)}>
            取消
          </Button>,
          <Button key="apply" type="primary" onClick={handleApplyJsonString}>
            应用(初始化)
          </Button>,
          <Button key="setViaRef" type="primary" onClick={handleSetJsonViaRef}>
            设置(存入历史)
          </Button>,
          <Button key="setViaRefNoHistory" onClick={handleSetJsonViaRefNoHistory}>
            设置(不存入历史)
          </Button>,
        ]}
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
