const $name = $('#name');
const $ccPayment = $('#payment option:nth-child(2)');
const $title = $('#title');
const $otherTitle = $('#other-title');
const $designTheme = $('#design');
const $colorOption = $('#color option');
const $h3Total = $('<h3>Total : $</h3> ');
const $activites = $('.activities');
const $checkbox = $('input[type="checkbox"]');
let $runningTotal = 0;

// sets the intial payment to credit card.
$($ccPayment).attr('selected', true);

// setting the 'Other Job Role' input to hidden  --initial state.
$($otherTitle).css('display', 'none');

// setting autofocus on the first input field
$($name).attr('autofocus', true);


// setting the 'Other Job Role' input to be visible if 'other' is selected.
$($title).on('click', function () {
  console.log($title);
  if ($title.val() == 'other') {
    $($otherTitle).fadeIn(600);
  } else {
    $($otherTitle).slideUp(200);
  }
});

// allows only the colors availble for each design to be shown. also selects a color for the 'selected' option on the list. 
$($designTheme).on('change', function () {
  $($colorOption).each(function (index, element) {
    if ($designTheme.val() == 'js puns' && index > 2) {
      $(element).hide();
      $(element).attr('selected', false);
    } else if ($designTheme.val() == 'js puns' && index <= 2) {
      $(element).attr('selected', true);
      $(element).show();
    } else if ($designTheme.val() == 'heart js' && index > 2) {
      $(element).attr('selected', true);
      $(element).show();
    } else if ($designTheme.val() == 'heart js' && index <= 2) {
      $(element).hide();
      $(element).attr('selected', false);
    } else {
      $(element).show();
    }
  });
});

// Setting up the activities price. Hidden until first activity is chosen. 
// $h3Total is a dynamically created h3 tag.
// $runningTotal is the overall cost number.
$($activites).append($h3Total);
$($h3Total).append($runningTotal);
$($h3Total).hide();

//the running total will fadeIn when any checkbox is checked and slideUp when everything is unchecked.
$($checkbox).on('change', function () {
  $($checkbox).each(function (index, element) {
    if ($($checkbox).is(':checked')) {
      $($h3Total).fadeIn(600);
    } else {
      $($h3Total).slideUp(200);
    }
  })
});


