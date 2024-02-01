'use client'

import './globals.css'
import { store } from '@/redux/store'
import { Provider } from 'react-redux'
import Header from '@/components/header/header.component'

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en">
            <body>
                <Provider store={store}>
                    <Header logoName="eCommerce" />
                    {children}
                </Provider>
            </body>
        </html>
    )
}
