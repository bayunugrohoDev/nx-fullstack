import type { IconProps as TamaguiIconProps } from '@tamagui/helpers-icon'
import * as LucideIcons from '@tamagui/lucide-icons'
import type { FC } from 'react'

export type IconName = keyof typeof LucideIcons

export type IconProps = TamaguiIconProps & {
  name: IconName
}

export const Icon: FC<IconProps> = ({ name, size = 20, color = 'black', ...props }) => {
  const IconComponent = LucideIcons[name]
  if (!IconComponent) {
    return null
  }

  return <IconComponent color={color} size={size} {...props} />
}
