import bcrypt from 'bcrypt'
import User from '../models/user.js'
import jwt from 'jsonwebtoken'
import client from '../config/google.js'

const isProd = process.env.NODE_ENV === 'production'

export const signup = async (req, res) => {

    try {

        const { name, email, password } = req.body

        const existingUser = await User.findOne({ email })
        if (existingUser) {
            return res.status(409).json({ message: 'User already exists' })
        }

        if(password.length < 6){
            return res.status(400).json({message: 'Password must be at least 6 characters long'})
        }

        if(password.length > 50){
            return res.status(400).json({message: 'Password cannot exceed 50 characters'})
        }

        const hashedPassword = await bcrypt.hash(password, 10)

        await User.create({ name, email, password: hashedPassword })

        return res.status(201).json({ message: 'User created successfully' })


    } 
    
    catch (err) {

        if(err.name === 'ValidationError'){
            return res.status(400).json({message: 'Please enter valid details.'})
        }
        return res.status(500).json({ message: err.message })

    }

}


export const login = async (req, res) => {


    try {

        const { email, password } = req.body
        const existingUser = await User.findOne({ email })
        if (!existingUser) {
            return res.status(404).json({ message: 'Invalid credentials' })
        }

        if (existingUser.provider === 'google') {
            return res.status(400).json({ message: 'Use Google login for this account' })
        }

        if(password.length < 6){
            return res.status(400).json({message: 'Password must be at least 6 characters long'})
        }

        if(password.length > 50){
            return res.status(400).json({message: 'Password cannot exceed 50 characters'})
        }

        const isValid = await bcrypt.compare(password, existingUser.password)
        if (!isValid) {
            return res.status(400).json({ message: "Invalid credentials" })
        }

        const accessToken = jwt.sign(
            { id: existingUser._id },
            process.env.ACCESS_TOKEN_SECRET,
            { expiresIn: '10m' }
        )

        const refreshToken = jwt.sign(
            { id: existingUser._id },
            process.env.REFRESH_TOKEN_SECRET,
            { expiresIn: '1d' }
        )

        res.cookie('jwt', refreshToken, {
            httpOnly: true,
            secure: isProd,
            sameSite: isProd ? 'none' : 'lax',
            maxAge: 24 * 60 * 60 * 1000
        })

        res.status(200).json({
            message: 'User logged in',
            accessToken
        })

    } 
    
    catch (err) {

        if(err.name === 'ValidationError'){
            return res.status(400).json({
                message: 'Please enter valid details.'
            })
        }
        return res.status(500).json({ message: err.message })

    }

}


export const googleLogin = async (req, res) => {


    try {
        
        const { token } = req.body

        const ticket = await client.verifyIdToken({
            idToken: token,
            audience: process.env.GOOGLE_CLIENT_ID
        })
    
        const payload = ticket.getPayload()
        let user1 = await User.findOne({ email: payload.email })

        if (user1 && user1.provider === 'local') {
            return res.status(400).json({ message: 'Account already exists' })
        }

        if (!user1) {
            user1 = await User.create({
                name: payload.name,
                email: payload.email,
                provider: 'google'
            })
        }

        const accessToken = jwt.sign(
            { id: user1._id },
            process.env.ACCESS_TOKEN_SECRET,
            { expiresIn: '10m' }
        )

        const refreshToken = jwt.sign(
            { id: user1._id },
            process.env.REFRESH_TOKEN_SECRET,
            { expiresIn: '1d' }
        )

        res.cookie('jwt', refreshToken, {
            httpOnly: true,
            secure: isProd,
            sameSite: isProd ? 'none' : 'lax',
            maxAge: 24 * 60 * 60 * 1000
        })

        return res.json({
            message: 'User logged in',
            accessToken
        })


    } 
    
    catch (error) {

        return res.status(500).json({ message: error.message })

    }

}


export const refresh = async (req, res) => {


    const refreshToken = req.cookies.jwt

    if (!refreshToken) {
        return res.status(401).json({ message: 'Unauthorized' })
    }

    jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, async (err, payload) => {
        if (err) {
            return res.status(401).json({ message: 'Unauthorized' })
        }

        const user1 = await User.findById(payload.id)
        if (!user1) {
            return res.status(401).json({ message: 'User does not exist' })
        }

        const newAccessToken = jwt.sign(
            { id: payload.id },
            process.env.ACCESS_TOKEN_SECRET,
            { expiresIn: '10m' }
        )

        return res.json({ accessToken: newAccessToken })


    })

}

export const csrfToken = (req, res) => {
    
    return res.json({csrfToken: req.csrfToken()})

}

export const auth = (req, res, next) => {


    const authHeader = req.headers.authorization

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ message: 'Unauthorized' })
    }

    const token = authHeader.split(' ')[1]

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, payload) => {
        if (err) {
            return res.status(401).json({ message: 'Unauthorized' })
        }

        req.user = payload
        next()
    })


}


export const logout = (req, res) => {


    res.clearCookie('jwt', {
        httpOnly: true,
        secure: isProd,
        sameSite: isProd ? 'none' : 'lax'
    })

    res.json({ message: 'Logout completed successfully' })


}


export const getMe = async (req, res) => {


    try {

        const user = await User.findById(req.user.id).select('-password')
        res.status(200).json(user)
    
    } 
    catch (error) {

        res.status(401).json({ message: 'Unauthorized' })

    }

}