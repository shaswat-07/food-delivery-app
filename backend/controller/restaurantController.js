import Restaurant from '../models/restaurant.js'
import Food from '../models/food.js'

export const all= async(req,res)=>{

    try{

        const page= parseInt(req.query.page)||1
        const limit= 5;
        const skip = (page-1)*limit
        const total = await Restaurant.countDocuments()
        const restaurants= await Restaurant.find()
            .skip(skip)
            .limit(limit)
        
        res.status(200).json({

            page,
            totalPages: Math.ceil(total/limit),
            restaurants

        })

    }
    catch (err) {

        res.status(500).json({ error: err.message })

    }
}

export const getRestaurantById= async(req,res)=>{

    try{

        const restaurant= await Restaurant.findById(req.params.id)
        if(!restaurant){

            return res.status(404).json({message: 'Restaurant not found'})

        }
        res.status(200).json({restaurant})
    }
    catch (err) {

        res.status(500).json({ error: err.message })

    } 
}

export const menu= async(req,res)=>{

    try{

        const restaurant= await Restaurant.findById(req.params.id)

        if(!restaurant){

            return res.status(404).json({message: 'Restaurant not found'})

        }

        const page= (req.query.page)||1
        const limit=5
        const skip= (page-1)*limit
        const total= await Food.countDocuments()
        const foods= await Food.find({restaurant: req.params.id}).skip(skip).limit(limit)

        if(foods.length===0){

            return res.status(400).json({message: 'Menu not found'})

        }

        res.status(200).json({

            page,
            totalPages: Math.ceil(total/limit),
            foods

        })
    }
    catch (err) {

        res.status(500).json({ error: err.message })

    }
    
}