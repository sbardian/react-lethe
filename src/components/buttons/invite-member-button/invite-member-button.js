/** @jsx jsx */
import { jsx } from 'theme-ui'
import PropTypes from 'prop-types'
import { RiUserAddLine } from 'react-icons/ri'

const InviteMemberButton = ({ size }) => {
  return (
    <div
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
      <button
        type="button"
        sx={{ all: 'unset', cursor: 'pointer' }}
        onClick={() => console.log('send new invite dialog')}
      >
        <RiUserAddLine size={size} />
      </button>
    </div>
  )
}

InviteMemberButton.defaultProps = {
  size: '34',
}

InviteMemberButton.propTypes = {
  size: PropTypes.string,
}

export default InviteMemberButton
