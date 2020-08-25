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

const buttonData = {
  hoverColor: 'colorThree',
  listId: '1',
}

export const Default = () => <ListSettingsButton {...buttonData} />
