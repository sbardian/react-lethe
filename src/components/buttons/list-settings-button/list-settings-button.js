/* eslint-disable no-unused-vars */
/** @jsx jsx */
import React from 'react'
import { jsx } from 'theme-ui'
import { Link } from '@reach/router'
import { GiSettingsKnobs } from 'react-icons/gi'

const ListSettingsButton = ({ listId, hoverColor }) => {
  return (
    <Link
      data-testid="list-settings-button"
      aria-label="list settings link"
      to={`/list/settings/${listId}`}
      sx={{
        display: 'grid',
        cursor: 'pointer',
        justifySelf: 'end',
        alignSelf: 'center',
        color: 'textSecondary',
        '&:hover': {
          color: hoverColor,
        },
      }}
    >
      <GiSettingsKnobs size="30" />
    </Link>
  )
}

export default ListSettingsButton
