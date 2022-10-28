const dirTreeEl = document.querySelector('#dirTree')
const audioPlayer = document.querySelector('audio')

// let activeFolderEl    // HTMLNode
// let activeFileEl      // HTMLNode
// let playlist
// let activeFileList

class App {
    constructor () {
        this.playlist
        this.activeFolder
        // this.activeFileList
        // this.activePlaylist
        this.activeAudioFile
        this.fileListEl = document.querySelector('#fileList') 
    }
}

const app = new App()

window.electronAPI.getInitialDirTree((event, dirTreeContent) => { // obj {name, absolutePath, isDirectory, isAudio}
    const initalDirTree = new DirTree(dirTreeContent)
    initalDirTree.renderIn(dirTreeEl)
})

audioPlayer.addEventListener('ended', (event) => {
    app.playlist.playNextTrack()
})