/* eslint-disable no-unused-vars */
import React from 'react'
import { action } from '@storybook/addon-actions'
import Lists from './lists'

export default {
  component: Lists,
  title: 'Lists',
  argTypes: {},
  excludeStories: /.*Data$/,
}

const listsData = {
  lists: [
    {
      __typename: 'List',
      id: '1',
      owner: '1000',
      title: 'List One',
    },
  ],
  onDeleteList: action('delete list'),
}

export const Default = (args) => <Lists {...listsData} {...args} />

Default.args = {}
