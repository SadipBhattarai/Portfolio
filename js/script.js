const card = document.querySelector('.card'),
    close = document.querySelector('.close'),
    drop_zone = document.querySelector('.drop-zone'),
    submit_file = document.querySelector('.submit-file');

close.onclick = () => {
    let decision = confirm("Are you sure?");
    if (decision){
        card.classList.add('inactive');
        setTimeout(() => {
            card.style.display ='none';
        }, 600);
    }
};

drop_zone.addEventListener('dragover', dropOver);
drop_zone.addEventListener('dragleave', dragLeave);
drop_zone.addEventListener('drop', drop);
document.getElementById('file').addEventListener('change', drop);

function dropOver(e) {
    e.preventDefault();

    drop_zone.classList.add('dragOver');
    drop_zone.querySelector('h4').innerText = 'Release files to upload.';
    drop_zone.classList.remove('hide');
    drop_zone.style.setProperty('--url','url()');
}

function dragLeave(){
    drop_zone.classList.remove('dragOver');
    drop_zone.querySelector('h4').innerText = 'Drag and drop file to upload.';
}

function drop(e) {
    e.preventDefault();
    let file;
    if(e.type == 'change') {
        file = e.target.files[0];
    } else {
        file = e.dataTransfer.files[0];
    }
    let file_format = file.type;
    let valid_formats = ['image/jpg','image/jpeg','image/png','image/svg','application/pdf'];
    let size_in_mb = (file.size/ (1024 * 1024)).toFixed(4);

    if(valid_formats.includes(file_format)) {
        if(size_in_mb > 4) {
            invalidFile('File size was more than 4MB.');
        } else {
            uploadFile(file);
        }
    } else {
        invalidFile("Invalid file format. " + file_format.split('/')[1].toUpperCase() + ' is not supported.');
    }
}

function invalidFile(msg) {
    drop_zone.classList.add('invalid');
    drop_zone.classList.remove('valid');
    drop_zone.classList.remove('dragOver');
    drop_zone.querySelector('h4').innerText = msg;
    drop_zone.style.setProperty('--url','url()');
}

function uploadFile(file) {
    drop_zone.classList.add('valid');
    drop_zone.classList.remove('dragOver');
    drop_zone.classList.remove('invalid');
    drop_zone.querySelector('h4').innerText = 'File uploaded successfully!'; // You can customize this message as needed.
    drop_zone.style.setProperty('--url', 'url()');   

    let FileReader = new FileReader();
    FileReader.onload = () => {
        drop_zone.style.setProperty('--url', 'url('+ FileReader.result +')');        
    };
    FileReader.readAsDataURL(file);
}
