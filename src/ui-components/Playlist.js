class Playlist {
    constructor (fileList) {
        this.queue = [...fileList]
    }

    play (audioFile) {
        const trackNumber = this.queue.indexOf(audioFile) 
        this.queue.splice(0, trackNumber)
        audioFile.makeActive()
    }

    playNextTrack () {
        if (this.queue[1]) {
            this.queue.shift()
            const nextTrack = this.queue[0]
            this.play(nextTrack)
        }
    }
}