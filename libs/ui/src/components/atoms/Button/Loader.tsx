import { useContext, useEffect, useRef, useState } from 'react'
import { Animated } from 'react-native'
import { XStack } from '../XStack'
import { colors } from './colors'
import { ButtonContext } from './context'
import { getTokenValue } from 'tamagui'

const INTERVAL = 300
const ANIMATION_DURATION = 400
const ANIMATION_SCALE = 1.4

type DotProps = {
  isActive: boolean
}

const Dot = ({ isActive }: DotProps) => {
  const { destructive, disabled, size, type } = useContext(ButtonContext.context)
  const scale = useRef(new Animated.Value(1)).current

  const scaleDown = () => {
    Animated.timing(scale, {
      toValue: 1,
      duration: ANIMATION_DURATION,
      useNativeDriver: true,
    }).start()
  }

  const scaleUp = () => {
    Animated.timing(scale, {
      toValue: ANIMATION_SCALE,
      duration: ANIMATION_DURATION,
      useNativeDriver: true,
    }).start()
  }

  useEffect(() => {
    if (isActive) {
      scaleUp()
    } else {
      scaleDown()
    }
  }, [isActive])

  const dotSize = (() => {
    switch (size) {
      case 'sm':
        return 10
      case 'lg':
        return 10
      case '2xl':
        return 12
      default:
        return 10
    }
  })()

  const state = disabled ? 'disabled' : destructive ? 'destructive' : 'default'
  const { base } = colors[type][state]

  const style = {
    backgroundColor: getTokenValue(base.foregroundColor, 'color'),
    borderRadius: dotSize / 2,
    height: dotSize,
    width: dotSize,
  }

  // TODO: Re-write with tamagui animations and reanimated
  return <Animated.View style={[style, { transform: [{ scale }] }]} />
}

export const Loader = () => {
  const [active, setActive] = useState(1)

  useEffect(() => {
    const interval = window.setInterval(() => {
      setActive((prev) => (prev > 2 ? 1 : prev + 1))
    }, INTERVAL)

    return () => {
      clearInterval(interval)
    }
  }, [])

  return (
    <XStack alignItems="center" flexDirection="row" gap="$spacing-sm">
      {[1, 2, 3].map((i) => (
        <Dot key={i} isActive={i === active} />
      ))}
    </XStack>
  )
}
