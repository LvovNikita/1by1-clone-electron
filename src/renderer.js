const fileTreeListEl = document.querySelector('#fileTree')
const playlistEl = document.querySelector('#playlist')
const audioPlayer = document.querySelector('audio')

let activeFolderEl    // HTMLNode
let activeFileEl      // HTMLNode
let playlist
let activeFileList

// class AudioPlayer {
//     constructor () {
//         this.activeFolderEl
//         this.activeAudioFileEl
//         this.playlist
//     }
// }

window.electronAPI.getInitialFileTree((event, fileTreeContent) => { // obj {name, absolutePath, isDirectory, isAudio}
    const initalFileTree = new FileTree(fileTreeContent)
    initalFileTree.renderIn(fileTreeListEl)
})

audioPlayer.addEventListener('ended', (event) => {
    playlist.playNextTrack()
})

// Custom events:

// document.addEventListener('playAudioFile', event => {
//     const audioFile = event.detail.audioFile
//     playlist.play(audioFile)
// })

// document.addEventListener('makeFolderActive', event => {
//     const folder = event.detail.folder
    
//     playlist?.clear()
    
//     playlist = new Playlist(folder.content)
//     playlist.renderIn(playlistEl)
    
//     activeFolderEl?.classList.remove('active')
//     activeFolderEl = folder.nameEl
// })