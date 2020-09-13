import React from 'react'
import PropTypes from 'prop-types'
import { render } from '@testing-library/react'
import { BrowserRouter as Router } from 'react-router-dom'
import { ThemeProvider } from 'theme-ui'
import { ToastContainer } from 'react-toastify'
import { MenuProvider } from '../../components/contexts/menu-context/menu-context'
import theme from '../../theme'

const AllTheProviders = ({ children }) => {
  return (
    <ThemeProvider theme={theme}>
      <MenuProvider>
        <Router>
          {children}
          <ToastContainer />
        </Router>
      </MenuProvider>
    </ThemeProvider>
  )
}

AllTheProviders.propTypes = {
  children: PropTypes.node.isRequired,
}

const customRender = (ui, options) =>
  render(ui, { wrapper: AllTheProviders, ...options })

// re-export everything
export * from '@testing-library/react'

// override render method
export { customRender as render }
