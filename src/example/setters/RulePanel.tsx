import { memo, useState } from "react"
import { useTranslate } from "../../workflow-editor/react-locales"
import { FormCard, FormCardContent } from "./FormCard"
import { Select } from 'antd';
import type { SelectProps } from 'antd';
import { Input } from 'antd';

const { TextArea } = Input;

export interface IRuleSettings {
    key: string,
    title: string,
    pretreatment: boolean,
    level: string,
    rule: {
        decisionRules: string,
        question: string,
        example: string
    },
    directory: string[]
}

export const RulePanel = memo((
    props: {
        value?: IRuleSettings
        onChange?: (value?: IRuleSettings) => void
    }
) => {
    const t = useTranslate()
    const [config, setConfig] = useState<IRuleSettings>(props.value || {
        key: "",
        title: "",
        pretreatment: false,
        level: "",
        rule: {
            decisionRules: "",
            question: "",
            example: ""
        },
        directory: []
    });

    const handleChapterChange = (value: string[]) => {
        console.log(`selected ${value}`);
        setConfig({ ...config, directory: value })
        props.onChange?.(config)
    };

    const handleProblemConfigChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        console.log(`selected ${e.target.value}`);
        setConfig({ ...config, rule: { ...config.rule, question: e.target.value } })
        props.onChange?.(config)
    };

    const handleJudgementRuleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        console.log(`selected ${e.target.value}`);
        setConfig({ ...config, rule: { ...config.rule, decisionRules: e.target.value } })
        props.onChange?.(config)
    };

    const handleRuleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        console.log(`selected ${e.target.value}`);
        setConfig({ ...config, title: e.target.value })
        props.onChange?.(config)
    };

    const handleRuleClassificationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        console.log(`selected ${e.target.value}`);
        setConfig({ ...config, level: e.target.value })
        props.onChange?.(config)
    };

    return (
        <FormCardContent>
            <FormCard title={t("ruleName")}>
                <Input
                    placeholder={t("pleaseSelectRuleName")}
                    onChange={handleRuleNameChange}
                />
            </FormCard>
            <FormCard title={t("ruleClassification")}>
                <Input
                    placeholder={t("pleaseSelectRuleClassification")}
                    onChange={handleRuleClassificationChange}
                />
            </FormCard>
            <FormCard title={t("ruleChapter")}>
                <Select
                    mode="tags"
                    style={{ width: '100%' }}
                    placeholder={t("pleaseSelectRuleChapter")}
                    onChange={handleChapterChange}
                />
            </FormCard>
            <FormCard title={t("problemConfiguration")}>
                <TextArea rows={4}
                    placeholder={t("pleaseSelectProblemConfiguration")}
                    maxLength={6}
                    onChange={handleProblemConfigChange}
                />
            </FormCard>
            <FormCard title={t("judgementRule")}>
                <TextArea rows={4}
                    placeholder={t("pleaseSelectJudgementRule")}
                    maxLength={6}
                    onChange={handleJudgementRuleChange}
                />
            </FormCard>
        </FormCardContent>
    )
})