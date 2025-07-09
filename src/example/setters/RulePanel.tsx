import { memo, useState, useEffect } from "react"
import { useTranslate } from "../../workflow-editor/react-locales"
import { FormCard, FormCardContent } from "./FormCard"
import { Checkbox } from 'antd';
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
        example: string,
        reference: string,
        thinking: boolean,
        enabled: boolean,
        extraPrompt: string,
        targetText: string,
        targetLevel: string,
        targetComment: string
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
                example: "",
                reference: "",
                thinking: false,
                enabled: true,
                extraPrompt: "",
                targetText: "",
                targetLevel: "",
                targetComment: ""
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
                    ...(props.value?.rule || {}),
                    // 如果原来的thinking和enabled在顶层，将它们移到rule中
                    thinking: props.value?.rule?.thinking !== undefined ? props.value.rule.thinking : (props.value as any)?.thinking !== undefined ? (props.value as any).thinking : false,
                    enabled: props.value?.rule?.enabled !== undefined ? props.value.rule.enabled : (props.value as any)?.enabled !== undefined ? (props.value as any).enabled : true
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

    const handleChapterChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        // console.log(`selected ${e.target.value}`);
        const value = e.target.value || '';
        // 将文本按换行符分割成数组，但保留空行以支持用户正在输入
        updateConfig(prev => ({ 
            directory: value.split('\n')
        }));
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

    const handleReferenceChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        // console.log(`selected ${e.target.value}`);
        updateConfig(prev => ({ 
            rule: { ...prev.rule, reference: e.target.value } 
        }));
    };
    
    // 监听props.value变化，更新所有表单值，同时确保key和pretreatment不变
    useEffect(() => {
        if (props.value) {
            // console.log("props.value变化:", props.value);
            const defaultConfig = {
                key: "",
                title: "",
                pretreatment: false,
                level: "",
                rule: {
                    decisionRules: "",
                    question: "",
                    example: "",
                    reference: "",
                    thinking: false,
                    enabled: true,
                    extraPrompt: "",
                    targetText: "",
                    targetLevel: "",
                    targetComment: ""
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
                        ...(props.value?.rule || {}),
                        // 如果原来的thinking和enabled在顶层，将它们移到rule中
                        thinking: props.value?.rule?.thinking !== undefined ? props.value.rule.thinking : (props.value as any)?.thinking !== undefined ? (props.value as any).thinking : false,
                        enabled: props.value?.rule?.enabled !== undefined ? props.value.rule.enabled : (props.value as any)?.enabled !== undefined ? (props.value as any).enabled : true
                    },
                    // 确保数组被正确合并
                    directory: Array.isArray(props.value?.directory) ? [...(props.value?.directory as string[])] : 
                              (typeof props.value?.directory === 'string' ? [props.value.directory] : []),
                    // 确保key和pretreatment不变
                    key: props.value?.key || "",
                    pretreatment: props.value?.pretreatment !== undefined ? props.value?.pretreatment : false
                };
                
                // console.log("更新后的config:", updated);
                return updated;
            });
        }
    }, [props.value]);

    const handleThinkingChange = (checked: boolean) => {
        updateConfig(prev => ({ 
            rule: { ...prev.rule, thinking: checked } 
        }));
    };

    const handleEnabledChange = (checked: boolean) => {
        updateConfig(prev => ({ 
            rule: { ...prev.rule, enabled: checked } 
        }));
    };

    const handleExtraPromptChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        updateConfig(prev => ({ 
            rule: { ...prev.rule, extraPrompt: e.target.value } 
        }));
    };

    const handleTargetTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        updateConfig(prev => ({ 
            rule: { ...prev.rule, targetText: e.target.value } 
        }));
    };

    const handleTargetLevelChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        updateConfig(prev => ({ 
            rule: { ...prev.rule, targetLevel: e.target.value } 
        }));
    };

    const handleTargetCommentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        updateConfig(prev => ({ 
            rule: { ...prev.rule, targetComment: e.target.value } 
        }));
    };

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
                <TextArea rows={4}
                    placeholder={t("pleaseSelectRuleChapter")}
                    onChange={handleChapterChange}
                    value={Array.isArray(config.directory) ? config.directory.join('\n') : ''}
                />
            </FormCard>
            <FormCard title={t("judgementRule")}>
                <TextArea rows={4}
                    placeholder={t("pleaseSelectJudgementRule")}
                    onChange={handleJudgementRuleChange}
                    value={config.rule.decisionRules}
                />
            </FormCard>
            <FormCard title={t("correctExample")}>
                <TextArea rows={4}
                    placeholder={t("pleaseSelectCorrectExample")}
                    onChange={handleCorrectExampleChange}
                    value={config.rule.example}
                />
            </FormCard>
            <FormCard title={t("reference")}>
                <TextArea rows={4}
                    placeholder={t("pleaseSelectReference")}
                    onChange={handleReferenceChange}
                    value={config.rule.reference}
                />
            </FormCard>
            <FormCard title={t("extraPrompt")}>
            <TextArea rows={4}
                    placeholder={t("pleaseSelectExtraPrompt")}
                    onChange={handleExtraPromptChange}
                    value={config.rule.extraPrompt}
                />
            </FormCard>
            <FormCard title={t("targetText")}>
                <TextArea rows={4}
                    placeholder={t("pleaseSelectTargetText")}
                    onChange={handleTargetTextChange}
                    value={config.rule.targetText}
                />
            </FormCard>
            <FormCard title={t("targetLevel")}>
                <TextArea rows={4}
                    placeholder={t("pleaseSelectTargetLevel")}
                    onChange={handleTargetLevelChange}
                    value={config.rule.targetLevel}
                />
            </FormCard>
            <FormCard title={t("targetComment")}>
                <TextArea rows={4}
                    placeholder={t("pleaseSelectTargetComment")}
                    onChange={handleTargetCommentChange}
                    value={config.rule.targetComment}
                />
            </FormCard>
            <FormCard title={t("problemConfiguration")}>
                <TextArea rows={4}
                    placeholder={t("pleaseSelectProblemConfiguration")}
                    onChange={handleProblemConfigChange}
                    value={config.rule.question}
                />
            </FormCard>
            <FormCard title={t("thinking")}>
                <Checkbox
                    checked={config.rule.thinking}
                    onChange={(e) => handleThinkingChange(e.target.checked)}
                >
                    {t("enableThinking")}
                </Checkbox>
            </FormCard>
            <FormCard title={t("enabled")}>
                <Checkbox
                    checked={config.rule.enabled}
                    onChange={(e) => handleEnabledChange(e.target.checked)}
                >
                    {t("enableEnabled")}
                </Checkbox>
            </FormCard>
        </FormCardContent>
    )
})