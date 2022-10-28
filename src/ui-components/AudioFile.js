class File {
    constructor (filename, absolutePath, folderAbsolutePath) {
        this.name = filename
        this.absolutePath = absolutePath
        this.folderAbsolutePath = folderAbsolutePath
        this.el = document.createElement('li')
        // HTMLelem properties:   
        this.el.innerText = filename
    }
}

class AudioFile extends File {
    constructor (filename, absolutePath, folderAbsolutePath) {
        super(filename, absolutePath, folderAbsolutePath)
        this.isAudio = true
        // HTMLelem properties:
        this.el.addEventListener('dblclick', (event) => {
            this.play()
        })
    }

    async play () {
        const folderContent = await window.electronAPI.getFolderContent(this.folderAbsolutePath)
        playlist = new Playlist(activeFileList.content)                                             // FIXME: bad global!
        playlist.play(this)                                                                         // FIXME: bad global!
    }

    makeActive() {
        audioPlayer.setAttribute('src', this.absolutePath)
        audioPlayer.play()

        this.el.className = 'active'
    
        activeFileEl?.classList.remove('active')                                                    // FIXME: bad global!
        activeFileEl = this.el
        // TODO: pass track name to equalizer
        // TODO: pass track name to app title!
    }
}