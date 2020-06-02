
export class Matrix {
    constructor(data) {
        this._matrix = data.map(row => [...row])
    }

    getMatrixValues() {
        return this._matrix
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
}
