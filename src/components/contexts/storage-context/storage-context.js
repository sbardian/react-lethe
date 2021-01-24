/* eslint-disable no-undef */
import React from 'react'
import PropTypes from 'prop-types'
import firebase from 'firebase/app'
import 'firebase/storage'

export const StorageContext = React.createContext()

export const StorageProvider = ({ children }) => {
  const [storageRef, setStorageRef] = React.useState(null)
  const [image, setImage] = React.useState()

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

  const getImageUrl = async (img) => {
    const imageRef = storageRef.child(img)
    try {
      if (imageRef.getDownloadURL) {
        setImage(await imageRef.getDownloadURL())
      }
    } catch (error) {
      setProfileImage('https://via.placeholder.com/150.png')
    }
    return image
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
