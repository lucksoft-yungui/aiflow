import { memo, useState } from "react";
import { ButtonSelect, useTranslate } from "@lucksoft/aiflow-editor";
import { QuestionCircleOutlined } from "@ant-design/icons";
import { Form, Radio } from "antd";
import FormItem from "antd/es/form/FormItem";
import { FormAuth } from "./FormAuth";

export const ApproverPanel = memo(() => {
  const [settingsType, setSettingsType] = useState("node");
  const t = useTranslate();

  return (
    <Form layout="vertical" colon={false}>
      <FormItem label={t("approveType")}>
        <Radio.Group>
          <Radio value={1}>{t("manualApproval")}</Radio>
          <Radio value={2}>{t("autoPass")}</Radio>
          <Radio value={3}>{t("autoReject")}</Radio>
        </Radio.Group>
      </FormItem>
      <ButtonSelect
        options={[
          {
            key: "node",
            label: t("setApprover"),
          },
          {
            key: "formAuth",
            label: (
              <>
                {t("formAuth")} <QuestionCircleOutlined />
              </>
            ),
          },
          {
            key: "addvancedSettings",
            label: t("addvancedSettings"),
          },
        ]}
        value={settingsType}
        onChange={setSettingsType}
      />
      {settingsType === "formAuth" && <FormAuth />}
    </Form>
  );
});
