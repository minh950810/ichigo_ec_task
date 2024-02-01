'use client'

import OrderCard from '@/components/orderCard/orderCard.components'
import { useEffect, useMemo, useState } from 'react'
import useCustomer from '@/hook/useCustomer'
import { Order } from '@/type'
import Spinner from '@/components/loadingSpin/loadingSpinner/spinner.component'
import Content from '@/components/content/content.component'

interface response {
    customerId: string
    name: string
    orders: Order[]
}

const Orders = ({ params }: { params: { id: string } }) => {
    const { getOrder } = useCustomer()
    const [orders, setOrders] = useState<Order[]>([])
    const [load, setLoad] = useState(false)
    const [content, setContent] = useState('')

    useEffect(() => {
        async function fetchOrder() {
            const response: response = await getOrder(params.id)
            if (response.orders.length == 0) setContent('There are not any Orders from last year.')
            setOrders(response.orders)
        }
        fetchOrder()
        setLoad(true)
    }, [getOrder, params.id])

    const showOrders = useMemo(() => {
        return orders.length > 0 ? (
            orders.map((item: Order, i: number) => (
                <div key={i} style={{ marginBottom: '10px' }}>
                    <OrderCard
                        orderId={item.orderId}
                        totalIncents={item.incents}
                        date={item.date}
                    />
                </div>
            ))
        ) : load != false ? (
            <Content content={content} />
        ) : (
            <Spinner />
        )
    }, [orders, load, content])

    return <div>{showOrders}</div>
}

export default Orders
