const dirTreeRootEl = document.querySelector('#dirTree ul')

window.electronAPI.getRootFolders((event, rootFolders) => {
    console.log('!!')
    for (const rootFolder of rootFolders) {
        const uiRootFolder = new UIFolder(rootFolder)
        uiRootFolder.renderIn(dirTreeRootEl)
    }
})

// const audioPlayer = document.querySelector('audio')

// let activeFolderEl    // HTMLNode
// let activeFileEl      // HTMLNode
// let playlist
// let activeFileList

// class App {
//     constructor () {
//         this.playlist
//         this.activeFolder
//         // this.activeFileList
//         // this.activePlaylist
//         this.activeAudioFile
//         this.fileListEl = document.querySelector('#fileList') 
//     }
// }

// const app = new App()

// audioPlayer.addEventListener('ended', (event) => {
//     app.playlist.playNextTrack()
// })