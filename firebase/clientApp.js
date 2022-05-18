import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyCVTQ8KBLgSLx0Ryp-NZLfaie20KNghB-8",
    authDomain: "smiley-nft-whitelist.firebaseapp.com",
    projectId: "smiley-nft-whitelist",
    storageBucket: "smiley-nft-whitelist.appspot.com",
    messagingSenderId: "217548561268",
    appId: "1:217548561268:web:8b47ae7b721f7a65a96a21"
}

export const firebaseApp = initializeApp(firebaseConfig)
export const firestore = getFirestore(firebaseApp)