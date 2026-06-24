import express from 'express'
const router= express.Router()
import { auth } from '../controller/authController.js'
import{current, getAddress, history, place, saveAddress} from '../controller/orderController.js'

router.post('/current', auth, current)
router.post('/place', auth, place)
router.get('/getAddress', auth, getAddress)
router.post('/saveAddress', auth, saveAddress)
router.get('/history', auth, history)

export default router