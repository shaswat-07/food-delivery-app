import Cart from '../models/cart.js'
import food from '../models/food.js'
import Food from '../models/food.js'


export const viewCart = async (req, res) => {

    try {

        const userCart = await Cart.findOne({ user: req.user.id }).populate('items.food')
        if (!userCart) {

            return res.status(404).json({ message: 'Cart not found' })

        }
        return res.status(200).json(userCart)

    } 
    catch (error) {
        
        return res.status(400).json({ error: error.message })

    }
}

export const updateCart = async (req, res) => {
    
    const { foodId, quantity } = req.body
    try {
        
        const food = await Food.findById(foodId)
        if (!food) {
            return res.status(404).json({ message: "Food not found" })
        }

        let userCart = await Cart.findOne({ user: req.user.id })
        if (!userCart) {

            userCart = new Cart({
                user: req.user.id,
                items: []
            })

        }

        if (userCart.items.length === 0) {
        
            userCart.restaurant = food.restaurant

        }
        
        if (userCart.items && userCart.restaurant.toString() !== food.restaurant.toString()) 
        {
            return res.status(400).json({ message: "Cannot add items from different restaurants"})
        }

        const itemIndex = userCart.items.findIndex(
            item => item.food.toString() === foodId
        )

        if (itemIndex > -1) {
            if (quantity === 0) {
                userCart.items.splice(itemIndex, 1)
            } else {
                userCart.items[itemIndex].quantity = quantity
            }
        } else {
            
            if (quantity > 0) {
                
                userCart.items.push({ food: foodId, quantity })

            } 
            else {

                return res.status(400).json({ message: "Invalid quantity" })

            }
        }


        await userCart.save()
        res.status(200).json({ message: "Cart updated", userCart })

    } 
    catch (err) {

        res.status(500).json({ error: err.message })
        
    }
}

export const removeItem = async (req, res) => {
    const foodId = req.params.id
    try {

        let userCart = await Cart.findOne({ user: req.user.id })

        if (!userCart || userCart.items.length === 0) {
            return res.status(404).json({ message: 'Cart already empty' })
        }

        const itemIndex = userCart.items.findIndex(
            item => item.food.toString() === foodId
        )

        if (itemIndex > -1) {
            userCart.items.splice(itemIndex, 1)
        } else {
            return res.status(400).json({ message: "Item does not exists" })
        }

        if (userCart.items.length === 0) {
            userCart.restaurant = undefined
        }

        await userCart.save()
        res.status(200).json({ message: "Item removed", userCart })
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
}

export const clearCart = async (req, res) => {
    try {
        let userCart = await Cart.findOne({ user: req.user.id })

        if (!userCart) {
            return res.status(404).json({ message: 'Cart already empty' })
        }

        userCart.items = []
        userCart.restaurant = undefined

        await userCart.save()
        res.status(200).json({ message: 'Cart cleared successfully' })
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
}