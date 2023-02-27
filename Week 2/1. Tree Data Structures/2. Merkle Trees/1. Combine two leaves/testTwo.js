class MerkleTree {
    constructor(leaves, concat) {
        this.leaves = leaves
        this.concat = concat
    }

    getRoot() {
        let combination = []
        let lastLeaf = ''
        if (this.leaves.length === 1) return this.leaves[0]
        if (this.leaves.length % 2 === 1) {
            lastLeaf = this.leaves.slice(-1)[0]
            this.leaves = this.leaves.slice(0, -1)
        }
        if (this.leaves.length > 1) {
            for (let i = 0; i < this.leaves.length / 2; i++) {
                combination[i] = this.concat(this.leaves[2 * i], this.leaves[2 * i + 1])
            }
            if (lastLeaf !== '') combination.push(lastLeaf)
            this.leaves = combination
        }
        if (this.leaves.length > 1) return this.getRoot()
        else return this.leaves[0]
    }

    getProof(index) {
        let proof = []
        let leaves = this.leaves

        while (leaves.length > 1) {
            let lastLeaf = ''
            let combination = []
            if (index % 2 === 1) proof.push({ data: leaves[index - 1], left: true })
            else if (leaves[index + 1] !== undefined) proof.push({ data: leaves[index + 1], left: false })

            if (leaves.length === 1) return leaves[0]
            if (leaves.length % 2 === 1) {
                lastLeaf = leaves.slice(-1)[0]
                leaves = leaves.slice(0, -1)
            }
            for (let i = 0; i < leaves.length / 2; i++) {
                combination[i] = this.concat(leaves[2 * i], leaves[2 * i + 1])
            }
            if (lastLeaf !== '') combination.push(lastLeaf)
            leaves = combination

            index = Math.floor(index / 2)
        }
        return proof
    }
}

module.exports = MerkleTree;