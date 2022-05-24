import { useContext } from 'react'
import { MetamaskContext } from '../context'
import { shortenAddress } from '../utils/shortenAddress'

export const ConnectButton = () => {
    const {
        metaState: { accounts, isConnected },
        loading,
        connect,
    } = useContext(MetamaskContext)

    const styles = {
        button: `
        ${loading ? 'bg-gray-500 animate-pulse' : ''}
        ${!isConnected && !loading ? 'hover:bg-[#763E1A]' : ''}
        ${!loading ? 'bg-[#F4841F] font-medium text-white' : ''}
        py-2 px-4 rounded
        `,
        text: `${loading ? 'invisible' : ''}`,
    }
    const text = shortenAddress(accounts[0]) || 'Connect Wallet'

    return (
        <button
            className={styles.button}
            disabled={loading || isConnected}
            onClick={connect}
        >
            <span className={styles.text}>
                {text}
            </span>
        </button>
    )
}