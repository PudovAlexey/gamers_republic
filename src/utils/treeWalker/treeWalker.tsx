import { getNodeByPath } from '../others/index';
import {
  FlatNode,
  TBuildTreeProps,
  TmakeNodesTreeType,
} from '@/utils/treeWalker/types';
export function forEachTreeNodes<L>({
  tree,
  action,
  parrentNode = null,
  nodeId = '0',
  nodeName = 'node',
  childName = 'children',
}: {
  tree: L;
  action: (leaf: L, parrentLeaf: L, nodeId: string) => void | null;
  parrentNode?: L | null;
  nodeId?: string | '0';
  nodeName?: string | 'node';
  childName?: string | 'children';
}): L {
  function changeTree<L>(tree: L, nodeId: string): L {
    const treeParse: L = {
      [nodeName]: tree[nodeName]?.virtual
        ? tree[nodeName]
        : action(tree[nodeName], parrentNode, nodeId),
    } as L;
    if (!tree[nodeName]?.virtual) treeParse[nodeName]['nodeId'] = nodeId;
    if (tree[childName])
      treeParse[childName] = tree[childName].map((node, idx) =>
        changeTree(node, `${nodeId}-${idx}`)
      );
    return treeParse;
  }

  return changeTree<L>(tree, nodeId);
}

export function makeTreeNodesId<L>(tree: L) {
  return forEachTreeNodes<L>({
    tree,
    action: () => null,
  });
}

export function makeNodesTree({
  treeChildren,
  nodeName = 'node',
  childName = 'children',
  childContent,
  sorter,
  openFirstLeaf = false,
  firstRowProps,
}: TmakeNodesTreeType) {
  if (typeof sorter === 'function' && treeChildren[childName]?.length) {
    treeChildren[childName].sort(sorter);
  }
  function handleTreeItems(treeChildren, id) {
    if (id === 0 && openFirstLeaf) {
      let forEachData = function (Content) {
        return treeChildren[childName].map((leaf, idx) => {
          let updateId = `${id}-${idx}`;
          return (
            <Content {...firstRowProps(leaf, updateId)}>
              {leaf[childName].map((subTree, sIdx) =>
                handleTreeItems(subTree, `${id}-${idx}-${sIdx}`)
              )}
            </Content>
          );
        });
      };

      return childContent(treeChildren[nodeName], id, (content) =>
        forEachData(content)
      );
    } else if (treeChildren[childName]) {
      let forEachData = function (Content, props) {
        return (
          <Content {...props}>
            {treeChildren[childName].map((leaf, idx) =>
              handleTreeItems(leaf, `${id}-${idx}`)
            )}
          </Content>
        );
      };
      return childContent(treeChildren[nodeName], id, (content, props) =>
        forEachData(content, props)
      );
    } else {
      let content = (Content, props): JSX.Element => (
        <Content {...props}></Content>
      );
      return childContent(treeChildren[nodeName], id, (Content, props) =>
        content(Content, props)
      );
    }
  }

  return handleTreeItems(treeChildren, 0);
}

export function findTreeNodeById<T, I, R>({
  treeNode,
  id,
  nodePath = 'nodeId',
}: {
  treeNode: T;
  id: I;
  nodePath: string;
}): R {
  let node;
  function findTreeNode(treeNode) {
    let nodeId = getNodeByPath({ node: treeNode, path: nodePath });
    if (nodeId === id) {
      node = treeNode;
    }
    if (treeNode.children && !node) {
      treeNode.children.forEach((node) => findTreeNode(node));
    }

    return node;
  }

  return findTreeNode(treeNode);
}

export function buildTree<T>({
  nodes,
  sorter,
  nodeName = 'node',
  childName = 'children',
  idProp = 'nodeId',
  parrentIdProp = 'parrentId',
}: TBuildTreeProps<T>): {
  [x: string]:
    | {
        [x: string]: FlatNode & T;
      }[]
    | {
        virtual: boolean;
      };
} {
  let rootTree = nodes.filter((route) => route[parrentIdProp] === 0);
  let inTree = nodes.filter((route) => route[parrentIdProp] !== 0);
  let parseTreeNodes = inTree.reduce(
    (tree, node) => {
      let parrentNode = findTreeNodeById({
        treeNode: tree,
        id: node[parrentIdProp],
        nodePath: `${nodeName}/${idProp}`,
      });
      if (parrentNode) {
        if (!parrentNode[childName]) parrentNode[childName] = [];
        parrentNode[childName].push({
          [nodeName]: node,
          [childName]: [],
        });
        if (typeof sorter === 'function' && parrentNode[childName]?.length) {
          parrentNode[childName].sort(sorter);
        }
      }
      return tree;
    },
    {
      [nodeName]: { virtual: true },
      [childName]: rootTree.map((node) => ({
        [nodeName]: node,
        [childName]: [],
      })),
    }
  );

  return parseTreeNodes as FlatNode & T;
}
