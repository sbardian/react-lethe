/* eslint-disable no-unused-vars */
/** @jsx jsx */
import React from 'react'
import { jsx } from 'theme-ui'
import MenuButton from './menu-button'

export default {
  component: MenuButton,
  title: 'MenuButton',
  argTypes: {},
  excludeStories: /.*Data$/,
}

export const Default = () => <MenuButton />
