import { useState, useEffect } from 'react'

export const useMetaMask = () => {
    const [accounts, setAccounts] = useState([])
    const [message, setMessage] = useState('')
    const [enableButton, setEnableButton] = useState(true)

    // Check if already connected on mount, if so set accounts.
    useEffect(() => {
        (async function () {
            try {
                isMetamaskInstalled()
                const [connectedAccount] = await getConnectedAccounts()
                if (connectedAccount) setAccounts([connectedAccount])
            }
            catch (err) {
                console.error(err)
            }
        })()
    }, [])

    // Set event listener for metamask account change on mount.
    useEffect(() => {
        try {
            isMetamaskInstalled()
            const handleAccountsChange = accounts => {
                setAccounts(accounts)
            }
            window.ethereum.on('accountsChanged', handleAccountsChange)
            return () => {
                window.ethereum.removeListener('accountsChanged', handleAccountsChange)
            }
        } catch (err) {
            console.error(err)
        }
    }, [])

    // Set enableButton and message on accounts change.
    useEffect(() => {
        if (accounts.length > 0) {
            setEnableButton(false)
            setMessage(`You are connected with this account : ${accounts[0]}`)
        }
        else {
            setEnableButton(true)
            setMessage('')
        }
    }, [accounts])

    // Check if metamask is installed and throw an error if not.
    const isMetamaskInstalled = () => {
        if (!window?.ethereum?.isMetaMask) {
            setMessage('Please install MetaMask')
            throw new Error('MetamaskNotInstalled')
        }
    }

    const getConnectedAccounts = async () => {
        const accounts = await window.ethereum.request({ method: 'eth_accounts' })
        return accounts
    }

    const connect = async () => {
        try {
            isMetamaskInstalled()
            const [connectedAccount] = await getConnectedAccounts()

            if (!connectedAccount) {
                const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' })
                setAccounts(accounts)
            }
        }
        catch (err) {
            if (err.code === 4001) {
                setMessage('Please connect to MetaMask.')
                setEnableButton(true)
            }
            else if (err.code === -32002) {
                setMessage('A request is already pending. Open Metasmask.')
                setEnableButton(false)
            }
            else console.error(err)
        }
    }

    return {
        accounts,
        message,
        enableButton,
        connect
    }
}