// const audioPlayer = document.querySelector('audio')
const fileListHTMLNode = document.querySelector('#fileList') 
const dirTreeHTMLNode = document.querySelector('#dirTree')

const bus = {
    folderToExpand: dirTreeHTMLNode,
    activeFolderTitle: null,
    activeFileList: null,
    playlist: null,
    currentTrack: null
}


window.electronAPI.getSubFoldersOnClient((event, subFolders) => {
    renderSubFolders(subFolders, bus.folderToExpand)
})

function renderSubFolders(subfolders, HTMLNode) {
    const ul = document.createElement('ul')
    HTMLNode.append(ul)
    for (const folder of subfolders) {
        const uiFolder = new UIFolder(folder)
        uiFolder.renderIn(ul)
    }
}


// TODO:
window.electronAPI.getAudioFilesOnClient((event, audioFiles) => {
    const uiAudioFiles = audioFiles.map(audioFile => new UIFile(audioFile))
    const uiFileList = new UIFileList(uiAudioFiles)
    bus.activeFileList = uiFileList
    uiFileList.renderIn(fileListHTMLNode)
})