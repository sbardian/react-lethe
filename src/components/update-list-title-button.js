/* eslint-disable no-unused-vars */
/** @jsx jsx */
import React from 'react'
import { jsx } from 'theme-ui'
import { gql, useQuery, useMutation } from '@apollo/client'
import { BiSave } from 'react-icons/bi'
import alertsConfig from './alerts-config'

const UpdateListTitleButton = ({
  listId,
  newTitle,
  titleNotUpdated,
  setTitleNotUpdated,
  show,
}) => {
  const GET_MY_LISTS = gql`
    {
      getMyInfo {
        id
        lists {
          id
          title
          owner
        }
      }
    }
  `

  const UPDATE_LIST = gql`
    mutation updateList($listId: String!, $title: String!) {
      updateList(listId: $listId, title: $title) {
        id
        title
      }
    }
  `

  const [updateList, { loading, error, data }] = useMutation(UPDATE_LIST, {
    onCompleted: () => setTitleNotUpdated(true),
    onError: (error) => {
      show({ ...alertsConfig, message: `Error: ${error}` })
      setTitleNotUpdated(true)
    },
  })

  if (loading) {
    return (
      <span
        sx={{ justifySelf: 'center', alignSelf: 'center', cursor: 'pointer' }}
      >
        Saving
      </span>
    )
  }

  return (
    <button
      disabled={titleNotUpdated}
      sx={{
        all: 'unset',
        cursor: 'pointer',
        justifySelf: 'start',
        alignSelf: 'start',
        '@media (min-width: 430px)': {
          justifySelf: 'center',
          alignSelf: 'center',
        },
      }}
      onClick={() => {
        updateList({
          variables: {
            listId,
            title: newTitle,
          },
          refetchQueries: [
            {
              query: GET_MY_LISTS,
              variables: {
                id_is: listId,
              },
            },
          ],
        })
      }}
    >
      {!titleNotUpdated ? (
        <BiSave size="30" sx={{ color: 'colorThree' }} />
      ) : (
        <BiSave size="30" />
      )}
    </button>
  )
}

export default UpdateListTitleButton
