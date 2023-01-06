var imageEntry = document.querySelector('img');
var imageURL = document.getElementById('photoURL');
var form = document.querySelector('form');
var entryForm = document.getElementById('entry-form');
var h4 = document.getElementById('no-entries');
var entryListContainer = document.querySelector('ul');

var heading = document.querySelector('h1');
var title = document.getElementById('title');
var notes = document.getElementById('notes');

function getImage(event) {
  imageEntry.setAttribute('src', imageURL.value);
}

imageURL.addEventListener('input', getImage);

function saveEntry(event) {
  event.preventDefault();
  if (data.editing === null) {
    var entryData = {
      title: form.elements.title.value,
      photoURL: form.elements.photoURL.value,
      notes: form.elements.notes.value
    };
    entryData.entryId = data.nextEntryId;
    data.nextEntryId++;
    data.entries.push(entryData);
    imageEntry.setAttribute('src', 'images/placeholder-image-square.jpg');
    form.reset();
    entriesView();
    var entryElement = renderEntry(entryData);
    ul.insertBefore(entryElement, ul.firstChild);
    if (data.entries.length === 0) {
      toggleNoEntries(true);
    } else {
      toggleNoEntries(false);
    }
  } else {
    var editData = {
      title: form.elements.title.value,
      photoURL: form.elements.photoURL.value,
      notes: form.elements.notes.value,
      entryId: data.editing.entryId
    };
    for (let i = 0; i < data.entries.length; i++) {
      if (data.entries[i].entryId === parseInt(editData.entryId, 10)) {
        data.entries[i] = editData;
      }
    }
    var editedLi = renderEntry(editData);
    var uneditedLi = document.querySelector(`li[data-entry-id="${editData.entryId}"]`);
    editedLi.replaceWith(uneditedLi);
    data.editing = null;
    imageEntry.setAttribute('src', 'images/placeholder-image-square.jpg');
    form.reset();
    entriesView();
  }
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

  var pencil = document.createElement('i');
  pencil.className = 'fa-solid fa-pencil';
  entryTitle.appendChild(pencil);

  var entryNotes = document.createElement('p');
  entryNotes.textContent = entry.notes;
  newRowColHalfText.appendChild(entryNotes);

  var entryListItem = document.createElement('li');
  entryListItem.appendChild(newDivContainer);
  entryListItem.setAttribute('data-entry-id', entry.entryId);

  return entryListItem;
}

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

var ul = document.querySelector('.entry-list');

function editEntries(event) {
  var target = event.target;
  if (target.tagName === 'I') {
    var entryItem = target.closest('li');
    var entryId = entryItem.getAttribute('data-entry-id');
    for (let i = 0; i < data.entries.length; i++) {
      if (data.entries[i].entryId === parseInt(entryId, 10)) {
        data.editing = data.entries[i];
      }
    }
    imageURL.value = data.editing.photoURL;
    title.value = data.editing.title;
    notes.value = data.editing.notes;
    imageEntry.setAttribute('src', data.editing.photoURL);
    heading.textContent = 'Edit Entry';
    viewSwap('entry-form');
  }
}

ul.addEventListener('click', editEntries);
