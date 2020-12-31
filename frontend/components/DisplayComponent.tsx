import { Table } from 'react-bootstrap'

export default function Display({ contents }) {

    return (
        <Table>
            <thead>
                {contents.map((content, index) =>
                    <tr key={content.id}>
                        <td style={{ width: '10%', textAlign: 'center' }}>{('000' + index).slice(-3)}</td>
                        <td style={{ width: '30%' }}>{content.phrase_en}</td>
                        <td style={{ width: '25%' }}>{content.phrase_ja}</td>
                        <td style={{ width: '15%' }}>{content.word_en}</td>
                        <td style={{ width: '10%', textAlign: 'center' }}>{((content.c_counter / content.s_counter) * 100).toFixed(1)}%</td>
                        <td style={{ width: '10%', textAlign: 'center' }}>[x]</td>
                    </tr>
                )}
            </thead>
        </Table>
    )
}