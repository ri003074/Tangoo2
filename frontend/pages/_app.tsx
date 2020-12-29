import '../styles/globals.css'
import React from 'react'
import StateProvider from '../components/StateProvider'
import { Provider } from 'react-redux'
import { useStore } from '../store'

export default function MyApp({ Component, pageProps }) {
  const store = useStore(pageProps.initialReduxState)

  return (
    <Provider store={store}>
      <StateProvider>
        <Component {...pageProps} />
      </StateProvider>
    </Provider>
  )
}