import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
// antd v5 不需要导入全局样式，使用按需加载
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
