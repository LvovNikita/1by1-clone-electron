class Button {
    constructor (innerText) {
        this.el = document.createElement('button')
        this.el.innerText = innerText
    }
}

// TODO: merge in one function (check renderer.js)
function renderFileSubTree (fileTreeContent, targetEl) {
    for (const { name, isDirectory, absolutePath } of fileTreeContent) {
        if (isDirectory) {
            const folderEl = new HTMLFolder(name, absolutePath)
            targetEl.append(folderEl)
        }
    }
}

class ExpandButton extends Button {
    constructor (innerText) {
        super(innerText)
        this.el.className = 'expandFolderBtn'
        this.el.addEventListener('click', async (event) => {
            const currentFolderEl = event.target.parentElement
            console.log(currentFolderEl)
            const currentFolderAbsolutePath = currentFolderEl.getAttribute('absolutePath')
            console.log(currentFolderAbsolutePath)
            let fileTreeContent = await window.electronAPI.getFolderContent(currentFolderAbsolutePath)
            fileTreeContent = fileTreeContent.filter(file => file.isDirectory)
            renderFileSubTree(fileTreeContent, currentFolderEl)
            // TODO: for testing
            // const subFolder = document.createElement('li')
            // subFolder.innerText = 'SUBFOLDER!'
            // currentFolderEl.appendChild(subFolder)
        })
    }
}

const HTMLExpandButton = new Proxy(ExpandButton, {
    construct(target, argArray, newTarget) {
        return new target(...argArray).el
    }
})


class Folder {
    constructor(name, absolutePath) {
        this.el = document.createElement('li')
        this.el.setAttribute('absolutePath', absolutePath)
        const folderNameEl = document.createElement('span')
        folderNameEl.innerText = name
        folderNameEl.addEventListener('click', async (event) => {
            renderFileList(event)
        })
        const expandButtonEl = new HTMLExpandButton('+')
        this.el.appendChild(expandButtonEl)
        this.el.appendChild(folderNameEl)
    }
}

const HTMLFolder = new Proxy(Folder, {
    construct(target, argArray, newTarget) {
        return new target(...argArray).el
    }
})