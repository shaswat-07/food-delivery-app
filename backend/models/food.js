import mongoose from 'mongoose'

const foodSchema= new mongoose.Schema(
    {
        restaurant:{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'restaurant',
            required: true
        },
        name:{
            type: String,
            required: true,
            minlength: 3,
            maxlength: 50
        },
        price:{
            type: Number,
            required: true

        },
        isVeg:{type: Boolean},
        picture:{
            type: String
        }
    }
)
foodSchema.index({ name: 'text' })

export default mongoose.model("Food", foodSchema)