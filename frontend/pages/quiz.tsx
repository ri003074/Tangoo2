import Layout from '../components/layout'
import Head from 'next/head'
import React from 'react'

export default function Quiz() {

    function keydown(e) {
        console.log(e.key)

    }

    React.useEffect(() => {
        window.addEventListener('keydown', keydown)
        return () => {
            window.removeEventListener('keydown', keydown)
        }
    }, [])

    return (
        <Layout>
            <Head>
                <title>Quiz</title>
            </Head>
            <div>
                Quiz
            </div>
        </Layout>
    )
}