
export class FileSource {

    readAll() {
        let trainData = require('./trainData/trainData.json')
        return trainData.map(train => ({
            input: train.input.map(value => value / 255.0),
            output: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0].map((item, idx) => idx === +train.output ? 1 : item)
        }))
    }

    _getPixelPosition(imageNumber, x, y) {
        return (imageNumber * 28 * 28) + (x + (y * 28)) + 15
    }

    _getLabelPosition(labelNumber) {
        return labelNumber + 8
    }

    dispose() {

    }
}
