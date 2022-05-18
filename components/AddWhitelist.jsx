import { useState, useEffect } from 'react'
import { firestore } from '../firebase/clientApp'
import { doc, setDoc } from 'firebase/firestore'
import { v4 as uuid } from 'uuid'

export const AddWhitelist = ({ account, balance }) => {

    const addToWhitelist = async (e) => {
        await setDoc(doc(firestore, 'whitelist'), {
            id: uuid(),
            address: account,
            balance: balance,
        })
    }

    return (
        <div>
            <button className='' onClick={addToWhitelist}>Go on Whitelist</button>
        </div>
    )
}