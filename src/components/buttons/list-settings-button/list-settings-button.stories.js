import React from 'react'
import ListSettingsButton from './list-settings-button'
import theme from '../../../theme/colors'

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
  hoverColor: theme.colorThree,
  listId: '1',
}
