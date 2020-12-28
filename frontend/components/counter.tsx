import React from 'react'
import { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import axios from 'axios'
import { correctType, typing, nextQuiz } from '../store'

const Counter = () => {
    // const { typing, contents, quizNumber, loadExampleData, correctType } = useCounter()
    const contents = useSelector((state) => state.contents)
    const dispatch = useDispatch()
    let wordLocation = useSelector((state) => state.wordLocation)
    let quizNumber = useSelector((state) => state.quizNumber)

    function keydown(e) {
        console.log(e.key)
        console.log(wordLocation)
        typing(e.key)
        console.log(contents[quizNumber].word_en[wordLocation])
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
                        <p>{contents[quizNumber].phrase_ja}</p>
                        <p>{contents[quizNumber].phrase_quiz}</p>
                        <p>{contents[quizNumber].word_blank}</p>
                    </div>
                ) : (
                        <p>loading...</p>
                    )
            }
        </div>
    )
}

export default Counter
