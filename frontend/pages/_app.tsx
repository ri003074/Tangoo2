import '../styles/globals.css'
import { Provider } from 'react-redux'

export default function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />
}
