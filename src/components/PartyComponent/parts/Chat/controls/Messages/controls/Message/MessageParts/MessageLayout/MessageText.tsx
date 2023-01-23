import { Typography } from "@mui/material"
import { useAppSelector } from "../../../../../../../../../../hooks/typedReduxHooks"
import { getSearchSelectedIndex } from "../../../../../../store/selectors/chatSelector"

function MessageText({children, messageId}) {
    const getSearchIndex = useAppSelector(state => getSearchSelectedIndex(state, messageId))
    if (getSearchIndex) return <MarkdownMessageByTag>{getSearchIndex}</MarkdownMessageByTag>
    return (
        <Typography>{children}</Typography>
    )
}

function MarkdownMessageByTag({children}) {
    return (
        <Typography>
            {children.searchMessage.reduce((string, value) => {
                if (value.tag) {
                    string.push(<strong style={{background: 'yellow'}}>{value.searchValue}</strong>)
                } else {
                    string.push(value)
                }
                return string
            }, [])
            }
        </Typography>
    )
}

export {
    MessageText
}