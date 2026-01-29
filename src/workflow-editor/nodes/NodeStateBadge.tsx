import { memo } from "react"
import { styled } from "styled-components"

const Badge = styled.span<{ $color: string, $floating?: boolean, $right?: number, $alignRight?: boolean }>`
  margin-left: 6px;
  padding: 0 6px;
  height: 16px;
  line-height: 16px;
  font-size: 10px;
  border-radius: 8px;
  color: #fff;
  background: ${props => props.$color};
  border: 1px solid rgba(0, 0, 0, 0.2);

  @supports (color: color-mix(in srgb, #fff 50%, #000)) {
    background: ${props => `color-mix(in srgb, ${props.$color} 45%, #000 55%)`};
  }
  display: inline-flex;
  align-items: center;
  white-space: nowrap;

  ${props => props.$alignRight && `
    margin-left: auto;
  `}

  ${props => props.$floating && `
    position: absolute;
    right: ${props.$right ?? 10}px;
    top: 50%;
    transform: translateY(-50%);
    margin-left: 0;
    pointer-events: none;
  `}
`

const stateMap: Record<string, { label: string, color: string }> = {
  done: { label: "已完成", color: "#52c41a" },
  pending: { label: "处理中", color: "#13c2c2" },
  processing: { label: "处理中", color: "#13c2c2" },
  todo: { label: "待完成", color: "#8c8c8c" },
  waiting: { label: "待完成", color: "#8c8c8c" },
  failed: { label: "失败", color: "#ff4d4f" },
  error: { label: "失败", color: "#ff4d4f" },
  skipped: { label: "已跳过", color: "#8c8c8c" },
}

export const getStateColor = (state?: string, fallback = "#8c8c8c") => {
  if (!state) {
    return fallback
  }
  const normalized = String(state).toLowerCase()
  return stateMap[normalized]?.color || fallback
}

export const NodeStateBadge = memo((props: { state?: string, floating?: boolean, right?: number, alignRight?: boolean, baseColor?: string }) => {
  const { state, floating, right, alignRight, baseColor } = props
  if (!state) {
    return null
  }

  const normalized = String(state).toLowerCase()
  const mapped = stateMap[normalized]
  const label = mapped?.label || state
  const color = baseColor || mapped?.color || "#8c8c8c"

  return <Badge $color={color} $floating={floating} $right={right} $alignRight={alignRight}>{label}</Badge>
})
