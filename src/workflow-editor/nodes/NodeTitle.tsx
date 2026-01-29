import React, { memo, useCallback, useEffect, useState } from "react";
import { styled } from "styled-components";
import { IWorkFlowNode } from "../interfaces";
import { INodeMaterial } from "../interfaces/material";
import { useEditorEngine, useReadOnly } from "../hooks";
import { Button, message } from "antd";
import { copyIcon, debugIcon } from "../icons";
import { createUuid } from "../utils/create-uuid";
import { CloseOutlined } from "@ant-design/icons";
import { NodeStateBadge, getStateColor } from "./NodeStateBadge";

export const NodeTitleShell = styled.div<{ $disabled?: boolean }>`
  position: relative;
  display: flex;
  align-items: center;
  padding-left: 16px;
  padding-right: 30px;
  width: 100%;
  height: 24px;
  line-height: 24px;
  font-size: 12px;
  color: #fff;
  text-align: left;
  //background: #576a95;
  border-radius: 4px 4px 0 0;
  user-select: none;
  
  ${props => props.$disabled && `
    opacity: 0.5;
    filter: grayscale(70%);
    
    &::after {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: rgba(0, 0, 0, 0.1);
      border-radius: 4px 4px 0 0;
    }
  `}
  
  &.start-node-title{
    //background: rgb(87, 106, 149);
  }
`
export const NodeIcon = styled.div`
  font-size: 14px;
  margin-right: 8px;
`

export const NodeColorDot = styled.span<{ $color?: string }>`
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: ${props => props.$color || "transparent"};
  box-shadow: 0 0 0 2px rgba(255, 255, 255, 0.9);
  margin-right: 6px;
  flex-shrink: 0;
`

export const TitleResponse = styled.div`
  flex:1;
  display: flex;
  padding: 2px 0;
  align-items: center;
`

export const NodeTitleText = styled.div`
  border: solid transparent 1px;
  &:hover{
    line-height: 16px;
    border-bottom: dashed 1px #fff;
  }
`

export const Input = styled.input`
  flex: 1;
  height: 18px;
  padding-left: 4px;
  text-indent: 0;
  font-size: 12px;
  line-height: 18px;
  z-index: 1;
  outline: solid 2px rgba(80,80,80, 0.3);
  border: 0;
  border-radius: 4px;
  background-color: ${props => props.theme?.token?.colorBgBase};
  color: ${props => props.theme?.token?.colorText};
`

const ButtonsContainer = styled.div`
  position: absolute;
  right: 10px;
  top: 50%;
  transform: translateY(-50%);
  display: flex;
  gap: 2px;
`

const IconButton = styled(Button)`
  font-size: 14px;
  display: flex;
  justify-content: center;
  align-items: center;
`

// 粘贴图标
const pasteIcon = <span role="img" className="anticon">
  <svg width='0.9em' height="0.9em" fill="currentColor" viewBox="0 0 1024 1024">
    <path d="M832 64H296c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8h496v688c0 4.4 3.6 8 8 8h56c4.4 0 8-3.6 8-8V96c0-17.7-14.3-32-32-32z" p-id="2355"></path><path d="M704 192H192c-17.7 0-32 14.3-32 32v672c0 17.7 14.3 32 32 32h512c17.7 0 32-14.3 32-32V224c0-17.7-14.3-32-32-32z m-50 172v80c0 4.4-3.6 8-8 8H378c-4.4 0-8-3.6-8-8v-80c0-4.4 3.6-8 8-8h268c4.4 0 8 3.6 8 8z" p-id="2356"></path>
  </svg>
</span>

// 深拷贝函数
function deepClone(obj: any) {
  // 重写uuid
  function resetNodeId(node: IWorkFlowNode) {
    node.id = createUuid();
    if (node.childNode) {
      resetNodeId(node.childNode);
    }
    if ((node as any).conditionNodeList) {
      for (const condition of (node as any).conditionNodeList) {
        resetNodeId(condition);
      }
    }
    return node;
  }

  const cloned = JSON.parse(JSON.stringify(obj));
  return resetNodeId(cloned);
}

