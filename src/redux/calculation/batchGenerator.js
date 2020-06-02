
export class BatchGenerator {
    constructor(source) {
        this._all = source.readAll()
    }

    createMiniBatch(size) {
        let start = Math.floor(Math.random() * this._all.length)
        let result = []

        for (let index = start, count = 0; count < size; count++, index++) {
            if (index === this._all.length)
                index = 0

            result = [...result, this._all[index]]
        }

        

        return result
    }

}
