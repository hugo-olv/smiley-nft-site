export const ConnectButton = ({ disabled, onClick }) => {
    const styles = `
    ${disabled ? 'bg-gray-400' : 'bg-[#F4841F] hover:bg-[#763E1A]'}
    font-medium text-white py-2 px-4 rounded
    `
    return (
        <button
            className={styles}
            disabled={disabled}
            onClick={onClick}
        >
            Connect to Metamask
        </button>
    )
}