# Lineage Diagram React

We use React flow for showing cells hierarchy.

![image](https://user-images.githubusercontent.com/56730716/225563010-ecf41ef9-5176-4a30-88ef-088d3c55f6b0.png)

Two steps:

1. Our manual logic.
2. Using dagre for positioning the nodes. The nodes are positioned using this library and the edges are handles by React flow itself.

## Our manual logic

We have a source Node, which is the main node or table. From there, we can do a upward dfs traversal or a downward traversal. We have a expanded dictionary which stores the state i.e. expand/collapse of each node’s children and sources.

“hidden” parameter in the nodes and edges, is used to hide or show that node or edge.

Custom React flow node, has different handles and each handle has some unique id that is used while making connections.

## Some research or points

We used manual logic as both expand and collapse from both sides was one of the main feature along with multiple sources and children.

React flow library is quite popular and almost everything I have searched till now is possible from it.
