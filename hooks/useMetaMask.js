import { useState, useEffect } from 'react'
import { ethers } from 'ethers'

export const useMetaMask = () => {
    const [accounts, setAccounts] = useState([])
    const [chainId, setChaindId] = useState('')
    const [balance, setBalance] = useState(0)
    const [message, setMessage] = useState('')
    const [disableButton, setDisableButton] = useState(false)
    const [isConnected, setIsConnected] = useState(false)

    // Set initial states on mount.
    useEffect(() => {
        (async function () {
            try {
                // Require metamask installed.
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

    // Set event listeners + handlers for metamask events on mount.
    useEffect(() => {
        try {
            // Require metamask installed.
            isMetamaskInstalled()
            /**
             * @param {String} connect - The MetaMask provider emits this event when it first becomes able to submit RPC requests to a chain.
             * @param {String} disconnect - The MetaMask provider emits this event when it is unable to submit RPC requests to a chain.
             *                              In general, this will only happen due to network connectivity issues or some unforeseen error.
             * @param {String} accountsChanged - The MetaMask provider emits this event whenever the return value of the eth_accounts RPC method changes.
             * @param {String} chainChanged - The MetaMask provider emits this event when the chain changes.
             */
            window.ethereum.on('connect', handleConnect)
            window.ethereum.on('disconnect', handleDisconnect)
            window.ethereum.on('accountsChanged', handleAccountsChange)
            window.ethereum.on('chainChanged', handleChainChange)

            return () => {
                window.ethereum.removeListener('connect', handleConnect)
                window.ethereum.removeListener('disconnect', handleDisconnect)
                window.ethereum.removeListener('accountsChanged', handleAccountsChange)
                window.ethereum.removeListener('chainChanged', handleChainChange)
            }
        } catch (err) {
            console.error(err)
        }
    }, [])

    // Set isConnected and message on accounts change.
    useEffect(() => {
        try {
            // Required metamask installed.
            isMetamaskInstalled()
            if (accounts.length > 0) {
                setIsConnected(true)
                setMessage(`You are connected with this account : ${accounts[0]}`)
            }
            else {
                setIsConnected(false)
                setMessage('')
            }
        } catch (err) {
            console.error(err)
        }
    }, [accounts])

    // Check if metamask is installed and throw an error if not.
    const isMetamaskInstalled = () => {
        if (!window?.ethereum?.isMetaMask) {
            setDisableButton(true)
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

    // TODO : Implement handleConnect()
    const handleConnect = connectInfo => {
        console.log(connectInfo)
    }

    // TODO : Implement handleDisconnect()
    const handleDisconnect = err => {
        console.error(err)
    }

    const handleAccountsChange = accounts => {
        setAccounts(accounts)
    }

    const handleChainChange = chainId => {
        setChaindId(chainId)
    }

    const connect = async () => {
        try {
            isMetamaskInstalled()
            const [connectedAccount] = await getConnectedAccounts()

            if (!connectedAccount) {
                const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' })
                setAccounts(accounts)
            }
            else setAccounts([connectedAccount])
        }
        catch (err) {
            if (err.code === 4001) {
                setMessage('Please connect to MetaMask.')
                setDisableButton(false)
            }
            else if (err.code === -32002) {
                setMessage('A request is already pending. Open Metasmask.')
                setDisableButton(true)
            }
            else console.error(err)
        }
    }

    const disconnect = async () => {
        console.log('disconnect')
    }

    return {
        accounts,
        chainId,
        balance,
        message,
        disableButton,
        isConnected,
        connect,
        disconnect
    }
}