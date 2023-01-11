const os = require('node:os')
const path = require('node:path')
const { EventEmitter } = require('node:stream')

class Bus extends EventEmitter {
    constructor() {
        super()
        this.homeDirPath = os.homedir()
        this.rootFolders = []
        this.clientSideRootFolders = []
        
        if (os.platform() === 'linux') {
            this.rootFolderPath = '/'
            this.mediaFolderPath = path.join('/media', os.userInfo().username) 
        }
    }
}

// if (os.platform() === 'win32') {}

module.exports = Bus