import React from 'react'
import { MockedProvider } from '@apollo/client/testing'

const MockApolloProvider = ({ children, mocks }) => {
  return (
    <MockedProvider mocks={mocks} addTypename={false}>
      {children}
    </MockedProvider>
  )
}

export default MockApolloProvider
