import { memo, useCallback, useState } from "react";
import {
  DefaultExpressionInput,
  ExpressionGroupType,
  ExpressionNodeType,
  ExpressionTreeInput,
} from "@lucksoft/aiflow-editor";
import { Form } from "antd";
import { createUuid } from "../utils";

export const ConditionPanel = memo(() => {
  const [rootExpression, setRootExpression] = useState({
    id: "root",
    nodeType: ExpressionNodeType.Group,
    groupType: ExpressionGroupType.And,
    children: [
      {
        nodeType: ExpressionNodeType.Expression,
        id: createUuid(),
      },
    ],
  });

  const handleExpressionChange = useCallback((exp) => {
    setRootExpression(exp);
  }, []);

  return (
    <Form layout="vertical" colon={false}>
      <ExpressionTreeInput
        ExpressInput={DefaultExpressionInput}
        value={rootExpression}
        onChange={handleExpressionChange}
      />
    </Form>
  );
});
