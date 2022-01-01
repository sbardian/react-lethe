import { GET_LIST_ITEMS, ADD_ITEM } from './add-item-dialog'

export default [
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
        getLists: {
          id: 1,
          title: 'List Title',
          items: {
            id: 1,
            title: 'item 1',
            creator: {
              id: 1000,
            },
            list: 1,
            status: true,
          },
        },
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
        createNewItem: {
          id: 1,
          title: 'Item',
          creator: {
            id: '1000',
          },
          list: {
            id: 1,
          },
          status: true,
        },
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
