import DeleteQuestion from '@/components/DeleteQuestion'
import { store } from '@/store'
import '@/styles/global.css'
import { AppProps } from 'next/app'
import { Provider } from 'react-redux'

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <Component {...pageProps} />
      <DeleteQuestion />
    </Provider>
  )
}
