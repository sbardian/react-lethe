import React from 'react'
import { action } from '@storybook/addon-actions'
import MockApolloProvider from '../../../utils/mock-apollo-client/mock-apollo-client'
import UpdateListTitleButton from './update-list-title-button'
import { GET_MY_LISTS, UPDATE_LIST } from './update-list-title-button'

const mocks = [
  {
    request: {
      query: GET_MY_LISTS,
      variables: {
        id_is: '1',
      },
    },
    result: {
      data: {
        updateList: { id: '1', title: 'New Title', __typename: 'List' },
      },
    },
  },
  {
    request: {
      query: UPDATE_LIST,
      variables: { listId: '1', title: 'New Title' },
    },
    result: {
      data: {
        updateList: { id: '1', title: 'New Title', __typename: 'List' },
      },
    },
  },
]

export default {
  component: UpdateListTitleButton,
  title: 'UpdateListTitleButton',
  argTypes: {},
  decorators: [
    (story) => <MockApolloProvider mocks={mocks}>{story()}</MockApolloProvider>,
  ],
  excludeStories: /.*Data$/,
}

const buttonData = {
  listId: '1',
  newTitle: 'New Title',
  titleNotUpdated: true,
}

const actionData = {
  setTitleNotUpdated: action('update title'),
  show: action('show alert'),
}

export const Default = () => <UpdateListTitleButton {...buttonData} />

export const ActiveButton = () => (
  <UpdateListTitleButton
    {...{ ...buttonData, titleNotUpdated: false }}
    {...actionData}
  />
)
