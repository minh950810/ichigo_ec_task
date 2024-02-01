import { HeaderContainer } from './header.styles'
import Link from 'next/link'

interface Props {
    logoName: string
}

const Header: React.FC<Props> = ({ logoName }) => {
    return (
        <HeaderContainer>
            <Link href="/">
                <span>{logoName}</span>
            </Link>
        </HeaderContainer>
    )
}

export default Header
