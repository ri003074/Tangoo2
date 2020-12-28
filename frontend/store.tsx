import { useMemo } from 'react'
import { createStore, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import axios from 'axios'

let store

const initialState = {
    lastUpdate: 0,
    light: false,
    count: 0,
    word: 'k',
    contents: [],
    quizNumber: 0,
    wordLocation: 1,
    isFetching: false,
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case 'TICK':
            return {
                ...state,
                lastUpdate: action.lastUpdate,
                light: !!action.light,
            }
        case 'INCREMENT':
            return {
                ...state,
                count: state.count + 1,
                word: initialState.word,
            }
        case 'DECREMENT':
            return {
                ...state,
                count: state.count - 1,
                word: initialState.word,
            }
        case 'RESET':
            return {
                ...state,
                count: state.count,
                word: initialState.word,
            }
        case 'TYPING':
            console.log(state)
            return {
                ...state,
                count: initialState.count,
                word: action.key,
            }
        case 'LOAD_DATA':
            console.log("load data")
            console.log(action.data)
            return {
                ...state,
                contents: action.data

            }
        default:
            return state
    }
}

function initStore(preloadedState = initialState) {
    // preloadedState.isFetching = true
    // axios.get('http://localhost:8000/api/').then((response) => {
    //     let tmpData = []
    //     let contents = []
    //     let contentsCount = response.data.length;
    //     //Quiz用のデータを作成する。
    //     for (let i = 0; i < contentsCount; i++) {
    //         var content = response.data[i]
    //         var word_en_begin = content.word_en.slice(0, 1);

    //         content.word_en_begin = word_en_begin
    //         content.word_blank = word_en_begin + '_'.repeat(content.word_en.length - 1)
    //         content.phrase_quiz = content.phrase_en.replace(content.word_en, '_'.repeat(content.word_en.length)) //英語のフレーズのなかで問題となる部分をを'_'で置き換える
    //         content.correct_answer_rate = (content.c_counter / content.s_counter) * 100
    //         tmpData.push(content)
    //     }
    //     tmpData.sort(function (a, b) { //正答率が低い順番に並び替える
    //         return a.correct_answer_rate - b.correct_answer_rate
    //     })
    //     contents = tmpData
    //     preloadedState.contents = contents
    //     preloadedState.isFetching = false
    // })
    // preloadedState.count = 3
    return createStore(
        reducer,
        preloadedState,
        composeWithDevTools(applyMiddleware())
    )
}

export const initializeStore = (preloadedState) => {
    let _store = store ?? initStore(preloadedState)

    // After navigating to a page with an initial Redux state, merge that state
    // with the current state in the store, and create a new store
    if (preloadedState && store) {
        _store = initStore({
            ...store.getState(),
            ...preloadedState,
        })
        // Reset the current store
        store = undefined
    }

    // For SSG and SSR always create a new store
    if (typeof window === 'undefined') return _store
    // Create the store once in the client
    if (!store) store = _store

    return _store
}

export function useStore(initialState) {
    const store = useMemo(() => initializeStore(initialState), [initialState])
    return store
}
