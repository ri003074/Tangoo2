import { useMemo } from 'react'
import { createStore, applyMiddleware, Store } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import axios from 'axios'

let store: Store<{ contents: any; wordBlank: string; totalQuizNumber: number; studiedCounter: number; correctCounter: number; missCount: number; currentQuizNumber: number; wordLocation: number; quizRandom: boolean }, any>

const initialState = {
    contents: [],
    missCount: 0,
    currentQuizNumber: 0,
    wordLocation: 1,
    wordBlank: '',
    totalQuizNumber: 0,
    correctCounter: 0,
    studiedCounter: 1,
    quizRandom: false,
}

const speak = (phrase: string, waitTime: Number) => {
    var speak = new SpeechSynthesisUtterance();
    speak.text = phrase
    speak.rate = 1.0
    speak.pitch = 0
    speak.lang = 'en-US'
    speechSynthesis.speak(speak)
    sleep(waitTime)
}

const sleep = (waitMsec) => {
    let startMsec = new Date();

    while (new Date() - startMsec < waitMsec);
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case 'TYPING':
            if (state.contents[state.currentQuizNumber].word_en[state.wordLocation] === action.key || state.missCount > 5) {

                let wordLocation: number = state.wordLocation + 1
                let currentQuizNumber: number = state.currentQuizNumber
                let missCount: number = state.missCount
                let wordBlank: string = state.contents[state.currentQuizNumber].word_en.substring(0, wordLocation) + '_'.repeat(state.contents[state.currentQuizNumber].word_blank.length - wordLocation);
                let correctCounter: number = state.correctCounter
                let studiedCounter: number = state.studiedCounter
                let data = state.contents[state.currentQuizNumber]

                console.log(wordBlank)

                if (state.contents[state.currentQuizNumber].word_en.length === wordLocation) {
                    if (state.quizRandom) {
                        currentQuizNumber = Math.floor(Math.random() * state.contents.length)
                    } else {
                        currentQuizNumber = currentQuizNumber + 1
                    }

                    data.s_counter = studiedCounter + 1

                    if (state.missCount === 0) {
                        data.c_counter = correctCounter + 1
                    }

                    axios
                        .put("http://localhost:8000/api/" + data.id + "/", data)
                        .then(function (response) {
                            console.log(response.data)
                        })

                    console.log(currentQuizNumber)
                    wordLocation = 1
                    missCount = 0
                    wordBlank = state.contents[currentQuizNumber].word_blank
                    studiedCounter = state.contents[currentQuizNumber].s_counter
                    correctCounter = state.contents[currentQuizNumber].c_counter
                    speak(state.contents[state.currentQuizNumber].phrase_en, state.contents[state.currentQuizNumber].phrase_en.length * 80);
                }
                return {
                    ...state,
                    wordLocation: wordLocation,
                    currentQuizNumber: currentQuizNumber,
                    missCount: missCount,
                    wordBlank: wordBlank,
                    studiedCounter: studiedCounter,
                    correctCounter: correctCounter,
                }
            } else {
                return {
                    ...state,
                    missCount: state.missCount + 1
                }
            }
        case 'LOAD_DATA':
            return {
                ...state,
                contents: action.data,
                wordBlank: action.data[state.currentQuizNumber].word_blank,
                totalQuizNumber: action.data.length,
                studiedCounter: action.data[state.currentQuizNumber].s_counter,
                correctCounter: action.data[state.currentQuizNumber].c_counter
            }

        case 'RANDOM':
            return {
                ...state,
                quizRandom: true
            }
        case 'DELETE':
            let contents = [...state.contents]
            console.log(contents.length)
            if (confirm("Are you sure you want to delete?")) {

                axios //delete from database
                    .delete("http://localhost:8000/api/" + state.contents[action.itemNumber].id + "/", state.contents[action.itemNumber])
                    .then(function (response) {
                        console.log(response.data)
                    })
                // contents.splice(action.itemNumber, 1) //delete from contents
                contents.splice(action.itemNumber, 1)
            }
            console.log("after", contents.length)
            return {
                ...state,
                contents: contents,
            }
        default:
            return state
    }
}

export const typing = (key) => {
    return { type: 'TYPING', key: key }
}

export const random = () => {
    return { type: 'RANDOM' }
}

export const deleteContent = (index) => {
    return {
        type: 'DELETE',
        itemNumber: index
    }
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
