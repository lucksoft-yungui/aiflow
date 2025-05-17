演示地址： https://dingflow.vercel.app/  
相关文章：  
[用 React 仿钉钉审批流（掘金）](https://juejin.cn/post/7263858443329191996)  
[用 React 仿钉钉审批流（知乎）](https://zhuanlan.zhihu.com/p/648307778)  

# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

# AIFlow 审批流程编辑器

一个功能完整的审批流程编辑器 React 组件。

## 安装

```bash
npm install @yourname/aiflow-editor
# 或者
yarn add @yourname/aiflow-editor
```

## 使用方法

```jsx
import React, { useRef } from 'react';
import { WorkflowEditor, WorkflowEditorRef } from '@yourname/aiflow-editor';

function App() {
  const editorRef = useRef(null);

  const handleGetJson = () => {
    if (editorRef.current) {
      const json = editorRef.current.getDocumentJson();
      console.log(json);
    }
  };

  return (
    <div style={{ height: '800px' }}>
      <button onClick={handleGetJson}>获取流程JSON</button>
      <WorkflowEditor 
        ref={editorRef}
        themeMode="light"
        lang="zh-CN"
      />
    </div>
  );
}

export default App;
```

## API

### WorkflowEditor 属性

| 属性 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| themeMode | 'dark' \| 'light' | 'light' | 主题模式 |
| themeToken | IThemeToken | - | 主题令牌，用于自定义主题 |
| lang | string | 'zh-CN' | 当前语言代码 |
| locales | ILocales | - | 本地化资源 |
| materialUis | IMaterialUIs | - | 所有物料的UI配置 |
| initialJson | IFlowJson \| any | - | 初始化编辑器的JSON对象 |
| jsonString | string | - | 初始化编辑器的JSON字符串 |

### WorkflowEditorRef 方法

| 方法 | 返回值 | 说明 |
| --- | --- | --- |
| getDocumentJson() | any | 获取当前文档的完整JSON结构 |
| importJson() | void | 打开文件选择对话框，允许导入JSON文件 |
| exportJson() | void | 将当前编辑器内容导出为JSON文件 |

## 许可证

MIT
