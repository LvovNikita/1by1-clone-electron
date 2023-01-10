class UIFolder {
    constructor(clientSideFolder) {
        this.name = clientSideFolder.name
        this.path = clientSideFolder.path
        this.isOpen = false
        this.isActive = false
        this.HTMLElem = document.createElement('li')
    }
    renderIn(HTMLNode) {
        this.HTMLElem.innerText = this.name
        const expandButton = new UIExpandButton(this)
        HTMLNode.appendChild(expandButton.HTMLElem)
        HTMLNode.appendChild(this.HTMLElem)
    }
    // expand()
    // collapse()
    // 
    // TODO:
    // 
    async getSubFolders() {
        await window.electronAPI.getSubFolders(this.path)
    }
}
    
class UIExpandButton {
    constructor(UIFolder) {
        this.HTMLElem = document.createElement('button')
        this.HTMLElem.innerText = '+'
        this.HTMLElem.className = 'expandFolderBtn'
        this.UIFolder = UIFolder
        this.HTMLElem.addEventListener('click', expandFolder.bind(this))
    }
}

function expandFolder(event) {
    debugLogs: {
        console.log(event)
        console.log(this)
        console.log(this.HTMLElem)
        console.log(this.UIFolder)
    }
    this.UIFolder.getSubFolders()
}