const fileTreeListEl = document.querySelector('#fileTree ul')
const playlistEl = document.querySelector('#fileList')
const audioPlayer = document.querySelector('audio')

let activeFolder
let activeFile      // HTMLNode
let playlist

window.electronAPI.getFileTree((event, fileTreeContent) => {
    const initalFileTree = new FileTree(fileTreeContent)
    initalFileTree.renderIn(fileTreeListEl)
})

audioPlayer.addEventListener('ended', (event) => {
    playlist.playNextTrack()
})
