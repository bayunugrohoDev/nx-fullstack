import { ComponentProps, ForwardedRef, forwardRef, useState } from 'react'
import { StyleProp, TextInput, TouchableOpacity, ViewStyle } from 'react-native'
import { Label, Input as TamaguiInput, styled } from 'tamagui'

import { type IconName, Icon } from '../Icons'
import { getTypographyVariantStyles } from '../Typography'
import { XStack } from '../XStack'
import { YStack } from '../YStack'

const StyledInput = styled(TamaguiInput, {
  ...getTypographyVariantStyles('$body-16'),

  color: '$text-primary',
  paddingLeft: '$spacing-lg',
  paddingRight: '$spacing-lg',
  paddingVertical: '$spacing-md',
  height: 44,
  placeholderTextColor: '$text-placeholder',
  width: '100%',

  focusStyle: {
    borderColor: '$border-brand',
  },

  variants: {
    error: {
      true: {
        borderColor: '$border-error',
      },
    },
    disabled: {
      true: {
        backgroundColor: '$bg-disabled',
        borderColor: '$border-disabled',
        color: '$text-disabled',
      },
    },
    variant: {
      primary: {
        borderColor: '$border-primary',
        backgroundColor: '$white',
        borderWidth: 1,
        borderRadius: '$radius-sm',
      },
      secondary: {
        backgroundColor: '$bg-tertiary',
        borderWidth: 0,
        borderRadius: '$radius-full',
      },
    },
  },
  defaultVariants: {
    variant: 'primary',
  },
} as const)

export const StyledErrorText = styled(Label, {
  ...getTypographyVariantStyles('$body-14'),
  color: '$text-error-primary',
  marginTop: '$spacing-xs',
})

const StyledLabelInput = styled(Label, {
  ...getTypographyVariantStyles('$label-14'),
  textAlign: 'left',
  marginBottom: '$spacing-sm',
  color: '$text-secondary',
})

const StyledIcon = styled(Icon, {
  pointerEvents: 'none',
  position: 'absolute',
  zIndex: 2,
})

export type InputProps = ComponentProps<typeof StyledInput>

export interface ExtendedInputProps extends InputProps {
  containerStyle?: StyleProp<ViewStyle>
  errorText?: string
  label?: string
  iconBefore?: IconName
  iconBeforeStyle?: StyleProp<ViewStyle>
  inputStyle?: StyleProp<ViewStyle>
  isPassword?: boolean
}

export const Input = forwardRef(
  (
    {
      containerStyle,
      disabled,
      label,
      errorText,
      iconBefore,
      iconBeforeStyle,
      inputStyle = {},
      isPassword = false,
      ...props
    }: ExtendedInputProps,
    ref: ForwardedRef<TextInput | null>,
  ) => {
    const [passwordVisible, setPasswordVisible] = useState(false)

    return (
      <YStack
        justifyContent="center"
        alignItems="flex-start"
        flexDirection="column"
        style={containerStyle}>
        {label && <StyledLabelInput>{label}</StyledLabelInput>}
        <XStack position="relative" width={'100%'} alignItems="center">
          {iconBefore && (
            <StyledIcon name={iconBefore} color="black" size={20} style={iconBeforeStyle} />
          )}

          <StyledInput
            {...props}
            ref={ref}
            disabled={disabled}
            editable={props.editable ?? !disabled}
            secureTextEntry={isPassword && !passwordVisible}
            style={
              iconBefore ? { paddingLeft: 40, ...(inputStyle as Record<string, string>) } : null
            }
          />

          {isPassword && (
            <TouchableOpacity
              onPress={() => setPasswordVisible(!passwordVisible)}
              style={{
                position: 'absolute',
                right: 12,
              }}>
              <Icon name={passwordVisible ? 'Eye' : 'EyeOff'} size={20} color="$text-tertiary" />
            </TouchableOpacity>
          )}
        </XStack>
        {errorText && <StyledErrorText>{errorText}</StyledErrorText>}
      </YStack>
    )
  },
)
