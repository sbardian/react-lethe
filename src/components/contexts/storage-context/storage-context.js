/* eslint-disable no-undef */
import React from 'react'
import PropTypes from 'prop-types'
import firebase from 'firebase/app'
import 'firebase/storage'

export const StorageContext = React.createContext()

export const StorageProvider = ({ children }) => {
  const [storageRef, setStorageRef] = React.useState(null)

  const firebaseConfig = {
    apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
    storageBucket: 'letheapi.appspot.com',
  }

  React.useEffect(() => {
    if (!firebase.apps.length) {
      firebase.initializeApp(firebaseConfig)
    }
    const fbStorage = firebase.storage()
    const fbStorageRef = fbStorage.ref()
    setStorageRef(fbStorageRef)
  }, [])

  const fetchDownloadUrl = async (img) => {
    let image = null
    const imageRef = storageRef.child(img)
    try {
      if (imageRef.getDownloadURL) {
        image = await imageRef.getDownloadURL()
      }
    } catch (error) {
      image = 'https://via.placeholder.com/150.png'
    }
    return image
  }

  const getImageUrl = (img, source = null) => {
    if (source === 'local') {
      return new Promise((resolve) => resolve(img))
    }
    return Promise.all([fetchDownloadUrl(img)]).then((url) => url[0])
  }

  return (
    <StorageContext.Provider value={{ storageRef, getImageUrl }}>
      {children}
    </StorageContext.Provider>
  )
}

StorageProvider.propTypes = {
  children: PropTypes.node.isRequired,
}
