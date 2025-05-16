import { Button, Space, message, Upload, Input, Modal } from "antd"
import { memo, useCallback, useState, useEffect, useRef } from "react"
import { ShellContainer } from "./ShellContainer"
import { styled } from "styled-components"
import { WorkflowEditor } from "./WorkflowEditor"
import { WorkflowEditorRef } from "./WorkflowEditor/WorkFlowEditorInner"
import { materialUis } from "./materialUis"
import { syncThemeMode } from "./ThemeUtils"
import { UploadOutlined, FileOutlined, CodeOutlined, SaveOutlined, ImportOutlined, ExportOutlined } from "@ant-design/icons"
import { IFlowJson } from "../workflow-editor/hooks/useImport"
import { sampleFlowJson } from "./sampleData"

const { TextArea } = Input;

const Toolbar = styled.div`
  height: 56px;
  border-bottom: solid 1px rgba(0,0,0, 0.1);
  display: flex;
  align-items: center;
  padding: 8px 16px;
  justify-content: space-between;
  box-sizing: border-box;
`

export enum Lang {
  cn = "zh-CN",
  en = "en-US"
}

export const Example = memo(() => {
  const [lang, setlang] = useState<Lang>(Lang.cn)
  const [themeMode, setThemeMode] = useState<"dark" | "light">("light")
  const [initialJson, setInitialJson] = useState<IFlowJson | undefined>()
  const [jsonString, setJsonString] = useState<string | undefined>()
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [jsonTextArea, setJsonTextArea] = useState("")
  const editorRef = useRef<WorkflowEditorRef>(null)

  const handleToggleTheme = useCallback(() => {
    setThemeMode(mode => mode === "light" ? "dark" : "light")
  }, [])

  const handleSwitchLang = useCallback(() => {
    setlang(lang => lang === Lang.cn ? Lang.en : Lang.cn)
  }, [])

  // 加载示例数据
  const handleLoadSample = useCallback(() => {
    setJsonString(undefined); // 清除JSON字符串
    setInitialJson(sampleFlowJson as unknown as IFlowJson);
    message.success('示例数据加载成功');
    console.log('初始化编辑器使用示例数据:', sampleFlowJson);
  }, []);

  // 处理上传文件
  const handleUpload = useCallback((info: any) => {
    const { status, originFileObj } = info.file;
    if (status !== 'uploading') {
      console.log(info.file, info.fileList);
    }
    if (status === 'done') {
      const reader = new FileReader();
      reader.readAsText(originFileObj);
      reader.onload = () => {
        try {
          const json = JSON.parse(reader.result as string);
          if (json.startNode) {
            setJsonString(undefined); // 清除JSON字符串
            setInitialJson(json as unknown as IFlowJson);
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
    // 如果有当前JSON，则转换为字符串填充到文本框
    if (initialJson) {
      setJsonTextArea(JSON.stringify(initialJson, null, 2));
    } else {
      // 默认提供一个简单的模板
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
  const handleJsonTextChange = useCallback((e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setJsonTextArea(e.target.value);
  }, []);

  // 应用JSON字符串
  const handleApplyJsonString = useCallback(() => {
    if (jsonTextArea.trim()) {
      setInitialJson(undefined); // 清除初始化对象
      setJsonString(jsonTextArea); // 设置JSON字符串
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

  // 使用ref获取当前文档JSON
  const handleGetDocumentJson = useCallback(() => {
    if (editorRef.current) {
      const json = editorRef.current.getDocumentJson();
      console.log('当前文档结构:', json);
      message.success('已在控制台输出当前文档结构');
    } else {
      message.error('编辑器实例未准备好');
    }
  }, []);

  // 同步主题模式到 body 属性
  useEffect(() => {
    syncThemeMode(themeMode)
  }, [themeMode])

  return (
    <ShellContainer>
      <Toolbar>
        <span>
          审批流演示
        </span>
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
            onClick={handleGetDocumentJson}
          >
            获取当前JSON
          </Button>
          <Button
            icon={<ImportOutlined />}
            onClick={handleImport}
          >
            导入(ref)
          </Button>
          <Button
            icon={<ExportOutlined />}
            onClick={handleExport}
          >
            导出(ref)
          </Button>
          <Upload 
            name="file"
            showUploadList={false}
            customRequest={({ file, onSuccess }: any) => {
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
          <Button onClick={handleSwitchLang}>{lang === Lang.cn ? "English" : "中文"}</Button>
        </Space>
      </Toolbar>
      
      <WorkflowEditor
        ref={editorRef}
        themeMode={themeMode}
        lang={lang}
        materialUis={materialUis}
        initialJson={initialJson}
        jsonString={jsonString}
      />

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
    </ShellContainer>
  )
})