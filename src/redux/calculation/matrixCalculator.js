
export class MatrixCalculator {

    transpose = (matrix) => {
        const width = matrix[0].length
        const height = matrix.length

        let transpMatrix = []

        for (let i = 0; i < width; i++) {
            let row = []
            for (let j = 0; j < height; j++) {
                row = [...row, matrix[j][i]]
            }
            transpMatrix = [...transpMatrix, row]
        }

        return transpMatrix
    }

    multiply = (firstMatrix, secondMatrix) => {
        if (firstMatrix[0].length === secondMatrix.length) {
            let resultMatrix = []

            for (let i = 0; i < firstMatrix.length; i++) {
                let row = []
                for (let j = 0; j < secondMatrix[0].length; j++) {
                    let sum = 0
                    for (let k = 0; k < secondMatrix.length; k++) {
                        sum += firstMatrix[i][k] * secondMatrix[k][j]
                    }
                    row = [...row, sum]
                }
                resultMatrix = [...resultMatrix, row]
            }

            return resultMatrix
        } else alert('Матрицы не согласованы')
    }

    pointWiseMultiply = (firstMatrix, secondMatrix) => {
        const width1 = firstMatrix[0].length
        const height1 = firstMatrix.length
        const width2 = secondMatrix[0].length
        const height2 = secondMatrix.length

        if (height1 === height2 && width1 === width2) {
            let resultMatrix = []

            for (let i = 0; i < height1; i++) {
                let row = []
                for (let j = 0; j < width1; j++) {
                    row = [...row, firstMatrix[i][j] * secondMatrix[i][j]]
                }
                resultMatrix = [...resultMatrix, row]
            }

            return resultMatrix
        } else alert('Матрицы не равны')
    }

    pointWiseSubtract = (firstMatrix, secondMatrix) => {
        const width1 = firstMatrix[0].length
        const height1 = firstMatrix.length
        const width2 = secondMatrix[0].length
        const height2 = secondMatrix.length

        if (height1 === height2 && width1 === width2) {
            let resultMatrix = []

            for (let i = 0; i < height1; i++) {
                let row = []
                for (let j = 0; j < width1; j++) {
                    row = [...row, firstMatrix[i][j] - secondMatrix[i][j]]
                }
                resultMatrix = [...resultMatrix, row]
            }

            return resultMatrix
        } else alert('Матрицы не равны')
    }

    pointWiseAdd = (firstMatrix, secondMatrix) => {
        const width1 = firstMatrix[0].length
        const height1 = firstMatrix.length
        const width2 = secondMatrix[0].length
        const height2 = secondMatrix.length

        if (height1 === height2 && width1 === width2) {
            let resultMatrix = []

            for (let i = 0; i < height1; i++) {
                let row = []
                for (let j = 0; j < width1; j++) {
                    row = [...row, firstMatrix[i][j] + secondMatrix[i][j]]
                }
                resultMatrix = [...resultMatrix, row]
            }

            return resultMatrix
        } else alert('Матрицы не равны')
    }

    addPoint = (matrix, number) => {
        let resultMatrix = []

        for (let i = 0; i < matrix.length; i++) {
            let row = []
            for (let j = 0; j < matrix[0].length; j++) {
                row = [...row, matrix[i][j] + number]
            }
            resultMatrix = [...resultMatrix, row]
        }

        return resultMatrix
    }

    multiplyPoint = (matrix, number) => {
        let resultMatrix = []

        for (let i = 0; i < matrix.length; i++) {
            let row = []
            for (let j = 0; j < matrix[0].length; j++) {
                row = [...row, matrix[i][j] * number]
            }
            resultMatrix = [...resultMatrix, row]
        }

        return resultMatrix
    }

    zip = (firstMatrix, secondMatrix) => {
        if (firstMatrix.length === secondMatrix.length) {
            return firstMatrix.map((item, idx) => ({bias: item, weights: secondMatrix[idx]}))
        }
    }
}
