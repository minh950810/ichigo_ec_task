import { Router } from 'express'
import { createOrder, getCustomersInfo, getCustomerOrders } from '@/controllers/customer'
import { createSchema } from '@/schema/orderSchema'
import validate from '@/middleware/validateRequest'

const router = Router()

export default router

router.post('/create-order', validate(createSchema), createOrder)
router.get('/customers/:page/:limit', getCustomersInfo)
router.get('/customer/:_id', getCustomerOrders)
