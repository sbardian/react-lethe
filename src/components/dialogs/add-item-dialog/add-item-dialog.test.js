import React from 'react'
import { render, fireEvent, waitFor } from '../../../utils/test/custom-renderer'
import AddListItemDialog from './add-item-dialog'
import MockApolloProvider from '../../../utils/mock-apollo-client/mock-apollo-client'
import mockData from './mocks'

const setShowDialog = jest.fn()

const successData = {
  listId: '1',
  newTitle: 'Item',
  setShowDialog,
}

const errorData = {
  listId: '2',
  newTitle: 'Error',
  setShowDialog,
}

afterEach(() => {
  setShowDialog.mockReset()
})

describe('Add list item tests', () => {
  it('Should render the add list item dialog', () => {
    const { queryByTestId } = render(
      <MockApolloProvider mocks={mockData}>
        <AddListItemDialog {...successData} />
      </MockApolloProvider>,
    )
    const addListItemDialog = queryByTestId('add-list-item-dialog')
    expect(addListItemDialog).toBeTruthy()
  })
  it('Should successfully add list item', async () => {
    const { queryByTestId, queryByText } = render(
      <MockApolloProvider mocks={mockData}>
        <AddListItemDialog {...successData} />
      </MockApolloProvider>,
    )
    const addListItemDialog = queryByTestId('add-list-item-dialog')
    const addListItemInput = queryByTestId('lethe-input')
    const addListItemSubmit = queryByTestId('submit')
    expect(addListItemDialog).toBeTruthy()
    fireEvent.change(addListItemInput, { target: { value: 'Item' } })
    expect(addListItemInput.value).toBe('Item')
    fireEvent.click(addListItemSubmit)
    await waitFor(() => expect(setShowDialog).toHaveBeenCalled())
    await waitFor(() =>
      expect(queryByText('New item created successfully')).toBeTruthy(),
    )
  })
  it('Should cancel add new item', async () => {
    const { queryByTestId } = render(
      <MockApolloProvider mocks={mockData}>
        <AddListItemDialog {...successData} />
      </MockApolloProvider>,
    )
    const addListItemDialog = queryByTestId('add-list-item-dialog')
    expect(addListItemDialog).toBeTruthy()
    const addListItemCancel = queryByTestId('cancel')
    fireEvent.click(addListItemCancel)
    expect(setShowDialog).toHaveBeenCalled()
  })
  it('Should error adding list item', async () => {
    const { queryByTestId, queryByText } = render(
      <MockApolloProvider mocks={mockData}>
        <AddListItemDialog {...errorData} />
      </MockApolloProvider>,
    )
    const addListItemDialog = queryByTestId('add-list-item-dialog')
    const addListItemInput = queryByTestId('lethe-input')
    const addListItemSubmit = queryByTestId('submit')
    expect(addListItemDialog).toBeTruthy()
    fireEvent.change(addListItemInput, { target: { value: 'Error' } })
    expect(addListItemInput.value).toBe('Error')
    fireEvent.click(addListItemSubmit)
    await waitFor(() =>
      expect(
        queryByText('Error creating item: Something went wrong'),
      ).toBeTruthy(),
    )
  })
})
