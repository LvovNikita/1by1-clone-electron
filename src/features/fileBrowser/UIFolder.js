class UIFolder {
    constructor(folder) {
        this.name = folder.name
        this.path = folder.path
        this.HTMLElem
        this.bus = bus // FIXME:
    }
    renderIn(HTMLNode) {
        this.HTMLElem = document.createElement('li')
        
        const expandButton = new UIExpandButton(this) // FIXME:
        this.HTMLElem.appendChild(expandButton.HTMLElem)
        
        const HTMLfolderTitle = document.createElement('span')
        HTMLfolderTitle.innerText = this.name
        this.HTMLElem.appendChild(HTMLfolderTitle)
        HTMLfolderTitle.addEventListener('click', this.select.bind(this))
        
        HTMLNode.appendChild(this.HTMLElem)
    }
    select(event) {
        this.bus.activeFolderTitle?.classList.remove('active')
        event.target.className = 'active'
        this.bus.activeFolderTitle = event.target
        this.getAudioFiles()
    }
    async getSubFolders() {
        this.bus.folderToExpand = this.HTMLElem
        await window.electronAPI.getSubFolders(this.path)
    }
    async getAudioFiles() {
        await window.electronAPI.getAudioFiles(this.path)
    }
}

class UIExpandButton {
    constructor(UIFolder) {
        this.HTMLElem = document.createElement('button')
        this.HTMLElem.innerText = '+'
        this.HTMLElem.className = 'expandFolderBtn'
        this.HTMLElem.addEventListener('click', this.toggle.bind(this))
        this.UIFolder = UIFolder
        this.isExpanded = false
    }
    toggle(event) {
        // debugLogs: {
        //     console.log(event)
        //     console.log(this)
        //     console.log(this.HTMLElem)
        //     console.log(this.UIFolder)
        // }
        
        if (!this.isExpanded) expand:{
            this.UIFolder.getSubFolders()
            this.HTMLElem.innerText = '-'
        } else collapse:{
            this.UIFolder.HTMLElem.querySelector('ul').remove()
            this.HTMLElem.innerText = '+'
        }
        this.isExpanded = !this.isExpanded
    }
}