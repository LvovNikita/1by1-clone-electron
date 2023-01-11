const extractPathLastPart = require('../../utils/extractPathLastPart') 

class Folder {
    constructor(absolutePath) {
        this.path = absolutePath
        this.name = extractPathLastPart(absolutePath) || '/'
    }
}

module.exports = Folder