import { createStyledContext } from 'tamagui'

import { colors } from './colors'

export type ButtonTypeTokens = keyof typeof colors
export type ButtonSizeTokens = 'sm' | 'lg' | '2xl'

export type ButtonStyledContextValue = {
  destructive: boolean
  disabled: boolean
  size: ButtonSizeTokens
  type: ButtonTypeTokens
}

export const ButtonContext = createStyledContext<ButtonStyledContextValue>({
  destructive: false,
  disabled: false,
  size: 'lg',
  type: 'primary',
})
