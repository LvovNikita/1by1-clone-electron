class Folder {
    constructor(name, absolutePath) {
        this.name = name
        this.absolutePath = absolutePath 
        this.isOpened = false
        // TODO: this.isActive = false
        this.content
        this.fileTree
        this.expandButton = new HTMLExpandButton(this)
        this.el = document.createElement('li')
        this.nameEl = document.createElement('span')
        // HTMLelem properties
        this.nameEl.innerText = this.name
        this.nameEl.addEventListener('click', async () => {
            await this.makeActive()
        })
        this.el.appendChild(this.expandButton)
        this.el.appendChild(this.nameEl)
    }

    async loadContent () {
        this.content = await window.electronAPI.getFolderContent(this.absolutePath)
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

    async makeActive () {
        await this.loadContent()

        const fileList = new FileList(this.content)
        fileList.renderIn(playlistEl)

        this.nameEl.className = 'active' 

        activeFolderEl?.classList.remove('active')      // FIXME: bad global!
        activeFolderEl = this.nameEl
    }
}


const HTMLFolder = new Proxy(Folder, {
    construct(target, argArray, newTarget) {
        return new target(...argArray).el
    }
})