import Food from '../models/food.js'


export const viewFood= async(req, res)=>{

    const foodId= req.params.id;

    try{
        
        const food= await Food.findById(foodId)
        if(!food){

            return res.status(404).json({message: 'Food not found'})

        }
        return res.status(200).json({food}) 

    }
    catch(error){
        
        return res.status(400).json({error: error.message})

    }

}

export const searchFood= async(req,res)=>{
    try{
        
        const {search, isVeg}= req.query
        if(!search){
            return res.status(400).json({ message: "Search query required" })
        }
        const query= {name: {$regex: search, $options: 'i'}}
        if(isVeg!== undefined){
            query.isVeg= isVeg === 'true'
        }
        const page= parseInt(req.query.page)||1
        const limit=5
        const skip= (page-1)*limit
        const totalFood= await Food.countDocuments(query)
        const foods= await Food.find(query)
            .skip(skip)
            .limit(limit)
        if(foods.length===0){
            return res.status(404).json({ message: "No matching foods found"})
        }
        res.status(200).json({
            foods,
            totalPages: Math.ceil(totalFood/limit),
            totalFood
        })
        
    }
    catch (error) {

        
        res.status(500).json({ error: error.message})

    }

}