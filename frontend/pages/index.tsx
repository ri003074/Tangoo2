import Head from 'next/head'
import Layout from '../components/layout'
import Display from '../components/DisplayComponent'

export async function getServerSideProps() {
  // const res = await fetch('http://localhost:8000/api/')
  // const contents = await res.json();
  const contents = { "phrase_en": "aaa" }
  return { props: { contents } };
}

export default function Home({ contents }) {

  return (
    <Layout>
      <Head>
        <title>Tangoo</title>
      </Head>
      {/* <Display contents={contents} /> */}
    </Layout>
  )
}
