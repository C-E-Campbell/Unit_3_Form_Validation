const $name = $('#name');
const $ccPayment = $('#payment option:nth-child(2)');
const $title = $('#title');
const $otherTitle = $('#other-title');
const $designTheme = $('#design');
const $colorDiv = $('#colors-js-puns');
const $colorOption = $('#color option');
const $h3Total = $('<h3>Total : $</h3> ');
const $activities = $('.activities');
const $checkbox = $('input[type="checkbox"]');
const $totalCost = $('<h3>Total: $0</h3>')


// sets the intial payment to credit card.
$($ccPayment).attr('selected', true);

// setting the 'Other Job Role' input to hidden  --initial state.
$($otherTitle).css('display', 'none');

// setting autofocus on the first input field
$name.focus();


// setting the 'Other Job Role' input to be visible if 'other' is selected.
($title).on('click', function () {
  console.log($title);
  if ($title.val() == 'other') {
    ($otherTitle).fadeIn(800);
  } else {
    ($otherTitle).slideUp(200);
  }
});

// intially set the color div to hidden while a theme isnt chosen.
($colorDiv).hide();

// allows only the colors availble for each design to be shown. also selects a color for the 'selected' option on the list. 
($designTheme).on('change', function () {
  ($colorDiv).show();
  ($colorOption).each(function (index, element) {
    if ($designTheme.val() === 'js puns' && index > 2) {
      $(element).hide();
      $(element).attr('selected', false);
    } else if ($designTheme.val() === 'js puns' && index <= 2) {
      $(element).attr('selected', true);
      $(element).show();
    } else if ($designTheme.val() === 'heart js' && index > 2) {
      $(element).attr('selected', true);
      $(element).show();
    } else if ($designTheme.val() === 'heart js' && index <= 2) {
      $(element).hide();
      $(element).attr('selected', false);
    } else {
      $($colorDiv).hide();
    }
  });



});

// this HUGE chain of if/else checks the times against each other based the their indices. conflicting times cant be selected.
// example: index(1) and index(3) happen at the same time -- if (1) is checked, (3) is disabled & vice versa.
$checkbox.change(function () {
  if ($checkbox.eq(1).is(":checked")) {
    $checkbox.eq(3).prop('disabled', true)
    $checkbox.eq(3).parent().css({
      "text-decoration": "line-through",
      "color": "#5f5f5f"
    })

  } else {
    $checkbox.eq(3).prop('disabled', false)
    $checkbox.eq(3).parent().css({
      "text-decoration": "inherit",
      "color": "inherit"
    })
  }
  if ($checkbox.eq(2).is(":checked")) {
    $checkbox.eq(4).prop('disabled', true)
    $checkbox.eq(4).parent().css({
      "text-decoration": "line-through",
      "color": "#5f5f5f"
    })

  } else {
    $checkbox.eq(4).prop('disabled', false)
    $checkbox.eq(4).parent().css({
      "text-decoration": "inherit",
      "color": "inherit"
    })
  }
  if ($checkbox.eq(3).is(":checked")) {
    $checkbox.eq(1).prop('disabled', true)
    $checkbox.eq(1).parent().css({
      "text-decoration": "line-through",
      "color": "#5f5f5f"
    })

  } else {
    $checkbox.eq(1).prop('disabled', false)
    $checkbox.eq(1).parent().css({
      "text-decoration": "inherit",
      "color": "inherit"
    })
  }
  if ($checkbox.eq(4).is(":checked")) {
    $checkbox.eq(2).prop('disabled', true)
    $checkbox.eq(2).parent().css({
      "text-decoration": "line-through",
      "color": "#5f5f5f"
    })

  } else {
    $checkbox.eq(2).prop('disabled', false)
    $checkbox.eq(2).parent().css({
      "text-decoration": "inherit",
      "color": "inherit"
    })
  }
});

// an h3 tag is appended to the div. this will hold the cost text.
// the actual number is stored in 'price'
// one activity has a different price than the rest so it has its own if statement.
// all the other activites are same prices so we loop through each and add the ones that are checked. 
$($activities).append($totalCost);
$checkbox.change(function () {
  let price = 0;

  // price of 200
  if ($checkbox.eq(0).is(':checked')) {
    price += 200;
  }

  //prices of 100
  $checkbox.each(function (k) {
    if (k > 0 && $checkbox.eq(k).is(':checked')) {
      price += 100;
    }
  });

  //update the number here
  $totalCost.text(`Total:  $${price}`);
});