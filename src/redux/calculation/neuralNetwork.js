import {MatrixBuilder} from './matrixBuilder'
import {Matrix} from './matrix'
import {getNetworkState} from './stateLoader'

export class NeuralNetwork {
    constructor() {
        const {biases, weights} = getNetworkState()

        this._biases = biases.map(bias => new Matrix(bias))
        this._weights = weights.map(weight => new Matrix(weight))
    }

    _matrixBuilder = new MatrixBuilder()

    _sigmoid(vector) {
        return new Matrix(vector.getMatrixValues().map(item => [1.0 / (1.0 + Math.exp(-item[0]))]))
    }

    feedForward(input) {
        let output = this._matrixBuilder.buildColumnMatrix(input)

        this._biases.forEach((item, index) =>
            output = this._sigmoid(this._weights[index].multiply(output).pointWiseAdd(item)))

        let resultValues = output.getMatrixValues().map(row => row[0])
        let resultDigit = resultValues.indexOf(Math.max.apply(null, resultValues))

        return resultDigit
    }
}
