import { Text, styled } from 'tamagui'

const typographyVariants = {
  '$heading-48': {
    fontSize: 48,
    lineHeight: 58,
    fontWeight: '700',
  },
  '$heading-36': {
    fontSize: 36,
    lineHeight: 40,
    fontWeight: '700',
  },
  '$heading-32': {
    fontSize: 32,
    lineHeight: 40,
    fontWeight: '700',
  },
  '$heading-24': {
    fontSize: 24,
    lineHeight: 32,
    fontWeight: '700',
  },
  '$heading-20': {
    fontSize: 20,
    lineHeight: 24,
    fontWeight: '700',
  },
  '$heading-16': {
    fontSize: 16,
    lineHeight: 20,
    fontWeight: '700',
  },
  '$heading-14': {
    fontSize: 14,
    lineHeight: 18,
    fontWeight: '700',
  },
  '$body-18': {
    fontSize: 18,
    lineHeight: 24,
    fontWeight: '400',
  },
  '$body-16': {
    fontSize: 16,
    lineHeight: 20,
    fontWeight: '400',
  },
  '$body-14': {
    fontSize: 14,
    lineHeight: 18,
    fontWeight: '400',
  },
  '$body-12': {
    fontSize: 12,
    lineHeight: 16,
    fontWeight: '400',
  },
  '$label-18': {
    fontSize: 18,
    lineHeight: 24,
    fontWeight: '600',
  },
  '$label-16': {
    fontSize: 16,
    lineHeight: 20,
    fontWeight: '600',
  },
  '$label-14': {
    fontSize: 14,
    lineHeight: 18,
    fontWeight: '600',
  },
  '$label-12': {
    fontSize: 12,
    lineHeight: 14,
    fontWeight: '600',
  },
  '$label-10': {
    fontSize: 10,
    lineHeight: 14,
    fontWeight: '400',
  },
} as const

export const Typography = styled(Text, {
  color: '$accent1',
  variants: {
    variant: typographyVariants,
  },
})

export const getTypographyVariantStyles = (variant: keyof typeof typographyVariants) => ({
  fontFamily: '$body' as const,
  ...typographyVariants[variant],
})
