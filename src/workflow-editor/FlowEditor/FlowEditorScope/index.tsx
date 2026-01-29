import { memo, useEffect, useMemo, useState } from "react"
import { IThemeToken } from "../../theme"
import { ConfigRoot } from "../ConfigRoot"
import { ILocales, LocalesManager } from "@rxdrag/locales"
import { LocalesContext } from "../../react-locales"
import { IMaterialUIs, INodeMaterial } from "../../interfaces/material"
import { IWorkFlowNode } from "../../interfaces"
import { FlowEditorScopeInner } from "./FlowEditorScopeInner"
import { IFlowJson } from "../../hooks/useImport"

export const FlowEditorScope = memo((props: {
  //当前主题模式
  mode?: 'dark' | 'light',
  //主题定义
  themeToken?: IThemeToken,
  children?: React.ReactNode,
  //当前语言
  lang?: string,
  //多语言资源
  locales?: ILocales,
  //默认多语言资源
  defaultLocales?: ILocales,
  //自定义物料
  materials?: INodeMaterial[],
  //所有物料的Ui配置，包括自定义物料跟预定义物料
  materialUis?: IMaterialUIs,
  //初始化的文档JSON
  initialJson?: IFlowJson | any, // 允许任何结构的数据
  //JSON字符串
  jsonString?: string,
  //节点调试
  onNodeDedug?: (node: IWorkFlowNode) => void,
  //只读/预览模式
  readOnly?: boolean,
}) => {
  const { children, lang, locales, defaultLocales, ...other } = props
  const baseLocales = useMemo(() => defaultLocales || {}, [defaultLocales])
  const [localesManager, setLocalesManager] = useState(() => new LocalesManager(lang, baseLocales))

  useEffect(() => {
    locales && localesManager.registerLocales(locales)
  }, [localesManager, locales])

  useEffect(() => {
    //暂时这么处理，后面把语言切换移动到locales-react
    setLocalesManager(new LocalesManager(lang, baseLocales))
  }, [lang, baseLocales])

  return (
    <LocalesContext.Provider value={localesManager}>
      <ConfigRoot themeMode={other.mode}>
        <FlowEditorScopeInner {...other} onNodeDedug={props.onNodeDedug}>
          {children}
        </FlowEditorScopeInner>
      </ConfigRoot>
    </LocalesContext.Provider>
  )
})
