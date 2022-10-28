class Folder {
    constructor(name, absolutePath) {
        this.name = name
        this.absolutePath = absolutePath 
        this.content
        this.subFoldersTree
        this.fileList 
        this.expandButton = new HTMLExpandButton(this)
        this.isOpened = false
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
            this.subFoldersTree = new DirTree(this.content)
        }
        this.subFoldersTree.renderIn(this.el)
        this.isOpened = true
    }

    collapse () {
        this.subFoldersTree.hide()
        this.isOpened = false
    }

    async makeActive () {
        await this.loadContent()

        // FIXME:
        
        this.fileList = new FileList(this)
        if (this.fileList.folder !== app.playlist?.fileList.folder) {
            this.fileList.renderIn(app.fileListEl) // app global
        } else {
            app.fileListEl.innerHTML = ''
            app.fileListEl.append(app.playlist.fileList.el)
        }

        // app global
        this.nameEl.className = 'active' 
        app.activeFolder?.nameEl.classList.remove('active')
        app.activeFolder = this 
    }
}


const HTMLFolder = new Proxy(Folder, {
    construct(target, argArray, newTarget) {
        return new target(...argArray).el
    }
})