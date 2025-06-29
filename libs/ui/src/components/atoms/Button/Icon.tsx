import { cloneElement, ReactElement, useContext } from 'react'

import { colors } from './colors'
import { ButtonContext } from './context'

export const Icon = (props: { children: ReactElement }) => {
  const { destructive, disabled, size, type } = useContext(ButtonContext.context)

  const iconSize = (() => {
    switch (size) {
      case 'sm':
        return 20
      case 'lg':
        return 20
      case '2xl':
        return 24
      default:
        return 20
    }
  })()

  const state = disabled ? 'disabled' : destructive ? 'destructive' : 'default'
  const { base } = colors[type][state]

  return cloneElement(props.children, {
    color: base.foregroundColor,
    size: iconSize,
  })
}
