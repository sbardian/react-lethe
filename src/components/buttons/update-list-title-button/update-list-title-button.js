/* eslint-disable no-unused-vars */
/** @jsx jsx */
import PropTypes from 'prop-types'
import { jsx } from 'theme-ui'
import { gql, useMutation } from '@apollo/client'
import { BiSave } from 'react-icons/bi'
import { toast } from 'react-toastify'
import toastsConfig from '../../../utils/toasts-config'

export const GET_MY_LISTS = gql`
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

export const UPDATE_LIST = gql`
  mutation updateList($listId: String!, $title: String!) {
    updateList(listId: $listId, title: $title) {
      id
      title
    }
  }
`

const updateSuccess = () => toast.success('Update successful', toastsConfig)
const updateFailure = () => toast.error('Error updating title', toastsConfig)

const UpdateListTitleButton = ({
  listId,
  newTitle,
  titleNotUpdated,
  setTitleNotUpdated,
  show,
}) => {
  const [updateList, { loading }] = useMutation(UPDATE_LIST, {
    onCompleted: () => {
      setTitleNotUpdated(true)
      updateSuccess()
    },
    onError: (error) => {
      updateFailure()
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
      type="button"
      aria-label="update-title-button"
      data-testid="update-title-button"
      disabled={titleNotUpdated}
      sx={{
        border: 'none',
        backgroundColor: 'transparent',
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
        <BiSave size="30" sx={{ color: 'textSecondary' }} />
      )}
    </button>
  )
}

UpdateListTitleButton.defaultProps = {
  newTitle: '',
}

UpdateListTitleButton.propTypes = {
  listId: PropTypes.string.isRequired,
  newTitle: PropTypes.string,
  titleNotUpdated: PropTypes.bool.isRequired,
  setTitleNotUpdated: PropTypes.func.isRequired,
  show: PropTypes.func.isRequired,
}

export default UpdateListTitleButton
