import { ConnectButton } from './ConnectButton'
import { useContext } from 'react'
import { MetamaskContext } from '../context'
import { shortenAddress } from '../utils/shortenAddress'

export const Layout = ({ children }) => {
    const {
        metaState: { accounts, chain, balance, isConnected },
        loading,
        connect,
    } = useContext(MetamaskContext)

    return (
        <div className='flex flex-col h-screen bg-gradient-to-tr from-indigo-500 to-blue-500 text-white'>
            {/* Navbar */}
            <div className='flex justify-between px-8 py-3'>
                <div></div>
                <div>
                    <ConnectButton
                        shortAddress={shortenAddress(accounts[0])}
                        isConnected={isConnected}
                        onClick={connect}
                    />
                </div>
            </div>
            <div className='flex flex-1 justify-center align-middle'>
                {children}
            </div>
        </div>
    )
}