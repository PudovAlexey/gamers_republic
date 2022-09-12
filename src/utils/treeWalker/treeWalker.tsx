import { getNodeByPath } from "../utils";
import { TmakeNodesTreeType } from "./types";

export function forEachTreeNodes(tree, action, ...nodeData) {
  if (tree.children) {
    tree.children.forEach(
      (treeNode, idx) =>
        Array.isArray(treeNode.children) &&
        forEachTreeNodes(treeNode, action, nodeData.push(idx))
    );
  } else {
    action(tree);
  }

  return tree;
}

export function makeNodesTree({
  treeChildren,
  nodeName = "node",
  childName = "children",
  childContent,
  sorter,
  openFirstLeaf = false,
  firstRowProps,
}: TmakeNodesTreeType) {
  if (typeof sorter === "function" && treeChildren[childName]?.length) {
    treeChildren[childName].sort(sorter);
  }
  function handleTreeItems(treeChildren, id) {
    if (id === 0 && openFirstLeaf) {
      let forEachData = function (Content, props) {
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

      return childContent(treeChildren[nodeName], id, (content, props) =>
        forEachData(content, props)
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
      let content = (Content, props) => <Content {...props}></Content>;
      return childContent(treeChildren[nodeName], id, (Content, props) =>
        content(Content, props)
      );
    }
  }

  return handleTreeItems(treeChildren, 0);
}

export function findTreeNodeById({ treeNode, id, nodePath = "nodeId" }) {
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

export function buildTree({
  nodes,
  sorter,
  nodeName = "node",
  childName = "children",
  idProp = "nodeId",
  parrentIdProp = "parrentId",
}) {
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
        if (typeof sorter === "function" && parrentNode[childName]?.length) {
          parrentNode[childName].sort(sorter);
        }
      }
      return tree;
    },
    {
      [nodeName]: { virtual: true },
      [childName]: rootTree
      .map((node) => ({
        [nodeName]: node,
        [childName]: [],
      }))
      .sort(sorter),
    }
  );

  return parseTreeNodes;
}
