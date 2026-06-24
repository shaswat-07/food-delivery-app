import mongoose from 'mongoose'

const restaurantSchema = new mongoose.Schema(
    {
        name:{
            type: String,
            required: true,
            minlength: 3,
            maxlength: 50
        },
        picture:{
            type: String
        }

    }
)

export default mongoose.model("restaurant", restaurantSchema)