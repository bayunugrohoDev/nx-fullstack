import * as React from 'react'
import { TamaguiElement, YStack as TamaguiYStack, YStackProps } from 'tamagui'

export const YStack = React.forwardRef<TamaguiElement, YStackProps>((props, forwardedRef) => {
  return (
    <TamaguiYStack {...props} ref={forwardedRef}>
      <>{props.children}</>
    </TamaguiYStack>
  )
})
