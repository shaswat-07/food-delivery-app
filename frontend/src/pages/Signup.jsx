
import { useState } from "react"
import { GoogleLogin } from '@react-oauth/google'
import { useNavigate } from 'react-router-dom'

import axiosInstance from "../utils/axiosInstance.js"

function Signup(){

    const navigate = useNavigate()
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    

    async function handleSignup(){

        try{

            await axiosInstance.post(
                '/api/auth/signup',
                {
                    name,
                    email,
                    password
                }
            )

            navigate('/auth/login')

        }
        catch(error){

            setError(error.response?.data || error.message)
            console.log(error.response?.data || error.message)

        }
    }

    return(

        <div className="h-full w-full overflow-hidden bg-inherit flex items-center justify-center px-5">

            <div className="w-full max-w-md bg-zinc-900 border border-zinc-800 rounded-3xl p-6 flex flex-col gap-3 shadow-2xl">

                <div>

                    <h1 className="text-3xl font-bold text-white">
                        Create Account
                    </h1>

                    <p className="text-zinc-400 mt-2">
                        Join and start ordering delicious food
                    </p>

                </div>

                <input
                    type="text"
                    placeholder="Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full bg-zinc-800 text-white rounded-2xl p-4 outline-none border border-zinc-700 focus:border-zinc-500 transition"
                />

                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-zinc-800 text-white rounded-2xl p-4 outline-none border border-zinc-700 focus:border-zinc-500 transition"
                />

                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full bg-zinc-800 text-white rounded-2xl p-4 outline-none border border-zinc-700 focus:border-zinc-500 transition"
                />

                <button
                    onClick={handleSignup}
                    className="w-full bg-white text-black rounded-2xl p-4 font-semibold hover:opacity-90 transition"
                >
                    Signup
                </button>

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

                                navigate('/')

                            }catch(error){
                                setError(error.response?.data || error.message)
                                console.log(error)
                            }
                        }}
                        onError={() => console.log('Google Login Failed')}
                    />

                </div>

                {
                error && 
                (
                    <div>
                        <p className= 'text-red-500'>{error.message}</p>
                    </div>
                )
                }

                <p className="text-zinc-400 text-sm text-center">

                    Already have an account?{" "}

                    <span
                        onClick={() => navigate('/auth/login')}
                        className="text-blue-400 hover:underline cursor-pointer"
                    >
                        Login
                    </span>

                </p>

            </div>

        </div>
    )
}

export default Signup