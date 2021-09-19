/* eslint-disable no-unused-vars */
/** @jsx jsx */
import React from 'react'
import { jsx } from 'theme-ui'
import PropTypes from 'prop-types'
import { gql, useQuery, useMutation } from '@apollo/client'
import { RiArrowDownSFill } from 'react-icons/ri'
import { useNavigate } from 'react-router-dom'
import { TokenContext } from '../../contexts/token-context/token-context'
import ProfileImage from '../../profile-image/profile-image'
import handleKeyPress from '../../../utils/on-key-press'
import defaultProfileImage from '../../../assets/images/default-profile-image.jpg'

const GET_MY_INFO = gql`
  {
    getMyInfo {
      id
      username
      email
      profileImageUrl
      lists {
        title
      }
    }
  }
`

const LOGOUT = gql`
  mutation logout {
    logout {
      token
    }
  }
`

const MenuItem = ({ children }) => <li sx={{ padding: 2 }}>{children}</li>

MenuItem.propTypes = {
  children: PropTypes.node.isRequired,
}

const UserMenuButton = () => {
  const [expanded, setExpanded] = React.useState(false)
  const { removeToken } = React.useContext(TokenContext)
  const navigate = useNavigate()
  const [blacklistToken] = useMutation(LOGOUT)
  const { loading: queryLoading, error: queryError, data } = useQuery(
    GET_MY_INFO,
  )

  const logout = () => {
    blacklistToken()
    removeToken()
    navigate('/')
  }

  if (queryLoading) {
    return <div>Loading . . . </div>
  }

  if (queryError) {
    return <div>Error: ${queryError.message}</div>
  }

  const {
    getMyInfo: { profileImageUrl },
  } = data

  return (
    <div
      sx={{
        backgroundColor: expanded ? 'colorThree' : 'background',
        padding: 2,
      }}
    >
      <button
        type="button"
        sx={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          justifyItems: 'center',
          alignItems: 'center',
          backgroundColor: expanded ? 'colorThree' : 'background',
          border: 'none',
        }}
        onClick={() => {
          setExpanded(!expanded)
        }}
      >
        <ProfileImage
          profileImageUrl={profileImageUrl || defaultProfileImage}
          size="small"
          source={profileImageUrl ? 'firebase' : 'local'}
        />
        <RiArrowDownSFill
          size="24"
          sx={{ color: expanded ? 'text' : 'textSecondary' }}
        />
      </button>
      {expanded && (
        <div
          sx={{
            position: 'absolute',
            boxSizing: 'border-box',
            margin: 0,
            width: '100vw',
            top: '9.8rem',
            right: 0,
            zIndex: '999',
            '@media (min-width: 800px)': {
              maxWidth: '300px',
              top: '3rem',
            },
          }}
        >
          <div
            sx={{
              margin: 0,
              marginLeft: 3,
              marginRight: 3,
              boxSizing: 'border-box',
              backgroundColor: 'colorThree',
              zIndex: '999',
            }}
          >
            <ul sx={{ fontSize: 2, listStyle: 'none' }}>
              <MenuItem>Profile</MenuItem>
              <MenuItem>Theme</MenuItem>
              <MenuItem>Settings</MenuItem>
              <MenuItem>
                <button
                  type="button"
                  sx={{
                    cursor: 'pointer',
                    backgroundColor: 'colorThree',
                    fontSize: 'inherit',
                    color: 'text',
                    padding: 0,
                    border: 'none',
                  }}
                  onKeyPress={(event) => () => handleKeyPress(event, logout)}
                  onClick={() => logout()}
                >
                  Logout
                </button>
              </MenuItem>
            </ul>
          </div>
        </div>
      )}
    </div>
  )
}

export default UserMenuButton
