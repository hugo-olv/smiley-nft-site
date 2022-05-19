import { createContext } from 'react'
import { useMetaMask } from '../hooks/useMetaMask'

export const MetamaskContext = createContext()

export const MetamaskProvider = ({ children }) => {
    const { metaState, connect, loading, isAvailable } = useMetaMask()

    return (
        <MetamaskContext.Provider value={{
            metaState,
            loading,
            connect,
            isAvailable,
        }}>
            {children}
        </MetamaskContext.Provider>
    )
}