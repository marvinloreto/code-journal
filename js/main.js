var imageEntry = document.querySelector('img');
var imageURL = document.getElementById('photo-URL');
var entryForm = document.querySelector('form');

function getImage(event) {
  imageEntry.setAttribute('src', imageURL.value);
}

imageURL.addEventListener('input', getImage);

function saveEntry(event) {
  event.preventDefault();
  var entryData = new FormData(entryForm);
  var dataObject = Object.fromEntries(entryData);
  dataObject.entryId = data.nextEntryId;
  data.nextEntryId++;
  data.entries.push(dataObject.entryId);
  imageEntry.setAttribute('src', 'images/placeholder-image-square.jpg');
  entryForm.reset();
}

entryForm.addEventListener('submit', saveEntry);
