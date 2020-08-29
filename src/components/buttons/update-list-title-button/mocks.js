import { GET_MY_LISTS, UPDATE_LIST } from './update-list-title-button'

export default [
  {
    request: {
      query: GET_MY_LISTS,
      variables: {
        id_is: '1',
      },
    },
    result: {
      data: {
        updateList: { id: '1', title: 'New Title', __typename: 'List' },
      },
    },
  },
  {
    request: {
      query: UPDATE_LIST,
      variables: { listId: '1', title: 'New Title' },
    },
    result: {
      data: {
        updateList: { id: '1', title: 'New Title', __typename: 'List' },
      },
    },
  },
  {
    request: {
      query: UPDATE_LIST,
      variables: { listId: '2', title: 'Error Title' },
    },
    error: new Error('Something went wrong'),
  },
]
