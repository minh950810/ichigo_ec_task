import React from 'react'
import { render } from '@testing-library/react'
import { Provider } from 'react-redux'
import configureStore from 'redux-mock-store'
import Home from '@/app/page'

jest.mock('next/navigation')

const mockStore = configureStore([])

const mockData = {
    userId: 'shogoyoshie-0325',
    name: 'shogo',
    orders: [],
    spentAmount: 120,
    amountToNext: 380,
    loyalty: 1,
    downgradeYear: 2025
}

test('renders the Home Component', () => {
    const store = mockStore({
        customer: {
            customers: [mockData]
        },
        page: 1,
        limit: 10,
        more: true
    })

    render(
        <Provider store={store}>
            <Home />
        </Provider>
    )
})
