// const audioPlayer = document.querySelector('audio')
// const fileList = document.querySelector('#fileList') 
const dirTreeRootEl = document.querySelector('#dirTree ul')

window.electronAPI.getRootFolders((event, rootFolders) => {
    renderSubFolders(rootFolders, dirTreeRootEl)
})

function renderSubFolders(subfolders, HTMLNode) {
    for (const folder of subfolders) {
        const uiFolder = new UIFolder(folder)
        uiFolder.renderIn(HTMLNode)
    }
}

// 
// TODO: рендерить в нужный элемент!
//
window.electronAPI.getExpandedFolderSubFolders((event, subfolders) => {
    renderSubFolders(subfolders, dirTreeRootEl)
})

// audioPlayer.addEventListener('ended', (event) => {
//     app.playlist.playNextTrack()
// })