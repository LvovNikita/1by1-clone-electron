const fileTreeListEl = document.querySelector('#fileTree ul')
const fileListEl = document.querySelector('#fileList ul')
const audioPlayer = document.querySelector('audio')

let activeFolder
let activeFile
let playlist

window.electronAPI.getFileTree((event, fileTreeContent) => {
    renderFileTree(fileTreeContent)
})


function renderFileTree (fileTreeContent) {
    for (const { name, isDirectory, absolutePath } of fileTreeContent) {
        if (isDirectory) {
            const folderEl = new HTMLFolder(name, absolutePath)
            fileTreeListEl.append(folderEl)
        }
    }
}

async function renderFileList (event) {
    let fileListArr = await window.electronAPI.getFolderContent(event.target.parentElement.getAttribute('absolutePath'))
    resetCurrentActiveDirectory: {
        activeFolder?.classList.remove('active')
        fileListEl.innerHTML = '' // 
    }
    fileListArr =  fileListArr.filter(file => file.isAudio)
    for (const file of fileListArr) {
        const fileEl = document.createElement('li')
        fileEl.innerText = file.name
        fileListEl.append(fileEl)
        fileEl.addEventListener('click', (event) => {
            activeFile?.classList.remove('active')
            event.target.className = 'active'
            activeFile = event.target
        })
        fileEl.addEventListener('dblclick', (event) => {
            playlist = [...fileListArr].slice(fileListArr.indexOf(file))
            console.log('Playing!', file.absolutePath)
            audioPlayer.setAttribute('src', file.absolutePath)
            audioPlayer.play()
            // TODO: pass track name to equalizer
            // TODO: pass track name to app title!
        })
    }
    activeFolder = event.target
    activeFolder.className = 'active'
}

audioPlayer.addEventListener('ended', (event) => {
    if (playlist[1]) {
        playlist.shift()
        const nextTrack = playlist[0]
        audioPlayer.setAttribute('src', nextTrack.absolutePath)
        audioPlayer.play()
    }
})

// getFileTree
// renderFileTree
// renderFileList