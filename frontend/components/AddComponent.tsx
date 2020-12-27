import { Form, Col, Button } from 'react-bootstrap'

export default function Add() {
    return (
        <form>
            <Form.Group>
                <Col sm="4" className="mb-2">
                    <Form.Control size="sm" type="text" name="english_phrase" placeholder="English Phrase" />
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
    )
}