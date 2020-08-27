/* eslint-disable no-unused-vars */
/** @jsx jsx */
import React from 'react'
import { jsx } from 'theme-ui'
import ListSettingsButton from './list-settings-button'

export default {
  component: ListSettingsButton,
  title: 'ListSettingsButton',
  argTypes: {
    hoverColor: { control: 'text' },
    listId: { control: 'text' },
  },
  excludeStories: /.*Data$/,
}

export const Default = (args) => (
  <div
    sx={{
      backgroundColor: 'background',
      color: 'textSecondary',
      width: '30px',
      justifySelf: 'center',
    }}
  >
    <ListSettingsButton {...args} />
  </div>
)

Default.args = {
  hoverColor: 'colorThree',
  listId: '1',
}
