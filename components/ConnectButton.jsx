import { useContext } from 'react'
import { MetamaskContext } from '../context'
import { shortenAddress } from '../utils/shortenAddress'

export const ConnectButton = () => {
    const {
        metaState: { accounts, isConnected },
        loading,
        connect,
    } = useContext(MetamaskContext)

    const styles = `
    ${!isConnected && 'hover:bg-[#763E1A]'}
    bg-[#F4841F] font-medium text-white py-2 px-4 rounded
    `

    const text = shortenAddress(accounts[0]) || 'Connect Wallet'

    return (
        <button
            className={styles}
            disabled={isConnected}
            onClick={connect}
        >
            {text}
        </button>
    )
}