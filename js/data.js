/* eslint-disable no-unused-vars */
/* exported data */

const $form = document.querySelector('form');
const $title = document.querySelector('#title');
const $img = document.querySelector('img');
const $notes = document.querySelector('#notes');
const tempIMG = $img.src;
const $templateEntry = document.querySelector('.list-item-entry');
const $entriesUnorderedList = document.querySelector('#entries-unordered-list');
const $noEntriesAlert = document.querySelector('#no-entries-alert');
const $entriesLink = document.querySelector('#entries-link');
const $entryFormLink = document.querySelector('#entry-form-link');
const $photoUrl = document.querySelector('#photo-url');
const $entryFormTitle = document.querySelector('#entry-form-title');
const $deleteEntry = document.querySelector(
  '#entry-form-save-delete-column>button.delete-button'
);
const $modalMain = document.querySelector('#modal-main');

const $confirmDeleteMenu = document.querySelector('.confirm-delete');
const $confirmDeleteButton =
  $confirmDeleteMenu.querySelector('[name="confirm"]');
const $cancelDeleteButton = $confirmDeleteMenu.querySelector('[name="cancel"]');

const views$ = {
  entries: document.querySelector('[data-view=entries]'),
  'entry-form': document.querySelector('[data-view=entry-form]'),
};

let data = {
  view: 'entries',
  entries: [],
  editing: null,
  nextEntryId: 1,
};

function renderEntry(entry) {
  console.log(entry);
  const $entry = $templateEntry.cloneNode(true);
  $entry.querySelector('.entry-image').src = entry.img;
  $entry.querySelector('h3').textContent = entry.title;
  $entry.querySelector('p').textContent = entry.notes;
  $entry.classList.remove('hidden');
  $entry.setAttribute('data-entry-id', entry.entryId);
  return $entry;
}

window.addEventListener('beforeunload', function (event) {
  localStorage.setItem('first-code-journal', JSON.stringify(data));
});

const oldData = localStorage.getItem('first-code-journal');
if (oldData !== null) data = JSON.parse(oldData);

function viewSnap(viewName /* ("entries" | "entry-form") */) {
  views$[data.view].classList.add('hidden');
  data.view = viewName;
  views$[viewName].classList.remove('hidden');
}

let noEntries = true;
// eslint-disable-next-line no-unused-vars
function toggleNoEntries() {
  if (noEntries) $noEntriesAlert.classList.add('hidden');
  else $noEntriesAlert.classList.remove('hidden');
  noEntries = !noEntries;
}

$form.addEventListener('submit', function (event) {
  event.preventDefault();
  const newObj = {
    entryId: data.nextEntryId,
    title: $title.value,
    img: $img.src,
    notes: $notes.value,
  };
  if (data.editing === null) {
    data.entries[data.nextEntryId] = newObj;

    $img.src = tempIMG;

    const $entry = renderEntry(newObj);
    $entriesUnorderedList.prepend($entry);
    data.nextEntryId++;
  } else {
    $deleteEntry.classList.add('hidden');
    newObj.entryId = data.editing.entryId;
    data.entries[newObj.entryId] = newObj;
    const $replacementElement = renderEntry(newObj);
    $entriesUnorderedList
      .querySelector('li[data-entry-id="' + newObj.entryId + '"]')
      .replaceWith($replacementElement);

    $img.src = tempIMG;
    $entryFormTitle.textContent = 'New Entry';
  }
  data.editing = null;
  $notes.value = '';
  $form.reset();
  viewSnap('entries');
  if (noEntries) toggleNoEntries();
});

$form.addEventListener('button', function (event) {
  console.log(event);
});

function entriesClicked(event) {
  viewSnap('entries');
}

function newEntryClicked(event) {
  $form.reset();
  $notes.value = '';
  data.editing = null;
  $entryFormTitle.textContent = 'New Entry';
  viewSnap('entry-form');
}

function setEntryFormEdit(entry) {
  $title.value = entry.title;
  $photoUrl.value = entry.img;
  $notes.textContent = entry.notes;
  $img.src = entry.img;
  $entryFormTitle.textContent = 'Edit Entry';
  data.editing = entry;
  $deleteEntry.classList.remove('hidden');
}

function entriesUnorderedListClicked(event) {
  const $target = event.target;
  if ($target.matches('.fa-pencil')) {
    const $li = $target.closest('li');
    const id = $li.getAttribute('data-entry-id');
    const entry = data.entries[id];
    setEntryFormEdit(entry);

    viewSnap('entry-form');
  }
}

function deleteEntryClicked(event) {
  $modalMain.classList.remove('hidden');
}
function modalMainClicked(event) {
  const $target = event.target;
  if ($target.getAttribute('name') === 'confirm') {
    // go ahead and delete
    delete data.entries[data.editing.entryId];
    $modalMain.classList.add('hidden');
  } else if ($target.getAttribute('name') === 'cancel')
    // close menu if clicked outside or cancel
    $modalMain.classList.add('hidden');
  else if ($target.getAttribute('id') === 'modal-main')
    $modalMain.classList.add('hidden');
}

// reset views prior to setting
for (const key in views$) {
  views$[key].classList.add('hidden');
}
document.addEventListener('DOMContentLoaded', function (event) {
  for (let i = 1; i < data.entries.length - 1; i++) {
    const $entry = renderEntry(data.entries[i]);
    $entriesUnorderedList.prepend($entry);
  }
  if (data.entries.length > 0) toggleNoEntries();
  if (data.editing !== null) setEntryFormEdit(data.editing);
  viewSnap(data.view);
  $entriesLink.addEventListener('click', entriesClicked);
  $entryFormLink.addEventListener('click', newEntryClicked);
  $entriesUnorderedList.addEventListener('click', entriesUnorderedListClicked);
  $deleteEntry.addEventListener('click', deleteEntryClicked);
  $modalMain.addEventListener('click', modalMainClicked);
});
