import Head from 'next/head'
import Layout from '../components/layout'
import Display from '../components/DisplayComponent'
import { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import React from 'react'
import axios from 'axios'

export default function Home() {

  // const [isLoading, setIsLoading] = useState(false)
  // const dispatch = useDispatch()
  const contents = useSelector((state) => state.contents)

  // const loadContents = (data) => {
  //   return { type: 'LOAD_DATA', data }
  // }

  // React.useEffect(() => {
  //   setIsLoading(true)

  //   axios.get('http://localhost:8000/api/')
  //     .then((response) => {

  //       let tmpData = []
  //       let contents = []
  //       let contentsCount = response.data.length

  //       //Quiz用のデータを作成する。
  //       for (let i = 0; i < contentsCount; i++) {
  //         var content = response.data[i]
  //         var word_en_begin = content.word_en.slice(0, 1);

  //         content.word_en_begin = word_en_begin
  //         content.word_blank = word_en_begin + '_'.repeat(content.word_en.length - 1)
  //         content.phrase_quiz = content.phrase_en.replace(content.word_en, '_'.repeat(content.word_en.length)) //英語のフレーズのなかで問題となる部分をを'_'で置き換える
  //         content.correct_answer_rate = (content.c_counter / content.s_counter) * 100
  //         tmpData.push(content)
  //       }
  //       tmpData.sort(function (a, b) { //正答率が低い順番に並び替える
  //         return a.correct_answer_rate - b.correct_answer_rate
  //       })
  //       contents = tmpData

  //       dispatch(loadContents(contents))
  //       setIsLoading(false)
  //     })
  //   return () => {
  //   }
  // }, [dispatch])

  return (
    <Layout>
      <Head>
        <title>Tangoo</title>
      </Head>
      <Display contents={contents} />
    </Layout>
  )
}
