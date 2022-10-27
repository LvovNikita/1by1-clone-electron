class Playlist {
    constructor (folderContent) {
        console.log('FOLDERCONTEN', folderContent)
        this.queue = folderContent
            .filter(file => file.isAudio)
            .map(file => new AudioFile(file.name, file.absolutePath))
        this.el
    }
    play (audioFile) {
        const trackNumber = this.queue.indexOf(audioFile) 
        this.queue.splice(0, trackNumber)

        // fire event
        const makeFileActiveEvent = new CustomEvent('makeFileActive', {
            detail: { audioFile: audioFile }
        })
        document.dispatchEvent(makeFileActiveEvent)
    }
    playNextTrack () {
        if (this.queue[1]) {
            this.queue.shift()
            const nextTrack = this.queue[0]
            this.play(nextTrack)
            // audioPlayer.setAttribute('src', nextTrack.absolutePath)
            // audioPlayer.play()
        }
    }
    renderIn (targetEl) {
        this.el = document.createElement('ul')
        for (const file of this.queue) {
            this.el.append(file.el)
        }
        targetEl.appendChild(this.el)
    }
    clear () {
        this.el.innerHTML = ''
    }
}