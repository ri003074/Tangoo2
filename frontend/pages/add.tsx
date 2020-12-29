import AddComponent from '../components/AddComponent'
import Head from 'next/head'
import Layout from '../components/Layout'

export default function Add() {

    return (
        <Layout>
            <Head>
                <title>Add</title>
            </Head>
            <AddComponent />
        </Layout>
    )
}