import { memo, useState } from "react";
import { Checkbox } from "antd";
import { useTranslate } from "@lucksoft/aiflow-editor";

export const StartPanel = memo((props) => {
  const [config, setConfig] = useState(props.value || { test: false });
  const t = useTranslate();

  const handleChange = (e) => {
    const next = { ...config, test: e.target.checked };
    setConfig(next);
    props.onChange?.(next);
  };

  return (
    <Checkbox checked={config.test} onChange={handleChange}>
      {t("promoterSettings") || "Checkbox"}
    </Checkbox>
  );
});
