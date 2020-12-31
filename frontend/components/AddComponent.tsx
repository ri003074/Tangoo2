import { Form, Col, Button } from 'react-bootstrap'
import axios from 'axios'

export default function Add() {
    const handleSubmit = (e) => {
        e.preventDefault()

        const form = e.target
        const formData = new window.FormData(form)
        const english_phrase = formData.get('english_phrase')
        const japanese_phrase = formData.get('japanese_phrase')
        const english_word = formData.get('english_word')
        form.reset()

        const content = {
            phrase_en: english_phrase,
            phrase_ja: japanese_phrase,
            word_en: english_word
        }

        axios
            .post("http://localhost:8000/api/", content)
            .then(function (response) {
                console.log(response.data)
            })
    }
    return (
        <form onSubmit={handleSubmit}>
            <Form.Group>
                <Col sm="4">
                    <Form.Control type="text" name="english_phrase" placeholder="English Phrase" required />
                </Col>
            </Form.Group>
            <Form.Group>
                <Col sm="4">
                    <Form.Control type="text" name="japanese_phrase" placeholder="Japanese Phrase" required />
                </Col>
            </Form.Group>
            <Form.Group>
                <Col sm="4">
                    <Form.Control type="text" name="english_word" placeholder="English Word" required />
                </Col>
            </Form.Group>
            <button className="btn ml-3" type="submit" >
                Add
            </button>
        </form>
    )
}