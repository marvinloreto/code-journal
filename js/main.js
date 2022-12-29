var imageEntry = document.querySelector('img');
var imageURL = document.getElementById('photoURL');
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
  data.entries.push(dataObject);
  imageEntry.setAttribute('src', 'images/placeholder-image-square.jpg');
  entryForm.reset();
}

entryForm.addEventListener('submit', saveEntry);

function renderEntry(entry) {
  var newDivContainer = document.createElement('div');
  newDivContainer.setAttribute('class', 'container');

  var newContainerRow = document.createElement('div');
  newContainerRow.setAttribute('class', 'row');
  newDivContainer.appendChild(newContainerRow);

  var newRowColHalfPic = document.createElement('div');
  newRowColHalfPic.setAttribute('class', 'column-half');
  newContainerRow.appendChild(newRowColHalfPic);

  var newColHalfImage = document.createElement('img');
  newColHalfImage.setAttribute('src', entry.photoURL);
  newRowColHalfPic.appendChild(newColHalfImage);

  var newRowColHalfText = document.createElement('div');
  newRowColHalfText.setAttribute('class', 'column-half');
  newContainerRow.appendChild(newRowColHalfText);

  var entryTitle = document.createElement('h3');
  entryTitle.textContent = entry.title;
  newRowColHalfText.appendChild(entryTitle);

  var entryNotes = document.createElement('p');
  entryNotes.textContent = entry.notes;
  newRowColHalfText.appendChild(entryNotes);

  var list = document.querySelector('ul');

  for (let i = 0; i < data.entries.length; i++) {
    var journalEntry = data.entries[i];
    list.appendChild(journalEntry);
  }

  return newDivContainer;
}

document.addEventListener('DOMContentLoaded', renderEntry);
