import express from 'express'
import { Router } from 'express'

const router= express.Router()

import {viewFood, searchFood} from '../controller/foodController.js'


router.get('/search', searchFood)
router.get('/:id', viewFood)


export default router