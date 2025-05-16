import { CloseOutlined } from "@ant-design/icons"
import { Button, Drawer } from "antd"
import { memo, useCallback, useEffect, useState } from "react"
import { NodeTitle } from "./NodeTitle"
import { Footer } from "./Footer"
import { useSelectedNode } from "../../hooks/useSelectedNode"
import { useEditorEngine } from "../../hooks"
import { styled } from "styled-components"
import { useMaterialUI } from "../../hooks/useMaterialUI"

const Content = styled.div`
  display: flex;
  flex-flow: column;
`
export const SettingsPanel = memo(() => {

  const selectedNode = useSelectedNode()
  const materialUi = useMaterialUI(selectedNode)
  const store = useEditorEngine()
  
  const [agent, setAgent] = useState(selectedNode?.agent);

  useEffect(() => {
    setAgent(selectedNode?.agent);
  }, [selectedNode]);

  const handelClose = useCallback(() => {
    store?.selectNode(undefined)
  }, [store])

  const handleConfirm = useCallback(() => {
    if (selectedNode && agent) {
      store?.changeNode({ ...selectedNode, agent })
    }
    store?.selectNode(undefined)
  }, [store, selectedNode, agent])

  const handleNameChange = useCallback((name?: string) => {
    if (selectedNode && name !== undefined) {
      store?.changeNode({ ...selectedNode, name })
    }
  }, [selectedNode, store])

  const handleSettingsChange = useCallback((value: any) => {
    console.log("config settings change", value);
    setAgent(value);
  }, [])
  return (
    <Drawer
      title={selectedNode &&
        <NodeTitle
          node={selectedNode}
          onNameChange={handleNameChange}
        />
      }
      placement="right"
      width={656}
      closable={false}
      extra={
        <Button
          size="small"
          type="text"
          icon={<CloseOutlined />}
          onClick={handelClose}
        />
      }
      footer={
        <Footer
          onConfirm={handleConfirm}
          onCancel={handelClose}
        />
      }
      onClose={handelClose}
      open={!!selectedNode && !!materialUi?.canOpenSettings}
    >
      <Content className="settings-panel-content">
        {materialUi?.settersPanel && <materialUi.settersPanel value={agent} onChange={handleSettingsChange} />}
      </Content>
    </Drawer>
  )
})