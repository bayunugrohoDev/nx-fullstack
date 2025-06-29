import type { ReactElement, ReactNode } from 'react'
import type { GetProps } from 'tamagui'
import { withStaticProperties } from 'tamagui'
import { ButtonContext } from './context'
import { Frame } from './Frame'
import { Icon } from './Icon'
import { Loader } from './Loader'
import { Text } from './Text'

const BaseButton = withStaticProperties(Frame, {
  Icon,
  Text,
  Props: ButtonContext.Provider,
})

export type BaseButtonProps = GetProps<typeof Frame>

export type ButtonProps = BaseButtonProps & {
  children?: ReactNode
  icon?: null | ReactElement
  iconAfter?: null | ReactElement
  loading?: boolean
}

export const Button = (props: ButtonProps) => {
  const { children, disabled, icon, iconAfter, loading, ...rest } = props

  const isOnlyIcon = Boolean(!children && !iconAfter && icon)

  return (
    <BaseButton
      {...rest}
      disabled={disabled || loading}
      rounded={isOnlyIcon}
      hoverStyle={{
        cursor: disabled ? 'default' : 'pointer',
        ...props.hoverStyle,
      }}>
      {loading && !isOnlyIcon && <Loader />}

      {/* Todo : Create Loader for web */}

      {!loading && (
        <>
          {icon && <BaseButton.Icon>{icon}</BaseButton.Icon>}
          {children && (
            <BaseButton.Text>
              <>{children}</>
            </BaseButton.Text>
          )}
          {iconAfter && <BaseButton.Icon>{iconAfter}</BaseButton.Icon>}
        </>
      )}
    </BaseButton>
  )
}
