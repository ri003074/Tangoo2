import Head from 'next/head'
import Layout from '../components/layout'
import { Form, Col, Button } from 'react-bootstrap'
import AddComponent from '../components/AddComponent'

export default function Add() {
    function clickTest(e) {
        console.log("hehe")
        console.log(e.target)
        e.preventDefault()
    }
    return (
        <Layout>
            <Head>
                <title>Add</title>
            </Head>
            <AddComponent/>

        </Layout>
    )
}