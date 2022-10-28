class FileList {
    constructor (folderContent) {
        this.content = folderContent
            .filter(file => file.isAudio)
            .map(file => new AudioFile(file.name, file.absolutePath, file.folderAbsolutePath))
        this.el = document.createElement('ul')
    }

    renderIn (targetEl) {
        targetEl.innerHTML = ''
        for (const file of this.content) {
            this.el.append(file.el)
        }
        targetEl.appendChild(this.el)
        activeFileList = this               // FIXME: bad global!
    }

    clear () {
        this.el.innerHTML = ''
    }
}