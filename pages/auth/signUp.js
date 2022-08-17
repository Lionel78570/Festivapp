import Header from "../../components/Header"
import Image from 'next/image'
import Logo from "../../public/logo.png"
import { useAuth } from '../../context/AuthContext'
import { useState } from "react"
import { useRouter } from "next/router"

const SignUp = () =>{

  const {user, signup} = useAuth()
  const router = useRouter();

  console.log(user)

  const [data, setData] = useState({
    pseudo: '',
    email: '',
    pwd: '',
})

const handleSignUp = async (e) =>{
    e.preventDefault()
    try {
      await signup(data.email, data.pwd)
      router.push('./login')
    } catch (error) {
      console.log(error)
    }
    console.log(data)
}
  
  return (
    <>
    <Header />
    <div className="flex flex-col items-center justify-center text-center">
      <div className="w-60">
        <Image src={Logo} alt="logo" />
      </div>
        <p className="-mt-10 mb-10 font-xs italic">Veuillez vous inscrire s'il vous plaît</p>
        <p className="-mt-10 mb-10 font-xs italic">Vous avez déjà un compte ? <a className="navBtn font-semibold" href="./login" >Connectez-vous</a></p>
        <form className="mb-0 space-y-6" onSubmit={handleSignUp}>
          <div>
            <label className="block text-sm font-medium text-gray-700" htmlFor="pseudo">Pseudo</label>
            <div className="mt-3 mb-3">
              <input 
              className="w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm 
              focus:outline-one focus:border-blue-900 focus:ring-1 focus:ring-blue-900"
              onChange={(e)=> setData({ ...data, pseudo: e.target.value })}
              value={data.pseudo}
              type="pseudo" 
              required/>
            </div>
            <label className="block text-sm font-medium text-gray-700" htmlFor="email">Email</label>
            <div className="mt-3 mb-3">
              <input className="w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm 
              focus:outline-one focus:border-blue-900 focus:ring-1 focus:ring-blue-900" 
              onChange={(e)=> setData({ ...data, email: e.target.value })}
              value={data.email}
              type="email" 
              autoComplete="email" 
              placeholder="Entrez votre email..."
              required
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700" htmlFor="password">Password</label>
          <div className="mt-3 mb-3">
            <input className="w-full rounded-md border border-gray-300 px-3 py-2 roudned-lg shadow-sm 
            focus:outline-one focus:border-blue-900 focus:ring-1 focus:ring-blue-900" 
            onChange={(e)=> setData({ ...data, pwd: e.target.value })}
            value={data.pwd}
            type="password" 
            autoComplete="current-password" 
            placeholder="Mot de passe..."
            required
            />
          </div>
          <div className="mt-5 mb-5 flex items-center justify-center flex-row" >
            <input id="signup" type="submit" value="Inscription" name="signup" 
            className="w-full bg-blue-900 hover:bg-blue-700
            text-white font-bold py-2 px-4 rounded-lg shadow-lg" />
          </div>
        </div>
      </form>
    </div>
    </>
  )
}

export default SignUp;
