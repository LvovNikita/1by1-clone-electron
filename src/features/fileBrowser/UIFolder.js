class UIFolder {
    constructor(folder) {
        this.name = folder.name
        this.path = folder.path
        this.isOpen = false
        // this.isActive = false
        this.HTMLElem
    }
    renderIn(HTMLNode) {
        this.HTMLElem = document.createElement('li')
        
        // FIXME: зависимость от другого класса!
        const expandButton = new UIExpandButton(this)
        this.HTMLElem.appendChild(expandButton.HTMLElem)

        const folderTitle = document.createElement('span')
        folderTitle.innerText = this.name
        this.HTMLElem.appendChild(folderTitle)
        
        HTMLNode.appendChild(this.HTMLElem)
    }
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
    // FIXME: обращение в другой класс!
    this.UIFolder.getSubFolders()
}


// if (!this.folder.isOpened) {
//     await this.folder.expand()
//     this.el.innerText = '-'
// } else {
//     this.folder.collapse()
//     this.el.innerText = '+'
// }