import { Button, Space } from "antd"
import { memo, useCallback, useState, useEffect } from "react"
import { ShellContainer } from "./ShellContainer"
import { styled } from "styled-components"
import { WorkflowEditor } from "./WorkflowEditor"
import { materialUis } from "./materialUis"
import { syncThemeMode } from "./ThemeUtils"

const Toolbar = styled.div`
  height: 56px;
  border-bottom: solid 1px rgba(0,0,0, 0.1);
  display: flex;
  align-items: center;
  padding: 8px 16px;
  justify-content: space-between;
  box-sizing: border-box;
`

export enum Lang {
  cn = "zh-CN",
  en = "en-US"
}

export const Example = memo(() => {
  const [lang, setlang] = useState<Lang>(Lang.cn)
  const [themeMode, setThemeMode] = useState<"dark" | "light">("light")

  const handleToggleTheme = useCallback(() => {
    setThemeMode(mode => mode === "light" ? "dark" : "light")
  }, [])

  const handleSwitchLang = useCallback(() => {
    setlang(lang => lang === Lang.cn ? Lang.en : Lang.cn)
  }, [])

  // 同步主题模式到 body 属性
  useEffect(() => {
    syncThemeMode(themeMode)
  }, [themeMode])

  return (
    <ShellContainer>
      <Toolbar>
        <span>
          审批流演示
        </span>
        <Space>
          <Button onClick={handleToggleTheme}>主题切换</Button>
          <Button onClick={handleSwitchLang}>{lang === Lang.cn ? "English" : "中文"}</Button>
        </Space>
      </Toolbar>
      <WorkflowEditor
        themeMode={themeMode}
        lang={lang}
        materialUis = {materialUis}
      />
    </ShellContainer>
  )
})