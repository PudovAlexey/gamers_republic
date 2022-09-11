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

export function buildTree({
  nodes,
  sorter,
  nodeName = "node",
  childName = "children",
  idProp = "nodeId",
  parrentIdProp = "parrentId",
}) {
  function treeHandler(treeNodes) {
    if (typeof sorter === "function" && treeNodes.length) {
      treeNodes.sort(sorter);
    }
    let excludedNodes = [] 
    let buildTree = treeNodes.reduce((tree, node, _, flat) => {
      // if (node[idProp] === node[parrentIdProp]) {
      //   throw new Error('parrentId equals nodeId')
      // }
      let childNodes = flat.filter(n => n[parrentIdProp] === node[idProp])
      excludedNodes = excludedNodes.concat(...childNodes)
      if (childNodes.length) {
        tree.push({
          [nodeName]: node,
          [childName]: childNodes
        })
      } else {
        tree.push(node)
      }
      return tree
    }, []);
    if (!excludedNodes.length) {
      return buildTree;
    } else {
      excludedNodes = []
      treeHandler(buildTree)
    };
  }

  return treeHandler(nodes);
}
