import { forwardRef } from "react";
import { WorkflowEditor } from "./WorkflowEditor";

export const WorkflowPreview = forwardRef((props, ref) => {
  return <WorkflowEditor ref={ref} readOnly {...props} />;
});
