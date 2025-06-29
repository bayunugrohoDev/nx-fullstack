import { createAnimations } from '@tamagui/animations-react-native'
import { createFont, createTamagui, createTokens } from '@tamagui/core'
import { colorsList } from './colors'

const space = {
  'spacing-none': 0,
  'spacing-xs': 4,
  'spacing-sm': 8,
  'spacing-md': 12,
  'spacing-lg': 16,
  'spacing-xl': 20,
  'spacing-2xl': 24,
  'spacing-3xl': 32,
  'spacing-4xl': 40,
}

export const colors = {
  white: '#FFFFFF',
  black: '#000000',
  'text-primary': colorsList['gray/11'],
  'text-primary_on-brand': colorsList['white'],
  'text-secondary': colorsList['gray/9'],
  'text-secondary-dark': colorsList['gray/4'],
  'text-secondary_hover': colorsList['gray/10'],
  'text-secondary_on-brand': colorsList['purple/4'],

  'text-tertiary': colorsList['gray/8'],
  'text-tertiary_hover': colorsList['gray/9'],
  'text-tertiary_on-brand': colorsList['purple/4'],

  'text-quaternary': colorsList['gray/7'],
  'text-quaternary_on-brand': colorsList['purple/5'],

  'text-white': colorsList['white'],
  'text-disabled': colorsList['gray/7'],
  'text-placeholder': colorsList['gray/7'],
  'text-placeholder_subtle': colorsList['gray/5'],

  'text-brand-primary': colorsList['purple/11'],
  'text-brand-secondary': colorsList['purple/9'],
  'text-brand-tertiary': colorsList['purple/8'],

  'text-error-primary': colorsList['red/8'],
  'text-warning-primary': colorsList['orange/8'],
  'text-success-primary': colorsList['green/8'],

  'border-primary': colorsList['gray/5'],
  'border-secondary': colorsList['gray/4'],
  'border-tertiary': colorsList['gray/3'],
  'border-disabled': colorsList['gray/5'],
  'border-disabled_subtle': colorsList['gray/4'],
  'border-brand': colorsList['purple/9'],
  'border-brand-solid': colorsList['purple/10'],
  'border-brand-solid_alt': colorsList['purple/9'],
  'border-error': colorsList['red/5'],
  'border-error-solid': colorsList['red/8'],
  'border-black-alpha-10': colorsList['black/alpha-10'],

  'button-primary-fg': colorsList['white'],
  'button-primary-fg_hover': colorsList['white'],
  'button-primary-bg': colorsList['purple/10'],
  'button-primary-bg_hover': colorsList['purple/8'],
  'button-primary-border': colorsList['purple/8'],

  'button-secondary-gray-fg': colorsList['gray/9'],
  'button-secondary-gray-fg-dark': colorsList['gray/5'],

  'button-secondary-gray-fg_hover': colorsList['gray/10'],
  'button-secondary-gray-bg': colorsList['white'],
  'button-secondary-gray-bg-dark': colorsList['gray/11'],

  'button-secondary-gray-bg_hover': colorsList['gray/2'],
  'button-secondary-gray-border': colorsList['gray/5'],
  'button-secondary-gray-border-dark': colorsList['gray/9'],

  'button-secondary-color-fg': colorsList['purple/9'],
  'button-secondary-color-fg_hover': colorsList['purple/10'],
  'button-secondary-color-bg': colorsList['white'],
  'button-secondary-color-bg_hover': colorsList['purple/2'],
  'button-secondary-color-border': colorsList['purple/5'],

  'button-tertiary-gray-fg': colorsList['gray/8'],
  'button-tertiary-grey-fg_hover': colorsList['gray/9'],
  'button-tertiary-gray-bg': colorsList['transparent'],
  'button-tertiary-gray-bg_hover': colorsList['gray/2'],
  'button-tertiary-gray-border': colorsList['transparent'],

  'button-tertiary-color-fg': colorsList['purple/9'],
  'button-tertiary-color-fg_hover': colorsList['purple/10'],
  'button-tertiary-color-bg': colorsList['transparent'],
  'button-tertiary-color-bg_hover': colorsList['purple/2'],
  'button-tertiary-color-border': colorsList['transparent'],

  'button-primary-error-fg': colorsList['white'],
  'button-primary-error-fg_hover': colorsList['white'],
  'button-primary-error-bg': colorsList['red/8'],
  'button-primary-error-bg_hover': colorsList['red/9'],
  'button-primary-error-border': colorsList['red/8'],

  'button-secondary-error-fg': colorsList['red/9'],
  'button-secondary-error-fg_hover': colorsList['red/10'],
  'button-secondary-error-bg': colorsList['white'],
  'button-secondary-color-bg-dark': colorsList['gray/11'],
  'button-secondary-error-bg_hover': colorsList['red/2'],
  'button-secondary-error-border': colorsList['red/5'],

  'button-tertiary-error-fg': colorsList['red/9'],
  'button-tertiary-error-fg_hover': colorsList['red/10'],
  'button-tertiary-error-bg': colorsList['transparent'],
  'button-tertiary-error-bg_hover': colorsList['red/2'],
  'button-tertiary-error-border': colorsList['transparent'],

  'button-link-error-fg': colorsList['red/9'],
  'button-link-error-fg_hover': colorsList['red/10'],
  'button-link-error-bg': colorsList['transparent'],
  'button-link-error-bg_hover': colorsList['transparent'],
  'button-link-error-border': colorsList['transparent'],

  'fg-primary': colorsList['gray/11'],
  'fg-secondary': colorsList['gray/9'],
  'fg-secondary_hover': colorsList['gray/10'],
  'fg-tertiary': colorsList['gray/8'],
  'fg-tertiary_hover': colorsList['gray/9'],
  'fg-quaternary': colorsList['gray/7'],
  'fg-quaternary_hover': colorsList['gray/8'],
  'fg-quinary': colorsList['gray/6'],
  'fg-quinary_hover': colorsList['gray/7'],
  'fg-senary': colorsList['gray/5'],
  'fg-white': colorsList['white'],
  'fg-disabled': colorsList['gray/6'],
  'fg-disabled_subtle': colorsList['gray/5'],
  'fg-brand-primary': colorsList['purple/10'],
  'fg-brand-secondary': colorsList['purple/8'],
  'fg-brand-tertiary': colorsList['purple/12'],
  'fg-error-primary': colorsList['red/8'],
  'fg-error-secondary': colorsList['red/7'],
  'fg-warning-primary': colorsList['orange/8'],
  'fg-warning-secondary': colorsList['orange/7'],
  'fg-success-primary': colorsList['green/8'],
  'fg-success-secondary': colorsList['green/7'],

  'bg-primary': colorsList['white'],
  'bg-primary_hover': colorsList['gray/2'],
  'bg-primary-solid': colorsList['gray/12'],
  'bg-secondary': colorsList['gray/2'],
  'bg-secondary_hover': colorsList['gray/3'],
  'bg-secondary_subtle': colorsList['gray/1'],
  'bg-secondary-solid': colorsList['gray/8'],
  'bg-tertiary': colorsList['gray/3'],
  'bg-quaternary': colorsList['gray/4'],
  'bg-active': colorsList['gray/2'],
  'bg-disabled': colorsList['gray/3'],
  'bg-disabled_subtle': colorsList['gray/2'],
  'bg-overlay': colorsList['gray/12'],
  'bg-brand-primary': colorsList['purple/2'],
  'bg-brand-secondary': colorsList['purple/3'],
  'bg-brand-solid': colorsList['purple/8'],
  'bg-brand-solid_hover': colorsList['purple/9'],
  'bg-brand-section': colorsList['purple/10'],
  'bg-error-primary': colorsList['red/2'],
  'bg-error-secondary': colorsList['red/3'],
  'bg-error-solid': colorsList['red/8'],
  'bg-warning-primary': colorsList['orange/2'],
  'bg-warning-secondary': colorsList['orange/3'],
  'bg-warning-solid': colorsList['orange/8'],
  'bg-success-primary': colorsList['green/2'],
  'bg-success-secondary': colorsList['green/3'],
  'bg-success-solid': colorsList['green/8'],
  'utility-yellow-1': colorsList['yellow/1'],
  'utility-yellow-3': colorsList['yellow/3'],
  'utility-yellow-4': colorsList['yellow/4'],
  'utility-yellow-8': colorsList['yellow/8'],
  'utility-purple-2': colorsList['purple/2'],
  'utility-purple-3': colorsList['purple/3'],
  'utility-purple-5': colorsList['purple/5'],
  'utility-purple-8': colorsList['purple/8'],
  'utility-pink-2': colorsList['pink/2'],
  'utility-pink-4': colorsList['pink/4'],
  'utility-pink-5': colorsList['pink/5'],
  'utility-pink-6': colorsList['pink/6'],
  'utility-pink-7': colorsList['pink/7'],
  'utility-pink-8': colorsList['pink/8'],
  'utility-pink-9': colorsList['pink/9'],
  'bg-alpha-black-50': colorsList['black/alpha-50'],

  btnSecondaryGrayFg: colorsList['gray/9'],

  // New design colors

  'alpha-black-10': 'rgba(0, 0, 0, 0.1)',
  'alpha-black-10-dark': 'rgba(255, 255, 255, 0.1)',
  'alpha-white-20' : 'rgba(255, 255, 255, 0.2)',
  'alpha-white-30': 'rgba(255, 255, 255, 0.3)',
  'alpha-black-30': 'rgba(0, 0, 0, 0.3)',
}

