class FileTree {
    constructor(fileTreeContent) {
        this.content = fileTreeContent
    }

    renderIn(targetEl) {
        const listEl = document.createElement('ul')
        for (const { name, isDirectory, absolutePath } of this.content) {
            if (isDirectory) {
                const folderEl = new HTMLFolder(name, absolutePath)
                listEl.append(folderEl)
            }
        }
        targetEl.appendChild(listEl)
    }
}