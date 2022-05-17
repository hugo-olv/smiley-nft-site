import Head from 'next/head'
import Image from 'next/image'
import { useState, useEffect } from 'react'
import { useMetaMask } from '../hooks/useMetaMask'

const Home = () => {
  const { accounts, chainId, balance, message, disableButton, isConnected, connect, disconnect } = useMetaMask()
  const [loading, setLoading] = useState(true)
  const [success, setSuccess] = useState('')
  const [error, setError] = useState('')


  const styles = {
    container: "flex flex-col items-center"
  }

  const Button = ({ disabled, onClick }) => {
    const styles = `
    ${disabled ? 'bg-gray-400' : 'bg-blue-500 hover:bg-blue-700'}
    font-bold text-white py-2 px-4 rounded
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
  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {!isConnected && (
        <Button
          onClick={connect}
          disabled={disableButton}
        />
      )}
      <p>{message}</p>
      <p>Balance : {balance} eth</p>
    </div>
  )
}

export default Home
