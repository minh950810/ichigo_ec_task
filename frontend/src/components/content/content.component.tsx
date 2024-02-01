import { ContentContainer } from './content.styles'

interface Props {
    content: string
}

const Content: React.FC<Props> = ({ content }) => {
    return <ContentContainer>{content}</ContentContainer>
}

export default Content
