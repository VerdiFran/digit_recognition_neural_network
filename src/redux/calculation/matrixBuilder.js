import {Matrix} from "./matrix"

export class MatrixBuilder {
    buildColumnMatrix(data) {
        return new Matrix(data.map(item => [item]))
    }

    buildRandomMatrix(width, height) {
        let data = []

        for (let i = 0; i < height; i++) {
            let row = []
            for (let j = 0; j < width; j++) {
                row = [...row, Math.random()]
            }
            data = [...data, row]
        }

        return new Matrix(data)
    }

    buildUnitMatrix(data) {
        return new Matrix(data.map(() => [1]))
    }

    buildZeroMatrix(width, height) {
        let data = []
        for (let i = 0; i < height; i++) {
            let row = []
            for (let j = 0; j < width; j++) {
                row = [...row, 0.0]
            }
            data = [...data, row]
        }

        return new Matrix(data)
    }

    toUnitMatrix(matrix) {
        let result = []
        matrix.getMatrixValues().forEach(row => row.forEach(item => result = [...result, [item]]))
        return new Matrix(result)
    }

    toZeroMatrix(matrixValues) {
        return new Matrix(matrixValues.map(row => row.map(() => 0)))
    }
}
