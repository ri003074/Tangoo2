import React from 'react'
import { useSelector, useDispatch, RootStateOrAny } from 'react-redux'
import { typing } from '../store'

export default function Quiz({ contents }) {
    const dispatch = useDispatch()
    const missCount = useSelector((state: RootStateOrAny) => state.missCount)
    const currentQuizNumber = useSelector((state: RootStateOrAny) => state.currentQuizNumber)
    const totalQuizNumber = useSelector((state: RootStateOrAny) => state.totalQuizNumber)
    const wordBlank = useSelector((state: RootStateOrAny) => state.wordBlank)
    const correctCounter = useSelector((state: RootStateOrAny) => state.correctCounter)
    const studiedCounter = useSelector((state: RootStateOrAny) => state.studiedCounter)

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
                contents[currentQuizNumber] ? (
                    <div>
                        <div style={{ textAlign: 'center', margin: ' 8px 0 8px 0' }}>{currentQuizNumber}/{totalQuizNumber}</div>
                        <div style={{ textAlign: 'center', margin: ' 8px 0 8px 0' }}>{contents[currentQuizNumber].phrase_ja} ({((correctCounter / studiedCounter) * 100).toFixed(1)}%)</div>
                        <div style={{ textAlign: 'center', margin: ' 8px 0 8px 0' }}>{contents[currentQuizNumber].phrase_quiz}</div>
                        <div style={{ textAlign: 'center', margin: ' 8px 0 8px 0', letterSpacing: '0.1em', fontSize: '2rem' }}>{wordBlank}</div>
                        <div style={{ textAlign: 'center', margin: ' 8px 0 8px 0' }}>{missCount}</div>
                    </div>
                ) : (
                        <p>loading...</p>
                    )
            }
        </div>
    )
}