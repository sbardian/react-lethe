/** @jsx jsx */
import { jsx } from 'theme-ui'
import { ThemeProvider } from 'theme-ui'
import { BrowserRouter as Router } from 'react-router-dom'
import { AlertProvider } from 'react-alerts-plus'
import { MenuProvider } from '../src/components/contexts/menu-context/menu-context'
import ColorModeToggleButton from '../src/components/buttons/color-mode-toggle-button/color-mode-toggle-button'
import theme from '../src/theme'

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
}

export const decorators = [
  (Story) => (
    <ThemeProvider theme={theme}>
      <MenuProvider>
        <AlertProvider>
          <Router>
            <div
              sx={{
                display: 'grid',
                justifyContent: 'center',
                borderBottom: ({ colors }) => `2px solid ${colors.colorThree}`,
                paddingBottom: 5,
                marginBottom: 5,
              }}
            >
              <ColorModeToggleButton />
              <span sx={{ color: 'textSecondary' }}>Toggle color mode</span>
            </div>
            <Story />
          </Router>
        </AlertProvider>
      </MenuProvider>
    </ThemeProvider>
  ),
]
