import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useUser } from '../context/UserContext.jsx'
import axiosInstance from '../utils/axiosInstance.js'
import Navbar from '../components/Navbar'
import ProfileSkeleton from '../components/skeleton/ProfileSkeleton.jsx'

function Profile(){

    const navigate = useNavigate()

    const [currentUser, setCurrentUser] = useState(null)
    const[logoutError, setLogoutError]= useState(false)

    const user= useUser()
    const {loading} =useUser()

    
    useEffect(() => {

        setCurrentUser(user.user)
        
    },[])




    async function handleLogout(){

        try{
            
            const res= axiosInstance.post('/api/auth/logout')
            localStorage.removeItem('access-token')
            navigate('/auth/login')

        }
        catch(error){

            setLogoutError(true)
            console.log(error)

        }
    }

    if (loading){
        return <ProfileSkeleton/>
    }

    return(

        <div className="min-h-screen bg-black">

            <Navbar />

            <div className="w-[90%] max-w-4xl mx-auto pt-8 sm:pt-10 flex flex-col gap-6 sm:gap-8">

                {/* PROFILE HEADER */}

                <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-5 sm:p-8 flex items-center gap-4 sm:gap-6">

                    <div className="w-16 h-16 sm:w-24 sm:h-24 rounded-full bg-white text-black flex items-center justify-center text-3xl sm:text-4xl font-bold">

                        {user?.user?.name?.charAt(0).toUpperCase() || 'U'}

                    </div>

                    <div>

                        <h1 className="text-2xl sm:text-4xl font-bold text-white">
                            {user?.user?.name || 'User'}
                        </h1>

                        <p className="text-zinc-400 text-sm sm:text-base mt-1 sm:mt-2 break-all">
                            {user?.user?.email}
                        </p>

                    </div>

                </div>

                {/* OPTIONS */}

                <div className="flex flex-col gap-5">

                    {/* MY ORDERS */}

                    <button
                        onClick={() => navigate('/history')}
                        className="w-full bg-zinc-900 border border-zinc-800 rounded-3xl p-5 sm:p-6 flex items-center justify-between hover:border-zinc-700 transition group"
                    >

                        <div className="flex items-center gap-4 sm:gap-5">

                            <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-zinc-800 flex items-center justify-center text-xl sm:text-2xl">

                                📦

                            </div>

                            <div className="text-left">

                                <h2 className="text-white text-lg sm:text-xl font-semibold">
                                    My Orders
                                </h2>

                                <p className="text-zinc-500 text-sm mt-1">
                                    View your previous orders
                                </p>

                            </div>

                        </div>

                        <span className="text-zinc-500 text-xl sm:text-2xl group-hover:text-white transition">

                            →

                        </span>

                    </button>

                    {/* CART */}

                    <button
                        onClick={() => navigate('/cart')}
                        className="w-full bg-zinc-900 border border-zinc-800 rounded-3xl p-6 flex items-center justify-between hover:border-zinc-700 transition group"
                    >

                        <div className="flex items-center gap-5">

                            <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-zinc-800 flex items-center justify-center text-xl sm:text-2xl">

                                🛒

                            </div>

                            <div className="text-left">

                                <h2 className="text-white text-xl font-semibold">
                                    Your Cart
                                </h2>

                                <p className="text-zinc-500 text-sm mt-1">
                                    Manage your cart items
                                </p>

                            </div>

                        </div>

                        <span className="text-zinc-500 text-2xl group-hover:text-white transition">

                            →

                        </span>

                    </button>


                    {/* LOGOUT */}

                    <button
                        onClick={handleLogout}
                        className="w-full bg-red-500/10 border border-red-500 rounded-3xl p-6 flex items-center justify-between hover:bg-red-500/20 transition group mt-4"
                    >

                        <div className="flex items-center gap-5">

                            <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-zinc-800 flex items-center justify-center text-xl sm:text-2xl">

                                🚪

                            </div>

                            <div className="text-left">

                                <h2 className="text-red-400 text-lg sm:text-xl font-semibold">
                                    Logout
                                </h2>

                                <p className="text-red-300 text-xs sm:text-sm mt-1">
                                    Sign out from your account
                                </p>

                            </div>

                        </div>

                        <span className="text-red-400 text-xl sm:text-2xl">

                            →

                        </span>

                    </button>

                </div>

                {
                logoutError?
                (
                    <div>
                        <p className= 'text-red-500'>'Error in logging out. Please try again'</p>
                    </div>
                )
                :
                null
                }

            </div>

        </div>
    )
}

export default Profile