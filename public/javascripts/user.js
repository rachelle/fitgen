$("input").change(function () {
  $(this).toggleClass('hasValue', $(this).val().length > 0);
});

$("form").submit(function (e) {
  e.preventDefault();
});