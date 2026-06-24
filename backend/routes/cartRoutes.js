import express from 'express'
const router= express.Router()

import{viewCart, updateCart, removeItem, clearCart} from '../controller/cartController.js'
import { auth } from '../controller/authController.js'


router.get('/view',auth, viewCart)
router.post('/update',auth, updateCart)
router.delete('/remove/:id',auth, removeItem)
router.delete('/clear',auth, clearCart)


export default router