class NodeTree {
    constructor(key) {
        this.key = key;
        this.left = null;
        this.right = null;
    }
}

class BinarySearchTree {
    constructor() {
        this.root = null;
    }

    insert(key) {
        const child_tree = new NodeTree();
        const insert_tree = (node, newNode) => {
            if (newNode.key < node.key) { //左边
                if (node.left == null) {
                    node.left = newNode;
                } else {
                    insert_tree(node.left, newNode);
                }

            } else {
                if (node.right == null) {
                    node.right = newNode;
                } else {
                    insert_tree(node.right, newNode);
                }
            }
        };

        if (this.root == null) {
            this.root = child_tree;
        } else {
            insert_tree(this.root, child_tree)
        }
    }
}