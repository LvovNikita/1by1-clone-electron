class Button {
    constructor (innerText) {
        this.el = document.createElement('button')
        this.el.innerText = innerText
    }
}


class ExpandButton extends Button {
    constructor (innerText) {
        super(innerText)
        this.el.className = 'expandFolderBtn'
        this.el.addEventListener('click', (event) => {
            console.log('Clicked: ', event)
        })
    }
}

const HTMLExpandButton = new Proxy(ExpandButton, {
    construct(target, argArray, newTarget) {
        return new target(...argArray).el
    }
})


class Folder {
    constructor(name, absolutePath) {
        this.el = document.createElement('li')
        const folderNameEl = document.createElement('span')
        folderNameEl.innerText = name
        folderNameEl.setAttribute('absolutePath', absolutePath)
        folderNameEl.addEventListener('click', async (event) => {
            renderFileList(event)
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