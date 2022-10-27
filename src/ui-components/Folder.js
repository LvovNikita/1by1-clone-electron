class Folder {
    constructor(name, absolutePath) {
        // TODO: add:
        this.content
        this.absolutePath = absolutePath 
        this.isOpened = false
        this.fileTree
        this.el = document.createElement('li')
        // HTMLelem properties
        this.el.setAttribute('absolutePath', absolutePath)
        const folderNameEl = document.createElement('span')
        folderNameEl.innerText = name
        folderNameEl.addEventListener('click', async (event) => {
            makeFolderActive(event) // FIXME: bad!
            const folderContent = await window.electronAPI.getFolderContent(this.absolutePath)
            playlist = new Playlist(folderContent)
            playlist.renderIn(playlistEl)
        })
        const expandButtonEl = new HTMLExpandButton('+', this)
        this.el.appendChild(expandButtonEl)
        this.el.appendChild(folderNameEl)
    }
    async loadContent () {
        let folderContent = await window.electronAPI.getFolderContent(this.absolutePath)
        this.content = folderContent.filter(file => file.isDirectory)
    }
    async expand () {
        if (!this.content || !this.file) {
            await this.loadContent()
            this.fileTree = new FileTree(this.content)
        }
        this.fileTree.renderIn(this.el)
        this.isOpened = true
    }
    collapse () {
        this.fileTree.hide()
        this.isOpened = false
    }
}

const HTMLFolder = new Proxy(Folder, {
    construct(target, argArray, newTarget) {
        return new target(...argArray).el
    }
})


// FIXME: bad!
function makeFolderActive (event) {
    activeFolder?.classList.remove('active') 
    playlistEl.innerHTML = ''
    activeFolder = event.target
    activeFolder.className = 'active' 
}