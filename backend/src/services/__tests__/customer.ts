import * as http from 'http'
import { createServer } from '@/common/testServer'
import { addOrderHandler, getCustomerInfoHandler, getCustomerOrdersHandler } from '../customer'

let server: http.Server

beforeEach(async () => {
    server = (await createServer()).listen()
})

afterEach(async () => {
    await server.close()
})

const nonExistInfo = {
    customerId: '65a7af452e12c459bfb2bb2d',
    customerName: 'shogo yoshie',
    order: {
        orderId: 'TestService',
        incents: 340,
        date: new Date()
    }
}

const existInfo = {
    customerId: 'shogoyoshie-1706675667887',
    customerName: 'shogo yoshie',
    order: {
        orderId: 'TestService',
        incents: 340,
        date: new Date()
    }
}
const invalidId = '1111111111'

describe('create Order', () => {
    it('should be not failed and create the new Customer model with valid info and nonExistCustomer', async () => {
        const customer = await addOrderHandler(
            nonExistInfo.customerId,
            nonExistInfo.customerName,
            nonExistInfo.order
        )
        expect(customer).not.toBeNull()
    }, 100_000)

    it('should be not failed and add the Order info in Customer model with valid info and existCustomer', async () => {
        const customer = await addOrderHandler(
            existInfo.customerId,
            existInfo.customerName,
            existInfo.order
        )
        expect(customer).not.toBeNull()
    }, 100_000)
})

describe('get Customer Infos', () => {
    it('should be not failed with correct page and limit params', async () => {
        const customers = await getCustomerInfoHandler(1, 10)
        expect(customers).not.toBeNull()
    })
})

describe("get Customer's Order", () => {
    it('should be failed with wrong CustomerId', async () => {
        const customers = await getCustomerOrdersHandler(invalidId)
        expect(customers).toBeNull()
    })

    it('should not be failed with correct CustomerId', async () => {
        const customers = await getCustomerOrdersHandler(existInfo.customerId)
        expect(customers).not.toBeNull()
    })
})
