import { useMemo } from 'react'
import { createStore, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'

let store

const initialState = {
    count: 0,
    word: 'k',
    contents: [],
    quizNumber: 0,
    wordLocation: 1,
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case 'NEXT_QUIZ':
            return {
                ...state,
                wordLocation: 1,
                quizNumber: state.quizNumber + 1
            }
        case 'CORRECT_TYPE':
            console.log("CORRECT_TYPE")

            const wordLocation = state.wordLocation + 1
            state.contents[state.quizNumber].word_blank = state.contents[state.quizNumber].word_en.substring(0, wordLocation) + '_'.repeat(state.contents[state.quizNumber].word_blank.length - wordLocation);
            console.log(state.contents[state.quizNumber].word_blank)
            return {
                ...state,
                wordLocation: wordLocation,
                contents: state.contents
            }
        case 'TYPING':
            return {
                ...state,
                count: initialState.count,
                word: action.key,
            }
        case 'LOAD_DATA':
            return {
                ...state,
                contents: action.data
            }
        default:
            return state
    }
}

export const correctType = () => {
    return { type: 'CORRECT_TYPE' }
}

export const nextQuiz = () => {
    return { type: 'NEXT_QUIZ' }
}

export const typing = (key) => {
    return { type: 'TYPING', key: key }
}

function initStore(preloadedState = initialState) {
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
