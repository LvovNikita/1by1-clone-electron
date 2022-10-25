const fileTreeListEl = document.querySelector('#fileTree ul')
const fileListEl = document.querySelector('#fileList ul')

let activeFolder
let activeFile

window.electronAPI.getFileTree((event, fileTreeContent) => {
    renderFileTree(fileTreeContent)
})


function renderFileTree (fileTreeContent) {
    for (const { name, isDirectory, absolutePath } of fileTreeContent) {
        if (isDirectory) {
            const folderEl = new HTMLFolder(name, absolutePath)
            fileTreeListEl.append(folderEl)
        }
    }
}

async function renderFileList (event) {
    const fileListArr = await window.electronAPI.getFolderContent(event.target.getAttribute('absolutePath'))
    resetCurrentActiveDirectory: {
        activeFolder?.classList.remove('active')
        fileListEl.innerHTML = '' // 
    }
    for (const file of fileListArr) {
        const fileEl = document.createElement('li')
        fileEl.innerText = file.name
        fileListEl.append(fileEl)
        fileEl.addEventListener('click', (event) => {
            activeFile?.classList.remove('active')
            event.target.className = 'active'
            activeFile = event.target
        })
        fileEl.addEventListener('dblclick', (event) => {
            console.log('Playing!')
            // TODO: pass track name to equalizer
            // TODO: pass track name to app title!
        })
    }
    activeFolder = event.target
    activeFolder.className = 'active'
}

// getFileTree
// renderFileTree
// renderFileList