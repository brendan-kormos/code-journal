const $photoUrl = document.querySelector('#photo-url');
const $submit = document.querySelector('button');

// const tempIMG = $img.src

$photoUrl.addEventListener('input', function (event) {
  const url = event.target.value;
  // eslint-disable-next-line no-undef
  $img.src = url;
  console.log('URL', url);
});

console.log($submit);
