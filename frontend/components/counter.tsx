import React from 'react'
import { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import axios from 'axios'

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
    const loadExampleData = (data) => {
        return { type: 'LOAD_DATA', data }
    }
    return { count, increment, decrement, reset, typing, word, contents, wordLocation, quizNumber, isFetching, loadExampleData }
}

const Counter = () => {
    const { count, increment, decrement, reset, typing, word, contents, wordLocation, quizNumber, isFetching, loadExampleData } = useCounter()
    function keydown(e) {
        console.log(e.key)
        typing(e.key)
    }

    const [isLoading, setIsLoading] = useState(false)
    const dispatch = useDispatch()

    React.useEffect(() => {
        window.addEventListener('keydown', keydown)
        setIsLoading(true)

        window
        axios.get('http://localhost:8000/api/')
            .then((response) => {
                console.log(response.data)

                let tmpData = []
                let contents = []
                let contentsCount = response.data.length;
                //Quiz用のデータを作成する。
                for (let i = 0; i < contentsCount; i++) {
                    var content = response.data[i]
                    var word_en_begin = content.word_en.slice(0, 1);

                    content.word_en_begin = word_en_begin
                    content.word_blank = word_en_begin + '_'.repeat(content.word_en.length - 1)
                    content.phrase_quiz = content.phrase_en.replace(content.word_en, '_'.repeat(content.word_en.length)) //英語のフレーズのなかで問題となる部分をを'_'で置き換える
                    content.correct_answer_rate = (content.c_counter / content.s_counter) * 100
                    tmpData.push(content)
                }
                tmpData.sort(function (a, b) { //正答率が低い順番に並び替える
                    return a.correct_answer_rate - b.correct_answer_rate
                })
                contents = tmpData

                // dispatch(loadExampleData(response.data))
                dispatch(loadExampleData(contents))
                setIsLoading(false)
            })
        return () => {
            window.removeEventListener('keydown', keydown)
        }


    }, [dispatch])

    //     window.addEventListener('keydown', keydown)
    //     return () => {
    //         window.removeEventListener('keydown', keydown)
    //     }
    // }, [])

    if (isFetching) {
        return (
            <div>loading...</div>
        )
    }


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
                Count: <span>{count}</span>
                <div>{word}</div>
                {/* <div>{contents[quizNumber].phrase_ja}</div>
                <div>{contents[quizNumber].phrase_quiz}</div>
                <div>{contents[quizNumber].word_blank}</div> */}
            </h1>
            <button onClick={increment}>+1</button>
            <button onClick={decrement}>-1</button>
            <button onClick={reset}>Reset</button>
        </div>
    )
}

export default Counter
