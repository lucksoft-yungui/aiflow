import type { NodeTypeValue } from "./node-types";
export { NodeType, setNodeTypeConfig, resetNodeTypeConfig, builtinNodeTypeConfig } from "./node-types";
export type { NodeTypeValue } from "./node-types";

//审批流节点
export interface IWorkFlowNode<Config = unknown> {
  id: string
  //名称
  name?: string
  //string可以用于自定义节点，暂时用不上
  nodeType: NodeTypeValue | string
  //描述
  desc?: string
  //子节点
  childNode?: IWorkFlowNode
  //配置
  config?: Config,
  //节点状态（预览用）
  state?: string,
  // 智能体
  agent?: {
    key: string,
    title: string,
    pretreatment: string,
    level: string,
    config: Object,
    rule: {
      decisionRules: string,
      question: string,
      example: string,
      thinking: boolean,
      enabled: boolean,
      extraPrompt: string,
      targetText: string,
      targetLevel: string,
      targetComment: string,
      loopParagraph: boolean,
    },
    directory: string[],
  }
}

//条件根节点，下面包含各分支节点
export interface IRouteNode extends IWorkFlowNode {
  //分支节点
  conditionNodeList: IBranchNode[]
}

//条件分支的子节点，分支节点
export interface IBranchNode extends IWorkFlowNode {
  //条件表达式，后端就是这样的名字，保留了
  //后面考虑通过泛型放入config，视条件复杂度决定
  //flowNodeConditionVOList?: IExpression[]
}

//审批流，代表一张审批流图
export interface IWorkflow {
  //审批流Id
  flowId: string;
  //审批流名称
  name?: string;
  //开始节点
  startNode: IWorkFlowNode;
}
