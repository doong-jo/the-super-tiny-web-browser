const { ipcRenderer } = require('electron');

const urlInput = document.querySelector('#urlInput');
urlInput.addEventListener('keypress', (e) => {
    if( e.keyCode === 13 ) {
        alert('go!');
        ipcRenderer.send("urlRequest", urlInput.value);
    }
});
