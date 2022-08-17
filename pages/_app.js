import "../styles/globals.css"
import { RecoilRoot } from "recoil"
import { AuthContextProvider } from "../context/AuthContext"
import { useRouter } from "next/router"


const noAuthRequired = ['/', '/auth/signUp', '/auth/logIn']

export default function App({
  Component, pageProps: { session, ...pageProps },
}) {
  return (
      <AuthContextProvider>
        <RecoilRoot>
                  <Component {...pageProps} />
        </RecoilRoot>
      </AuthContextProvider>
   )
}