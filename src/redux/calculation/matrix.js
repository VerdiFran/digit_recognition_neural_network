
export class Matrix {
    constructor(data) {
        this._matrix = data.map(row => [...row])
    }

    getMatrixValues() {
        return this._matrix
    }

    transpose() {
        const width = this._matrix[0].length
        const height = this._matrix.length

        let result = []

        for (let i = 0; i < width; i++) {
            let row = []
            for (let j = 0; j < height; j++) {
                row.push(this._matrix[j][i])
            }
            result.push(row)
        }

        return new Matrix(result)
    }

    multiply(secondMatrix) {
        if (this._matrix[0].length === secondMatrix.getMatrixValues().length) {
            let result = []

            for (let i = 0; i < this._matrix.length; i++) {
                let row = []
                for (let j = 0; j < secondMatrix.getMatrixValues()[0].length; j++) {
                    let sum = 0
                    for (let k = 0; k < secondMatrix.getMatrixValues().length; k++) {
                        sum += this._matrix[i][k] * secondMatrix.getMatrixValues()[k][j]
                    }
                    row = [...row, sum]
                }
                result = [...result, row]
            }

            return new Matrix(result)
        } else alert('Матрицы не согласованы')
    }

    pointWiseMultiply(secondMatrix) {
        const width1 = this._matrix[0].length
        const height1 = this._matrix.length
        const width2 = secondMatrix.getMatrixValues()[0].length
        const height2 = secondMatrix.getMatrixValues().length

        if (height1 === height2 && width1 === width2) {
            let result = []

            for (let i = 0; i < height1; i++) {
                let row = []
                for (let j = 0; j < width1; j++) {
                    row = [...row, this._matrix[i][j] * secondMatrix.getMatrixValues()[i][j]]
                }
                result = [...result, row]
            }

            return new Matrix(result)
        } else alert('Матрицы не равны')
    }

    pointWiseSubtract(secondMatrix) {
        const width1 = this._matrix[0].length
        const height1 = this._matrix.length
        const width2 = secondMatrix.getMatrixValues()[0].length
        const height2 = secondMatrix.getMatrixValues().length

        if (height1 === height2 && width1 === width2) {
            let result = []

            for (let i = 0; i < height1; i++) {
                let row = []
                for (let j = 0; j < width1; j++) {
                    row = [...row, this._matrix[i][j] - secondMatrix.getMatrixValues()[i][j]]
                }
                result = [...result, row]
            }

            return new Matrix(result)
        } else alert('Матрицы не равны')
    }

    pointWiseAdd(secondMatrix) {
        const width1 = this._matrix[0].length
        const height1 = this._matrix.length
        const width2 = secondMatrix.getMatrixValues()[0].length
        const height2 = secondMatrix.getMatrixValues().length

        if (height1 === height2 && width1 === width2) {
            let result = []

            for (let i = 0; i < height1; i++) {
                let row = []
                for (let j = 0; j < width1; j++) {
                    row = [...row, this._matrix[i][j] + secondMatrix.getMatrixValues()[i][j]]
                }
                result = [...result, row]
            }

            return new Matrix(result)
        } else alert('Матрицы не равны')
    }

    addPoint(number) {
        let result = []

        for (let i = 0; i < this._matrix.length; i++) {
            let row = []
            for (let j = 0; j < this._matrix[0].length; j++) {
                row = [...row, this._matrix[i][j] + number]
            }
            result = [...result, row]
        }

        return new Matrix(result)
    }

    multiplyPoint(number) {
        let result = []

        for (let i = 0; i < this._matrix.length; i++) {
            let row = []
            for (let j = 0; j < this._matrix[0].length; j++) {
                row = [...row, this._matrix[i][j] * number]
            }
            result = [...result, row]
        }

        return new Matrix(result)
    }

    zip(secondMatrix) {
        if (this._matrix.length === secondMatrix.getMatrixValues().length) {
            return this._matrix.map((item, idx) =>
                ({bias: item, weights: secondMatrix.getMatrixValues()[idx]}))
        } else {
            alert('Матрицы не равны')
        }
    }
}
