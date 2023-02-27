function verifyProof(proof, node, root, concat) {

    rootCheck = node

    proof.forEach(pair => {
        if (pair.left === true) rootCheck = concat(pair.data, rootCheck)
        else rootCheck = concat(rootCheck, pair.data)
    })

    if (root === rootCheck) return true
    else return false
}

module.exports = verifyProof;
