class ExpandButton extends Button {
    constructor (innerText) {
        super(innerText)
        this.el.className = 'expandFolderBtn'
        this.el.addEventListener('click', async (event) => {
            const currentFolderEl = event.target.parentElement
            if (event.target.getAttribute('isOpened') !== 'true') {

                const currentFolderAbsolutePath = currentFolderEl.getAttribute('absolutePath')
                let fileTreeContent = await window.electronAPI.getFolderContent(currentFolderAbsolutePath)
                fileTreeContent = fileTreeContent.filter(file => file.isDirectory)
                
                const fileSubTree = new FileTree(fileTreeContent)
                fileSubTree.renderIn(currentFolderEl)

                event.target.setAttribute('isOpened', 'true')

                event.target.innerText = '-'
            } else {
                event.target.setAttribute('isOpened', 'false')
                const subTree = currentFolderEl.childNodes[2] // FIXME: use tag name instead of index
                currentFolderEl.removeChild(subTree)
                event.target.innerText = '+'
            }
        })
    }
}

const HTMLExpandButton = new Proxy(ExpandButton, {
    construct(target, argArray, newTarget) {
        return new target(...argArray).el
    }
})