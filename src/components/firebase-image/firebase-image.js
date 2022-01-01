/** @jsx jsx */
import React from 'react'
import PropTypes from 'prop-types'
import { jsx } from 'theme-ui'
import { StorageContext } from '../contexts/storage-context/storage-context'

const FirebaseImage = ({
  imageUrl,
  height,
  width,
  type,
  alt,
  source,
  ...rest
}) => {
  const { getImageUrl } = React.useContext(StorageContext)
  const [firebaseImageUrl, setFirebaseImageUrl] = React.useState()

  React.useEffect(() => {
    if (imageUrl) {
      getImageUrl(imageUrl, source).then((url) =>
        setFirebaseImageUrl(url, source),
      )
    }
  }, [imageUrl, source, getImageUrl])

  // TODO: grab more metadata about the image while fetching the download URL, so we can size it correctly
  return (
    <img
      sx={{
        borderRadius: type === 'circle' ? '100%' : '0px',
      }}
      src={firebaseImageUrl}
      height={height}
      width={width}
      alt={alt}
      {...rest}
    />
  )
}

FirebaseImage.defaultProps = {
  type: 'square',
  alt: 'image',
  source: 'firebase',
}

FirebaseImage.propTypes = {
  imageUrl: PropTypes.string.isRequired,
  height: PropTypes.string.isRequired,
  width: PropTypes.string.isRequired,
  type: PropTypes.string,
  alt: PropTypes.string,
  source: PropTypes.string,
}

export default FirebaseImage
