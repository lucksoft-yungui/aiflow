import { memo, useState, useEffect } from "react"
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
    console.log('props.value', props.value)
    const t = useTranslate()
    const [config, setConfig] = useState<IRuleSettings>(() => {
        console.log("初始化config，props.value:", props.value);
        const defaultConfig = {
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
        };
        
        // 如果有props.value，使用props.value的内容作为基础
        if (props.value) {
            // 确保所有属性都被正确初始化，包括嵌套对象
            return {
                ...defaultConfig,
                ...props.value,
                // 确保rule对象被正确合并
                rule: {
                    ...defaultConfig.rule,
                    ...(props.value?.rule || {})
                },
                // 确保数组被正确合并
                directory: Array.isArray(props.value?.directory) ? [...(props.value?.directory as string[])] : [],
                // 确保key和pretreatment不变
                key: props.value?.key || "",
                pretreatment: props.value?.pretreatment !== undefined ? props.value?.pretreatment : false
            };
        }
        
        return defaultConfig;
    });

    // 创建一个通用的更新配置函数，保持key和pretreatment不变
    const updateConfig = (updater: (prevConfig: IRuleSettings) => Partial<IRuleSettings>) => {
        // 获取原始的key和pretreatment值
        const originalKey = props.value?.key || config.key;
        const originalPretreatment = props.value?.pretreatment !== undefined ? props.value.pretreatment : config.pretreatment;
        
        // 创建新的配置
        const newConfig = {
            ...config,
            ...updater(config),
            // 确保key和pretreatment不变
            key: originalKey,
            pretreatment: originalPretreatment
        };
        
        // 更新状态并调用onChange
        setConfig(newConfig);
        props.onChange?.(newConfig);
    };

    const handleChapterChange = (value: string[]) => {
        // console.log(`selected ${value}`);
        updateConfig(prev => ({ directory: value }));
    };

    const handleProblemConfigChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        // console.log(`selected ${e.target.value}`);
        updateConfig(prev => ({ 
            rule: { ...prev.rule, question: e.target.value } 
        }));
    };

    const handleJudgementRuleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        // console.log(`selected ${e.target.value}`);
        updateConfig(prev => ({ 
            rule: { ...prev.rule, decisionRules: e.target.value } 
        }));
    };

    const handleRuleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        // console.log(`selected ${e.target.value}`);
        updateConfig(prev => ({ title: e.target.value }));
    };

    const handleRuleClassificationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        // console.log(`selected ${e.target.value}`);
        updateConfig(prev => ({ level: e.target.value }));
    };

    const handleCorrectExampleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        // console.log(`selected ${e.target.value}`);
        updateConfig(prev => ({ 
            rule: { ...prev.rule, example: e.target.value } 
        }));
    };
    
    // 监听props.value变化，更新所有表单值，同时确保key和pretreatment不变
    useEffect(() => {
        if (props.value) {
            console.log("props.value变化:", props.value);
            const defaultConfig = {
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
            };
            
            // 更新配置，确保所有字段都正确更新
            setConfig(prev => {
                // 创建更新后的配置
                const updated = {
                    ...defaultConfig,
                    ...props.value,
                    // 确保rule对象被正确合并
                    rule: {
                        ...defaultConfig.rule,
                        ...(props.value?.rule || {})
                    },
                    // 确保数组被正确合并
                    directory: Array.isArray(props.value?.directory) ? [...(props.value?.directory as string[])] : [],
                    // 确保key和pretreatment不变
                    key: props.value?.key || "",
                    pretreatment: props.value?.pretreatment !== undefined ? props.value?.pretreatment : false
                };
                
                console.log("更新后的config:", updated);
                return updated;
            });
        }
    }, [props.value]);

    return (
        <FormCardContent>
            <FormCard title={t("ruleName")}>
                <Input
                    placeholder={t("pleaseSelectRuleName")}
                    onChange={handleRuleNameChange}
                    value={config.title}
                />
            </FormCard>
            <FormCard title={t("ruleClassification")}>
                <Input
                    placeholder={t("pleaseSelectRuleClassification")}
                    onChange={handleRuleClassificationChange}
                    value={config.level}
                />
            </FormCard>
            <FormCard title={t("ruleChapter")}>
                <Select
                    mode="tags"
                    style={{ width: '100%' }}
                    placeholder={t("pleaseSelectRuleChapter")}
                    onChange={handleChapterChange}
                    value={config.directory}
                />
            </FormCard>
            <FormCard title={t("problemConfiguration")}>
                <TextArea rows={4}
                    placeholder={t("pleaseSelectProblemConfiguration")}
                    maxLength={6}
                    onChange={handleProblemConfigChange}
                    value={config.rule.question}
                />
            </FormCard>
            <FormCard title={t("judgementRule")}>
                <TextArea rows={4}
                    placeholder={t("pleaseSelectJudgementRule")}
                    maxLength={6}
                    onChange={handleJudgementRuleChange}
                    value={config.rule.decisionRules}
                />
            </FormCard>
            <FormCard title={t("correctExample")}>
                <TextArea rows={4}
                    placeholder={t("pleaseSelectCorrectExample")}
                    maxLength={6}
                    onChange={handleCorrectExampleChange}
                    value={config.rule.example}
                />
            </FormCard>
        </FormCardContent>
    )
})