import React from 'react'
import { render, screen } from '@testing-library/react'
import OrderCard from '@/components/orderCard/orderCard.components'

const mockData = {
    orderId: "shogo-123456",
    totalIncents: 120,
    date: new Date()
}

test('renders the OrderCard Components', () => {
    const { orderId, totalIncents, date } = mockData
    render(<OrderCard orderId={orderId} totalIncents={totalIncents} date={date} />)

    const cardId = screen.getByTestId("id");
    expect(cardId).toHaveTextContent(orderId)

    const cardIncents = screen.getByTestId("incents");
    expect(cardIncents).toHaveTextContent(totalIncents.toString())

    const cardDate = screen.getByTestId("date");
    expect(cardDate).toHaveTextContent(date.toLocaleString())
})