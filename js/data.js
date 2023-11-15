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
  const $entry = $templateEntry.cloneNode(true);
  $entry.querySelector('.entry-image').src = entry.img;
  $entry.querySelector('h3').textContent = entry.title;
  $entry.querySelector('p').textContent = entry.notes;
  $entry.classList.remove('hidden');
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
  data.nextEntryId++;
  data.entries.push(newObj);

  $img.src = tempIMG;
  $form.reset();

  const $entry = renderEntry(newObj);
  $entriesUnorderedList.prepend($entry);
  viewSnap('entries');
  if (noEntries) toggleNoEntries();
});

function entriesClicked(event) {
  viewSnap('entries');
}

function entryFormClicked(event) {
  viewSnap('entry-form');
}

for (const key in views$) {
  views$[key].classList.add('hidden');
}

document.addEventListener('DOMContentLoaded', function (event) {
  for (let i = 0; i < data.entries.length; i++) {
    const $entry = renderEntry(data.entries[i]);
    $entriesUnorderedList.prepend($entry);
  }
  if (data.entries.length > 0) toggleNoEntries();
  // reset views prior to setting

  viewSnap(data.view);
  $entriesLink.addEventListener('click', entriesClicked);
  $entryFormLink.addEventListener('click', entryFormClicked);
});
