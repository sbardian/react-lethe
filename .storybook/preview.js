import React from 'react'
import { ThemeProvider } from 'theme-ui'
import { AlertProvider } from 'react-alerts-plus'
import { MenuProvider } from '../src/components/contexts/menu-context/menu-context'
import theme from '../src/theme'

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
}

export const decorators = [
  (Story) => (
    <ThemeProvider theme={theme}>
      <MenuProvider>
        <AlertProvider>
          <Story />
        </AlertProvider>
      </MenuProvider>
    </ThemeProvider>
  ),
]
