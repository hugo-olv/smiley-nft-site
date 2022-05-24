export const ConnectButton = ({ shortAddress, isConnected = false, onClick }) => {
    const styles = `
    ${!isConnected && 'hover:bg-[#763E1A]'}
    bg-[#F4841F] font-medium text-white py-2 px-4 rounded
    `
    return (
        <button
            className={styles}
            disabled={isConnected}
            onClick={onClick}
        >
            {shortAddress || 'Connect Wallet'}
        </button>
    )
}