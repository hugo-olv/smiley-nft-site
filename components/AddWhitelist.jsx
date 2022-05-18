import { useState, useEffect } from 'react'
import { firestore } from '../firebase/clientApp'
import { doc, setDoc } from 'firebase/firestore'
import { v4 as uuid } from 'uuid'

export const AddWhitelist = ({ address, balance, registeredCount, whitelist, loading, setSuccess, setError }) => {
    const styles = `bg-[#F4841F] hover:bg-[#763E1A] font-medium text-white py-2 px-4 rounded`

    const addToWhitelist = async () => {
        try {
            // These checks doesn't offer any garanty since they are client side. 
            // A malicious individual can easily bypass them and insert records to the database.
            // You should see to enforce them in firebase.
            if (loading) throw "Loading data"
            if (!address) throw "No address"
            // Test ethereum adress
            if (!address.match(/^0x[a-fA-F0-9]{40}$/)) throw "Invalid address"
            if (registeredCount > 5) throw "You can't add more than 5 users to the whitelist"
            // Check if the address already exist in the whitelist.
            const isAddressExist = whitelist?.docs?.some(doc => doc.data().address === address)
            if (isAddressExist) throw "This address is already in the whitelist"
            if (balance <= 0.3) throw "You don't have enough ETH on your account to go on our whitelist"

            // Add the address to the whitelist
            const id = uuid()
            await setDoc(doc(firestore, 'whitelist', id), {
                id,
                address,
                balance,
            })
            setSuccess("You have been added to the whitelist!")
            setError('')
        }
        catch (err) {
            console.log(err)
            setError(err)
            setSuccess('')
        }
    }

    return (
        <div>
            <button className={styles} onClick={addToWhitelist}>Go on Whitelist</button>
        </div>
    )
}