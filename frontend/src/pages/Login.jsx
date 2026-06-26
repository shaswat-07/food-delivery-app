
import { useState } from "react"
import { GoogleLogin } from '@react-oauth/google'
import { useNavigate } from 'react-router-dom'
import { useUser } from "../context/UserContext.jsx"
import axiosInstance from "../utils/axiosInstance.js"

function Login(){


    const navigate = useNavigate()
    const {fetchUser} = useUser()

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [loginError, setLoginError] = useState('')
    const [loading, setLoading] = useState(false)
    
    async function handleLogin(){


        try{

            setLoading(true)
            const res = await axiosInstance.post('/api/auth/login',
                {
                    email,
                    password
                }
            )

            localStorage.setItem('access-token', res.data.accessToken)
            await fetchUser()

            navigate('/')

        }catch(error){
            setLoginError(error.response?.data || error.message)
            console.log(error.response?.data || error.message)
        }
        finally{

            setLoading(false)

        }
    }

    return(

        
        <div className="min-h-full bg-inherit flex items-center justify-center px-4 sm:px-5 md:px-6">
            

            <div className="w-full max-w-md bg-zinc-900 border border-zinc-800 rounded-3xl p-6 sm:p-8 flex flex-col gap-5 shadow-2xl">
                

                <div>

                    <h1 className="text-2xl sm:text-3xl font-bold text-white">
                        Welcome Back
                    </h1>

                    <p className="text-zinc-400 mt-2">
                        Login to continue ordering food
                    </p>

                </div>

                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-zinc-800 text-white rounded-2xl p-3 sm:p-4 outline-none border border-zinc-700 focus:border-zinc-500 transition"
                />

                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full bg-zinc-800 text-white rounded-2xl p-3 sm:p-4 outline-none border border-zinc-700 focus:border-zinc-500 transition"
                />

                {
                loading ?
                (
                    <button
                        disabled
                        className="w-full bg-white text-black rounded-2xl p-3 sm:p-4 font-semibold flex items-center justify-center gap-3 cursor-not-allowed"
                    >

                        <div className="w-5 h-5 border-2 border-black border-t-transparent rounded-full animate-spin"></div>

                        <span>Logging in</span>

                    </button>
                )
                :
                (
                    <button
                        onClick={handleLogin}
                        className="w-full bg-white text-black rounded-2xl p-3 sm:p-4 font-semibold hover:opacity-90 transition cursor-pointer"
                    >
                        Login
                    </button>
                )
                }
                

                <div className="flex items-center gap-3">

                    <div className="h-px bg-zinc-700 flex-1"></div>

                    <span className="text-zinc-500 text-sm">
                        OR
                    </span>

                    <div className="h-px bg-zinc-700 flex-1"></div>

                </div>

                <div className="flex justify-center">

                    <GoogleLogin text="continue_with"
                        onSuccess={async (credentialResponse) => {

                            try{

                                setLoading(true)
                                const res = await axiosInstance.post(
                                    '/api/auth/googleLogin',
                                    {
                                        token: credentialResponse.credential
                                    }
                                )

                                localStorage.setItem(
                                    'access-token',
                                    res.data.accessToken
                                )
                                await fetchUser()

                                navigate('/')

                            }
                            catch(error){

                                setLoginError(error.response?.data || error.message)
                                console.log(error)

                            }
                            finally{

                                setLoading(false)

                            }
                        }}
                        onError={() => console.log('Google Login Failed')}
                    />

                </div>

                {
                loginError && 
                (
                    <div>
                        <p className= 'text-red-500'>{loginError.message}</p>
                    </div>
                )
                }

                <p className="text-zinc-400 text-xs sm:text-sm text-center">

                    Don't have an account?{" "}

                    <span
                        onClick={() => navigate('/auth/signup')}
                        className="text-blue-400 hover:underline cursor-pointer"
                    >
                        Signup
                    </span>

                </p>

            </div>

        </div>
    )
}

export default Login