import React from 'react'
import { render, fireEvent } from '../../../utils/test/custom-renderer'
import DeleteListButton from './delete-list-button'

const onDeleteList = jest.fn()

const data = {
  listId: '1',
  onDeleteList,
}

describe('ListSettingsButton tests', () => {
  it('Should render the list settings button', () => {
    const { queryByTestId } = render(<DeleteListButton {...data} />)
    const deleteListButton = queryByTestId('delete-list-button')
    expect(deleteListButton).toBeTruthy()
    fireEvent.click(deleteListButton)
    expect(onDeleteList).toHaveBeenCalledWith(data.listId)
  })
})
