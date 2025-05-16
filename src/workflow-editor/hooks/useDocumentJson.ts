import { useCallback } from "react";
import { useStartNode } from "./useStartNode";

export function useDocumentJson() {
  const startNode = useStartNode();
  
  const getDocumentJson = useCallback(() => {
    const documentJson = { startNode };
    //console.log("Current document JSON structure:", documentJson);
    return documentJson;
  }, [startNode]);

  return getDocumentJson;
} 