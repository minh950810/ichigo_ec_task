'use client'

import { RootState } from '@/redux/store'
import { useDispatch, useSelector } from 'react-redux'
import { initCustomers, addOrder, loadMoreCustomers } from '@/redux/slices/customer'
import { useCallback } from 'react'

export default function useCustomer() {
    const dispatch = useDispatch()

    const customer = useSelector((state: RootState) => state.customer)

    const initLoad = useCallback(async () => {
        await initCustomers(1, customer.limit, dispatch)
    }, [customer.limit, dispatch])

    const getOrder = useCallback(async (customerId: string) => {
        const response = await addOrder(customerId)
        return response
    }, [])

    const loadmore = useCallback(async () => {
        await loadMoreCustomers(customer.page, customer.limit, dispatch)
    }, [customer.page, customer.limit, dispatch])

    return {
        initLoad,
        getOrder,
        loadmore
    }
}
