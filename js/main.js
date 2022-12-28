var imageEntry = document.querySelector('img');
var imageURL = document.getElementById('photo-URL');

function getImage(event) {
  imageEntry.setAttribute('src', imageURL.value);
}

imageURL.addEventListener('input', getImage);
