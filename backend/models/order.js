import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
{
    restaurant:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'restaurant',
        required: true
    },

    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'user',
        required: true
    },

    items:[
        {
            food:{
                type: mongoose.Schema.Types.ObjectId,
                ref:'Food',
                required: true
            },

            name:String,

            price:Number,

            quantity:Number,

            totalPrice:Number
        }
    ],

    subtotal:{
        type:Number,
        required:true
    },

    taxes:{
        type:Number,
        required:true
    },

    deliveryFee:{
        type:Number,
        required:true
    },

    total:{
        type:Number,
        required:true
    },

    status:{
        type:String,
        enum:[
            'placed',
            'preparing',
            'delivered'
        ],

        default:'placed'
    }

},
{ timestamps:true }
)

export default mongoose.model('Order', orderSchema)