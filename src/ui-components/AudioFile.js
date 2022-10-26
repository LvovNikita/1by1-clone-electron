class File {
    constructor (filename, absolutePath) {
        this.name = filename
        this.absolutePath = absolutePath

        this.el = document.createElement('li')
        this.el.innerText = filename
    }
}

class AudioFile extends File {
    constructor (filename, absolutePath) {
        super(filename, absolutePath)
        this.isAudio = true

        this.el.addEventListener('click', (event) => {
            makeFileActive(event) // FIXME: bad!
        })
        this.el.addEventListener('dblclick', (event) => {
            playlist.play(this)
        })
        
    }
}

// FIXME: bad!
function makeFileActive (event) {
    activeFile?.classList.remove('active') // FIXME: bad!
    event.target.className = 'active'
    activeFile = event.target
}