const zIndex = {
  0: 0,
  1: 100,
  2: 200,
  3: 300,
  4: 400,
  5: 500,
}

const radius = {
  'radius-none': 0,
  'radius-xs': 4,
  'radius-sm': 8,
  'radius-md': 12,
  'radius-lg': 16,
  'radius-xl': 20,
  'radius-full': 100,
}

const animations = createAnimations({
  bouncy: {
    type: 'spring',
    damping: 10,
    mass: 0.9,
    stiffness: 100,
  },
  lazy: {
    type: 'spring',
    damping: 20,
    stiffness: 60,
  },
  quick: {
    type: 'spring',
    damping: 20,
    mass: 1.2,
    stiffness: 250,
  },
})

const regolaFont = createFont({
  // Vengui does not provide font size tokens, and instead of Text component,
  // exposes a Typography component, that should be used instead
  size: {},
  family: 'FTRegolaNeue',
  face: {
    '600': { normal: 'FTRegolaNeueSemibold' },
    '700': { normal: 'FTRegolaNeueBold' },
  },
})

const libreCaslonFont = createFont({
  // Vengui does not provide font size tokens, and instead of Text component,
  // exposes a Typography component, that should be used instead
  size: {},
  family: 'LibreCaslonDisplay',
})

const bagelFatFont = createFont({
  // Vengui does not provide font size tokens, and instead of Text component,
  // exposes a Typography component, that should be used instead
  size: {},
  family: 'BagelFatOne',
})

