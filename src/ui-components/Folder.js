class Folder {
    constructor(name, absolutePath) {
        this.absolutePath = absolutePath 
        this.el = document.createElement('li')

        this.el.setAttribute('absolutePath', absolutePath)
        const folderNameEl = document.createElement('span')
        folderNameEl.innerText = name
        folderNameEl.addEventListener('click', async (event) => {
            makeFolderActive(event) // FIXME: bad!
            const folderContent = await window.electronAPI.getFolderContent(this.absolutePath)
            playlist = new Playlist(folderContent)
            playlist.renderIn(playlistEl)
        })
        const expandButtonEl = new HTMLExpandButton('+')
        this.el.appendChild(expandButtonEl)
        this.el.appendChild(folderNameEl)
    }
}

const HTMLFolder = new Proxy(Folder, {
    construct(target, argArray, newTarget) {
        return new target(...argArray).el
    }
})


// FIXME: bad!
function makeFolderActive (event) {
    activeFolder?.classList.remove('active') 
    playlistEl.innerHTML = ''
    activeFolder = event.target
    activeFolder.className = 'active' 
}