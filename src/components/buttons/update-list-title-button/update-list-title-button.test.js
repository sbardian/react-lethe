import React from 'react'
import { render, fireEvent, waitFor } from '../../../utils/test/custom-renderer'
import UpdateListTitleButton from './update-list-title-button'
import MockApolloProvider from '../../../utils/mock-apollo-client/mock-apollo-client'
import { mockData, errorMockData } from './mocks'
import alertsConfig from '../../../utils/alerts-config'

const show = jest.fn()
const setTitleNotUpdated = jest.fn()

const successData = {
  listId: '1',
  newTitle: 'New Title',
  titleNotUpdated: false,
  setTitleNotUpdated,
  show,
}

const errorData = {
  listId: '2',
  newTitle: 'Error Title',
  titleNotUpdated: false,
  setTitleNotUpdated,
  show,
}

afterEach(() => {
  show.mockReset()
  setTitleNotUpdated.mockReset()
})

describe('UpdateListTitle tests', () => {
  it('Should render the update list title button', () => {
    const { queryByTestId } = render(
      <MockApolloProvider mocks={mockData}>
        <UpdateListTitleButton {...successData} />
      </MockApolloProvider>,
    )
    const updateListTitleButton = queryByTestId('update-title-button')
    expect(updateListTitleButton).toBeTruthy()
  })
  it('Should successfully update list title on click', async () => {
    const { queryByText, queryByTestId } = render(
      <MockApolloProvider mocks={mockData}>
        <UpdateListTitleButton {...successData} />
      </MockApolloProvider>,
    )
    const updateListTitleButton = queryByTestId('update-title-button')
    fireEvent.click(updateListTitleButton)
    expect(queryByText('Saving')).toBeTruthy()
    await waitFor(() => expect(setTitleNotUpdated).toHaveBeenCalledWith(true))
    await waitFor(() => expect(show).toHaveBeenCalledTimes(1))
  })
  it('Should fail to update list title', async () => {
    const { queryByText, queryByTestId } = render(
      <MockApolloProvider mocks={errorMockData}>
        <UpdateListTitleButton {...errorData} />
      </MockApolloProvider>,
    )
    const updateListTitleButton = queryByTestId('update-title-button')
    fireEvent.click(updateListTitleButton)
    expect(queryByText('Saving')).toBeTruthy()
    await waitFor(() => expect(setTitleNotUpdated).toHaveBeenCalledWith(true))
    await waitFor(() => expect(show).toHaveBeenCalled())
    await waitFor(() =>
      expect(show).toHaveBeenCalledWith({
        ...alertsConfig,
        message: 'Error: Something went wrong',
      }),
    )
  })
})
