class UIFile {
    constructor(file) {
        this.name = file.name
        this.path = file.path
        this.HTMLElem
        this.bus = bus // FIXME:
    }
    renderIn(HTMLNode) {
        this.HTMLElem = document.createElement('li')
        console.log(this.HTMLElem)
        this.HTMLElem.innerText = this.name
        this.HTMLElem.addEventListener('dblclick', (event) => {
            this.play()
        })
        HTMLNode.appendChild(this.HTMLElem)
    }
    // TODO: moveTo UIAudioFile Class
    play() {
        this.bus.playlist = this.bus.activeFileList
        this.bus.currentTrack = this
        console.log('PLAY!')
        console.log(this.bus) // FIXME:
        this.markTrackAsCurrentlyPlaying()
    }
    // TODO: возможно плохая идея, так как при переключении папок не сохраняется состояние
    // TODO: должно быть перенесено в UIFileList?!
    markTrackAsCurrentlyPlaying() {
        const previoslyPlayedTrack = document.querySelector('#currentTrack')
        if (previoslyPlayedTrack) {
            previoslyPlayedTrack.id = ''
        }
        this.HTMLElem.id = 'currentTrack' 
    }
}