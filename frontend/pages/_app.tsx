import '../styles/globals.css'
import { Provider } from 'react-redux'
import { useStore } from '../store'
import React from 'react'
import StateProvider from '../components/StateProvider'

export default function MyApp({ Component, pageProps }) {
  const store = useStore(pageProps.initialReduxState)
  console.log("_app.tsx MyApp")

  return (
    <Provider store={store}>
      <StateProvider>
        <Component {...pageProps} />
      </StateProvider>
    </Provider>
  )
}