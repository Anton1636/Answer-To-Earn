import AddQuestion from '@/components/AddQuestion'
import Banner from '@/components/Banner'
import Empty from '@/components/Empty'
import Header from '@/components/Header'
import Questions from '@/components/Questions'
import { getQuestions } from '@/services/blockchain'
import { globalActions } from '@/store/globalSlices'
import { QuestionProp, RootState } from '@/utils/interfaces'
import Head from 'next/head'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

export default function Home({ questionsData }: { questionsData: QuestionProp[] }) {
  const { questions } = useSelector((states: RootState) => states.globalStates)
  const dispatch = useDispatch()
  const { setQuestions } = globalActions

  useEffect(() => {
    dispatch(setQuestions(questionsData))
  }, [dispatch, setQuestions, questionsData])
  return (
    <div>
      <Head>
        <title>Home</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="min-h-screen w-screen pb-20 radial-gradient">
        <Header />
        <Banner questions={questions} />
        {questions.length > 0 ? <Questions questions={questions} /> : <Empty />}
        <AddQuestion />
      </main>
    </div>
  )
}

export const getServerSideProps = async () => {
  const data = await getQuestions()
  return {
    props: { questionsData: JSON.parse(JSON.stringify(data)) },
  }
}
