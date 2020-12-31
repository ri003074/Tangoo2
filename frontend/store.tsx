import { useMemo } from 'react'
import { createStore, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'

let store

const initialState = {
    contents: [],
    missCount: 0,
    currentQuizNumber: 0,
    wordLocation: 1,
    wordBlank: '',
    totalQuizNumber: 0,
    correctCounter: 0,
    studiedCounter:1,
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case 'TYPING':
            if (state.contents[state.currentQuizNumber].word_en[state.wordLocation] !== action.key) {
                return {
                    ...state,
                    missCount: state.missCount + 1
                }
            } else {
                let wordLocation = state.wordLocation + 1
                let currentQuizNumber = state.currentQuizNumber
                let missCount = state.missCount
                let wordBlank = state.contents[state.currentQuizNumber].word_en.substring(0, wordLocation) + '_'.repeat(state.contents[state.currentQuizNumber].word_blank.length - wordLocation);
                console.log(wordBlank)

                if (state.contents[state.currentQuizNumber].word_en.length === wordLocation) {
                    currentQuizNumber = currentQuizNumber + 1
                    wordLocation = 1
                    missCount = 0
                    wordBlank = state.contents[currentQuizNumber].word_blank
                }

                return {
                    ...state,
                    wordLocation: wordLocation,
                    currentQuizNumber: currentQuizNumber,
                    missCount: missCount,
                    wordBlank: wordBlank,
                }
            }
        case 'LOAD_DATA':
            return {
                ...state,
                contents: action.data,
                wordBlank: action.data[state.currentQuizNumber].word_blank,
                totalQuizNumber: action.data.length
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
