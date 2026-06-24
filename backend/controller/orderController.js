import Order from '../models/order.js'
import Cart from '../models/cart.js'
import order from '../models/order.js'
import User from '../models/user.js'
import cart from '../models/cart.js'


async function buildOrderDetails(userId, requestedItems){

    let userCart = await Cart.findOne({
        user: userId
    }).populate('items.food')

    if(!userCart || userCart.items.length === 0){
        throw new Error('Cart is empty')
    }

    let selectedItems = requestedItems || []

    if(requestedItems && requestedItems.length > 0){
        const ids = requestedItems
        selectedItems = userCart.items.filter(item =>
            ids.includes(item.food._id.toString())
        )
    }

    if(selectedItems.length === 0){
        throw new Error('No valid items selected')
    }

    let subtotal = 0

    const orderItems = selectedItems.map(item => {
        const price = item.food.price
        const quantity = item.quantity
        const totalPrice = price * quantity
        subtotal += totalPrice

        return {
            food: item.food._id,
            name: item.food.name,
            price,
            quantity,
            totalPrice
        }
    })

    const deliveryFee = 40
    const taxes = Math.floor(subtotal * 0.05)
    const total = subtotal + deliveryFee + taxes

    return {
        userCart,
        orderData: {
            user: userId,
            restaurant: selectedItems[0].food.restaurant,
            items: orderItems,
            subtotal,
            taxes,
            deliveryFee,
            total
        },
        selectedItems,
    }
}


export const current = async(req,res)=>{

    try{
        
        const { orderData } = await buildOrderDetails(
            req.user.id,
            req.body.items
        )

        res.status(200).json({
            message:'Order finalized',
            order: orderData
        })
    }
    
    catch(err){
        res.status(500).json({error: err.message})
    }
}


export const place = async(req,res)=>{

    try{

        const { address } = req.body

        if(!address){
            return res.status(400).json({
                error: 'Address is required to place order'
            })
        }

        const { orderData, userCart, selectedItems } =
            await buildOrderDetails(
                req.user.id,
                req.body.items
            )

        await Order.create(orderData)

        userCart.items =
            userCart.items.filter(item =>
                !selectedItems.some(sel =>
                    sel.food._id.toString() ===
                    item.food._id.toString()
                )
            )

        if(userCart.items.length === 0){
            userCart.restaurant = undefined
        }

        await userCart.save()

        res.status(200).json({
            message: 'Order placed successfully'
        })

    }

    catch(err){

        res.status(500).json({error: err.message})

    }

}

export const getAddress = async(req,res)=>{


    try{
        
        const user= await User.findById(req.user.id)
        res.status(200).json(user.address)

    }

    catch(error){
        
        res.status(500).json({error: error.message})

    }
}

export const saveAddress= async(req,res)=>{


    try{

        const {address}= req.body
        const user= await User.findById(req.user.id)
        user.address= address
        await user.save()
        res.status(200).json({message: 'Address saved'})

    }

    catch(error){
        
        res.status(500).json({error: error.message})

    }
    
}


export const history= async(req,res)=>{

    try{

        const userId= req.user.id;
        const page= parseInt(req.query.page)||1
        const limit=5
        const skip = (page-1)*limit
        const totalOrders= await Order.countDocuments({ user: userId })
        const orders= await Order.find({user: userId})
            .sort({createdAt: -1})
            .skip(skip)
            .limit(limit)
        res.status(200).json({

            page,
            totalPages: Math.ceil(totalOrders / limit),
            totalOrders,
            orders

        })
    }
    
    catch (err) {

        res.status(500).json({ error: err.message })

    }
}