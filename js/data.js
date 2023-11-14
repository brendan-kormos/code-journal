/* exported data */
const $form = document.querySelector('form');
const $title = document.querySelector('#title');
const $img = document.querySelector('img');
const $notes = document.querySelector('#notes');
const tempIMG = $img.src;
const $templateEntry = document.querySelector('.list-item-entry');
const $entriesUnorderedList = document.querySelector('#entries-unordered-list');

let data = {
  view: 'entry-form',
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
});

window.addEventListener('beforeunload', function (event) {
  localStorage.setItem('first-code-journal', JSON.stringify(data));
});

const oldData = localStorage.getItem('first-code-journal');
if (oldData !== null) data = JSON.parse(oldData);

document.addEventListener('DOMContentLoaded', function (event) {
  for (let i = 0; i < data.entries.length; i++) {
    const $entry = renderEntry(data.entries[i]);
    $entriesUnorderedList.prepend($entry);
  }
});
