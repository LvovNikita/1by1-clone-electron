const fileTreeListEl = document.querySelector('#fileTree ul')

window.electronAPI.getFileTree((event, fileTreeContent) => {
    for (const { name, isDirectory } of fileTreeContent) {
        if (isDirectory) {
            const folderEl = document.createElement('li')

            const expandButtonEl = document.createElement('button')
            expandButtonEl.className = 'expandFolderBtn'
            expandButtonEl.innerText = '+'
            expandButtonEl.addEventListener('click', (event) => {
                console.log('Clicked: ', event)
            })
            folderEl.appendChild(expandButtonEl)
            
            const folderNameEl = document.createElement('span')
            folderNameEl.innerText = name
            // FIXME: refactor: getFoldeContent as additional function
            folderNameEl.addEventListener('click', async (event) => {
                console.log('Clicked: ', event)
                console.log(await window.electronAPI.getFolderContent())
            })
            folderEl.appendChild(folderNameEl)
            
            fileTreeListEl.append(folderEl)
        }
    }
})


// ).addEventListener('click', () => {
//     console.log('clicked!')
// })