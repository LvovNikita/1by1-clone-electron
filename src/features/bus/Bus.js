const os = require('node:os')
const path = require('node:path')

class Bus {
    constructor() {
        this.homeDirPath = os.homedir()
        if (os.platform() === 'linux') {
            this.rootFolderPath = '/'
            this.mediaFolderPath = path.join('/media', os.userInfo().username) 
        }
        
        this.rootFolders = []
        this.clientSideRootFolders = []
    }
}

// if (os.platform() === 'win32') {}

module.exports = Bus