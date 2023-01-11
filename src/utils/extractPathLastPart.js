
const path = require('node:path')

module.exports = absolutePath => 
    absolutePath.slice(absolutePath.lastIndexOf(path.sep) + 1) 