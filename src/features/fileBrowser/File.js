const extractPathLastPart = require('../../utils/extractPathLastPart')

class File {
    constructor(absolutePath) {
        this.path = absolutePath
        this.name = extractPathLastPart(absolutePath)
    }
}

module.exports = File

// HTML: HTMLElem
// HTML: select

// class AudioFile
// play()