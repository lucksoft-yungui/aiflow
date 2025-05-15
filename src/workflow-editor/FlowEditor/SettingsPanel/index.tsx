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
  
  const [config, setConfig] = useState(selectedNode?.config);

  useEffect(() => {
    setConfig(selectedNode?.config);
  }, [selectedNode]);

  const handelClose = useCallback(() => {
    store?.selectNode(undefined)
  }, [store])

  const handleConfirm = useCallback(() => {
    if (selectedNode && config) {
      store?.changeNode({ ...selectedNode, config })
    }
    store?.selectNode(undefined)
  }, [store, selectedNode, config])

  const handleNameChange = useCallback((name?: string) => {
    if (selectedNode && name !== undefined) {
      store?.changeNode({ ...selectedNode, name })
    }
  }, [selectedNode, store])

  const handleSettingsChange = useCallback((value: any) => {
    console.log("config settings change", value);
    setConfig(value);
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
      open={!!selectedNode}
    >
      <Content className="settings-panel-content">
        {materialUi?.settersPanel && <materialUi.settersPanel value={selectedNode?.config} onChange={handleSettingsChange} />}
      </Content>
    </Drawer>
  )
})