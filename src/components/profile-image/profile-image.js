/** @jsx jsx */
import React from 'react'
import PropTypes from 'prop-types'
import { jsx } from 'theme-ui'
import FirebaseImage from '../firebase-image/firebase-image'

const ProfileImage = ({ profileImageUrl, size, type, ...rest }) => {
  const [imageSize, setImageSize] = React.useState()

  React.useEffect(() => {
    switch (size) {
      case 'small':
        setImageSize({
          height: '40',
          width: '40',
        })
        break
      case 'medium':
        setImageSize({
          height: '120',
          width: '120',
        })
        break
      case 'large':
        setImageSize({
          height: '300',
          width: '300',
        })
        break
      default:
        break
    }
  }, [size])

  return (
    <React.Fragment>
      {imageSize?.height && imageSize?.width && (
        <FirebaseImage
          type={type}
          imageUrl={profileImageUrl}
          height={imageSize.height}
          width={imageSize.width}
          {...rest}
        />
      )}
    </React.Fragment>
  )
}

ProfileImage.defaultProps = {
  size: 'small',
  type: 'circle',
}

ProfileImage.propTypes = {
  profileImageUrl: PropTypes.string.isRequired,
  size: PropTypes.string,
  type: PropTypes.string,
}

export default ProfileImage
