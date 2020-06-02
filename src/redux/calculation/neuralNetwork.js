import {BatchGenerator} from './batchGenerator'
import {MatrixBuilder} from './matrixBuilder'
import {Matrix} from './matrix'
import {getNetworkState} from './stateLoader'

export class NeuralNetwork {
    constructor() {
        const {biases, weights} = getNetworkState()
        /*this._generator = new BatchGenerator(source)
        this.sizes = [...sizes]
        this.numLayers = sizes.length

        for (let y = 1; y < sizes.length; y++) {
            this.biases = [...this.biases, this._matrixBuilder.buildRandomMatrix(1, sizes[y])]
        }

        for (let x = 0, y = 1; y < sizes.length; x++, y++) {
            this.weights = [...this.weights, this._matrixBuilder.buildRandomMatrix(sizes[x], sizes[y])]
        }*/
        this._biases = biases.map(bias => new Matrix(bias))
        this._weights = weights.map(weight => new Matrix(weight))


    }

    _biases = []
    _weights = []
    _matrixBuilder = new MatrixBuilder()

    _sigmoid(vector) {
        return new Matrix(vector.getMatrixValues().map(item => [1.0 / (1.0 + Math.exp(-item[0]))]))
    }

    _sigmoidPrime(vector) {
        let sigmoidResult = new Matrix(this._sigmoid(vector))
        let unitMatrix = this._matrixBuilder.buildUnitMatrix(sigmoidResult.getMatrixValues())
        return sigmoidResult.pointWiseMultiply(unitMatrix.pointWiseSubtract(sigmoidResult))
    }

    _cost(actual, expected) {
        return expected.pointWiseSubtract(actual)
    }

    backPropagation(train) {
        let activations = [this._matrixBuilder.buildColumnMatrix(train.input)]
        let weightedSums = []

        this._biases.forEach((item, idx) => {
            let weightedSum = this._weights[idx].multiply(activations[activations.length - 1]).pointWiseAdd(item)
            weightedSums = [...weightedSums, weightedSum]

            activations = [...activations, new Matrix(this._sigmoid(weightedSum.getMatrixValues()))]
        })

        let actual = this._matrixBuilder.buildColumnMatrix(train.output)
        let delta = this._cost(actual, activations[activations.length - 1])
            .pointWiseMultiply(this._sigmoidPrime(weightedSums[weightedSums.length - 1].getMatrixValues()))

        let biasesGradient = [delta]
        let weightsGradient = [delta.multiply(activations[activations.length - 2].transpose())]

        for (let index = 2; index < this.numLayers; index++) {
            let weightedSum = weightedSums[weightedSums.length - index].getMatrixValues()
            let prime = this._sigmoidPrime(weightedSum)

            let weights = this._weights[this._weights.length - (index - 1)]

            delta = weights.transpose().multiply(delta).pointWiseMultiply(prime)
            biasesGradient = [...biasesGradient, delta]
            weightsGradient = [...weightsGradient, delta.multiply(activations[activations.length - 1 - index].transpose())]
        }

        biasesGradient = biasesGradient.reverse()
        weightsGradient = weightsGradient.reverse()

        let result = []
        for (let index = 0; index < weightsGradient.length; index++) {
            result = [...result, {
                weights: weightsGradient[index],
                biases: biasesGradient[index]
            }]
        }

        return result
    }

    feedForward(input) {
        let output = this._matrixBuilder.buildColumnMatrix(input)
        /*let biasesWithWeights = this._biases.zip(this._weights)

        biasesWithWeights.forEach(item =>
            output = this._sigmoid(item.getMatrixValues().weights.multiply(output).pointWiseAdd(item.getMatrixValues().bias)))
        */

        this._biases.forEach((item, index) =>
            output = this._sigmoid(this._weights[index].multiply(output).pointWiseMultiply(item)))


        let resultValues = output.getMatrixValues().map(row => row[0])
        let resultDigit = resultValues.indexOf(resultValues.max())

        console.log(resultDigit)

        return resultDigit
    }

    train(speed, epochs) {
        for (let epoch = 0; epoch < epochs; epoch++) {
            let miniBatches = []

            for (let number = 0; number < 100; number++) {
                miniBatches = [...miniBatches, this._generator.createMiniBatch(10)]
            }

            miniBatches.forEach(batch => {
                let weightsGradient = this._weights
                    .map(weights => this._matrixBuilder.toZeroMatrix(weights.getMatrixValues()))

                let biasesGradient = this._biases
                    .map(biases => this._matrixBuilder.toZeroMatrix(biases.getMatrixValues()))

                batch.forEach(data => {
                    let gradients = this.backPropagation(data)
                    for (let layer = 0; layer < this.numLayers - 1; layer++) {
                        weightsGradient[layer] = weightsGradient[layer].pointWiseAdd(gradients[layer].weights)
                        biasesGradient[layer] = biasesGradient[layer].pointWiseAdd(gradients[layer].biases)
                    }
                })

                for (let layer = 0; layer < this.numLayers - 1; layer++) {
                    this._weights[layer] = this._weights[layer]
                        .pointWiseSubtract(weightsGradient[layer].multiplyPoint(speed / batch.length))

                    this._biases[layer] = this._biases[layer]
                        .pointWiseSubtract(biasesGradient[layer].multiplyPoint(speed / batch.length))
                }
            })


            let testData = this._generator.createMiniBatch(10000)
            let count = 0

            testData.forEach(test => {
                let result = this.feedForward(test.data)
                let resultValues = result.map(row => row[0])
                let resNumber = resultValues.indexOf(Math.max(resultValues))

                if (resNumber === test.label) count++
            })

            console.log(`Эпоха: ${epoch + 1}, ${count}/${testData.length}`)
        }
    }
}
