// 示例流程数据
export const sampleFlowJson = {
    "startNode": {
      "nodeType": "start",
      "agent": {
        "key": "ExtractDocumentAgent",
        "pretreatment": true,
        "level": "文档结构分析"
      },
      "id": "start",
      "childNode": {
        "nodeType": "rule",
        "agent": {
          "key": "SemanticAnalysisAgent",
          "title": "规则名称",
          "pretreatment": false,
          "level": "规则分类",
          "rule": {
            "decisionRules": "",
            "question": "",
            "example": ""
          },
          "directory": []
        },
        "id": "814f677a-8b8d-48e0-9ac6-1a01f758d00d",
        "name": "规则校验",
        "childNode": {
          "id": "e4bc0c84-48ee-40ad-8a45-fde3bd472340",
          "nodeType": "route",
          "conditionNodeList": [
            {
              "id": "e057b84c-eb6e-4bdd-994a-7a0eb0ef9e5a",
              "nodeType": "condition",
              "name": "条件1",
              "childNode": {
                "nodeType": "rule",
                "agent": {
                  "key": "SemanticAnalysisAgent",
                  "title": "并行1",
                  "pretreatment": false,
                  "level": "",
                  "rule": {
                    "decisionRules": "",
                    "question": "",
                    "example": ""
                  },
                  "directory": []
                },
                "id": "0cf08759-6ead-4364-9a13-c6952732e8ec",
                "name": "规则校验"
              }
            },
            {
              "id": "32283eeb-2105-4452-bd57-46c62641caf9",
              "nodeType": "condition",
              "name": "条件2",
              "childNode": {
                "nodeType": "rule",
                "agent": {
                  "key": "SemanticAnalysisAgent",
                  "title": "并行2",
                  "pretreatment": false,
                  "level": "",
                  "rule": {
                    "decisionRules": "",
                    "question": "",
                    "example": ""
                  },
                  "directory": []
                },
                "id": "789a85c8-91db-49d7-958f-552423054c74",
                "name": "规则校验"
              }
            }
          ],
          "name": "条件分支",
          "childNode": {
            "nodeType": "spellCheck",
            "agent": {
              "key": "SpellCheckAgent",
              "pretreatment": false,
              "level": "文档基础校验"
            },
            "id": "d879d6b7-4eb2-407b-a28a-6cf7ea8d6f08",
            "name": "错别字检查",
            "childNode": {
              "nodeType": "generateComment",
              "agent": {
                "key": "CommentAgent",
                "pretreatment": false,
                "level": "校验结果处理"
              },
              "id": "abda31dc-9cf7-4888-9d33-b4dd40758cd0",
              "name": "生成批注"
            }
          }
        }
      }
    }
  }