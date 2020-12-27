import Head from 'next/head'
import Layout from '../components/layout'
import { Form, Col, Button } from 'react-bootstrap'
import axios from 'axios'

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

            <form onSubmit={clickTest}>
                <Form.Group>
                    <Col sm="4" className="mb-2">
                        <Form.Control size="sm" type="text" name="english_phrase" value="a" placeholder="English Phrase" />
                    </Col>
                    <Col sm="4" className="mb-2">
                        <Form.Control size="sm" type="text" name="japanese_phrase" placeholder="Japanese Phrase" />
                    </Col>
                    <Col sm="4">
                        <Form.Control size="sm" type="text" name="english_word" placeholder="English Word" />
                    </Col>
                </Form.Group>
                <Button className="ml-3" variant="primary" type="submit" >
                    Submit
            </Button>
            </form>
        </Layout>
    )
}