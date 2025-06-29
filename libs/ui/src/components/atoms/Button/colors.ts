/* eslint-disable no-useless-computed-key */

export const colors = {
  primary: {
    default: {
      base: {
        backgroundColor: '$button-primary-bg',
        borderColor: '$button-primary-border',
        foregroundColor: '$button-primary-fg',
      },

      hover: {
        backgroundColor: '$button-primary-bg_hover',
      },
    },

    destructive: {
      base: {
        backgroundColor: '$button-primary-error-bg',
        borderColor: '$button-primary-error-border',
        foregroundColor: '$button-primary-error-fg',
      },

      hover: {
        backgroundColor: '$button-primary-error-bg_hover',
      },
    },

    disabled: {
      base: {
        backgroundColor: '$bg-disabled',
        borderColor: '$border-disabled_subtle',
        foregroundColor: '$fg-disabled',
      },

      hover: null,
    },
  },
  ['secondary-gray']: {
    default: {
      base: {
        backgroundColor: '$button-secondary-gray-bg',
        borderColor: '$button-secondary-gray-border',
        foregroundColor: '$button-secondary-gray-fg',
      },

      hover: {
        backgroundColor: '$button-secondary-gray-bg_hover',
      },
    },

    destructive: {
      base: {
        backgroundColor: '$button-secondary-gray-bg',
        borderColor: '$button-secondary-gray-border',
        foregroundColor: '$button-secondary-gray-fg',
      },

      hover: {
        backgroundColor: '$button-secondary-gray-bg_hover',
      },
    },

    disabled: {
      base: {
        backgroundColor: '$bg-primary',
        borderColor: '$border-disabled_subtle',
        foregroundColor: '$fg-disabled',
      },

      hover: null,
    },
  },
  ['secondary-color']: {
    default: {
      base: {
        backgroundColor: '$button-secondary-color-bg',
        borderColor: '$button-secondary-color-border',
        foregroundColor: '$button-secondary-color-fg',
      },

      hover: {
        backgroundColor: '$button-secondary-color-bg_hover',
      },
    },

    destructive: {
      base: {
        backgroundColor: '$button-secondary-error-bg',
        borderColor: '$button-secondary-error-border',
        foregroundColor: '$button-secondary-error-fg',
      },

      hover: {
        backgroundColor: '$button-secondary-error-bg_hover',
      },
    },

    disabled: {
      base: {
        backgroundColor: '$bg-primary',
        borderColor: '$border-disabled_subtle',
        foregroundColor: '$fg-disabled',
      },

      hover: null,
    },
  },
  ['tertiary-gray']: {
    default: {
      base: {
        backgroundColor: '$button-tertiary-gray-bg',
        borderColor: '$button-tertiary-gray-border',
        foregroundColor: '$button-tertiary-gray-fg',
      },

      hover: {
        backgroundColor: '$button-tertiary-gray-bg_hover',
      },
    },

    destructive: {
      base: {
        backgroundColor: '$button-tertiary-gray-bg',
        borderColor: '$button-tertiary-gray-border',
        foregroundColor: '$button-tertiary-gray-fg',
      },

      hover: {
        backgroundColor: '$button-tertiary-gray-bg_hover',
      },
    },

    disabled: {
      base: {
        backgroundColor: 'transparent',
        borderColor: 'transparent',
        foregroundColor: '$fg-disabled',
      },

      hover: null,
    },
  },
  ['tertiary-color']: {
    default: {
      base: {
        backgroundColor: '$button-tertiary-color-bg',
        borderColor: '$button-tertiary-color-border',
        foregroundColor: '$button-tertiary-color-fg',
      },

      hover: {
        backgroundColor: '$button-tertiary-color-bg_hover',
      },
    },

    destructive: {
      base: {
        backgroundColor: '$button-tertiary-error-bg',
        borderColor: '$button-tertiary-error-border',
        foregroundColor: '$button-tertiary-error-fg',
      },

      hover: {
        backgroundColor: '$button-tertiary-error-bg_hover',
      },
    },

    disabled: {
      base: {
        backgroundColor: 'transparent',
        borderColor: 'transparent',
        foregroundColor: '$fg-disabled',
      },

      hover: null,
    },
  },
  ['link-gray']: {
    default: {
      base: {
        backgroundColor: '$button-tertiary-gray-bg',
        borderColor: '$button-tertiary-gray-border',
        foregroundColor: '$button-tertiary-gray-fg',
      },

      hover: null,
    },

    destructive: {
      base: {
        backgroundColor: '$button-tertiary-gray-bg',
        borderColor: '$button-tertiary-gray-border',
        foregroundColor: '$button-tertiary-gray-fg',
      },

      hover: null,
    },

    disabled: {
      base: {
        backgroundColor: 'transparent',
        borderColor: 'transparent',
        foregroundColor: '$fg-disabled',
      },

      hover: null,
    },
  },
  ['link-color']: {
    default: {
      base: {
        backgroundColor: '$button-tertiary-color-bg',
        borderColor: '$button-tertiary-color-border',
        foregroundColor: '$button-tertiary-color-fg',
      },

      hover: null,
    },

    destructive: {
      base: {
        backgroundColor: '$button-link-error-bg',
        borderColor: '$button-link-error-border',
        foregroundColor: '$button-link-error-fg',
      },

      hover: {
        backgroundColor: '$button-link-error-bg_hover',
        foregroundColor: '$button-link-error-fg_hover',
      },
    },

    disabled: {
      base: {
        backgroundColor: 'transparent',
        borderColor: 'transparent',
        foregroundColor: '$fg-disabled',
      },

      hover: null,
    },
  },
} as const
