import { Table } from 'react-bootstrap'
import { DefaultRootState, RootStateOrAny, useDispatch } from 'react-redux'
import { deleteContent } from '../store'
import { useSelector } from 'react-redux'


export default function Display() {

    const contents = useSelector((state:RootStateOrAny) => state.contents)
    const dispatch = useDispatch()

    const deleteItem = (index) => {
        console.log(index)
        dispatch(deleteContent(index))
    }
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
                        <td style={{ width: '10%', textAlign: 'center' }} onClick={() => deleteItem(index)}>[x]</td>
                    </tr>
                )}
            </thead>
        </Table>
    )
}