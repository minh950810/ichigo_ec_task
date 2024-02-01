import { BarContainer, Bar } from './progressBar.styles'

interface Props {
    size: number
}

const ProgressBar: React.FC<Props> = ({ size }) => {
    return (
        <BarContainer>
            <Bar size={size}>
                <span>{size}%</span>
            </Bar>
        </BarContainer>
    )
}

export default ProgressBar
