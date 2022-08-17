import { createContext, useContext } from 'react';
import { onAuthStateChanged, createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { useEffect } from 'react';
import { auth } from '../firebase';
import { useState } from 'react';


const AuthContext = createContext({})
export const useAuth = () => useContext(AuthContext);

export const AuthContextProvider = ({children}) => {

    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(() =>{
        const unsubscribe = onAuthStateChanged(auth, (user) =>{
            if (user){
                setUser({
                    uid: user.uid,
                    email: user.email,
                    displayName: user.displayName,
                    photoURL: user.photoURL,

                })
            }else{
                setUser(null)
            }
            setLoading(false)
        })
        return () =>{
            unsubscribe()
        }

    }, [])

    const signup = async (email, password) =>{
        return await createUserWithEmailAndPassword(auth, email, password)
    }

    const login = async (email, password) =>{
        return await signInWithEmailAndPassword(auth, email, password)
    }

    const logout = async () =>{
        setUser(null)
        await auth.signOut()
    }

    return <AuthContext.Provider value={{ user, signup, login, logout }}>{ loading ? null : children }</AuthContext.Provider>
}
