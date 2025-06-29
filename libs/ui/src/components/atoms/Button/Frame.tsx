import { styled, View } from 'tamagui'

import { colors } from './colors'
import type { ButtonTypeTokens } from './context'
import { ButtonContext, ButtonSizeTokens } from './context'

export const Frame = styled(View, {
  name: 'Button',
  context: ButtonContext,

  alignItems: 'center',
  borderRadius: '$radius-full',
  borderWidth: 1,
  flexDirection: 'row',
  justifyContent: 'center',
  gap: '$spacing-sm',

  variants: {
    fullWidth: {
      true: {
        width: '100%',
      },
    },

    type: (type: ButtonTypeTokens, { props }) => {
      const { destructive, disabled } = props as { destructive: boolean; disabled: boolean }

      const state = disabled ? 'disabled' : destructive ? 'destructive' : 'default'
      const { base, hover } = colors[type][state]

      return {
        backgroundColor: base.backgroundColor,
        borderColor: base.borderColor,
        pressStyle: hover
          ? {
              backgroundColor: hover.backgroundColor,
            }
          : undefined,
      }
    },
    size: (size: ButtonSizeTokens, { props }) => {
      const { type, rounded } = props as { type: ButtonTypeTokens; rounded: boolean }

      // Link buttons are adjusted to text hight and padding
      if (type === 'link-color' || type === 'link-gray') {
        return {
          height: 'auto',
          paddingHorizontal: 0,
          paddingVertical: '$spacing-sm',
        }
      }

      const standard = {
        sm: {
          height: 36,
          paddingHorizontal: '$spacing-md',
        },
        lg: {
          height: 44,
          paddingHorizontal: '$spacing-lg',
        },
        '2xl': {
          height: 56,
          paddingHorizontal: '$spacing-xl',
        },
      }

      const round = {
        sm: {
          height: 36,
          width: 36,
        },
        lg: {
          height: 44,
          width: 44,
        },
        '2xl': {
          height: 56,
          width: 56,
        },
      }

      return rounded ? round[size] : standard[size]
    },
    rounded: {
      true: {},
    },
    destructive: {
      true: {},
    },
  } as const,
})
