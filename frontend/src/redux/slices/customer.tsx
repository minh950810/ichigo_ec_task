import { createSlice } from '@reduxjs/toolkit'
import api from '@/lib/axios'
import { Customer } from '@/type'
import { Dispatch } from '@reduxjs/toolkit'

export interface CustomerRes {
    userId: string
    name: string
    loyalty: number
    startDate: number
    spentAmount: number
    amountToNext: number
    downgrade: boolean
    downgradeYear: number
}

export interface CustomerState {
    page: number
    limit: number
    more: boolean
    isLoading: boolean
    customers: Customer[]
}

const initialState: CustomerState = {
    page: 1,
    limit: 6,
    more: true,
    isLoading: false,
    customers: []
}

export const customerSlice = createSlice({
    name: 'customerReducer',
    initialState,
    reducers: {
        initialize(state, action) {
            state.more = true
            state.page = 1
            state.customers = action.payload
        },
        loadSuccess(state, action) {
            state.more = true
            state.page += 1
            state.customers = [...state.customers, ...action.payload]
        },
        limitSuccess(state) {
            state.more = false
        },
        addOrderSuccess(state, action) {
            const index = state.customers.filter((item) => item.userId == action.payload.userId)
            const i = state.customers.indexOf(index[0])
            state.customers[i].orders = action.payload.orders
        }
    }
})

export default customerSlice.reducer

export async function initCustomers(page: number, limit: number, dispatch: Dispatch) {
    try {
        const res = await api.get(`/customers/${page}/${limit}`)
        if (res) {
            const payload: Customer[] = []
            res.data.map((item: CustomerRes) => {
                const { userId, name, loyalty, downgradeYear, amountToNext, spentAmount } = item
                const data: Customer = {
                    userId,
                    name,
                    orders: [],
                    spentAmount,
                    loyalty,
                    downgradeYear,
                    amountToNext
                }
                payload.push(data)
            })
            dispatch(customerSlice.actions.initialize(payload))
        }
    } catch (error) {
        alert((error as Error).message)
    }
}

export async function addOrder(id: string) {
    try {
        const res = await api.get(`/customer/${id}`)
        if (res) {
            return res.data
        }
    } catch (error) {
        alert((error as Error).message)
    }
}

export async function loadMoreCustomers(page: number, limit: number, dispatch: Dispatch) {
    try {
        const res = await api.get(`/customers/${page + 1}/${limit}`)
        if (res.data.length != 0) {
            const payload: Customer[] = []
            res.data.map((item: CustomerRes) => {
                const { userId, name, loyalty, downgradeYear, amountToNext, spentAmount } = item
                const data: Customer = {
                    userId,
                    name,
                    orders: [],
                    spentAmount,
                    loyalty,
                    downgradeYear,
                    amountToNext
                }
                payload.push(data)
            })
            dispatch(customerSlice.actions.loadSuccess(payload))
        } else dispatch(customerSlice.actions.limitSuccess())
    } catch (error) {
        alert((error as Error).message)
    }
}
