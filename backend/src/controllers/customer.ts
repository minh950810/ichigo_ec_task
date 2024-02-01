import { Request, Response } from 'express'
import { Order } from '@/common/type'
import { logs } from '@/common/constant'
import {
    addOrderHandler,
    getCustomerInfoHandler,
    getCustomerOrdersHandler
} from '@/services/customer'

export const createOrder = async (req: Request, res: Response) => {
    const { customerId, customerName, orderId, totalIncents, date } = req.body

    const newOrder: Order = {
        orderId,
        incents: Number(totalIncents),
        date: new Date(date)
    }

    const result = await addOrderHandler(customerId, customerName, newOrder)

    if (!result) {
        return res.status(500).json({ message: logs.CREATE_ORDER_FAILED })
    }

    return res.status(200).json(result)
}

export const getCustomersInfo = async (req: Request, res: Response) => {
    const { page, limit } = req.params

    const result = await getCustomerInfoHandler(Number(page), Number(limit))

    if (!result) {
        return res.status(500).json({ message: logs.GET_CUSTOMER_INFO_FAILED })
    }

    return res.status(200).json(result)
}

export const getCustomerOrders = async (req: Request, res: Response) => {
    const { _id } = req.params

    const result = await getCustomerOrdersHandler(_id)

    if (!result) {
        return res.status(500).json({ message: logs.GET_CUSTOMER_INFO_FAILED })
    }

    return res.status(200).json(result)
}
