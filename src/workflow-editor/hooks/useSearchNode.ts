import { useCallback } from "react";
import { useEditorEngine } from "./useEditorEngine";

export function useSearchNode() {
  const editorEngine = useEditorEngine();
  
  const searchNodeByAgentTitle = useCallback((searchValue: string): boolean => {
    if (!editorEngine) {
      console.warn("EditorEngine is not available");
      return false;
    }
    return editorEngine.searchNodeByAgentTitle(searchValue);
  }, [editorEngine]);

  return searchNodeByAgentTitle;
} 