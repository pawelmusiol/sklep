import Head from 'next/head'
import { TopBar, LoginModal } from "../components/organisms"

import CombinedProviders from "../components/providers"
import { useState } from "react"
import "../css/style.scss"

function MyApp({ Component, pageProps }) {
  const [LoginOpen, setLoginOpen] = useState({open:false, register:false})
  
  return (
    <CombinedProviders>
      <Head>
      </Head>
      <TopBar OpenLogin={setLoginOpen} />
      <LoginModal open={LoginOpen} setOpen={setLoginOpen} />
      <Component {...pageProps} />
    </CombinedProviders>
  )
}

export default MyApp
