/* exported data */

var data = {
  view: 'entry-form',
  entries: [],
  editing: null,
  nextEntryId: 1
};

function storeData(event) {
  var dataJSON = JSON.stringify(data);
  localStorage.setItem('code-journal-entries', dataJSON);
}

window.addEventListener('beforeunload', storeData);

var previousDataJSON = localStorage.getItem('code-journal-entries');
if (previousDataJSON !== null) {
  data = JSON.parse(previousDataJSON);
}
