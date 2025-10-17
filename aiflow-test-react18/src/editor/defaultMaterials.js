import { setDefaultMaterials, NodeType } from "@lucksoft/aiflow-editor";
import { createUuid } from "./utils";
import {
  routeIcon,
  ruleIcon,
  spellCheckIcon,
  typoCheckIcon,
  annotateReferencesIcon,
  generateCommentIcon,
} from "./icons";

const customDefaultMaterials = [
  {
      label: "promoter",
      color: "rgb(87, 106, 149)",
      defaultConfig: {
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
      hidden: true,
    },
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
    {
      label: "condition",
      color: "",
      defaultConfig: {
        nodeType: NodeType.condition,
      },
      hidden: true,
    },
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
        },
        canDebug: true
      },
    },
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
          title: "语法检查",
          rule: {
            enabled: true,
          }
        },
        canDebug: true
      },
    },
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
          title: "错别字检查",
          rule: {
            enabled: true,
          }
        },
        canDebug: true
      },
    },
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
          title: "参考标准检查",
          rule: {
            enabled: true,
          }
        },
        canDebug: true
      },
    },
    {
      color: "#8e44ad",
      label: "chapterContinuityCheckerAgent",
      icon: annotateReferencesIcon,
      defaultConfig: {
        nodeType: NodeType.chapterContinuityCheckerAgent,
        agent: {
          key: "ChapterContinuityCheckerAgent",
          pretreatment: false,
          level: "章节连续性检查",
          title: "章节连续性检查",
          rule: {
            enabled: true,
          },
          canDebug: true
        }
      },
    },
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
          title: "生成批注",
          rule: {
            enabled: true,
          }
        }
      },
    },
];

setDefaultMaterials(customDefaultMaterials);

export { customDefaultMaterials };
