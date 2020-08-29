import React from 'react'
import { action } from '@storybook/addon-actions'
import MockApolloProvider from '../../../utils/mock-apollo-client/mock-apollo-client'
import UpdateListTitleButton from './update-list-title-button'
import mockData from './mocks'

export default {
  component: UpdateListTitleButton,
  title: 'UpdateListTitleButton',
  argTypes: {},
  decorators: [
    (story) => (
      <MockApolloProvider mocks={mockData}>{story()}</MockApolloProvider>
    ),
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
