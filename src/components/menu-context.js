import React from 'react'
import PropTypes from 'prop-types'

export const MenuContext = React.createContext()

export const MenuProvider = ({ children }) => {
  const [isSideBarOpen, setIsSideBarOpen] = React.useState(true)
  const [showListItemTabs, setShowListItemTabs] = React.useState(false)

  return (
    <MenuContext.Provider
      value={{
        isSideBarOpen,
        setIsSideBarOpen,
        showListItemTabs,
        setShowListItemTabs,
      }}
    >
      {children}
    </MenuContext.Provider>
  )
}

MenuProvider.propTypes = {
  children: PropTypes.node,
}
