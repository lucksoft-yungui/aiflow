# setJson 功能说明

## 概述

参考 `useImport` 和 `WorkFlowEditorInner` 组件，已添加了基于 ref 的 `setJson` 接口，允许通过编程方式直接设置工作流编辑器的 JSON 数据。

## 实现细节

### 1. 新增 `useSetJson` Hook

文件：`src/workflow-editor/hooks/useSetJson.ts`

- 提供了 `setJson` 方法
- 支持 JSON 对象和 JSON 字符串两种输入格式
- 包含错误处理和验证
- 返回布尔值表示设置是否成功

```typescript
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
```

### 2. 更新 `WorkflowEditorRef` 接口

文件：`src/example/WorkflowEditor/WorkFlowEditorInner.tsx`

在现有的接口基础上新增了 `setJson` 方法：

```typescript
export interface WorkflowEditorRef {
  getDocumentJson: () => any;
  importJson: () => void;
  exportJson: () => void;
  setJson: (jsonData: IFlowJson | string) => boolean; // 新增
}
```

### 3. 更新组件实现

在 `WorkFlowEditorInner` 组件中：

- 导入并使用 `useSetJson` hook
- 通过 `useImperativeHandle` 暴露 `setJson` 方法

```typescript
const setJson = useSetJson()

useImperativeHandle(ref, () => ({
  getDocumentJson,
  importJson,
  exportJson,
  setJson // 新增
}), [getDocumentJson, importJson, exportJson, setJson]);
```

## 使用方式

### 1. 通过 JSON 对象设置

```typescript
const editorRef = useRef<WorkflowEditorRef>(null);

const handleSetJsonObject = () => {
  if (editorRef.current) {
    const success = editorRef.current.setJson({
      startNode: {
        nodeType: "start",
        id: "start",
        // ... 其他节点配置
      }
    });
    
    if (success) {
      console.log('JSON设置成功');
    }
  }
};
```

### 2. 通过 JSON 字符串设置

```typescript
const handleSetJsonString = () => {
  if (editorRef.current) {
    const jsonString = '{"startNode": {"nodeType": "start", "id": "start"}}';
    const success = editorRef.current.setJson(jsonString);
    
    if (success) {
      console.log('JSON设置成功');
    }
  }
};
```

## 测试验证

在示例应用 (`src/example/index.tsx`) 中已添加了测试功能：

1. 在 JSON 编辑器模态框中，新增了"设置(ref)"按钮
2. 点击该按钮会通过 `setJson` 方法直接设置编辑器内容
3. 与"应用(初始化)"按钮的区别：
   - "应用(初始化)"：通过组件属性重新初始化编辑器
   - "设置(ref)"：通过 ref 直接调用 `setJson` 方法

## 特点对比

| 功能 | importJson | setJson |
|------|------------|---------|
| 触发方式 | 打开文件选择对话框 | 直接通过代码调用 |
| 数据来源 | 用户选择的文件 | 程序传入的数据 |
| 输入格式 | 文件内容(字符串) | JSON对象或字符串 |
| 返回值 | void | boolean |
| 使用场景 | 交互式文件导入 | 程序化数据设置 |

## 优势

1. **程序化控制**：可以通过代码直接设置编辑器内容，无需用户交互
2. **灵活的输入**：支持 JSON 对象和字符串两种格式
3. **错误处理**：包含完整的错误验证和用户提示
4. **返回状态**：返回布尔值，便于调用方判断操作结果
5. **一致的接口**：与现有的 ref 接口风格保持一致 