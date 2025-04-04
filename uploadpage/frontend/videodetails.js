

document.getElementById('uploadForm').addEventListener('submit', function(event){
    event.preventDefault();

    const title = document.getElementById('Title').value;
    const description= document.getElementById('VideoDescription').value;
    const visibility=document.getElementById('Visibility').value;

    const formData = new FormData();
    formData.append('title',title);
    formData.append('description',description);
    formData.append('visibility',visibility);
    formData.append('video',document.getElementById('vInput').files[0]);
    formData.append('thumbnail', document.getElementById('fileInput').files[0]);

    document.getElementById('uploadForm').addEventListener('submit', function(event){
    event.preventDefault();

    const title = document.getElementById('Title').value;
    const description= document.getElementById('VideoDescription').value;
    const visibility=document.getElementById('Visibility').value;

    const formData = new FormData();
    formData.append('title',title);
    formData.append('description',description);
    formData.append('visibility',visibility);

    const videoInput = document.getElementById('vInput');
    const thumbnailInput = document.getElementById('fileInput'); 

    if (videoInput.files.length > 0) {
        formData.append('video', videoInput.files[0]);
    } else {
        console.log('Fișierul video nu a fost încărcat!');
        alert('Te rugăm să încarci un fișier video!');
        return; 
    }

    if (thumbnailInput.files.length > 0) {
        formData.append('thumbnail', thumbnailInput.files[0]);
    } else {
        console.log('Fișierul thumbnail nu a fost încărcat!');
        alert('Te rugăm să încarci un thumbnail!');
        return;
    }

    fetch('http://localhost:3000/upload/upload',{
        method:'POST',
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        if (data.message === 'Videoclip incarcat cu succes!') {
            //alert('Fișierul a fost încărcat cu succes!');
            parent.location.href = 'upload.html'; 
        } else {
            alert('A apărut o problemă la încărcarea fișierului de tip 1!');
        }
    })
    .catch(error => {
        console.error('Eroare la încărcarea fișierului', error);
        alert('A apărut o eroare la încărcarea fișierului de tip doi.');
    });
})


})


document.getElementById('fileInput').addEventListener('change', function(event) {
    const file = event.target.files[0]; // Obține fișierul selectat
    const thumbnailBlock = document.getElementById('thumbnailblock'); // Selectează div-ul de thumbnail
    thumbnailBlock.innerHTML = ''; // Curăță conținutul anterior al div-ului

    if (file) {
        const reader = new FileReader(); // Creează un FileReader pentru a citi fișierul

        reader.onload = function(e) {
            const img = document.createElement('img'); // Creează un element img
            img.src = e.target.result; // Setează src-ul imaginii la conținutul fișierului
            thumbnailBlock.appendChild(img); // Adaugă imaginea în thumbnailBlock
        };

        reader.readAsDataURL(file); // Citește fișierul ca URL de date
    } else {
        thumbnailBlock.innerHTML = '<p>No thumbnail selected</p>'; // Mesaj alternativ dacă nu există fișier
    }
});