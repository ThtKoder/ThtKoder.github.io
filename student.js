const dropzone = new Dropzone("div#myId", { url: "/file/post" });

dropzone.addEventListener('dragover', (event) => {
    event.preventDefault();
});

dropzone.addEventListener('drop', () => {
    event.preventDefault();

    if( event.dataTransfer.files.length > 0) {
        const file = event.dataTransfer.files[0];
        dropzoneMsg.textContent = `File "${file.name}" dropped successfully!`;
        

        // Here you can add code to handle the file, like uploading it to a server
    } else {
        dropzoneMsg.textContent = 'No files dropped.';
    }
});