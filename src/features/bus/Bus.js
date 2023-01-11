const os = require('node:os')
const path = require('node:path')
const { EventEmitter } = require('node:stream')

class Bus extends EventEmitter {
    constructor() {
        super()
        this.homeDirPath = os.homedir()
        if (os.platform() === 'linux') {
            this.rootFolderPath = '/'
            this.mediaFolderPath = path.join('/media', os.userInfo().username) 
        }
        
        this.rootFolders = []
        this.clientSideRootFolders = []
        // this.playlist
    }
}

// if (os.platform() === 'win32') {}

module.exports = Bus