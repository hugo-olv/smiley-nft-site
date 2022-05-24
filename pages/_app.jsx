import { MetamaskProvider } from '../context'
import { Layout } from '../components'
import '../styles/globals.css'

const App = ({ Component, pageProps }) => {
  return (
    <MetamaskProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </MetamaskProvider>
  )
}

export default App
