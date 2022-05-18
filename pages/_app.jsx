import { MetamaskProvider } from '../context'
import '../styles/globals.css'

const App = ({ Component, pageProps }) => {
  return (
    <MetamaskProvider>
      <Component {...pageProps} />
    </MetamaskProvider>
  )
}

export default App
