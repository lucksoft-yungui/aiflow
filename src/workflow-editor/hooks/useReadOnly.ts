import { useContext } from "react"
import { WorkflowEditorReadOnlyContext } from "../contexts"

export function useReadOnly() {
  return useContext(WorkflowEditorReadOnlyContext)
}
