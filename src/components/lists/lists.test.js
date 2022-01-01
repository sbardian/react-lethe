import React from 'react'
import { render, fireEvent } from '../../utils/test/custom-renderer'
import Lists from './lists'

const onDeleteList = jest.fn()
const lists = [
  {
    __typename: 'List',
    id: '1',
    owner: { id: '1000' },
    title: 'List One',
  },
  {
    __typename: 'List',
    id: '2',
    owner: { id: '1000' },
    title: 'List Two',
  },
]

const userId = '1000'

describe('Lists tests', () => {
  it('Should render list items successfully', () => {
    const { getByTestId, queryAllByText, getAllByTestId } = render(
      <Lists onDeleteList={onDeleteList} lists={lists} userId={userId} />,
    )
    const listUl = getByTestId('lists-ul')
    expect(listUl).toBeTruthy()
    expect(queryAllByText('List One')).toHaveLength(1)
    expect(queryAllByText('List Two')).toHaveLength(1)
    const deleteButtons = getAllByTestId('delete-list-button')
    expect(deleteButtons).toHaveLength(2)
    const listSettingsButtons = getAllByTestId('list-settings-button')
    expect(listSettingsButtons).toHaveLength(2)
  })
  it('Should delete first list successfully', () => {
    const { getByTestId, queryAllByText, getAllByTestId } = render(
      <Lists onDeleteList={onDeleteList} lists={lists} userId={userId} />,
    )
    const listUl = getByTestId('lists-ul')
    expect(listUl).toBeTruthy()
    expect(queryAllByText('List One')).toHaveLength(1)
    expect(queryAllByText('List Two')).toHaveLength(1)
    const deleteButtons = getAllByTestId('delete-list-button')
    fireEvent.click(deleteButtons[0])
    expect(onDeleteList).toHaveBeenCalledTimes(1)
    expect(onDeleteList).toHaveBeenCalledWith(lists[0].id)
  })
})
