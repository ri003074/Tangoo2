import React from 'react'
import { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import axios from 'axios'

const useCounter = () => {
    const contents = useSelector((state) => state.contents)
    const wordLocation = useSelector((state) => state.wordLocation)
    const quizNumber = useSelector((state) => state.quizNumber)
    const dispatch = useDispatch()

    const typing = (key) =>
        dispatch({
            type: 'TYPING',
            key: key
        })
    const loadExampleData = (data) => {
        return { type: 'LOAD_DATA', data }
    }

    return { typing, contents, wordLocation, quizNumber, loadExampleData }
}

const Counter = () => {
    const { typing, contents, wordLocation, quizNumber, loadExampleData } = useCounter()
    const [isLoading, setIsLoading] = useState(false)
    const dispatch = useDispatch()

    function keydown(e) {
        console.log(e.key)
        typing(e.key)
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
                contents[0] && !isLoading ? (
                    <div>
                        <p>ok</p>
                        <p>{contents[0].phrase_en}</p>
                    </div>
                ) : (
                        <p>loading...</p>
                    )
            }

            <h1>
                {/* <div>{contents[quizNumber].phrase_ja}</div>
                <div>{contents[quizNumber].phrase_quiz}</div>
                <div>{contents[quizNumber].word_blank}</div> */}
            </h1>
        </div>
    )
}

export default Counter
