import mongoose from "mongoose";


const cartSchema = new mongoose.Schema(
    {
        restaurant:{
            type: mongoose.Schema.Types.ObjectId,
            ref:'restaurant'
        },
        user:{
            type: mongoose.Schema.Types.ObjectId,
            ref:'user',
            required: true
        },
        items:[
            {
                food: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: 'Food',
                    required: true
                },
                quantity:{
                    type: Number,
                    required: true,
                    min: 1
                }
            }
        ],
         
    }
)


export default mongoose.model("cart", cartSchema)