import Head from 'next/head'
import Layout from '../components/layout'
import { Table } from 'react-bootstrap'
import { useSelector } from 'react-redux'

export default function Display({contents}) {

    return (
        <Table>
            <thead>
                {contents.map((content, index) =>
                    <tr key={content.id}>
                        <td style={{ width: '10%', textAlign: 'center' }}>{index}</td>
                        <td style={{ width: '30%' }}>{content.phrase_en}</td>
                        <td style={{ width: '25%' }}>{content.phrase_ja}</td>
                        <td style={{ width: '15%' }}>{content.word_en}</td>
                        <td style={{ width: '10%' }}>{((content.c_counter / content.s_counter) * 100).toFixed(0)} %</td>
                        <td style={{ width: '10%' }}>[x]</td>
                    </tr>
                )}
            </thead>
        </Table>

    )
}