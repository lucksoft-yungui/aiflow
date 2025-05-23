import { message } from "antd";
import { useCallback } from "react";
import { IWorkFlowNode } from "../interfaces";
import { useEditorEngine } from "./useEditorEngine";
import { useTranslate } from "../react-locales";
import { IFlowJson } from "./useImport";

export function useSetJson() {
  const editorStore = useEditorEngine()
  const t = useTranslate()

  const setJson = useCallback((jsonData: IFlowJson | string) => {
    try {
      let flowJson: IFlowJson;
      
      // 如果是字符串，先解析
      if (typeof jsonData === 'string') {
        flowJson = JSON.parse(jsonData);
      } else {
        flowJson = jsonData;
      }
      
      // 验证JSON结构
      if (flowJson.startNode) {
        editorStore?.setStartNode(flowJson.startNode)
        return true;
      } else {
        message.error(t("fileIllegal") || "Invalid JSON structure");
        return false;
      }
    } catch (error: any) {
      console.error("Failed to set JSON:", error);
      message.error(t("fileIllegal") || "Invalid JSON format");
      return false;
    }
  }, [editorStore, t]);

  return setJson
} 