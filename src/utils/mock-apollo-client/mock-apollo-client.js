import React from 'react'
import PropTypes from 'prop-types'
import { MockedProvider } from '@apollo/client/testing'

const MockApolloProvider = ({ children, mocks }) => {
  return (
    <MockedProvider mocks={mocks} addTypename={false}>
      {children}
    </MockedProvider>
  )
}

MockApolloProvider.defaultProps = {
  mocks: [],
}

MockApolloProvider.propTypes = {
  children: PropTypes.node.isRequired,
  mocks: PropTypes.arrayOf(PropTypes.any),
}

export default MockApolloProvider
