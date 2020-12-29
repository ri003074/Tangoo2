import Layout from '../components/Layout'
import Head from 'next/head'
import React from 'react'
import QuizComponent from '../components/QuizComponent'
import { useSelector } from 'react-redux'

export default function Quiz() {
    const contents = useSelector((state) => state.contents)

    return (
        <Layout>
            <Head>
                <title>Quiz</title>
            </Head>
            <QuizComponent contents={contents} />
        </Layout>
    )
}