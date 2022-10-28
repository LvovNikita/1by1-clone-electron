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
        // app global
        // app.playlist = new Playlist(app.activeFolder.fileList) 
        app.playlist = new Playlist() 
        app.playlist.play(this)
    }

    makeActive() {
        audioPlayer.setAttribute('src', this.absolutePath)
        audioPlayer.play()

        this.el.className = 'active'
    
        // app global
        app.activeAudioFile?.el.classList.remove('active')
        app.activeAudioFile = this

        // TODO: pass track name to equalizer
        // TODO: pass track name to app title!
    }
}