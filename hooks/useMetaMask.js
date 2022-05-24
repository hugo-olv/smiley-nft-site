import { useState, useEffect, useRef, useCallback } from 'react'
import { ethers } from 'ethers'

const getChainName = chainId => {
    if (!!Number(chainId) && chainId.length > 9) {
        return "local";
    }
    switch (chainId) {
        case "1": return "mainnet"
        case "3": return "ropsten"
        case "4": return "rinkeby"
        case "5": return "goerli"
        case "42": return "kovan"
        default: return `unknown`
    }
}

export const useMetaMask = () => {
    const _isMounted = useRef(true)
    const [accounts, setAccounts] = useState([])
    const [chain, setChain] = useState('')
    const [balance, setBalance] = useState(0)
    const [isAvailable, setIsAvailable] = useState(false)
    const [isConnected, setIsConnected] = useState(false)
    const [isPending, setIsPending] = useState(false)
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        if (window.ethereum) setIsAvailable(true)
        _isMounted.current = true
        return () => {
            _isMounted.current = false
        }
    }, [])

    // Check if already connect to Metamask on mount and set the states in consequence.
    // It avoid having to manually reconnect on page reload for example.
    useEffect(() => {
        (async function () {
            try {
                setLoading(true)
                const _accounts = await getAccounts()
                if (_accounts.length) await connect(_accounts)
            }
            catch (err) {
                console.error(err)
            }
            finally {
                setLoading(false)
            }
        })()
    }, [])

    // TODO : Trigger multiple time setBalance on-mount.
    // Fetch and set the balance when accounts || chain change.
    useEffect(() => {
        const handleBalanceChange = async () => {
            console.log('her')
            if (accounts.length) {
                const _balance = await getBalance(accounts)
                setBalance(_balance)
            }
            else setBalance(0)
        }
        handleBalanceChange()
    }, [accounts, chain])

    const getAccounts = async ({ requestPermission } = { requestPermission: false }) => {
        try {
            if (!window.ethereum) throw Error("Metamask is not available.")

            const accounts = await window.ethereum.request({
                method: requestPermission ? 'eth_requestAccounts' : 'eth_accounts',
                params: []
            })

            return accounts

        } catch (err) {
            throw err
        }
    }

    const getChain = async () => {
        try {
            if (!window.ethereum) throw Error("Metamask is not available.")

            const chainId = await window.ethereum.request({
                method: 'net_version',
                params: []
            })

            const _chainInfo = { id: chainId, name: getChainName(chainId) }

            return _chainInfo

        } catch (err) {
            throw err
        }
    }

    const getBalance = async (_accounts) => {
        try {
            const provider = new ethers.providers.Web3Provider(window.ethereum)
            const balanceInWei = await provider.getBalance(_accounts[0])
            const balanceInEth = ethers.utils.formatEther(balanceInWei)
            return balanceInEth
        } catch (err) {
            throw err
        }
    }

    // TODO : Fix the pending detection.
    // Currently, if a Metamask request is pending and we reload the page, then we call this function again which 
    // set isPending === true at the beginning, then we accept/decline the request, isPending is not set to false.
    // This is due to the function reference being lost on reload. 
    // The function await getAccounts() which is fullfilled when the user accept or decline the Metamask request.
    // If we reload the page before the promise is fullfilled (the user accept/decline), the current execution of 
    // the function is aborted without never reaching any catch or finally, so if isPending was set to true at the 
    // beginnin of the previous execution, it will stay true until we call this function again. 
    // (it's problematic if isPending is used to disable a button for example. The button will stay disabled)
    const connect = async (_accounts = []) => {
        try {
            setIsPending(true)
            if (!window.ethereum) throw Error("Metamask is not available.")
            if (!_isMounted.current) throw Error("Component is not mounted.")
            if (isConnected) throw Error("You are already connected.")

            // If no accounts was provided, that mean we are not connected and need to request accounts.
            if (_accounts.length === 0) {
                _accounts = await getAccounts({ requestPermission: true })
            }

            setAccounts(_accounts)
            setIsConnected(true)

            const _chainInfo = await getChain()
            setChain(_chainInfo)

            // const _balance = await getBalance(_accounts)
            // setBalance(_balance)

            /**
             * Metamask Events.
             * @param {String} accountsChanged - The MetaMask provider emits this event whenever the return value of the eth_accounts RPC method changes.
             * @param {String} chainChanged - The MetaMask provider emits this event when the chain changes.
             */
            window.ethereum.on('accountsChanged', async accounts => {
                setAccounts(accounts)
                setIsConnected(accounts.length > 0)
            })

            window.ethereum.on('chainChanged', chaindId => {
                const _chainId = parseInt(chaindId, 16).toString()
                const _chainInfo = { id: _chainId, name: getChainName(_chainId) }
                setChain(_chainInfo)
            })

            setIsPending(false)
        }
        catch (err) {
            setIsPending(err.code === -32002)
            console.error(err)
        }
    }

    // For use as handler in synthetic event (buttons...)
    // Since function use as event handler receive an event argument as their first argument, it conflict with the actual connect function _accounts argument.
    const handleConnect = async e => {
        e.preventDefault()
        await connect()
    }

    return {
        metaState: { accounts, chain, balance, isConnected, isPending },
        loading,
        connect: handleConnect,
        isAvailable,
    }
}