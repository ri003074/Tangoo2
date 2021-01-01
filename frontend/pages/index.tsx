import Display from '../components/DisplayComponent'
import Head from 'next/head'
import Layout from '../components/Layout'
import React from 'react'

export default function Home() {

  return (
    <Layout>
      <Head>
        <title>Tangoo</title>
      </Head>
      <Display />
    </Layout>
  )
}
