import request from 'supertest'
import * as http from 'http'
import { createServer } from '@/common/testServer'

let server: http.Server

beforeEach(async () => {
    server = (await createServer()).listen()
})

afterEach(async () => {
    await server.close()
})

const existInfo = {
    customerId: 'shogoyoshie-1706675667887',
    customerName: 'shogo yoshie',
    orderId: 'TestController',
    totalIncents: 340,
    date: new Date()
}

const invalidInfo = {
    customerId: 'aaa-123',
    customerName: 'shogo yoshie',
    orderId: 'T123'
}

const nonExistInfo = {
    customerId: '65a7af452e12c459bfb2bb2d',
    customerName: 'shogo yoshie',
    orderId: 'TestController',
    totalIncents: 340,
    date: new Date()
}

describe('creatOrder', () => {
    it('should return 400 and failed the request if invalid shema, in this case, there is not date field', async () => {
        await request(server).post(`/create-order`).send(invalidInfo).expect(400)
    }, 100_000)

    it('should return 200 and create the Customer model with order info if valid schema and nom-exist customer ', async () => {
        await request(server).post(`/create-order`).send(nonExistInfo).expect(200)
    }, 100_000)

    it('should return 200 and create the Order info in Customer model if valid schema and exist customer ', async () => {
        await request(server).post(`/create-order`).send(existInfo).expect(200)
    }, 100_000)
})

describe('getCustomersInfo', () => {
    it('should be not failed with valid page and limit params', async () => {
        const page = 1
        const limit = 10
        await request(server).get(`/customers/${page}/${limit}`).expect(200)
    }, 100_000)
})

describe('getCustomersOrders', () => {
    it('should failed with nonExistId', async () => {
        const id = 'aaaaaaaaa'
        await request(server).get(`/customer/${id}`).expect(500)
    }, 100_000)

    it('should be not failed with nonExistId', async () => {
        await request(server).get(`/customer/${existInfo.customerId}`).expect(200)
    }, 100_000)
})
