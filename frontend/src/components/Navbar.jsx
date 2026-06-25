import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import axiosInstance from '../utils/axiosInstance.js'
import { useUser } from '../context/UserContext.jsx'


function Navbar(){
    

    const location = useLocation()
    const navigate = useNavigate()
    const search = location.state?.search 
    const searchResult = location.state?.searchResult

    
    const user= useUser()
    
    useEffect(()=>{
        console.log('ye navbar ka loga hai')
        console.log('User is ', user)
        console.log('user.user is ', user.user)
    },[user])
    
    
    const isAuthPage =
        location.pathname.includes('/auth')

    const isMainPage =
        location.pathname === '/' ||
        location.pathname.includes('/restaurant') ||
        location.pathname.includes('/food')

    
    const isMenuPage = location.pathname.includes('/menu')


    const isHistoryPage = location.pathname.includes('/history')

    const pageTitles = {
        '/profile': 'Profile',
        '/cart': 'Your Cart',
        '/history': 'Order History'
    }

    const currentTitle =pageTitles[location.pathname]

    
    // AUTH NAVBAR

    if(isAuthPage){

        return(

            <nav className="w-full bg-zinc-950 border-b border-zinc-800 px-4 sm:px-6 py-4 sm:py-5 flex items-center justify-center">
                <div className="flex items-center gap-2 sm:gap-3">
                    <div className="w-10 h-10 rounded-2xl bg-white flex items-center justify-center text-black font-bold text-lg">
                        F
                    </div>

                    <div>
                        <h1 className="text-white text-lg sm:text-xl font-bold">
                            Foodie
                        </h1>

                        <p className="text-zinc-500 text-xs">
                            Food Delivery App
                        </p>
                    </div>
                </div>
            </nav>
        )
    }

    if(isMenuPage){
        return(
            <nav className="w-full bg-zinc-950 border-b border-zinc-800 px-4 sm:px-6 py-4 sm:py-5 flex items-center gap-5">
                
                <button

                    onClick={() =>{

                        if(location.state?.search){

                            navigate('/',{

                                state:{
                                    search,
                                    searchResult
                                }

                            })
                            
                        }else{

                            navigate(-1)

                        }

                    }}
                    className="text-white text-2xl hover:text-zinc-400 transition cursor-pointer"
                >
                    ←
                </button>
            </nav>
        )
    }

    if(isHistoryPage){
        return(
            <nav className="w-full bg-zinc-950 border-b border-zinc-800 px-4 sm:px-6 py-4 sm:py-5 gap-8 flex items-center gap-5">
                <button
                    onClick={() => navigate('/')}
                    className="text-white text-2xl hover:text-zinc-400 transition cursor-pointer"
                >
                    🏠
                </button>

                <h1 className="text-white text-xl sm:text-2xl font-semibold">
                    Order History
                </h1>
            </nav>
        )
    }

    if(!isMainPage){
        return(
            <nav className="w-full bg-zinc-950 border-b border-zinc-800 px-4 sm:px-6 py-4 sm:py-5 flex items-center gap-5">
                <button
                    onClick={() => navigate(-1)}
                    className="text-white text-2xl hover:text-zinc-400 transition cursor-pointer"
                >
                    ←
                </button>

                <h1 className="text-white text-2xl font-semibold">
                    {currentTitle}
                </h1>
            </nav>
        )
    }

   
    // HOME + MENU NAVBAR

    return(

        <nav className="w-full bg-zinc-950 border-b border-zinc-800 px-4 sm:px-6 py-4 flex items-center justify-between sticky top-0 z-50 backdrop-blur-md">

            {/* LEFT */}

            <div>

                <p className="text-zinc-500 text-xs sm:text-sm">
                    Welcome
                </p>
                
                <h1 className="text-white text-lg sm:text-xl font-semibold">
                    {user?.user?.name || 'Guest'}
                </h1>

            </div>

            {/* RIGHT */}

            <div className="flex items-center gap-3 sm:gap-5 text-lg sm:text-xl text-zinc-300">

                {
                user?.user 
                ?
                (
                    
                    <>

                        <button className="hover:text-white transition cursor-pointer">

                            🔔

                        </button>

                        <Link
                            to="/cart"
                            className="hover:text-white transition cursor-pointer"
                        >
                            🛒
                        </Link>

                        <Link
                            to="/profile"
                            className="hover:text-white transition cursor-pointer"
                        >
                            👤
                        </Link>

                    </>
                )
                :
                (
                    <button
                        onClick={() => navigate('/auth/login')}
                        className="hover:text-white transition cursor-pointer"
                    >
                        👤
                    </button>
                )
                }

            </div>

        </nav>
    )
}

export default Navbar