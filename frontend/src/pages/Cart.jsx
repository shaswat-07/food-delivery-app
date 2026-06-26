import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axiosInstance from '../utils/axiosInstance'
import CartSkeleton from '../components/skeleton/CartSkeleton.jsx'
import Navbar from '../components/Navbar'
import CartItem from '../components/CartItem'

function Cart(){

    
    const navigate = useNavigate()
    const [cartItems, setCartItems] = useState([])
    const [selectedItems, setSelectedItems] = useState([])
    const [loading, setLoading] = useState(true)

    
    useEffect(() => {
        
        async function fetchCart(){

            try{

                const res = await axiosInstance.get('/api/cart/view')
                setCartItems(res.data.items)

            }
            catch(error){

                console.log(error)

            }
            finally{

                setLoading(false)

            }

        }

        fetchCart()

    }, [])


    function handleSelect(itemId){
        
        setSelectedItems((prev) => {

            if(prev.includes(itemId)){

                return prev.filter(id => id !== itemId)

            }

            return [...prev, itemId]

        })

    }


    async function handleIncrease(foodId, newQuantity){

        try{

            await axiosInstance.post('/api/cart/update', {

                foodId,
                quantity: newQuantity

            })
            setCartItems((prev) =>
                prev.map((item) =>
                    item.food._id === foodId
                    ? { ...item, quantity: newQuantity }
                    : item
                )
            )
        }catch(error){

            console.log(error)

        }
    }


    async function handleDecrease(foodId, newQuantity){

        if(newQuantity < 1) {

            try{

                await axiosInstance.delete(`/api/cart/remove/${foodId}`)
                setCartItems((prev) =>
                    prev.filter((item) => item.food._id !== foodId)
                )

            }
            catch(error){

                console.log(error)  

            }

        }
        else{

            try{

                await axiosInstance.post('/api/cart/update', {

                    foodId,
                    quantity: newQuantity

                })
                setCartItems((prev) =>
                    prev.map((item) =>
                        item.food._id === foodId && item.quantity > 1
                        ? { ...item, quantity: newQuantity }
                        : item
                    )

                )

            }
            catch(error){

                console.log(error)

            }

        }

            
    }


    function handleProceedToOrder(){

        navigate('/order', {

            state: {

                selectedItems

            }

        })

    }

    if(loading){
        return <CartSkeleton/>
    }

    return(

        <div className="min-h-screen bg-black">

            <Navbar />

            {/* PAGE HEADER */}

            <div className="w-[90%] mx-auto pt-8 sm:pt-10 pb-6">

                <h1 className="text-3xl sm:text-4xl font-bold text-white">
                    Your Cart
                </h1>

                <p className="text-zinc-400 text-sm sm:text-base mt-2">
                    Review your selected items before placing the order
                </p>

            </div>

            {/* CART ITEMS */}

            <div className="w-[90%] mx-auto flex flex-col gap-5 pb-40 sm:pb-36">

                {
                cartItems.length > 0
                ?
                (
                    cartItems.map((item) => (

                        <CartItem
                            key={item._id}
                            item={item}
                            handleSelect={() => handleSelect(item.food._id)}
                            selectedItems={selectedItems}
                            onIncrease={() => handleIncrease(item.food._id, item.quantity + 1)}
                            onDecrease={() => handleDecrease(item.food._id, item.quantity - 1)}
                        />
                    ))
                )
                :
                (
                    <div className="w-full bg-zinc-900 border border-zinc-800 rounded-3xl p-8 sm:p-10 flex flex-col items-center justify-center mt-10">

                        <h2 className="text-white text-xl sm:text-2xl font-semibold">
                            Your cart is empty
                        </h2>

                        <p className="text-zinc-500 text-sm sm:text-base mt-3 text-center">
                            Add some delicious food to continue ordering
                        </p>

                    </div>
                )
                }

            </div>

            {
            cartItems.length > 0 &&
            (
                <div className="fixed bottom-0 left-0 w-full bg-zinc-950/95 backdrop-blur-md border-t border-zinc-800 px-4 sm:px-6 py-4 sm:py-5">

                    <div className="w-[90%] mx-auto flex items-center justify-between gap-4">

                        <div>

                            <p className="text-zinc-400 text-xs sm:text-sm">
                                Selected Items
                            </p>

                            <h2 className="text-white text-xl sm:text-2xl font-bold">
                                {selectedItems.length}
                            </h2>

                        </div>

                        <button
                            onClick={handleProceedToOrder}
                            disabled={selectedItems.length === 0}
                            className={`px-5 sm:px-8 py-3 sm:py-4 rounded-2xl font-semibold text-base sm:text-lg transition whitespace-nowrap ${
                                selectedItems.length > 0
                                ? 'bg-red-500 hover:bg-red-600 text-white'
                                : 'bg-zinc-800 text-zinc-500 cursor-not-allowed'
                            }`}
                        >
                            Proceed To Order
                        </button>

                    </div>

                </div>
            )
            }

        </div>
    )
}
export default Cart