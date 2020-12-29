import Layout from '../components/layout'
import Head from 'next/head'
import React from 'react'
import QuizComponent from '../components/QuizComponent'

export default function Quiz() {

    return (
        <Layout>
            <Head>
                <title>Quiz</title>
            </Head>
            <QuizComponent />
        </Layout>
    )
}