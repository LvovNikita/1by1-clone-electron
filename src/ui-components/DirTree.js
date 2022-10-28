class DirTree {
    constructor(fileTreeContent) {
        this.content = fileTreeContent
        this.el
    }

    renderIn(targetEl) {
        this.el = document.createElement('ul')
        for (const { name, isDirectory, absolutePath } of this.content) {
            if (isDirectory) {
                const folderEl = new HTMLFolder(name, absolutePath)
                this.el.append(folderEl)
            }
        }
        targetEl.appendChild(this.el)
    }

    hide () {
        this.el.remove()
    }
}