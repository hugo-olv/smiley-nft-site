import { useState, useEffect } from 'react'

export const useMetaMask = () => {
    const [accounts, setAccounts] = useState([])
    const [chainId, setChaindId] = useState('')
    const [message, setMessage] = useState('')
    const [enableButton, setEnableButton] = useState(false)

    // Set initial states on mount.
    useEffect(() => {
        (async function () {
            try {
                // Required metamask installed.
                isMetamaskInstalled()
                const [connectedAccount] = await getConnectedAccounts()
                const chainId = await getChainId()

                if (connectedAccount) setAccounts([connectedAccount])
                if (chainId) setChaindId(chainId)
            }
            catch (err) {
                console.error(err)
            }
        })()
    }, [])

    /* 
     * Set event listener + handler for metamask connect event on mount.
     * The MetaMask provider emits this event when it first becomes able to submit RPC requests to a chain.
     */
    useEffect(() => {
        try {
            // Required metamask installed.
            isMetamaskInstalled()
            // TODO : Implement handleConnect()
            const handleConnect = connectInfo => {
                console.log(connectInfo)
            }
            window.ethereum.on('connect', handleConnect)
            return () => {
                window.ethereum.removeListener('connect', handleConnect)
            }
        } catch (err) {
            console.error(err)
        }
    }, [])

    /* 
     * Set event listener + handler for metamask disconnect event on mount.
     * The MetaMask provider emits this event if it becomes unable to submit RPC requests to any chain. 
     * In general, this will only happen due to network connectivity issues or some unforeseen error.
     */
    useEffect(() => {
        try {
            // Required metamask installed.
            isMetamaskInstalled()
            // TODO : Implement handleDisconnect()
            const handleDisconnect = err => {
                console.error(err)
            }
            window.ethereum.on('disconnect', handleDisconnect)
            return () => {
                window.ethereum.removeListener('disconnect', handleDisconnect)
            }
        } catch (err) {
            console.error(err)
        }
    }, [])

    // Set event listener + handler for metamask account change event on mount.
    useEffect(() => {
        try {
            // Required metamask installed.
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

    // Set event listener + handler for metamask chain change event on mount.
    useEffect(() => {
        try {
            // Required metamask installed.
            isMetamaskInstalled()
            const handleChainChange = chainId => {
                setChaindId(chainId)
            }
            window.ethereum.on('chainChanged', handleChainChange)
            return () => {
                window.ethereum.removeListener('chainChanged', handleChainChange)
            }
        } catch (err) {
            console.error(err)
        }
    }, [])

    // Set enableButton and message on accounts change.
    useEffect(() => {
        try {
            // Required metamask installed.
            isMetamaskInstalled()
            if (accounts.length > 0) {
                setEnableButton(false)
                setMessage(`You are connected with this account : ${accounts[0]}`)
            }
            else {
                setEnableButton(true)
                setMessage('')
            }
        } catch (err) {
            console.error(err)
        }
    }, [accounts])

    // Check if metamask is installed and throw an error if not.
    const isMetamaskInstalled = () => {
        if (!window?.ethereum?.isMetaMask) {
            setEnableButton(false)
            setMessage('Please install MetaMask')
            throw new Error('MetamaskNotInstalled')
        }
    }

    const getConnectedAccounts = async () => {
        const accounts = await window.ethereum.request({ method: 'eth_accounts' })
        return accounts
    }

    const getChainId = async () => {
        const chainId = await window.ethereum.request({ method: 'eth_chainId' })
        return chainId
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