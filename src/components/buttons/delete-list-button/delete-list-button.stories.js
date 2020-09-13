/* eslint-disable no-unused-vars */
/** @jsx jsx */
import React from 'react'
import { jsx } from 'theme-ui'
import { action } from '@storybook/addon-actions'
import DeleteListButton from './delete-list-button'

export default {
  component: DeleteListButton,
  title: 'DeleteListButton',
  argTypes: {
    onDeleteList: { action: 'onDeleteList' },
    listId: { control: 'text' },
  },
  excludeStories: /.*Data$/,
}

const deleteListActionData = {
  onDeleteList: action('onDeleteList'),
}

export const Default = (args) => (
  <div
    sx={{
      color: 'textSecondary',
      width: '30px',
      justifySelf: 'center',
    }}
  >
    <DeleteListButton {...deleteListActionData} {...args} />
  </div>
)

Default.args = {
  listId: '1',
}
