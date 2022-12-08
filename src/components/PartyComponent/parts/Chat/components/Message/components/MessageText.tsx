import React from "react"
import { useMemo } from "react"
import { useAppSelector } from "../../../../../../../hooks/typedReduxHooks"
import { MarkdownEditor } from "../../../../../../reusable/MkEditor/MkEditorComponent"

function MessageText({messageId}) {
    // const messageById = useAppSelector((action) => useMemo(() => action.partySlice.messageById, [messageId]))
    const memoMessage = useMemo(() => messageId, [messageId])

    return (
        <MarkdownEditor
        value={`${memoMessage}` || ""}
        view={{
            menu: false,
            md: false,
            html: true
        }}
        />
    )
    
}

export default React.memo(MessageText)