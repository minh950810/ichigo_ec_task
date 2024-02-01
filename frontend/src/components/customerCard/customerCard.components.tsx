import { useRouter } from 'next/navigation'
import { CardContainer, CardRow, RowSide, RowMain } from './customerCard.styles'
import { Customer, Loyalty } from '@/type'
import ProgressBar from '../progressBar/progressBar.component'
import { useCallback, useMemo } from 'react'

interface Props {
    info: Customer
}

const CustomerCard: React.FC<Props> = ({ info }) => {
    const router = useRouter()
    const { userId, spentAmount, downgradeYear, loyalty, name, amountToNext } = info
    const handleDetail = useCallback(() => {
        router.push(`/${userId}`)
    }, [userId, router])

    const showCard = useMemo(() => {
        return (
            <CardContainer data-testid="container" onClick={handleDetail}>
                <CardRow>
                    <RowSide data-testid="name">{name}</RowSide>
                    <RowMain data-testid="incents">Total Incents:{spentAmount}</RowMain>
                    <RowSide data-testid="downgrade">downgrade:{loyalty > 0 ? downgradeYear : "never"}</RowSide>
                </CardRow>
                <CardRow>
                    <RowSide data-testid="loyalty1">{Loyalty[loyalty]}</RowSide>
                    <RowMain data-testid="progressBar">
                        <ProgressBar size={(spentAmount * 100) / (spentAmount + amountToNext)} />
                    </RowMain>
                    <RowSide data-testid="loyalty2">
                        {Loyalty[loyalty + 1 > 3 ? 2 : (+loyalty) + 1]}
                    </RowSide>
                </CardRow>
            </CardContainer>
        )
    }, [handleDetail, spentAmount, downgradeYear, loyalty, name, amountToNext])

    return <>{showCard}</>
}

export default CustomerCard
