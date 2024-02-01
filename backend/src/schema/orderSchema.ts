import { object, string, number, date } from 'yup'
import { logs } from '@/common/constant'

export const createSchema = object({
    body: object({
        customerId: string().required(logs.VALIDATE_ERROR),
        customerName: string().required(logs.VALIDATE_ERROR),
        orderId: string().required(logs.VALIDATE_ERROR),
        totalIncents: number().required(logs.VALIDATE_ERROR),
        date: date().required(logs.VALIDATE_ERROR)
    })
})
