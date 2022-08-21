import Header from "../../components/Header"
import Image from 'next/image'
import Logo from "../../public/logo.png"
import { useState } from "react"
import { useAuth } from "../../context/AuthContext"
import { useRouter } from "next/router"

const Login = () =>{

    const {user, login} = useAuth()
    const router = useRouter()

    const [data, setData] = useState({
            email: '',
            pwd: '',
        })

        const handleLogin = async (e) =>{
            e.preventDefault()
            
            console.log(user)
            try {
                await login(data.email, data.pwd)
                router.push('/')
              } catch (error) {
                console.log(error)
              }
        }

        return (
          <>
          <Header />
          <div className="flex flex-col items-center justify-center text-center">
            <div className="w-60">
              <Image src={Logo} alt="logo" />
              <p className="-mt-10 mb-10 font-xs italic">Veuillez vous connectez s'il vous plaît</p>
              <p className="-mt-10 mb-10 font-xs italic">Vous n'avez pas de compte ? <a className='navBtn font-semibold' href="./signUp" >Inscrivez-vous</a></p>
            </div>
              
              <form className="mb-0 space-y-6" onSubmit={handleLogin}>
                <div>
                  <label className="block text-sm font-medium text-gray-700" htmlFor="email">Email</label>
                  <div className="mt-3 mb-3">
                    <input className="w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm 
                    focus:outline-one focus:border-blue-900 focus:ring-1 focus:ring-blue-900" 
                    onChange={(e)=>
                    setData({
                        ...data,
                        email: e.target.value,
                    })}
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
                  <input  className="w-full rounded-md border border-gray-300 px-3 py-2 roudned-lg shadow-sm 
                  focus:outline-one focus:border-blue-900 focus:ring-1 focus:ring-blue-900"
                  onChange={(e)=>
                    setData({
                        ...data,
                        pwd: e.target.value,
                    })}
                    value={data.pwd} 
                  type="password" 
                  autoComplete="current-password"
                  placeholder="Mot de passe..."
                  required
                 />
                </div>
                <div className="mt-5 mb-5 flex items-center justify-center flex-row" >
                  <button type="submit" variant="primary"
                  className="w-full bg-blue-900 hover:bg-blue-700
                  text-white font-bold py-2 px-4 rounded-lg shadow-lg">Connexion</button>
                </div>
              </div>
            </form>
          </div>
        </>
    )
}
export default Login;