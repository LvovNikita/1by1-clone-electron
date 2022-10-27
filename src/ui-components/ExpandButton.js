class Button {
    constructor (innerText) {
        this.el = document.createElement('button')
        this.el.innerText = innerText
    }
}

class ExpandButton extends Button {
    constructor (folder) {
        super('+')
        this.el.className = 'expandFolderBtn'
        this.folder = folder
        // HTMLelem properties:
        this.el.addEventListener('click', async (event) => {
            if (!this.folder.isOpened) {
                await this.folder.expand()
                this.el.innerText = '-'
            } else {
                this.folder.collapse()
                this.el.innerText = '+'
            }
        })
    }
}

const HTMLExpandButton = new Proxy(ExpandButton, {
    construct(target, argArray, newTarget) {
        return new target(...argArray).el
    }
})
