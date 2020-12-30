import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { typing } from '../store'

export default function Quiz({ contents }) {
    const dispatch = useDispatch()
    const missCount = useSelector((state) => state.missCount)
    const quizNumber = useSelector((state) => state.quizNumber)
    const wordLocation = useSelector((state) => state.wordLocation) //TODO without this statement, program doesn't work. need to check

    const keydown = e => {
        dispatch(typing(e.key))
    }

    React.useEffect(() => {
        window.addEventListener('keydown', keydown)
        return () => {
            window.removeEventListener('keydown', keydown)
        }
    }, [dispatch])

    return (
        <div>
            {
                contents[quizNumber] ? (
                    <div>
                        
                        <div style={{ textAlign: 'center', margin: ' 8px 0 8px 0' }}>{missCount}</div>
                        <div style={{ textAlign: 'center', margin: ' 8px 0 8px 0' }}>{contents[quizNumber].phrase_ja}</div>
                        <div style={{ textAlign: 'center', margin: ' 8px 0 8px 0' }}>{contents[quizNumber].phrase_quiz}</div>
                        <div style={{ textAlign: 'center', margin: ' 8px 0 8px 0', letterSpacing: '0.1rem' }}>{contents[quizNumber].word_blank}</div>
                    </div>
                ) : (
                        <p>loading...</p>
                    )
            }
        </div>
    )
}