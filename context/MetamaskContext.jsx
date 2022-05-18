import { createContext } from 'react'
import { useMetaMask } from '../hooks/useMetaMask'

export const MetamaskContext = createContext()

export const MetamaskProvider = ({ children }) => {
    const { accounts, chainId, balance, message, disableButton, isConnected, connect } = useMetaMask()

    return (
        <MetamaskContext.Provider value={{
            accounts,
            chainId,
            balance,
            message,
            disableButton,
            isConnected,
            connect
        }}>
            {children}
        </MetamaskContext.Provider>
    )
}