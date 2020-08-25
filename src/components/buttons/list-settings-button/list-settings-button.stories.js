import React from 'react'
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

export const Default = (args) => <ListSettingsButton {...args} />

Default.args = {
  hoverColor: 'colorThree',
  listId: '1',
}
