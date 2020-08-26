import { GET_LIST_ITEMS, ADD_ITEM } from './add-item-dialog'

export const mockData = [
  {
    request: {
      query: GET_LIST_ITEMS,
      variables: {
        id_is: '1',
      },
    },
    result: {
      data: {
        updateList: { id: '1', title: 'List Title', __typename: 'List' },
      },
    },
  },
  {
    request: {
      query: ADD_ITEM,
      variables: { listId: '1', title: 'Item' },
    },
    result: {
      data: {
        updateList: { id: '1', title: 'Item', __typename: 'Item' },
      },
    },
  },
  {
    request: {
      query: ADD_ITEM,
      variables: { listId: '2', title: 'Error' },
    },
    error: new Error('Something went wrong'),
  },
]
