const fileTreeListEl = document.querySelector('#fileTree')
const playlistEl = document.querySelector('#playlist')
const audioPlayer = document.querySelector('audio')

let activeFolder
let activeFileEl      // HTMLNode
let playlist

window.electronAPI.getInitialFileTree((event, fileTreeContent) => { // obj {name, absolutePath, isDirectory, isAudio}
    const initalFileTree = new FileTree(fileTreeContent)
    initalFileTree.renderIn(fileTreeListEl)
})

audioPlayer.addEventListener('ended', (event) => {
    playlist.playNextTrack()
})
