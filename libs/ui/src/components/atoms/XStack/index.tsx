import * as React from 'react'
import { Platform } from 'react-native'
import { TamaguiElement, XStack as TamaguiXStack, XStackProps } from 'tamagui'

export const XStack = React.forwardRef<TamaguiElement, XStackProps>((props, forwardedRef) => {
  return (
    <TamaguiXStack {...props} ref={forwardedRef}>
      {Platform.OS === 'web' ? <> {props.children} </> : props.children}
    </TamaguiXStack>
  )
})
