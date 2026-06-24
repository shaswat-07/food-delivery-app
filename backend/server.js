import express from 'express'
import dotenv from 'dotenv'
dotenv.config()

import connectDB from './config/db.js'
connectDB()

import cookieParser from 'cookie-parser'
import csrf from 'csurf'
import {csrfToken} from './controller/authController.js'
import authRoutes from './routes/authRoutes.js'
import foodRoutes from './routes/foodRoutes.js'
import orderRoutes from './routes/orderRoutes.js'
import restaurantRoutes from './routes/restaurantRoutes.js'
import cartRoutes from './routes/cartRoutes.js'
import cors from 'cors'


const app= express()
app.use(cookieParser())


app.use(cors({
    origin: ['http://localhost:5173', 
    'http://localhost:5174'],
    credentials: true
}))


const isProd= process.env.NODE_ENV==='production'


const csrfProtection= csrf({
    cookie:{
        httpOnly: true,
        secure: isProd,
        sameSite: isProd?'none':'lax'
    }
})



app.use(express.json())
app.use('/api/food', foodRoutes)
app.use('/api/restaurant', restaurantRoutes)
app.use('/api/auth', authRoutes)
app.get('/csrf-token', csrfProtection, csrfToken)
app.use('/api/cart', csrfProtection, cartRoutes)
app.use('/api/order', csrfProtection, orderRoutes)


app.listen(process.env.PORT || 5000,()=>{
    console.log(`Server is listening to ${process.env.PORT || 5000}`)
})