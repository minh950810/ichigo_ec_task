'use client'

import React, { Suspense, useEffect, useMemo } from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '@/redux/store'
import useCustomer from '@/hook/useCustomer'
import CustomerCard from '@/components/customerCard/customerCard.components'
import ScrollSpinner from '@/components/loadingSpin/scrollSpinner/spinner.component'
import Spinner from '@/components/loadingSpin/loadingSpinner/spinner.component'
import InfiniteScroll from 'react-infinite-scroll-component'
import Content from '@/components/content/content.component'

const Home: React.FC = () => {
    const { customers, more } = useSelector((state: RootState) => state.customer)
    const { initLoad, loadmore } = useCustomer()

    useEffect(() => {
        initLoad()
    }, [initLoad])

    const showCustomersCards = useMemo(() => {
        return (
            customers.length > 0 && customers.map((item, i) => <CustomerCard info={item} key={i} />)
        )
    }, [customers])

    return (
        <Suspense fallback={<Spinner />}>
            <InfiniteScroll
                dataLength={customers.length}
                next={() => loadmore()}
                hasMore={more}
                loader={<ScrollSpinner />}
                endMessage={<Content content="You read all Lists" />}
            >
                {showCustomersCards}
            </InfiniteScroll>
        </Suspense>
    )
}

export default Home
