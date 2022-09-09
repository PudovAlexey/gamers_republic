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

export function makeTree({
  treeChildren,
  nodeName = "node",
  childName = "children",
  childContent,
  sorter,
  openFirstLeaf = false,
  firstRowProps
}) {
  if (typeof sorter === "function" && treeChildren?.treeChildren?.length) {
    treeChildren.sort(sorter);
  }
  function handleTreeItems(treeChildren, id) {
    if (id === 0 && openFirstLeaf) {
      let forEachData = function (Content, props) {
        return treeChildren[childName].map((leaf, idx) => {
          let updateId = `${id}-${idx}`
         return (
            <Content {...firstRowProps(leaf, updateId)}>
              {leaf[childName].map((subTree, sIdx) =>
                handleTreeItems(subTree, `${id}-${idx}-${sIdx}`)
              )}
            </Content>
          )
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
      let content = (Content, props) => <Content {...props}></Content> 
      return childContent(treeChildren[nodeName], id, (Content, props) => content(Content, props));
    }
  }

  return handleTreeItems(treeChildren, 0);
}
