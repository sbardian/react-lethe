import React from 'react'
import { render } from '../../../utils/test/custom-renderer'
import ListSettingsButton from './list-settings-button'

const data = {
  listId: '1',
  hoverColor: 'tomato',
}

describe('ListSettingsButton tests', () => {
  it('Should render the list settings button', () => {
    const { queryByTestId } = render(<ListSettingsButton {...data} />)
    expect(queryByTestId('list-settings-button')).toBeTruthy()
  })
})
