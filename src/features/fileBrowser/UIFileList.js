class UIFileList {
    constructor(uiFiles = []) {
        this.files = uiFiles
        this.HTMLElem
        this.bus = bus
    }
    renderIn(HTMLNode) {
        this.HTMLElem = document.createElement('ul')
        for (const file of this.files) {
            file.renderIn(this.HTMLElem)
        }
        HTMLNode.innerHTML = ''
        HTMLNode.appendChild(this.HTMLElem)
        this.bus.activeFileList = this
        console.log(this.bus) // FIXME:
    }
}

// class PlayList
// playNextTrack()