import Layout from '../components/layout'
import Head from 'next/head'
import React from 'react'
import Counter from '../components/counter'

export default function Quiz() {

    return (
        <Layout>
            <Head>
                <title>Quiz</title>
            </Head>
            <Counter/>
        </Layout>
    )
}