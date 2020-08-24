/* eslint-disable no-unused-vars */
/** @jsx jsx */
import React from 'react'
import { jsx } from 'theme-ui'
import { Link } from '@reach/router'
import { GiSettingsKnobs } from 'react-icons/gi'

const ListSettingsButton = ({ listId }) => {
  return (
    <Link
      to={`/list/settings/${listId}`}
      sx={{
        cursor: 'pointer',
        justifySelf: 'end',
        alignSelf: 'center',
        color: 'inherit',
        '&:hover': {
          color: 'colorThree',
        },
      }}
    >
      <GiSettingsKnobs size="30" />
    </Link>
  )
}

export default ListSettingsButton
