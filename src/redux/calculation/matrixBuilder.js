import {Matrix} from "./matrix"

export class MatrixBuilder {
    buildColumnMatrix(data) {
        return new Matrix(data.map(item => [item]))
    }
}
