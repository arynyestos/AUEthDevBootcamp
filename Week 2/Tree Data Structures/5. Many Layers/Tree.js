class Tree {
    constructor() {
        this.root = null
    }

    addChild(parent, child){
        if(child.data < parent.data) {
            if(parent.left === null) parent.left = child
            else this.addChild(parent.left, child)
        }
        else if (parent.right === null) parent.right = child
        else this.addChild(parent.right, child)
    }

    addNode(node) {
        if(this.root === null) this.root = node
        else this.addChild(this.root, node)
    }

    searchNode(currentNode, number){
        if(currentNode === null) return false
        else if(number < currentNode.data) return this.searchNode(currentNode.left, number)
        else if(number > currentNode.data) return this.searchNode(currentNode.right, number)
        else return true
    }

    hasNode(number){
        if(this.root.data === number) return true
        else return this.searchNode(this.root, number)
    }
}


module.exports = Tree;