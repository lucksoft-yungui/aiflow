import { memo, useState } from "react"
import { useTranslate } from "../../workflow-editor/react-locales"
import { Checkbox } from 'antd';
import type { CheckboxProps } from 'antd';


export interface IStartSettings {
  test: boolean
}

export const StartPanel = memo((
  props: {
    value?: IStartSettings
    onChange?: (value?: IStartSettings) => void
  }
) => {
  const [config, setConfig] = useState<IStartSettings>(props.value || { test: false });
  const t = useTranslate()

  const onTestChange: CheckboxProps['onChange'] = (e) => {
    console.log(`checked = ${e.target.checked}`);
    setConfig({ ...config, test: e.target.checked })
    props.onChange?.(config)
  };

  return (
    <Checkbox onChange={onTestChange}>Checkbox</Checkbox>
  )
})