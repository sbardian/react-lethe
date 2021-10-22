/* eslint-disable no-undef */
import React from 'react'
import PropTypes from 'prop-types'
import { initializeApp } from 'firebase/app'
import { getStorage, ref, getDownloadURL } from 'firebase/storage'

export const StorageContext = React.createContext()

export const StorageProvider = ({ children }) => {
  const [storageRef, setStorageRef] = React.useState(null)

  React.useEffect(() => {
    const firebaseConfig = {
      apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
      storageBucket: 'letheapi.appspot.com',
    }
    const firebase = initializeApp(firebaseConfig)
    const fbStorage = getStorage(firebase)
    // const fbStorage = firebase.storage()
    // const fbStorageRef = fbStorage.ref()
    setStorageRef(fbStorage)
  }, [])

  const fetchDownloadUrl = (img) => {
    let image = null
    const imageRef = ref(storageRef, img)
    try {
      image = getDownloadURL(imageRef)
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
