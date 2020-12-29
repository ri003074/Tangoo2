import axios from 'axios'
import React from 'react';
import { useDispatch } from 'react-redux';

const StateProvider = ({ children }) => {
    const dispatch = useDispatch()

    const loadContents = (data) => {
        return { type: 'LOAD_DATA', data }
    }

    React.useEffect(() => {

        axios.get('http://localhost:8000/api/')
            .then((response) => {

                let tmpData = []
                let contents = []
                let contentsCount = response.data.length

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

                dispatch(loadContents(contents))
            })
        return () => {
        }
    }, [dispatch])

    return <>{children}</>;
};

export default StateProvider;