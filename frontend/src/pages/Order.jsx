import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axiosInstance from '../utils/axiosInstance.js'
import { useLocation } from 'react-router-dom'
import Navbar from '../components/Navbar'
import OrderSummary from '../components/OrderSummary'
import OrderSkeleton from '../components/skeleton/OrderSkeleton.jsx'


function Order(){

    
    const location = useLocation()
    const {selectedItems}= location.state || {}
    const navigate = useNavigate()


    const[orderDetails, setOrderDetails]= useState(null)
    const [address, setAddress]= useState('')
    const[addressError, setAddressError]= useState(false)
    const [isEditingAddress, setIsEditingAddress]= useState(false)
    const [button, setButton]= useState(true)
    const [loader, setLoader]= useState(false)
    const [orderLoading, setOrderLoading]= useState(true)
    const [addressSaving, setAddressSaving]= useState(false)
    

    useEffect(()=>{

        if(!selectedItems || selectedItems.length === 0){

            navigate('/cart')

        } 
        else {

            getOrderDetails()

        }

    },[])


    useEffect(()=>{
        getAddress()
    },[])


    async function getAddress(){

        try{

            const response= await axiosInstance.get('/api/order/getAddress')
            setAddress(response.data)
            if(response.data){
                
                setIsEditingAddress(false)

            } 
            else {
            
                setIsEditingAddress(true)
                setAddressError(true)

            }
        }
        catch(error){

            console.error('Error fetching order details:', error)

        }
    }


    async function saveAddress(add){

        try{

            if(add===''){

                setAddressError(true)
                return

            }

            setAddressSaving(true)
            const response= await axiosInstance.post('/api/order/saveAddress', {address: add})
            setAddressError(false)
            setIsEditingAddress(false)

        }
        catch(error){

            console.error('Error fetching order details:', error)

        }
        finally{

            setAddressSaving(false)

        }

    }


    async function getOrderDetails(){

        try{

            const response = await axiosInstance.post(`/api/order/current`,{items: selectedItems})
            setOrderDetails(response.data)
            
        } catch(error){

            console.error('Error fetching order details:', error)

        }
        finally{

            setOrderLoading(false)

        }

    }


    async function handlePlaceOrder(){

        try{

            if(address===''){
                setAddressError(true)
                return
            }
            setLoader(true)
            await axiosInstance.post('/api/order/place',
                {items: selectedItems, address: address}
            )

            navigate('/history',{
                state: {address}
            })

        }

        catch(error){
            console.error('Error placing order:',error)
        }
        finally{

            setLoader(false)

        }
    }

    if(orderLoading){
        return <OrderSkeleton/>
    }
    

    return(

        <div className="min-h-screen bg-black pb-20">

            <Navbar />

            <div className="w-[90%] max-w-5xl mx-auto pt-8 sm:pt-10 flex flex-col gap-6 sm:gap-8">

                <div>

                    <h1 className="text-3xl sm:text-4xl font-bold text-white">
                        Checkout
                    </h1>

                    <p className="text-zinc-400 text-sm sm:text-base mt-2">
                        Review and place your final order
                    </p>

                </div>


                {
                orderDetails && orderDetails.order &&
                (
                    <OrderSummary
                        order={orderDetails.order}
                        address={address}
                        setAddress={setAddress}
                        saveAddress={saveAddress}
                        addressError={addressError}
                        isEditingAddress={isEditingAddress}
                        setIsEditingAddress={setIsEditingAddress}
                        button={button}
                        addressSaving={addressSaving}
                    />
                )
                }


                {
                orderDetails &&
                (
                    <div className="w-full bg-zinc-900 border border-zinc-800 rounded-2xl p-5 sm:p-6 flex flex-col gap-5">

                        <h2 className="text-white text-xl sm:text-2xl font-semibold">
                            Billing Details
                        </h2>

                        <div className="flex items-center justify-between text-zinc-400 text-sm sm:text-base">

                            <p>Subtotal</p>

                            <p>₹{orderDetails.order.subtotal}</p>

                        </div>

                        <div className="flex items-center justify-between text-zinc-400 text-sm sm:text-base">

                            <p>Taxes</p>

                            <p>₹{orderDetails.order.taxes}</p>

                        </div>

                        <div className="flex items-center justify-between text-zinc-400 text-sm sm:text-base">

                            <p>Delivery Fee</p>

                            <p>₹{orderDetails.order.deliveryFee}</p>

                        </div>

                        <div className="border-t border-zinc-700 pt-5 flex items-center justify-between">

                            <h2 className="text-white text-xl sm:text-2xl font-bold">
                                Total
                            </h2>

                            <h2 className="text-white text-xl sm:text-2xl font-bold">
                                ₹{orderDetails.order.total}
                            </h2>

                        </div>

                    </div>
                )
                }


                {
                orderDetails && orderDetails.order &&
                (
                    <button
                        onClick={handlePlaceOrder}
                        disabled={loader}
                        className={`w-full py-4 sm:py-5 rounded-2xl text-base sm:text-lg font-semibold transition flex items-center justify-center gap-3 ${
                            loader
                                ? 'bg-red-500 text-white cursor-not-allowed'
                                : 'bg-red-500 hover:bg-red-600 text-white cursor-pointer'
                        }`}
                    >

                        {
                        loader &&
                        (
                            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        )
                        }

                        {loader ? 'Placing Order' : 'Place Order'}

                    </button>
                )
                }

            </div>

        </div>

    )
}

export default Order