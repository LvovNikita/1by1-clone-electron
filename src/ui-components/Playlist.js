class Playlist {
    constructor (folderContent) {
        this.queue = folderContent
            .filter(file => file.isAudio)
            .map(file => new AudioFile(file.name, file.absolutePath))
    }
    play (audioFile) {
        this.queue = this.queue.slice(this.queue.indexOf(audioFile))
        audioPlayer.setAttribute('src', audioFile.absolutePath)
        audioPlayer.play()

        activeFileEl?.classList.remove('active') // FIXME: bad!
        audioFile.el.className = 'active'
        activeFileEl = audioFile.el
        // TODO: pass track name to equalizer
        // TODO: pass track name to app title!
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
        const listEl = document.createElement('ul')
        for (const file of this.queue) {
            listEl.append(file.el)
        }
        targetEl.appendChild(listEl)
    }
}