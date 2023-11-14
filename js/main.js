const $photoUrl = document.querySelector('#photo-url');

//

$photoUrl.addEventListener('input', function (event) {
  const url = event.target.value;
  // eslint-disable-next-line no-undef
  $img.src = url;
  console.log('URL', url);
});