const silkscreenFont = createFont({
  // Vengui does not provide font size tokens, and instead of Text component,
  // exposes a Typography component, that should be used instead
  size: {},
  family: 'Silkscreen',
  face: {
    '700': { normal: 'SilkscreenBold' },
  },
})

const monteCarloFont = createFont({
  // Vengui does not provide font size tokens, and instead of Text component,
  // exposes a Typography component, that should be used instead
  size: {},
  family: 'MonteCarlo',
})

const tokens = createTokens({
  // Vengui does not provide size tokens, as they can't be used in generic way,
  // but tamagui requires size token variable to be defined
  size: {
    true: 0,
  },
  space,
  radius,
  zIndex,
  color: colors,
})

const shorthands = {
  ai: 'alignItems',
  bg: 'backgroundColor',
  br: 'borderRadius',
  f: 'flex',
  h: 'height',
  jc: 'justifyContent',
  m: 'margin',
  mb: 'marginBottom',
  mt: 'marginTop',
  ml: 'marginLeft',
  mr: 'marginRight',
  p: 'padding',
  pb: 'paddingBottom',
  pt: 'paddingTop',
  pl: 'paddingLeft',
  pr: 'paddingRight',
  w: 'width',
  lh: 'lineHeight',
  ta: 'textAlign',
} as const

const media = {
  xxs: { maxWidth: 320 },
  gtXxs: { minWidth: 320 + 1 },
  xs: { maxWidth: 660 },
  gtXs: { minWidth: 660 + 1 },
  sm: { maxWidth: 860 },
  gtSm: { minWidth: 860 + 1 },
  md: { maxWidth: 980 },
  gtMd: { minWidth: 980 + 1 },
  lg: { maxWidth: 1120 },
  gtLg: { minWidth: 1120 + 1 },

  xl: { minWidth: 1280 },
  gtXl: { minWidth: 1280 + 1 },
  '2xl': { minWidth: 1536 },
  gt2xl: { minWidth: 1536 + 1 },
  '3xl': { minWidth: 1792 },
  gt3xl: { minWidth: 1792 + 1 },
  '4xl': { minWidth: 2560 },
  gt4xl: { minWidth: 2560 + 1 },
  short: { maxHeight: 820 },
  tall: { minHeight: 820 },
  hoverNone: { hover: 'none' },
  pointerCoarse: { pointer: 'coarse' },
}

