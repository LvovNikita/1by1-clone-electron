class File {
    constructor (filename, absolutePath) {
        this.name = filename
        this.absolutePath = absolutePath
        this.el = document.createElement('li')
        // HTMLelem properties:   
        this.el.innerText = filename
    }
}

class AudioFile extends File {
    constructor (filename, absolutePath) {
        super(filename, absolutePath)
        this.isAudio = true
        // HTMLelem properties:
        this.el.addEventListener('dblclick', (event) => {
            // fire event
            const playAudioFileEvent = new CustomEvent('playAudioFile', {
                detail: { audioFile: this }
            })
            document.dispatchEvent(playAudioFileEvent)
        })
    }
}