import { styled, Text as TamaguiText } from 'tamagui'

import { colors } from './colors'
import { type ButtonTypeTokens, ButtonContext } from './context'
import { getTypographyVariantStyles } from '../Typography'

export const Text = styled(TamaguiText, {
  name: 'ButtonText',
  context: ButtonContext,

  userSelect: 'none',

  variants: {
    type: (type: ButtonTypeTokens, { props }) => {
      const { destructive, disabled } = props as { destructive: boolean; disabled: boolean }

      const state = disabled ? 'disabled' : destructive ? 'destructive' : 'default'
      const { base } = colors[type][state]

      return {
        color: base.foregroundColor,
      }
    },
    size: {
      sm: getTypographyVariantStyles('$label-14'),
      lg: getTypographyVariantStyles('$label-16'),
      '2xl': getTypographyVariantStyles('$label-18'),
    },
    // Only for tamagui to expected disabled as a property
    disabled: {
      true: {},
    },
    destructive: {
      true: {},
    },
  } as const,
})