export const NodeTitle = memo((props: {
  node: IWorkFlowNode,
  material?: INodeMaterial,
}) => {
  const { node, material } = props;
  const [editting, setEditting] = useState(false)
  const [inputValue, setInputValue] = useState(node.name)
  const [canPaste, setCanPaste] = useState(false)

  const editorStore = useEditorEngine()
  const readOnly = useReadOnly()
  
  // 检查agent是否被禁用
  const isAgentDisabled = node.agent?.rule?.enabled === false

  const defaultConfig = material?.defaultConfig; 

  console.log("defaultConfig", defaultConfig);

  useEffect(() => {
    setInputValue(node.name)
  }, [node.name])

  useEffect(() => {
    // 检查剪贴板中是否有可粘贴的节点
    const clipboardContent = localStorage.getItem('workflow-node-clipboard');
    setCanPaste(!!clipboardContent);
  }, []);

  const changeName = useCallback(() => {
    editorStore?.changeNode({ ...node, name: inputValue })
  }, [editorStore, inputValue, node])

  const handleNameClick = useCallback((e: React.MouseEvent) => {
    if (readOnly) {
      return
    }
    e.stopPropagation()
    setEditting(true)
  }, [readOnly])

  const handleInputClick = useCallback((e: React.MouseEvent) => {
    e.stopPropagation()
  }, [])

  const handleBlur = useCallback(() => {
    changeName()
    setEditting(false)
  }, [changeName])

  const handleKeyDown = useCallback((event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      handleBlur()
    }
  }, [handleBlur])

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value)
  }, [])

  const handleCopyNode = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    if (editorStore && node) {
      // 只复制节点本身，不复制子节点结构
      const { childNode, ...nodeWithoutChildren } = node;
      // 将当前节点结构（不含子节点）序列化并存储到localStorage
      const nodeCopy = JSON.stringify(nodeWithoutChildren);
      localStorage.setItem('workflow-node-clipboard', nodeCopy);
      setCanPaste(true);
      message.success('节点已复制');
    }
  }, [editorStore, node]);

  const handlePasteNode = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    if (editorStore) {
      const clipboardContent = localStorage.getItem('workflow-node-clipboard');
      if (clipboardContent) {
        try {
          // 解析剪贴板内容
          const pastedNode = JSON.parse(clipboardContent);

          // 保留当前节点ID、名称和子节点，但采用复制的节点的其他属性
          const mergedNode = {
            ...pastedNode,            // 复制节点的属性
            id: node.id,              // 保留当前节点ID
            name: node.name,          // 保留当前节点名称
            childNode: node.childNode // 保留当前节点的子节点
          };

          // 直接替换当前节点结构
          editorStore.changeNode(mergedNode);

          message.success('节点属性已应用');
        } catch (error) {
          console.error('粘贴节点失败:', error);
          message.error('粘贴节点失败');
        }
      }
    }
  }, [editorStore, node]);

  const handleClose = useCallback(() => {
    editorStore?.removeNode(node.id);
  }, [editorStore, node.id]);

  const handleNodeDebug = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    if (editorStore?.onNodeDedug) {
      editorStore.onNodeDedug(node);
    } else {
      console.log('node', node);
    }
  }, [editorStore, node]);

  const titleBg = readOnly ? getStateColor(node.state, material?.color || "#5b6b8f") : material?.color

  return <NodeTitleShell 
    className="node-title" 
    style={{ backgroundColor: titleBg, color: "#fff" }}
    $disabled={isAgentDisabled}
  >
    <NodeIcon>
      {material?.icon}
    </NodeIcon>
    {!editting &&
      <>
        <TitleResponse onClick={handleNameClick}>
          {readOnly && <NodeColorDot $color={material?.color} />}
          <NodeTitleText className="text" >{node.name}</NodeTitleText>
          <NodeStateBadge state={node.state} alignRight />
        </TitleResponse>
        {!readOnly && <ButtonsContainer>
          {defaultConfig?.canDebug && <IconButton
            className="icon-btn copy-btn"
            type="text"
            size="small"
            shape="circle"
            icon={debugIcon}
            onClick={handleNodeDebug}
            title="调试"
            style={{ color: "#fff" }}
            disabled={isAgentDisabled}
          />}
          <IconButton
            className="icon-btn copy-btn"
            type="text"
            size="small"
            shape="circle"
            icon={copyIcon}
            onClick={handleCopyNode}
            title="复制节点"
            style={{ color: "#fff" }}
            disabled={isAgentDisabled}
          />
          {canPaste && (
            <IconButton
              className="icon-btn paste-btn"
              type="text"
              size="small"
              shape="circle"
              icon={pasteIcon}
              onClick={handlePasteNode}
              title="粘贴节点"
              style={{ color: "#fff" }}
              disabled={isAgentDisabled}
            />
          )}
          <IconButton
            className="icon-btn close"
            type="text"
            size="small"
            shape="circle"
            icon={<CloseOutlined style={{ color: "#fff", fontSize: 12 }} />}
            onClick={handleClose}
            disabled={isAgentDisabled}
          />
        </ButtonsContainer>}
      </>
    }
    {
      editting && !readOnly && <Input
        autoFocus
        value={inputValue}
        onClick={handleInputClick}
        onBlur={handleBlur}
        onKeyDown={handleKeyDown}
        onChange={handleChange}
        disabled={isAgentDisabled}
      />
    }
  </NodeTitleShell>
})
