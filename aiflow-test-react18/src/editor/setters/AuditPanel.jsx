import { memo, useState } from "react";
import { ButtonSelect, useTranslate } from "@lucksoft/aiflow-editor";
import { QuestionCircleOutlined } from "@ant-design/icons";
import { Form } from "antd";
import { FormAuth } from "./FormAuth";

export const AuditPanel = memo(() => {
  const [settingsType, setSettingsType] = useState("node");
  const t = useTranslate();

  return (
    <Form layout="vertical" colon={false}>
      <ButtonSelect
        options={[
          {
            key: "node",
            label: t("setDealer"),
          },
          {
            key: "formAuth",
            label: (
              <>
                {t("formAuth")} <QuestionCircleOutlined />
              </>
            ),
          },
        ]}
        value={settingsType}
        onChange={setSettingsType}
      />
      {settingsType === "formAuth" && <FormAuth />}
    </Form>
  );
});
