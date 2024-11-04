/* eslint-disable */

const plugin = require('tailwindcss/plugin');
const {
  default: flattenColorPalette,
} = require('tailwindcss/lib/util/flattenColorPalette');

/** @type {import('tailwindcss').Config} */
module.exports = {
  important: '#app',
  content: ['./src/**/*.{html,ts}'],
  theme: {
    extend: {
      fontFamily: {
        mont: ['Mont', 'sans-serif'],
        'open-sans': ['Open Sans', 'sans-serif'],
      },
      rotate: {
        30: '30deg',
      },
    },
  },
  plugins: [
    plugin(function ({ matchUtilities, theme }) {
      matchUtilities(
        {
          'ion-text': (value) => ({
            '--color': value,
          }),
          'ion-text-activated': (value) => ({
            '--color-activated': value,
          }),
          'ion-text-active': (value) => ({
            '--color-active': value,
          }),
          'ion-text-checked': (value) => ({
            '--color-checked': value,
          }),
          'ion-text-focused': (value) => ({
            '--color-focused': value,
          }),
          'ion-text-hover': (value) => ({
            '--color-hover': value,
          }),
          'ion-text-selected': (value) => ({
            '--color-selected': value,
          }),
          'ion-border-color': (value) => ({
            '--border-color': value,
          }),
          'ion-border-color-checked': (value) => ({
            '--border-color-checked': value,
          }),
          'ion-ripple-color': (value) => ({
            '--ripple-color': value,
          }),
          'ion-track-bg': (value) => ({
            '--track-background': value,
          }),
          'ion-track-bg-checked': (value) => ({
            '--track-background-checked': value,
          }),

          'ion-bg': (value) => ({
            '--background': value,
          }),
          'ion-bg-activated': (value) => ({
            '--background-activated': value,
          }),
          'ion-bg-checked': (value) => ({
            '--background-checked': value,
          }),
          'ion-bg-focused': (value) => ({
            '--background-focused': value,
          }),
          'ion-bg-hover': (value) => ({
            '--background-hover': value,
          }),
          'ion-bar-bg': (value) => ({
            '--bar-background': value,
          }),
          'ion-bar-bg-active': (value) => ({
            '--bar-background-active': value,
          }),
          'ion-button-bg': (value) => ({
            '--button-background': value,
          }),
          'ion-button-bg-activated': (value) => ({
            '--button-background-activated': value,
          }),
          'ion-button-bg-focused': (value) => ({
            '--button-background-focused': value,
          }),
          'ion-button-bg-hover': (value) => ({
            '--button-background-hover': value,
          }),
          'ion-button-bg-selected': (value) => ({
            '--button-background-selected': value,
          }),
          'ion-checkbox-bg': (value) => ({
            '--checkbox-background': value,
          }),
          'ion-checkbox-bg-checked': (value) => ({
            '--checkbox-background-checked': value,
          }),
          'ion-handle-bg': (value) => ({
            '--handle-background': value,
          }),
          'ion-handle-bg-checked': (value) => ({
            '--handle-background-checked': value,
          }),
          'ion-highlight-bg': (value) => ({
            '--highlight-background': value,
          }),
          'ion-knob-bg': (value) => ({
            '--knob-background': value,
          }),
          'ion-pin-bg': (value) => ({
            '--pin-background': value,
          }),
          'ion-progress-bg': (value) => ({
            '--progress-background': value,
          }),
          'ion-wheel-highlight-bg': (value) => ({
            '--wheel-highlight-background': value,
          }),

          'ion-button-color': (value) => ({
            '--button-color': value,
          }),
          'ion-button-color-activated': (value) => ({
            '--button-color-activated': value,
          }),
          'ion-button-color-disabled': (value) => ({
            '--button-color-disabled': value,
          }),
          'ion-button-color-focused': (value) => ({
            '--button-color-focused': value,
          }),
          'ion-button-color-hover': (value) => ({
            '--button-color-hover': value,
          }),
          'ion-button-color-selected': (value) => ({
            '--button-color-selected': value,
          }),
          'ion-cancel-button-color': (value) => ({
            '--cancel-button-color': value,
          }),
          'ion-checkmark-color': (value) => ({
            '--checkmark-color': value,
          }),
          'ion-clear-button-color': (value) => ({
            '--clear-button-color': value,
          }),
          'ion-title-color': (value) => ({
            '--title-color': value,
          }),
          'ion-spinner-color': (value) => ({
            '--spinner-color': value,
          }),
          'ion-placeholder-color': (value) => ({
            '--placeholder-color': value,
          }),
          'ion-pin-color': (value) => ({
            '--pin-color': value,
          }),
          'ion-detail-icon-color': (value) => ({
            '--detail-icon-color': value,
          }),
          'ion-highlight-color-focused': (value) => ({
            '--highlight-color-focused': value,
          }),
          'ion-highlight-color-invalid': (value) => ({
            '--highlight-color-invalid': value,
          }),
          'ion-highlight-color-valid': (value) => ({
            '--highlight-color-valid': value,
          }),
          'ion-icon-color': (value) => ({
            '--icon-color': value,
          }),
          'ion-indicator-color': (value) => ({
            '--indicator-color': value,
          }),
        },
        { values: flattenColorPalette(theme('colors')) }
      );
    }),
    plugin(function ({ matchUtilities, theme }) {
      matchUtilities(
        {
          'ion-rounded': (value) => ({
            '--border-radius': value,
          }),
          'ion-inner-rounded': (value) => ({
            '--inner-border-radius': value,
          }),
          'ion-bar-rounded': (value) => ({
            '--bar-border-radius': value,
          }),
          'ion-handle-rounded': (value) => ({
            '--handle-border-radius': value,
          }),
          'ion-highlight-rounded': (value) => ({
            '--highlight-border-radius': value,
          }),
          'ion-knob-rounded': (value) => ({
            '--knob-border-radius': value,
          }),
          'ion-wheel-highlight-rounded': (value) => ({
            '--wheel-highlight-border-radius': value,
          }),
        },
        { values: theme('borderRadius') }
      );
    }),
    plugin(function ({ matchUtilities, theme }) {
      matchUtilities(
        {
          'ion-border-width': (value) => ({
            '--border-width': value,
          }),
        },
        { values: flattenColorPalette(theme('borderWidth')) }
      );
    }),
    plugin(function ({ matchUtilities }) {
      matchUtilities(
        {
          'ion-border-style': (value) => ({
            '--border-style': value,
          }),
        },
        {
          values: {
            solid: 'solid',
            dashed: 'dashed',
            dotted: 'dotted',
            double: 'double',
            hidden: 'hidden',
            none: 'none',
          },
        }
      );
    }),

    plugin(function ({ matchUtilities, theme }) {
      matchUtilities(
        {
          'ion-shadow': (value) => ({
            '--box-shadow': value,
          }),
          'ion-inner-shadow': (value) => ({
            '--inner-box-shadow': value,
          }),
          'ion-knob-shadow': (value) => ({
            '--knob-box-shadow': value,
          }),
          'ion-indicator-shadow': (value) => ({
            '--indicator-box-shadow': value,
          }),
          'ion-handle-shadow': (value) => ({
            '--handle-box-shadow': value,
          }),
        },
        { values: theme('boxShadow') }
      );
    }),
    plugin(function ({ matchUtilities, theme }) {
      matchUtilities(
        {
          'ion-icon-font': (value) => ({
            '--icon-font-weight': value,
          }),
          'ion-placeholder-font': (value) => ({
            '--placeholder-font-weight': value,
          }),
        },
        { values: theme('fontWeight') }
      );
    }),
    plugin(function ({ matchUtilities }) {
      matchUtilities(
        {
          'ion-close-icon-text': (value) => ({
            '--close-icon-font-size': value,
          }),
          'ion-detail-icon-text': (value) => ({
            '--detail-icon-font-size': value,
          }),
          'ion-icon-text': (value) => ({
            '--icon-font-size': value,
          }),
        },
        {
          values: {
            xs: '0.75rem',
            sm: '0.875rem',
            base: '1rem',
            lg: '1.125rem',
            xl: '1.25rem',
            '2xl': '1.5rem',
            '3xl': '1.875rem',
            '4xl': '2.25rem',
            '5xl': '3rem',
            '6xl': '3.75rem',
            '7xl': '4.5rem',
            '8xl': '6rem',
            '9xl': '8rem',
          },
        }
      );
    }),
    plugin(function ({ matchUtilities, theme }) {
      matchUtilities(
        {
          'ion-backdrop-opacity': (value) => ({
            '--backdrop-opacity': value,
          }),
          'ion-bg-activated-opacity': (value) => ({
            '--background-activated-opacity': value,
          }),
          'ion-bg-focused-opacity': (value) => ({
            '--background-focused-opacity': value,
          }),
          'ion-bg-hover-opacity': (value) => ({
            '--background-hover-opacity': value,
          }),
          'ion-button-bg-activated-opacity': (value) => ({
            '--button-background-activated-opacity': value,
          }),
          'ion-button-bg-focused-opacity': (value) => ({
            '--button-background-focused-opacity': value,
          }),
          'ion-button-bg-hover-opacity': (value) => ({
            '--button-background-hover-opacity': value,
          }),
          'ion-button-bg-selected-opacity': (value) => ({
            '--button-background-selected-opacity': value,
          }),
          'ion-detail-icon-opacity': (value) => ({
            '--detail-icon-opacity': value,
          }),
          'ion-opacity': (value) => ({
            '--opacity': value,
          }),
          'ion-placeholder-opacity': (value) => ({
            '--placeholder-opacity': value,
          }),
        },
        { values: theme('opacity') }
      );
    }),
    plugin(function ({ matchUtilities, theme }) {
      matchUtilities(
        {
          'ion-pt': (value) => ({
            '--padding-top': value,
          }),
          'ion-pb': (value) => ({
            '--padding-bottom': value,
          }),
          'ion-pl': (value) => ({
            '--padding-start': value,
          }),
          'ion-pr': (value) => ({
            '--padding-end': value,
          }),
          'ion-px': (value) => ({
            '--padding-start': value,
            '--padding-end': value,
          }),
          'ion-py': (value) => ({
            '--padding-top': value,
            '--padding-bottom': value,
          }),
          'ion-p': (value) => ({
            '--padding-top': value,
            '--padding-bottom': value,
            '--padding-start': value,
            '--padding-end': value,
          }),
          'ion-icon-pt': (value) => ({
            '--icon-padding-top': value,
          }),
          'ion-icon-pb': (value) => ({
            '--icon-padding-bottom': value,
          }),
          'ion-icon-pl': (value) => ({
            '--icon-padding-start': value,
          }),
          'ion-icon-pr': (value) => ({
            '--icon-padding-end': value,
          }),
          'ion-icon-px': (value) => ({
            '--icon-padding-start': value,
            '--icon-padding-end': value,
          }),
          'ion-icon-py': (value) => ({
            '--icon-padding-top': value,
            '--icon-padding-bottom': value,
          }),
          'ion-icon-p': (value) => ({
            '--icon-padding-top': value,
            '--icon-padding-bottom': value,
            '--icon-padding-start': value,
            '--icon-padding-end': value,
          }),
          'ion-inner-pt': (value) => ({
            '--inner-padding-top': value,
          }),
          'ion-inner-pb': (value) => ({
            '--inner-padding-bottom': value,
          }),
          'ion-inner-pl': (value) => ({
            '--inner-padding-start': value,
          }),
          'ion-inner-pr': (value) => ({
            '--inner-padding-end': value,
          }),
          'ion-inner-px': (value) => ({
            '--inner-padding-start': value,
            '--inner-padding-end': value,
          }),
          'ion-inner-py': (value) => ({
            '--inner-padding-top': value,
            '--inner-padding-bottom': value,
          }),
          'ion-inner-p': (value) => ({
            '--inner-padding-top': value,
            '--inner-padding-bottom': value,
            '--inner-padding-start': value,
            '--inner-padding-end': value,
          }),

          'ion-mt': (value) => ({
            '--margin-top': value,
          }),
          'ion-mb': (value) => ({
            '--margin-bottom': value,
          }),
          'ion-ml': (value) => ({
            '--margin-start': value,
          }),
          'ion-mr': (value) => ({
            '--margin-end': value,
          }),
          'ion-mx': (value) => ({
            '--margin-start': value,
            '--margin-end': value,
          }),
          'ion-my': (value) => ({
            '--margin-top': value,
            '--margin-bottom': value,
          }),
          'ion-m': (value) => ({
            '--margin-top': value,
            '--margin-bottom': value,
            '--margin-start': value,
            '--margin-end': value,
          }),

          'ion-icon-mt': (value) => ({
            '--icon-margin-top': value,
          }),
          'ion-icon-mb': (value) => ({
            '--icon-margin-bottom': value,
          }),
          'ion-icon-ml': (value) => ({
            '--icon-margin-start': value,
          }),
          'ion-icon-mr': (value) => ({
            '--icon-margin-end': value,
          }),
          'ion-icon-mx': (value) => ({
            '--icon-margin-start': value,
            '--icon-margin-end': value,
          }),
          'ion-icon-my': (value) => ({
            '--icon-margin-top': value,
            '--icon-margin-bottom': value,
          }),
          'ion-icon-m': (value) => ({
            '--icon-margin-top': value,
            '--icon-margin-bottom': value,
            '--icon-margin-start': value,
            '--icon-margin-end': value,
          }),

          'ion-w': (value) => ({
            '--width': value,
          }),
          'ion-handle-w': (value) => ({
            '--handle-width': value,
          }),
          'ion-checkmark-w': (value) => ({
            '--checkmark-width': value,
          }),
          'ion-max-w': (value) => ({
            '--max-width': value,
          }),
          'ion-min-w': (value) => ({
            '--min-width': value,
          }),
          'ion-side-max-w': (value) => ({
            '--side-max-width': value,
          }),
          'ion-side-min-w': (value) => ({
            '--side-min-width': value,
          }),
          'ion-side-w': (value) => ({
            '--side-width': value,
          }),

          'ion-h': (value) => ({
            '--height': value,
          }),
          'ion-bar-h': (value) => ({
            '--bar-height': value,
          }),
          'ion-handle-h': (value) => ({
            '--handle-height': value,
          }),
          'ion-handle-max-h': (value) => ({
            '--handle-max-height': value,
          }),
          'ion-max-h': (value) => ({
            '--max-height': value,
          }),
          'ion-min-h': (value) => ({
            '--min-height': value,
          }),
          'ion-indicator-h': (value) => ({
            '--indicator-height': value,
          }),
          'ion-highlight-h': (value) => ({
            '--highlight-height': value,
          }),
        },
        { values: theme('spacing') }
      );
    }),
  ],
};
