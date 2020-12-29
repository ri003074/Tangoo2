import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { correctType, typing, nextQuiz } from '../store'

export default function Quiz({ contents }) {
    // const { typing, contents, quizNumber, loadExampleData, correctType } = useCounter()
    const dispatch = useDispatch()
    let wordLocation = useSelector((state) => state.wordLocation)
    let quizNumber = useSelector((state) => state.quizNumber)

    function keydown(e) {
        console.log(e.key)
        console.log(wordLocation)
        typing(e.key)
        console.log(contents)
        if (contents[quizNumber].word_en[wordLocation] === e.key) {
            dispatch(correctType())
            console.log("correct type")
            wordLocation += 1

            if (wordLocation === contents[quizNumber].word_en.length) {
                console.log("next quiz")
                dispatch(nextQuiz())
                wordLocation = 1
                quizNumber += 1
            }
        }
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
                        <div style={{ textAlign: 'center' }}>{contents[quizNumber].phrase_ja}</div>
                        <div style={{ textAlign: 'center' }}>{contents[quizNumber].phrase_quiz}</div>
                        <div style={{ textAlign: 'center' }}>{contents[quizNumber].word_blank}</div>
                    </div>
                ) : (
                        <p>loading...</p>
                    )
            }
        </div>
    )
}