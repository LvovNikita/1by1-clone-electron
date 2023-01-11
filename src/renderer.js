// const audioPlayer = document.querySelector('audio')
// const fileList = document.querySelector('#fileList') 
const dirTreeHTMLNode = document.querySelector('#dirTree')

const bus = {
    folderToExpand: dirTreeHTMLNode,
    activeFolderTitle: null
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


window.electronAPI.getAudioFilesOnClient((event, audiofiles) => {
    const uiFileList = new UIFileList(audiofiles)
    console.log(uiFileList)
})