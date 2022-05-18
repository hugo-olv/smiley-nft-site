import { firebase } from "firebase/app"
import "firebase/auth"
import "firebase/firestore"

const firebaseConfig = {
    apiKey: "AIzaSyCVTQ8KBLgSLx0Ryp-NZLfaie20KNghB-8",
    authDomain: "smiley-nft-whitelist.firebaseapp.com",
    projectId: "smiley-nft-whitelist",
    storageBucket: "smiley-nft-whitelist.appspot.com",
    messagingSenderId: "217548561268",
    appId: "1:217548561268:web:8b47ae7b721f7a65a96a21"
}

// Initialize Firebase
if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig)
}

export default firebase