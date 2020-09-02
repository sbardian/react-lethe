import React from 'react'
import PropTypes from 'prop-types'
import { UPDATE_USERNAME, UPDATE_CURRENT_LIST_TITLE } from './actions'

export const StoreContext = React.createContext()

export const StoreProvider = ({ children }) => {
  const initialState = {
    username: '',
    currentListTitle: '',
  }

  const reducer = (state, action) => {
    switch (action.type) {
      case UPDATE_USERNAME:
        return {
          ...state,
          username: action.payload,
        }
      case UPDATE_CURRENT_LIST_TITLE:
        return {
          ...state,
          currentListTitle: action.payload,
        }
      default:
        return state
    }
  }

  const [state, dispatch] = React.useReducer(reducer, initialState)

  return (
    <StoreContext.Provider value={[state, dispatch]}>
      {children}
    </StoreContext.Provider>
  )
}

StoreProvider.propTypes = {
  children: PropTypes.node.isRequired,
}
