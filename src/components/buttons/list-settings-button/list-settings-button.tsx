/* eslint-disable no-unused-vars */
/** @jsx jsx */
import React from 'react'
import PropTypes from 'prop-types'
import { jsx } from 'theme-ui'
import { Link } from 'react-router-dom'
import { GiSettingsKnobs } from 'react-icons/gi'

interface ListSettingsButtonProps {
  listId: string
  hoverColor?: string
}

const ListSettingsButton: React.FC<ListSettingsButtonProps> = ({
  listId,
  hoverColor,
}) => (
    <Link
      data-testid="list-settings-button"
      tabIndex={0}
      aria-label="list settings link"
      to={`/lists/settings/${listId}`}
      sx={{
        display: 'grid',
        cursor: 'pointer',
        // justifySelf: 'end',
        alignSelf: 'center',
        color: 'inherit',
        '&:hover': {
          color: hoverColor,
        },
      }}
    >
      <GiSettingsKnobs size="30" />
    </Link>
  )

ListSettingsButton.defaultProps = {
  hoverColor: 'colorThree',
}

ListSettingsButton.propTypes = {
  listId: PropTypes.string.isRequired,
  hoverColor: PropTypes.string,
}

export default ListSettingsButton
