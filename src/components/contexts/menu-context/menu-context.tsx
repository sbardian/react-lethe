import * as React from 'react'
import PropTypes from 'prop-types'

interface MenuContextInterface {
  isSideBarOpen: boolean
  setIsSideBarOpen: React.Dispatch<boolean>
  showListItemTabs: boolean
  setShowListItemTabs: React.Dispatch<boolean>
  activeItemTab: boolean
  setActiveItemTab: React.Dispatch<boolean>
}

export const MenuContext = React.createContext<MenuContextInterface | null>(
  null,
)

interface MenuProviderProps {
  children: React.ReactNode
}

export const MenuProvider: React.FC<MenuProviderProps> = ({ children }) => {
  const [isSideBarOpen, setIsSideBarOpen] = React.useState(true)
  const [showListItemTabs, setShowListItemTabs] = React.useState(false)

  // activeItemTab: false = active / true = complete
  const [activeItemTab, setActiveItemTab] = React.useState(false)

  const menuContext: MenuContextInterface = {
    isSideBarOpen,
    setIsSideBarOpen,
    showListItemTabs,
    setShowListItemTabs,
    activeItemTab,
    setActiveItemTab,
  }

  return (
    <MenuContext.Provider value={menuContext}>{children}</MenuContext.Provider>
  )
}

MenuProvider.propTypes = {
  children: PropTypes.node.isRequired,
}
