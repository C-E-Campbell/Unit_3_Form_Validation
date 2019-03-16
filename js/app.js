const $name = $('#name');
const $email = $('#mail');
const $ccNum = $('#cc-num');
const $zip = $('#zip');
const $cvv = $('#cvv');
const $defPayment = $('#payment option:nth-child(1)');
const $ccPayment = $('#payment option:nth-child(2)');
const $paymentOption = $('#payment');
const $creditCardDiv = $('#credit-card');
const $title = $('#title');
const $otherTitle = $('#other-title');
const $designTheme = $('#design');
const $colorDiv = $('#colors-js-puns');
const $colorOption = $('#color option');
const $activities = $('.activities');
const $checkbox = $('input[type="checkbox"]');
const $totalCost = $('<h3>Total: $0</h3>');
const $h5name = $('<h5>Please enter a name. Letters Only</h5>');
const $h5email2 = $('<h5>Email must include @ and be valid.</h5>');
const $h5email3 = $('<h5>Email must be valid.</h5>');
const $h5cardNum = $('<h5>Please enter a valid card number. Between 13 - 16 digits. Numbers only.</h5>');
const $h5cvv = $('<h5>Please enter a 3 digit CVV. Example: 567.</h5>');
const $h5zip = $('<h5>Please enter a 5 digit ZIP code. Example: 56712.</h5>');
const $button = $("button[type='submit']");
const $buttonError = $('<h5>Sorry, You must complete all required fields</h5>');



// sets the intial payment to credit card.
//intially hide bitcoin and paypal divs
$($ccPayment).prop('selected', true);
$creditCardDiv.next().css('display', 'none');
$creditCardDiv.next().next().css('display', 'none');
$($defPayment).prop('disabled', true);
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

// this chain of if/else checks the times against each other based the their indices. conflicting times cant be selected.
// example: index(1) and index(3) happen at the same time -- if [1] is checked, [3] is disabled & vice versa.
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

// this handler allows for different payments to show one at a time.
// example: if paypal was chosen the elements pertaining to bitcoin or credit card are hidden.
// if the option value === paypal, show paypal (display: '';) and hide bitcoin and credit card by (display: none;)
$paymentOption.change(function () {
  if ($paymentOption.val() === 'bitcoin') {
    $creditCardDiv.css('display', 'none');
    $creditCardDiv.next().css('display', 'none');
    $creditCardDiv.next().next().css('display', '');
  } else if ($paymentOption.val() === 'paypal') {
    $creditCardDiv.css('display', 'none');
    $creditCardDiv.next().next().css('display', 'none');
    $creditCardDiv.next().css('display', '');
  } else if ($paymentOption.val() === 'credit card') {
    $creditCardDiv.next().css('display', 'none');
    $creditCardDiv.next().next().css('display', 'none');
    $creditCardDiv.css('display', '');
  }
});

// on keyup will compare the name to the name regex using the function checkName. if it fails insert the h5 will css changes.
$name.keyup(function () {
  const testName = $name.val();
  const test = checkName(testName);
  if (test || testName === '') {
    $h5name.remove();
    $name.css('border-color', 'inherit');
  } else {
    $h5name.insertAfter($name);

    $h5name.css({
      'color': '#aa2c52',
      'font-weight': '300',
      'margin-top': '0',
      'padding-top': '0'
    });
    $name.css('border-color', '#aa2c52');
  }
});

$email.keyup(function () {
  const testEmail = $email.val();
  const test = checkEmail(testEmail);
  const test2 = checkForAt(testEmail);

  if (!test2) {
    $h5email3.remove();
    $h5email2.insertAfter($email);
    $h5email2.css({
      'color': '#aa2c52',
      'font-weight': '300',
      'margin-top': '0',
      'padding-top': '0'
    });
    $email.css('border-color', '#aa2c52');
  } else if (test2) {
    $h5email2.remove();
    if (test) {

      $h5email2.remove();
      $h5email3.remove();
      $email.css('border-color', 'inherit');
    } else {
      $h5email3.insertAfter($email);
      $h5email3.css({
        'color': '#aa2c52',
        'font-weight': '300',
        'margin-top': '0',
        'padding-top': '0'
      });
      $email.css('border-color', '#aa2c52');
    }
  }
  if ($email.val() === '') {
    $h5email3.remove();
    $h5email2.remove();

    $email.css('border-color', '#dadada');
  }
});


$ccNum.keyup(function () {
  const testCard = $ccNum.val();
  const test = checkCard(testCard);
  if (test || testCard === '') {
    $h5cardNum.remove();
    $ccNum.css('border-color', 'inherit');
  } else {
    $h5cardNum.insertAfter($creditCardDiv.children().eq(2));
    $h5cardNum.css({
      'color': '#aa2c52',
      'font-weight': '300',
      'margin-top': '0',
      'padding-top': '0'
    });
    $ccNum.css('border-color', '#aa2c52');
  }
});

$zip.keyup(function () {
  const testZip = $zip.val();
  const test = checkZip(testZip);
  if (test || testZip === '') {
    $h5zip.remove();
    $zip.css('border-color', 'inherit');
  } else {
    $h5zip.insertAfter($creditCardDiv.children().eq(2));
    $h5zip.css({
      'color': '#aa2c52',
      'font-weight': '300',
      'margin-top': '0',
      'padding-top': '0'
    });
    $zip.css('border-color', '#aa2c52');
  }
});

$cvv.keyup(function () {
  const testCVV = $cvv.val();
  const test = checkCVV(testCVV);
  if (test || testCVV === '') {
    $h5cvv.remove();
    $cvv.css('border-color', 'inherit');
  } else {
    $h5cvv.insertAfter($creditCardDiv.children().eq(2));
    $h5cvv.css({
      'color': '#aa2c52',
      'font-weight': '300',
      'margin-top': '0',
      'padding-top': '0'
    });
    $cvv.css('border-color', '#aa2c52');
  }
});

$button.on('click', function (event) {
      $buttonError.insertAfter($button);
      $buttonError.css({
        'color': '#aa2c52',
        'font-weight': '300',
        'margin-top': '0',
        'padding-top': '0',
        'display': 'none'
      });
      if ($('input[type=checkbox]').is(':checked') &&
        checkName($name.val()) &&
        checkEmail($email.val()) &&
        checkCard($ccNum.val()) &&
        checkZip($zip.val()) &&
        checkCVV($cvv.val())) {
        console.log('everything checks out');
      } else {
        $buttonError.fadeIn().delay(1500).slideUp()
        event.stopPropagation();
        event.preventDefault();
      }
    });



      /*---------- Regex Validation Tests --------------*/

      // checks name, lowercase letters only
      function checkName(name) {
        return /^[a-z, A-Z]*\s*$/.test(name);
      }

      // checks for standard email
      function checkEmail(email) {
        return /[^@]+@[^@.]+\.[a-z]+$/.test(email);
      }
      // checks for @ in email
      function checkForAt(email) {
        return /[^@]+@/.test(email);
      }
      // checks for 3 digit cvv
      function checkCVV(cvv) {
        return /^\d{3}$/.test(cvv);
      }

      // checks for 5 digit zip code
      function checkZip(zip) {
        return /^\d{5}$/.test(zip);
      }

      // checks for a range of 13 to 16 numbers
      function checkCard(card) {
        return /^[0-9]{13,16}$/.test(card);
      }