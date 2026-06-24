import { useState } from "react"
import { useNavigate } from "react-router-dom"
import Navbar from "./Navbar"
import axiosInstance from "../utils/axiosInstance.js"
import { useUser } from "../context/UserContext.jsx"


function FoodCard({ food, switchToRestaurant, search, searchResult }){
    
    const navigate= useNavigate()
    const user= useUser()
    const [error, setError] = useState('')
    const [add, setAdd]= useState(false)

    const handleClick=()=>{
        
        navigate(`/menu/${food.restaurant}`,{
            state:{
                search,
                searchResult
            }
        })
    
    }

    return(

        <div className="w-full bg-zinc-900 border border-zinc-800 rounded-2xl p-4 sm:p-5 flex flex-col gap-4 hover:border-zinc-700 transition">

            {/* TOP ROW */}

            <div className="flex items-center justify-between">

                <div className="flex items-center gap-2">

                    <div
                        className={`w-3 h-3 rounded-full ${
                            food.isVeg ? 'bg-green-500' : 'bg-red-500'
                        }`}
                    ></div>

                    <h2 className="text-white text-base sm:text-lg font-semibold">
                        {food.name}
                    </h2>

                </div>

                <p className="text-white text-base sm:text-lg font-bold">
                    ₹{food.price}
                </p>

            </div>

            {
            error &&
            (
                <div>
                    <p className="text-red-500">
                        {error.message}
                    </p>
                </div>
            )
            }

            {/* BUTTON ROW */}

            
            <div className="flex gap-3 flex-col sm:flex-row sm:items-start">

                {
                switchToRestaurant &&
                (
                    <button
                        className="w-full sm:w-auto cursor-pointer bg-white text-black px-6 py-2 rounded-xl text-sm font-medium whitespace-nowrap hover:opacity-90 transition"
                        onClick={handleClick}
                    >
                        View Restaurant
                    </button>
                )
                }

                <button
                    className="w-full sm:w-auto cursor-pointer bg-white text-black px-6 py-2 rounded-xl text-sm font-medium whitespace-nowrap hover:opacity-90 transition"
                    onClick={async () => {

                        try{

                            if(!user){
                                navigate('/auth/login')
                                return
                            }

                            if(!add){

                                await axiosInstance.post(
                                    'api/cart/update',
                                    {
                                        foodId: food._id,
                                        quantity: 1
                                    }
                                )

                                setAdd(true)

                            }else{

                                return

                            }

                        }catch(error){

                            setError(
                                error.response?.data || error.message
                            )

                            setTimeout(() => {

                                setError('')

                            }, 3000)

                            console.log(
                                error.response?.data || error.message
                            )

                        }
                    }}
                >
                    {
                    add
                    ? 'Added to Cart'
                    : 'Add to Cart'
                    }
                </button>

            </div>

        </div>

    )
}

export default FoodCard