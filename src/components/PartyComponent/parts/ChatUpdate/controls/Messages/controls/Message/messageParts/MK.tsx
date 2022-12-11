import React from "react"
import { useMemo } from "react"
import { MarkdownEditor } from "../../../../../../../../reusable/MkEditor/MkEditorComponent"

function MK({messageId}) {
    const messageText = useMemo(() => `its message ${messageId}`, [messageId])
    return (
        <MarkdownEditor
              value={messageText || ""}
              view={{
                  menu: false,
                  md: false,
                  html: true
              }}
              />
    )
}

export default React.memo(MK)