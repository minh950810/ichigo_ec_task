import { useMemo } from 'react'
import { CardContainer, CardItem } from './orderCard.styles'

interface Props {
    orderId: string
    totalIncents: number
    date: Date
}

const OrderCard: React.FC<Props> = ({ orderId, totalIncents, date }) => {
    const showCard = useMemo(() => {
        return (
            <CardContainer>
                <CardItem data-testid="id">OrderId: {orderId}</CardItem>
                <CardItem data-testid='incents'>Total Incents: {totalIncents}</CardItem>
                <CardItem data-testid='date'>Date: {date.toLocaleString()}</CardItem>
            </CardContainer>
        )
    }, [orderId, totalIncents, date])

    return <>{showCard}</>
}

export default OrderCard
