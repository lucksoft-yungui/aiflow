import { routeIcon, dealIcon, notifierIcon, sealIcon, ruleIcon, spellCheckIcon, generateCommentIcon, typoCheckIcon, annotateReferencesIcon } from "../icons";
import { NodeType } from "../interfaces";
import { INodeMaterial } from "../interfaces/material";
import { createUuid } from "../utils/create-uuid";

export const defaultMaterials: INodeMaterial[] = [
  //发起人节点
  {
    //标题，引擎会通过国际化t函数翻译
    label: "promoter",
    //颜色
    color: "rgb(87, 106, 149)",
    //引擎会直接去defaultConfig来生成一个节点，会克隆一份defaultConfig数据保证immutable
    defaultConfig: {
      //默认配置，可以把类型上移一层，但是如果增加其它默认属性的话，不利于扩展
      nodeType: NodeType.start,
      agent: {
        key: "StructuredExtractionAgent",
        pretreatment: true,
        level: "文档结构分析",
        rule: {
          enabled: true,
        }
      }
    },
    //不在物料板显示
    hidden: true,
  },
  //审批人节点
  // {
  //   color: "#ff943e",
  //   label: "approver",
  //   icon: sealIcon,
  //   defaultConfig: {
  //     nodeType: NodeType.approver,
  //   },
  // },
  // //通知人节点
  // {
  //   color: "#4ca3fb",
  //   label: "notifier",
  //   icon: notifierIcon,
  //   defaultConfig: {
  //     nodeType: NodeType.notifier,
  //   },
  // },
  // {
  //   color: "#fb602d",
  //   label: "dealer",
  //   icon: dealIcon,
  //   defaultConfig: {
  //     nodeType: NodeType.audit,
  //   },
  // },
   //条件节点
   {
    color: "#15bc83",
    label: "routeNode",
    icon: routeIcon,
    createDefault: ({ t }) => {
      return {
        id: createUuid(),
        nodeType: NodeType.route,
        conditionNodeList: [
          {
            id: createUuid(),
            nodeType: NodeType.condition,
            name: t?.("condition") + "1"
          },
          {
            id: createUuid(),
            nodeType: NodeType.condition,
            name: t?.("condition") + "2"
          }
        ]
      }
    },

  },
  //分支节点
  {
    label: "condition",
    color: "",
    defaultConfig: {
      nodeType: NodeType.condition,
    },
    //不在物料板显示
    hidden: true,
  },
  // 规则校验节点
  {
    color: "#ff943e",
    label: "rule",
    icon: ruleIcon,
    defaultConfig: {
      nodeType: NodeType.rule,
      agent: {
        key: "SemanticAnalysisAgent",
        pretreatment: false,
        rule: {
          enabled: true,
        }
      }
    },
  },
  //语法检测节点
  {
    color: "#8e44ad",
    label: "spellCheck",
    icon: spellCheckIcon,
    defaultConfig: {
      nodeType: NodeType.spellCheck,
      agent: {
        key: "SpellCheckAgent",
        pretreatment: false,
        level: "文档基础校验",
        rule: {
          enabled: true,
        }
      }
    },
  },
   //错别字检查节点
   {
    color: "#8e44ad",
    label: "typoCheck",
    icon: typoCheckIcon,
    defaultConfig: {
      nodeType: NodeType.typoCheck,
      agent: {
        key: "TypoCheckAgent",
        pretreatment: false,
        level: "错别字校验",
        rule: {
          enabled: true,
        }
      }
    },
  },
   // 参考标准检查节点
   {
    color: "#8e44ad",
    label: "annotateReferencesAgent",
    icon: annotateReferencesIcon,
    defaultConfig: {
      nodeType: NodeType.annotateReferencesAgent,
      agent: {
        key: "AnnotateReferencesAgent",
        pretreatment: false,
        level: "参考标准检查",
        rule: {
          enabled: true,
        }
      }
    },
  },
   // 参考标准检查节点
   {
    color: "#8e44ad",
    label: "chapterContinuityCheckerAgent",
    icon: annotateReferencesIcon,
    defaultConfig: {
      nodeType: NodeType.chapterContinuityCheckerAgent,
      agent: {
        key: "ChapterContinuityCheckerAgent",
        pretreatment: false,
        level: "参考标准检查",
        rule: {
          enabled: true,
        }
      }
    },
  },
  //生成批注节点
  {
    color: "#f39c12",
    label: "generateComment",
    icon: generateCommentIcon,
    defaultConfig: {
      nodeType: NodeType.generateComment,
      agent: {
        key: "CommentAgent",
        pretreatment: false,
        level: "校验结果处理",
        rule: {
          enabled: true,
        }
      }
    },
  },

]