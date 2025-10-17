import { useToken } from "antd/es/theme/internal";
import { memo, useMemo, useEffect, useState } from "react";
import { ThemeProvider } from "styled-components";
import { EditorEngine } from "../../classes";
import { WorkflowEditorStoreContext } from "../../contexts";
import { INodeMaterial, IMaterialUIs, IWorkFlowNode } from "../../interfaces";
import { useTranslate } from "../../react-locales";
import { IThemeToken } from "../../theme";
import { getDefaultMaterials } from "../defaultMaterials";
import { IFlowJson } from "../../hooks/useImport";
import { message } from "antd";

export const FlowEditorScopeInner = memo((props: {
  mode?: 'dark' | 'light',
  themeToken?: IThemeToken,
  children?: React.ReactNode,
  materials?: INodeMaterial[],
  materialUis?: IMaterialUIs,
  initialJson?: IFlowJson | any, // 允许任何结构的数据
  jsonString?: string, // JSON字符串
  onNodeDedug?: (node: IWorkFlowNode) => void,
}) => {
  const { mode, children, themeToken, materials, materialUis, initialJson, jsonString, onNodeDedug } = props;
  const [, token] = useToken();
  const t = useTranslate();
  const [parsedJson, setParsedJson] = useState<any>(null);
  
  // 解析JSON字符串
  useEffect(() => {
    if (jsonString) {
      try {
        const parsed = JSON.parse(jsonString);
        if (parsed && parsed.startNode) {
          setParsedJson(parsed);
          console.log("Successfully parsed JSON string", parsed);
        } else {
          console.error("Invalid JSON structure, missing startNode");
          message.error(t("fileIllegal") || "Invalid JSON structure");
        }
      } catch (error) {
        console.error("Failed to parse JSON string:", error);
        message.error(t("fileIllegal") || "Invalid JSON format");
      }
    }
  }, [jsonString, t]);

  const theme: { token: IThemeToken, mode?: 'dark' | 'light' } = useMemo(() => {
    return {
      token: themeToken || token,
      mode
    }
  }, [mode, themeToken, token])
  
  const store: EditorEngine = useMemo(() => {
    return new EditorEngine()
  }, [])

  useEffect(() => {
    store.t = t
  }, [store, t])

  useEffect(() => {
    store.onNodeDedug = onNodeDedug
  }, [store, onNodeDedug])

  // 初始化文档JSON (对象或通过字符串解析的对象)
  useEffect(() => {
    const jsonToUse = parsedJson || initialJson;
    
    if (jsonToUse?.startNode) {
      try {
        store.setStartNodeWithHistory(jsonToUse.startNode, false);
        console.log("Editor initialized with document:", jsonToUse);
      } catch (error) {
        console.error("Failed to initialize editor with document:", error);
      }
    }
  }, [initialJson, parsedJson, store]);

  useEffect(() => {
    const oldMaterials = store.materials
    const oldMaterialUis = store.materialUis
    const builtinMaterials = getDefaultMaterials()
    const extraMaterials = materials || []
    store.materials = [...oldMaterials, ...builtinMaterials, ...extraMaterials]
    store.materialUis = { ...oldMaterialUis, ...materialUis }
    return () => {
      store.materials = oldMaterials;
      store.materialUis = oldMaterialUis;
    }
  }, [materialUis, materials, store])

  return (
    <WorkflowEditorStoreContext.Provider value={store}>
      <ThemeProvider theme={theme}>
        {
          store && children
        }
      </ThemeProvider>
    </WorkflowEditorStoreContext.Provider>
  )
})
