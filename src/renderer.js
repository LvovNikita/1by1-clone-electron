const fileTreeListEl = document.querySelector('#fileTree ul')
const fileListEl = document.querySelector('#fileList ul')
let activeFolder
// let activeFile

window.electronAPI.getFileTree((event, fileTreeContent) => {
    renderFileTree(fileTreeContent)
})

function renderFileTree (fileTreeContent) {
    for (const { name, isDirectory, absolutePath } of fileTreeContent) {
        if (isDirectory) {
            const folderEl = document.createElement('li')

            const expandButtonEl = document.createElement('button')
            expandButtonEl.className = 'expandFolderBtn'
            expandButtonEl.innerText = '+'
            expandButtonEl.addEventListener('click', (event) => {
                console.log('Clicked: ', event)
            })
            folderEl.appendChild(expandButtonEl)
            
            const folderNameEl = document.createElement('span')
            folderNameEl.innerText = name
            folderNameEl.setAttribute('absolutePath', absolutePath)
            folderNameEl.addEventListener('click', async (event) => {
                renderFileList(event)
            })
            folderEl.appendChild(folderNameEl)

            fileTreeListEl.append(folderEl)
        }
    }
}

// class Button {
//     constructor (innerText) {
//         this.innerText = innerText
//     }
// }

// class ExpandButton extends Button {
//     constructor (innerText) {
//         super(innerText)
//         this.className = 'expandFolderBtn'
//     }
// }

async function renderFileList (event) {
    activeFolder?.classList.remove('active')
    const fileListArr = await window.electronAPI.getFolderContent(event.target.getAttribute('absolutePath'))
    fileListEl.innerHTML = ''
    for (const file of fileListArr) {
        const fileEl = document.createElement('li')
        fileEl.innerText = file.name
        fileListEl.append(fileEl)
    }
    activeFolder = event.target
    activeFolder.className = 'active'
}

// getFileTree
// renderFileTree
// renderFileList