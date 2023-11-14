/* exported data */
const $form = document.querySelector('form');
const $title = document.querySelector('#title');
const $img = document.querySelector('img');

const data = {
  view: 'entry-form',
  entries: [],
  editing: null,
  nextEntryId: 1,
};

console.log(data);

$form.addEventListener('submit', function (event) {
  event.preventDefault();
  console.log($img);
  const newObj = {
    entryId: data.nextEntryId,
    title: $title.value,
    img: $img.src,
  };
  data.nextEntryId++;
  console.log(newObj);
});

window.addEventListener('beforeunload', function (event) {
  // event.preventDefault()
});
