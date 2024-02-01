import { Loyalty } from './type'

export const loyalty = {
    [Loyalty.Gold]: 500,
    [Loyalty.Silver]: 100,
    [Loyalty.Bronze]: 0
}

export const logs = {
    CREATE_ORDER_FAILED: 'Order creation is failed(customerId must be 24bit)',
    GET_CUSTOMER_INFO_FAILED: 'Invalid customer',
    VALIDATE_ERROR: 'Invalid format'
}
