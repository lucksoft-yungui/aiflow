import { memo } from "react";
import "./index.css";

export const FormCard = memo((props) => {
  const { title, extra, children, style } = props;
  return (
    <div className="form-card" style={style}>
      <div className="form-card-title">
        <div>{title}</div>
        <div>{extra}</div>
      </div>
      <div className="form-card-content">{children}</div>
    </div>
  );
});

export const FormCardContent = memo((props) => {
  const { children, style } = props;
  return (
    <div className="form-card-content" style={style}>
      {children}
    </div>
  );
});
