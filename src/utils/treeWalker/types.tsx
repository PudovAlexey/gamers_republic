export type Node = {
    node: Record<any, any>,
    children: Record<any, any>[]
}

export type FlatNode = {
    parrentId: number,
    nodeId: number,
    [keyof: string]: any
}

export type TTreeProps = {
    nodeName?: string,
    childName?: string,
    sorter?: (a: Node, b: Node) => Node[]
}

type Props = Record<any, any>

type ForEachData = (Content: Node, props: Props) => JSX.Element

export type TmakeNodesTreeType = {
    treeChildren: Node,
    nodeName?: string,
    childName?: string,
    childContent: (node: Node, nodeId: number, forEachData: ForEachData) => Props,
    sorter?: (a: Node, b: Node) => Node[]
    openFirstLeaf: boolean
    firstRowProps: (leaf: Node, updateId: string) => {}
}

export type TBuildTree = {
    nodes: FlatNode[],
    idProp?: string,
    parrentIdProp?: string
}

export type TBuildTreeProps = TBuildTree & TTreeProps