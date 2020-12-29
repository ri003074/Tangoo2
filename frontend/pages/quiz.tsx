import Layout from '../components/Layout'
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