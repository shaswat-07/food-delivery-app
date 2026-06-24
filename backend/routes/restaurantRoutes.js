import express from 'express'
const router = express.Router()

import { all, getRestaurantById, menu } from '../controller/restaurantController.js'


router.get('/all', all)
router.get('/menu/:id', menu)
router.get('/:id', getRestaurantById)

export default router