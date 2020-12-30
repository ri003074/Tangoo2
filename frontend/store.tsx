import { useMemo } from 'react'
import { createStore, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'

let store

const initialState = {
    count: 0,
    contents: [],
    missCount: 0,
    quizNumber: 0,
    wordLocation: 1,
    wordBlank:''
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case 'TYPING':
            if (state.contents[state.quizNumber].word_en[state.wordLocation] !== action.key) {
                return {
                    ...state,
                    missCount: state.missCount + 1
                }
            } else {
                let wordLocation = state.wordLocation + 1
                let quizNumber = state.quizNumber
                let missCount = state.missCount
                let wordBlank = state.contents[state.quizNumber].word_en.substring(0, wordLocation) + '_'.repeat(state.contents[state.quizNumber].word_blank.length - wordLocation);
                console.log(wordBlank)

                if (state.contents[state.quizNumber].word_en.length === wordLocation) {
                    quizNumber = quizNumber + 1
                    wordLocation = 1
                    missCount = 0
                    wordBlank = state.contents[quizNumber].word_blank
                }

                return {
                    ...state,
                    wordLocation: wordLocation,
                    quizNumber: quizNumber,
                    missCount: missCount,
                    wordBlank: wordBlank,
                }
            }
        case 'LOAD_DATA':
            return {
                ...state,
                contents: action.data,
                wordBlank:action.data[state.quizNumber].word_blank
            }
        default:
            return state
    }
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
