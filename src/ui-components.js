class Playlist {
    constructor (folderContent) {
        this.queue = folderContent
            .filter(file => file.isAudio)
            .map(file => new AudioFile(file.name, file.absolutePath))
    }
    play (audioFile) {
        console.log('PLAY AUDIOFILE!')
        this.queue = this.queue.slice(this.queue.indexOf(audioFile))
        audioPlayer.setAttribute('src', audioFile.absolutePath)
        audioPlayer.play()
        // TODO: pass track name to equalizer
        // TODO: pass track name to app title!
    }
    playNextTrack () {
        if (this.queue[1]) {
            this.queue.shift()
            const nextTrack = this.queue[0]
            audioPlayer.setAttribute('src', nextTrack.absolutePath)
            audioPlayer.play()
        }
    }
    renderIn (targetEl) {
        for (const file of this.queue) {
            targetEl.append(file.el)
        }
    }
}