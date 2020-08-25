import React from 'react'
import { render, fireEvent } from '../../../utils/test/custom-renderer'
import MenuButton from './menu-button'

const data = {
  listId: '1',
  hoverColor: 'tomato',
}

describe('ListSettingsButton tests', () => {
  it('Should render the list settings button', () => {
    const { queryByTestId } = render(<MenuButton {...data} />)
    const hideMenuButton = queryByTestId('hide-menu-button')
    expect(hideMenuButton).toBeTruthy()
    fireEvent.click(hideMenuButton)
    const showMenuButton = queryByTestId('show-menu-button')
    expect(showMenuButton).toBeTruthy()
  })
})
