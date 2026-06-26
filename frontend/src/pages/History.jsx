import { useEffect, useState } from 'react'
import axiosInstance from '../utils/axiosInstance.js'
import { useNavigate, useLocation } from 'react-router-dom'
import HistorySkeleton from '../components/skeleton/HistorySkeleton.jsx'
import Navbar from '../components/Navbar.jsx'
import OrderSummary from '../components/OrderSummary.jsx'

function History(){

    const location = useLocation()
    const {address} = location.state || {}

    const [orderHistory, setOrderHistory]= useState([])
    const[loading, setLoading]= useState(true)

    async function getOrderHistory(){

        try{

            const response = await axiosInstance.get('/api/order/history')
            setOrderHistory(response.data.orders)

        }
        catch(error){

            console.error('Error fetching order history:', error)

        }
        finally{

            setLoading(false)

        }

    }

    useEffect(()=>{

        getOrderHistory()

    },[])
    
    if(loading){

        return <HistorySkeleton/>
        
    }
    
    return(
        <div className="min-h-screen bg-black pb-16">

            <Navbar />

            <div className="w-[90%] max-w-5xl mx-auto pt-8 sm:pt-10">

                <h1 className="text-3xl sm:text-4xl font-bold text-white">
                    Order History
                </h1>

                <p className="text-zinc-400 text-sm sm:text-base mt-2">
                    View all your previous food orders
                </p>

            </div>

            <div className="w-[90%] max-w-5xl mx-auto mt-10 flex flex-col gap-8">

                {
                orderHistory.length > 0
                ?
                (
                    orderHistory.map((order) => (

                        <div
                            key={order._id}
                            className="bg-zinc-900 border border-zinc-800 rounded-3xl overflow-hidden"
                        >

                            {/* TOP SECTION */}

                            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 px-5 sm:px-6 py-4 sm:py-5 border-b border-zinc-800">

                                <div>

                                    <h2 className="text-white text-lg sm:text-xl font-semibold">
                                        Order #{order._id.slice(-6)}
                                    </h2>

                                    <p className="text-zinc-500 text-sm mt-1">
                                        Delivered Successfully
                                    </p>

                                </div>

                                <div className="sm:text-right">

                                    <p className="text-zinc-500 text-sm">
                                        Total Paid
                                    </p>

                                    <h2 className="text-white text-xl sm:text-2xl font-bold">
                                        ₹{order.total}
                                    </h2>

                                </div>

                            </div>

                            {/* ITEMS */}

                            <div className="p-5 sm:p-6">

                                <OrderSummary
                                    order={order}
                                    button={false}
                                    address={address}
                                />

                            </div>

                            {/* BILLING */}

                            <div className="border-t border-zinc-800 px-5 sm:px-6 py-4 sm:py-5 flex flex-col gap-4">

                                <div className="flex items-center justify-between text-zinc-400 text-sm sm:text-base">

                                    <p>Subtotal</p>

                                    <p>₹{order.subtotal}</p>

                                </div>

                                <div className="flex items-center justify-between text-zinc-400 text-sm sm:text-base">

                                    <p>Taxes</p>

                                    <p>₹{order.taxes}</p>

                                </div>

                                <div className="flex items-center justify-between text-zinc-400 text-sm sm:text-base">

                                    <p>Delivery Fee</p>

                                    <p>₹{order.deliveryFee}</p>

                                </div>

                                <div className="border-t border-zinc-700 pt-4 flex items-center justify-between">

                                    <h2 className="text-white text-xl sm:text-2xl font-bold">
                                        Grand Total
                                    </h2>

                                    <h2 className="text-white text-xl sm:text-2xl font-bold">
                                        ₹{order.total}
                                    </h2>

                                </div>

                            </div>

                        </div>

                    ))
                )
                :
                (
                    <div className="w-full bg-zinc-900 border border-zinc-800 rounded-3xl p-8 sm:p-12 flex flex-col items-center justify-center mt-10">

                        <h2 className="text-white text-2xl sm:text-3xl font-semibold">
                            No Orders Yet
                        </h2>

                        <p className="text-zinc-500 mt-3 text-center text-sm sm:text-base">
                            Your previous food orders will appear here
                        </p>

                    </div>
                )
                }

            </div>

        </div>
    )
}

export default History