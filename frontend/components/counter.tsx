import React from 'react'
import { useSelector, useDispatch } from 'react-redux'

const useCounter = () => {
    const count = useSelector((state) => state.count)
    const word = useSelector((state) => state.word)
    const contents = useSelector((state) => state.contents)
    const wordLocation = useSelector((state) => state.wordLocation)
    const quizNumber = useSelector((state) => state.quizNumber)
    const isFetching = useSelector((state) => state.isFetching)
    const dispatch = useDispatch()
    const increment = () =>
        dispatch({
            type: 'INCREMENT',
        })
    const decrement = () =>
        dispatch({
            type: 'DECREMENT',
        })
    const reset = () =>
        dispatch({
            type: 'RESET',
        })
    const typing = (key) =>
        dispatch({
            type: 'TYPING',
            key: key
        })
    return { count, increment, decrement, reset, typing, word, contents, wordLocation, quizNumber, isFetching }
}

const Counter = () => {
    const { count, increment, decrement, reset, typing, word, contents, wordLocation, quizNumber, isFetching } = useCounter()
    function keydown(e) {
        console.log(e.key)
        typing(e.key)
    }

    React.useEffect(() => {
        window.addEventListener('keydown', keydown)
        return () => {
            window.removeEventListener('keydown', keydown)
        }
    }, [])

    if (isFetching) {
        return (
            <div>loading...</div>
        )
    }


    return (
        <div>
            <h1>
                Count: <span>{count}</span>
                <div>{word}</div>
                <div>{contents[quizNumber].phrase_ja}</div>
                <div>{contents[quizNumber].phrase_quiz}</div>
                <div>{contents[quizNumber].word_blank}</div>
            </h1>
            <button onClick={increment}>+1</button>
            <button onClick={decrement}>-1</button>
            <button onClick={reset}>Reset</button>
        </div>
    )
}

export default Counter
