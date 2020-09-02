import React from 'react'
import PropTypes from 'prop-types'
import { UPDATE_USERNAME } from './actions'

export const StoreContext = React.createContext()

export const StoreProvider = ({ children }) => {
  const initialState = {
    username: '',
  }

  const reducer = (state, action) => {
    switch (action.type) {
      case UPDATE_USERNAME:
        return {
          ...state,
          username: action.payload,
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
