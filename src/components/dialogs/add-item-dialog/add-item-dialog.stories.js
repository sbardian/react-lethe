/* eslint-disable no-unused-vars */
import React from 'react'
import { action } from '@storybook/addon-actions'
import MockApolloProvider from '../../../utils/mock-apollo-client/mock-apollo-client'
import AddItemDialog from './add-item-dialog'
import { mockData } from './mocks'

export default {
  component: AddItemDialog,
  title: 'AddItemDialog',
  argTypes: {
    success: { text: 'Item', description: 'Use "Item" for successful test' },
    error: { text: 'Error', description: 'Use "Error" for error test' },
  },
  decorators: [
    (story) => (
      <MockApolloProvider mocks={mockData}>{story()}</MockApolloProvider>
    ),
  ],
  excludeStories: /.*Data$/,
}

const addItemDialogData = {
  listId: '1',
  setShowDialog: action('setShowDialog'),
  show: action('show alert'),
}

const errorAddItemDialogData = {
  listId: '2',
  setShowDialog: action('setShowDialog'),
  show: action('show alert'),
}

export const Default = (args) => (
  <AddItemDialog {...addItemDialogData} {...args} />
)

Default.args = {
  success: 'Item',
}

export const ErrorAddItemDialog = (args) => (
  <AddItemDialog {...errorAddItemDialogData} {...args} />
)

ErrorAddItemDialog.args = {
  error: 'Error',
}
