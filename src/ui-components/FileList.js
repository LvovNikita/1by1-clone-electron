class FileList {
    constructor (folder) {
        this.folder = folder
        this.content = folder.content
            .filter(file => file.isAudio)
            .map(file => new AudioFile(file.name, file.absolutePath, file.folderAbsolutePath))
        this.el = document.createElement('ul')
    }

    renderIn (targetEl) {
        targetEl.innerHTML = '' // clear

        for (const audioFile of this.content) {
            this.el.append(audioFile.el)
        }
        targetEl.appendChild(this.el)
    }

    clear () {
        this.el.innerHTML = ''
    }
}