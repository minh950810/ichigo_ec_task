import React from 'react'
import { fireEvent, render, screen } from '@testing-library/react'
import CustomerCard from '@/components/customerCard/customerCard.components'
import { Loyalty } from '@/type'
import mockRouter from 'next-router-mock'

jest.mock('next/navigation', () => jest.requireActual('next-router-mock'))

const mockData = {
    userId: 'shogoyoshie-0325',
    name: 'shogo',
    orders: [],
    spentAmount: 10,
    amountToNext: 90,
    loyalty: 0,
    downgradeYear: 2025
}

test('renders the CustomerCard Components', () => {
    mockRouter.push('/')
    render(<CustomerCard info={mockData} />)

    const { userId, name, spentAmount, amountToNext, loyalty } = mockData

    const customerName = screen.getByTestId('name')
    expect(customerName).toHaveTextContent(name)

    const incents = screen.getByTestId('incents')
    expect(incents).toHaveTextContent(`Total Incents:${spentAmount}`)

    const downgrade = screen.getByTestId('downgrade')
    expect(downgrade).toHaveTextContent(`downgrade:never`)

    const loyalty1 = screen.getByTestId('loyalty1')
    expect(loyalty1).toHaveTextContent(Loyalty[loyalty])

    const loyalty2 = screen.getByTestId('loyalty2')
    const loyaltyNext = loyalty + 1 < 2 ? loyalty + 1 : loyalty
    expect(loyalty2).toHaveTextContent(Loyalty[loyaltyNext])

    const progressBar = screen.getByTestId('progressBar')
    const percent = (spentAmount / (spentAmount + amountToNext)) * 100
    expect(progressBar).toHaveTextContent(`${percent}%`)

    const container = screen.getByTestId('container')
    fireEvent.click(container)
    expect(mockRouter).toMatchObject({
        pathname: `/${userId}`
    })
})
