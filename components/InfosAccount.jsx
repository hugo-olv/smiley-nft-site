import { ConnectButton } from "."

export const InfosAccount = ({ isConnected, message, balance }) => {
    return (
        <>
            {!isConnected && (
                <ConnectButton
                    onClick={connect}
                    disabled={disableButton}
                />
            )}
            {message && <p>{message}</p>}
            {isConnected && <p>Your Balance : {balance} eth</p>}
            {isConnected && balance < 0.3 && <p>You don't have enough ETH on your account to go on our whitelist.</p>}
        </>
    )
}