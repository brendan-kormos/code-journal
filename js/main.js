/* eslint-disable no-undef */

$photoUrl.addEventListener('input', function (event) {
  const url = event.target.value;
  // eslint-disable-next-line no-undef
  $img.src = url;
});
