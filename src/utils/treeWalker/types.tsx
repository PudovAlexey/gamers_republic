import { JsxElement } from "typescript"
import { AnyProps } from "../../types/types"

type Node = {
    node: Record<any, any>,
    children: Record<any, any>[]
}

export type TmakeNodesTreeType = {
    treeChildren: Node,
    nodeName?: string,
    childName?: string,
    childContent: (node: Node, id: string, (content: JsxElement, props: AnyProps) => any) => any
    sorter?: (a: Node, b: Node) => Node[]
    openFirstLeaf: boolean
    firstRowProps: AnyProps
}