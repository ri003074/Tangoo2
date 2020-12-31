import '../styles/globals.css'
import React from 'react'
import StateProvider from '../components/StateProvider'
import { Provider } from 'react-redux'
import { useStore } from '../store'
import nprogress from 'nprogress'
import Router from 'next/router'
import Head from 'next/head'

Router.events.on('routeChangeStart', (url) => {
  console.log(`Loading: ${url}`)
  nprogress.start()
})
Router.events.on('routeChangeComplete', () => nprogress.done())
Router.events.on('routeChangeError', () => nprogress.done())

nprogress.configure({ showSpinner: false, speed: 400, minimum: 0.25 })

export default function MyApp({ Component, pageProps }) {
  const store = useStore(pageProps.initialReduxState)



  return (
    <>
      <Head>
      <link rel="stylesheet" type="text/css" href="/nprogress.css" />
    </Head>
    <Provider store={store}>
      <StateProvider>
        <Component {...pageProps} />
      </StateProvider>
    </Provider>
    </>
  )
}