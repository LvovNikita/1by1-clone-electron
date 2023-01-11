// const audioPlayer = document.querySelector('audio')
// const fileList = document.querySelector('#fileList') 
const dirTreeHTMLNode = document.querySelector('#dirTree')

const bus = {
    folderToExpand: dirTreeHTMLNode,
    activeFolderTitle: null
}

function renderSubFolders(subfolders, HTMLNode) {
    const ul = document.createElement('ul')
    HTMLNode.append(ul)
    for (const folder of subfolders) {
        const uiFolder = new UIFolder(folder)
        uiFolder.renderIn(ul)
    }
}

window.electronAPI.getSubFoldersOnClient((event, subfolders) => {
    renderSubFolders(subfolders, bus.folderToExpand)
})