import Head from 'next/head'
import Layout from '../components/layout'
import { Table } from 'react-bootstrap'
import Display from '../components/DisplayComponent'

export async function getServerSideProps() {
  const res = await fetch('http://localhost:8000/api/')
  const contents = await res.json();
  return { props: { contents } };
}

export default function Home({ contents }) {

  return (
    <Layout>
      <Head>
        <title>Tangoo</title>
      </Head>
      <Display contents={contents} />
    </Layout>
  )
}
