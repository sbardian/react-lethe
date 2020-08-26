/* eslint-disable no-unused-vars */
/** @jsx jsx */
import React from 'react'
import PropTypes from 'prop-types'
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

ListSettingsButton.defaultProps = {
  hoverColor: 'colorThree',
}

ListSettingsButton.propTypes = {
  listId: PropTypes.string.isRequired,
  hoverColor: PropTypes.string,
}

export default ListSettingsButton