// reference : https://tamagui.dev/docs/intro/themes
const light = {
  'button-secondary-gray-bg': tokens.color['button-secondary-color-bg'],
  'button-secondary-gray-fg': tokens.color['button-secondary-gray-fg'],
  'button-secondary-gray-border': tokens.color['button-secondary-gray-border'],

  textPrimary: colors['text-primary'],
  textTertiary: colors['text-tertiary'],
  textSecondary: tokens.color['text-secondary'],
  bgCard: colors['white'],
  bgSection: '#FFFFFFCC',
  textPlaceholder: colorsList['gray/7'],
  borderSecondary: colors['border-secondary'],
  bgPrimary: colorsList['white'],
  borderAlpha10: colorsList['black/alpha-10'],
  textBrandPrimary: colorsList['purple/8'],
  alphaBlack10: colors['alpha-black-10'],
  alpha30: colors['alpha-white-30'],

  // Prefix structure: <componentName><Context> ?
  bgEventCard: 'rgba(255, 255, 255, 0.2)',
  eventTitle: colors['text-brand-primary'],
  pollTitle: colors['text-brand-primary'],
  PollVoteTitle: colors['text-brand-secondary'],
  bgOverlayDetail: colors.white,
  textBrandSecondary: colorsList['purple/9'],
  textReadFullDescription: tokens.color['text-brand-secondary'],
  moduleButtonForeground: tokens.color['button-secondary-color-fg'],
  moduleButtonBorder: tokens.color['button-secondary-color-border'],
}

type BaseTheme = typeof light
const dark: BaseTheme = {
  'button-secondary-gray-bg': tokens.color['button-secondary-gray-bg-dark'],
  'button-secondary-gray-fg': tokens.color['button-secondary-gray-fg-dark'],
  'button-secondary-gray-border': tokens.color['button-secondary-gray-border-dark'],

  textPrimary: colors.white,
  textSecondary: tokens.color['text-secondary-dark'],
  bgCard: colors['bg-alpha-black-50'],
  textTertiary: colorsList['white/alpha-8'],
  bgSection: 'rgba(57, 57, 57, 0.8)',
  textPlaceholder: 'rgba(255, 255, 255, 0.7)',
  borderSecondary: 'rgba(238, 238, 240, 1)',
  bgPrimary: colorsList['gray/12'],
  borderAlpha10: colorsList['white/alpha-10'],
  textBrandPrimary: colorsList['purple/4'],
  alphaBlack10: colors['alpha-black-10-dark'],
  alpha30: colors['alpha-black-30'],

  bgEventCard: 'rgba(0, 0, 0, 0.2)',
  eventTitle: colors['utility-pink-4'],
  pollTitle: colors['white'],
  PollVoteTitle: colors['white'],
  bgOverlayDetail: 'rgba(0, 0, 0, 0.2)',
  textBrandSecondary: colorsList['pink/6'],
  textReadFullDescription: tokens.color['white'],
  moduleButtonForeground: tokens.color['white'],
  moduleButtonBorder: tokens.color['button-secondary-gray-border-dark'],
}

export const config = createTamagui({
  animations,
  defaultFont: 'body',
  // fonts: {
  //   body: regolaFont,
  //   libreCaslon: libreCaslonFont,
  //   silkscreen: silkscreenFont,
  //   bagelFat: bagelFatFont,
  //   monteCarlo: monteCarloFont,
  // },
  shorthands,
  shouldAddPrefersColorThemes: true,
  themeClassNameOnRoot: true,
  tokens,
  media,
  themes: {
    light: colors,
    dark: dark,
  },
})

type Config = typeof config

declare module 'tamagui' {
  // eslint-disable-next-line @typescript-eslint/no-empty-interface, @typescript-eslint/no-empty-object-type
  interface TamaguiCustomConfig extends Config {}
}
