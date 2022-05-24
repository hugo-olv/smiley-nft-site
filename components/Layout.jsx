import { ConnectButton } from './ConnectButton'

export const Layout = ({ children }) => {

    return (
        <div className='flex flex-col h-screen bg-gradient-to-tr from-indigo-500 to-blue-500 text-white'>
            {/* Navbar */}
            <div className='flex justify-between px-8 py-3'>
                <div></div>
                <div>
                    <ConnectButton />
                </div>
            </div>
            <div className='flex flex-1 justify-center align-middle'>
                {children}
            </div>
        </div>
    )
}