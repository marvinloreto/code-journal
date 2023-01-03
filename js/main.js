var imageEntry = document.querySelector('img');
var imageURL = document.getElementById('photoURL');
var form = document.querySelector('form');
var entryForm = document.getElementById('entry-form');
var h4 = document.getElementById('no-entries');

function getImage(event) {
  imageEntry.setAttribute('src', imageURL.value);
}

imageURL.addEventListener('input', getImage);

function saveEntry(event) {
  event.preventDefault();
  var entryData = new FormData(form);
  var dataObject = Object.fromEntries(entryData);
  dataObject.entryId = data.nextEntryId;
  data.nextEntryId++;
  data.entries.push(dataObject);
  imageEntry.setAttribute('src', 'images/placeholder-image-square.jpg');
  form.reset();
}

form.addEventListener('submit', saveEntry);

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

  var entryListItem = document.createElement('li');
  entryListItem.appendChild(newDivContainer);

  return entryListItem;
}

var entryListContainer = document.querySelector('ul');

document.addEventListener('DOMContentLoaded', generateDomTree);
function generateDomTree(event, view) {
  if (!view) {
    view = sessionStorage.getItem('view');
  }
  viewSwap(view);
  for (let i = 0; i < data.entries.length; i++) {
    var entry = data.entries[i];
    var entryElement = renderEntry(entry);
    entryListContainer.insertBefore(entryElement, entryListContainer.firstChild);
  }
  if (data.entries.length === 0) {
    toggleNoEntries(true);
  } else {
    toggleNoEntries(false);
  }
}

function toggleNoEntries(show) {
  if (show) {
    h4.classList.remove('hidden');
  } else {
    h4.className = 'hidden';
  }
}

function viewSwap(view) {
  var form = document.getElementById('entry-form');
  var entries = document.getElementById('entriesDiv');

  if (view === 'entries') {
    form.className = 'hidden';
    entries.classList.remove('hidden');
  } else if (view === 'entry-form') {
    form.classList.remove('hidden');
    entries.className = 'hidden';
  }

  sessionStorage.setItem('view', view);
}

function entriesView() {
  var view = '';
  if (entryForm.className === 'hidden') {
    view = 'entry-form';
  } else {
    view = 'entries';
  }
  viewSwap(view);
}

var entriesNav = document.getElementById('navbar-entries');
var newButton = document.getElementById('new-button');

entriesNav.addEventListener('click', entriesView);
newButton.addEventListener('click', entriesView);
