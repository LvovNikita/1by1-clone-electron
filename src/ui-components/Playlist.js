class Playlist {
    constructor (fileList) {
        this.queue = [...app.activeFolder.fileList.content]
        this.fileList = app.activeFolder.fileList
    }

    play (audioFile) {
        const trackNumber = this.queue.indexOf(audioFile)
        if (trackNumber > 0) {
            this.queue.splice(0, trackNumber)
            audioFile.makeActive()
        } 
    }

    playNextTrack () {
        if (this.queue[1]) {
            this.queue.shift()
            const nextTrack = this.queue[0]
            this.play(nextTrack)
        }
    }
}