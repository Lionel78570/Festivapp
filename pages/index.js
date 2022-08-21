import Head from 'next/head'
import Header from '../components/Header'
import Feed from '../components/Feed'
import Modal from '../components/Modal'
import { useAuth } from '../context/AuthContext'
import { useRouter } from 'next/router'
import Image from 'next/image'
import Logo from '../public/logo.png'

const Home= () => {
  const {user, login} = useAuth();
  const router = useRouter();

  return (
    <div className="bg-blue-50 h-screen overflow-y-scroll scrollbar-hide">
      <Head>
        <title>Pogo</title>
        <link rel="icon" href="/logo.png" />
      </Head>
      <Header />
      {user ? (
        <>
        <Feed />
        <Modal/>   
        </>
      ) : (
        <div className="flex flex-col items-center justify-center text-center">
        <div className="w-60">
          <Image src={Logo} alt="logo" />
        </div>
            <p className="-mt-10 mb-10 font-xs italic">Vous avez déjà un compte ? 
            <a className='navBtn font-semibold' href="./auth/login" >Connectez-vous</a></p>
            <p className="-mt-10 mb-10 font-xs italic">Vous n'avez pas de compte ? 
            <a className='navBtn font-semibold' href="./auth/signUp" >Inscrivez-vous</a></p>
          </div>
      )};
    </div>
  )
}

export default Home
