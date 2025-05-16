import { memo } from "react"
import { Card } from "antd"
import "./index.css"
export const FormCard = memo((
  props: {
    title?: React.ReactNode
    extra?: React.ReactNode
    children?: React.ReactNode
    style?: React.CSSProperties
  }
) => {
  const { title, extra, children, style } = props
  return (
   <div className="form-card">
    <div className="form-card-title">{title}</div>
    <div className="form-card-content">{children}</div>
   </div>
  )
})

export const FormCardContent = memo((
    props: {
      children?: React.ReactNode
      style?: React.CSSProperties
    }
  ) => {
    const { children, style } = props
    return (
     <div className="form-card-content" style={style}>
      {children}
     </div>
    )
  })
