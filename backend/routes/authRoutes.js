import express from 'express'

const router= express.Router()

import {signup, login, refresh, logout, googleLogin, getMe} from '../controller/authController.js'
import { auth } from '../controller/authController.js'
//import { auth } from 'google-auth-library'

import rateLimit from 'express-rate-limit'

const authLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 min
    max: 5,
    message: {
        message: 'Too many attempts. Please try again after 15 minutes.'
    }
})

router.post('/signup', authLimiter, signup)
router.post('/login', authLimiter, login)
router.post('/refresh', refresh)
router.post('/googleLogin', googleLogin)
router.post('/logout', logout)
router.get('/getMe', auth, getMe)


export default router;

