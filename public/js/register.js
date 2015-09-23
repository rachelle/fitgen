$('.add-workout').click(function() {
  $(".workout-name:first").clone(true).appendTo('.content')
    .find('span').text('Workout Title').end().find('.workout-details').text('Workout Info');
});

$('.workout-status').click(function() {
  $(this).children('i').toggleClass('workout-times workout-check');
});