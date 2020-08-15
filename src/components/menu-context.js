import React from 'react'
import PropTypes from 'prop-types'

export const MenuContext = React.createContext()

export const MenuProvider = ({ children }) => {
  const [isOpen, setIsOpen] = React.useState(true)

  return (
    <MenuContext.Provider value={{ isOpen, setIsOpen }}>
      {children}
    </MenuContext.Provider>
  )
}

MenuProvider.propTypes = {
  children: PropTypes.node,
}
