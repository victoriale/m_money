/*
Author: William Klausmeyer
Location Module: Find Company
*/

// Returns the dollar value of the position on the slider for the Market Cap Slider
function capSlider(position) {
  // Handle both extremes
  if ( position == 0 ) {
    return 100;
  } else if ( position == 261 ) {
    return 670000000000;
  }

  // position will be between 0 and 100
  var minp = 0;
  var maxp = 261;

  // The result should be between 100 an 670B
  var minv = Math.log(1000);
  var maxv = Math.log(670000000000);

  // calculate adjustment factor
  var scale = (maxv-minv) / (maxp-minp);
  var val = Math.exp(minv + scale*(position-minp));

  // ROUNDING!
  if ( val > 1000000000 ) {
    return Math.round(val / 1000000000) * 1000000000;
  } else if ( val > 1000000 ) {
    return Math.round(val / 1000000) * 1000000;
  } else if ( val > 1000 ) {
    return Math.round(val / 1000) * 1000;
  } else {
    return Math.round(val);
  }
}

// Moves the ball (and handles changing values) for the Market Cap Slider
function moveBallCap(ball, left) {
  // Set lower limits
  var slider = $(ball)[0].parentElement;
  var sLeft = 250.5;
  var sRight = -10.5;
  $(slider).find('.slider_ball').each(function(){
    if ( $(this).position().left < sLeft ) {
      sLeft = $(this).position().left;
    }
    if ( $(this).position().left > sRight ) {
      sRight = $(this).position().left;
    }
  });
  // Handle left bound
  if ( $(ball).position().left == sLeft && left < -10.5 ) {
    left = -10.5;
  } else if ( $(ball).position().left == sLeft && left >= sRight ) {
    left = sRight - 5;
  }
  // Handle right bound
  if ( $(ball).position().left == sRight && left <= sLeft ) {
    left = sLeft + 5;
  } else if ( $(ball).position().left == sRight && left > 250.5 ) {
    left = 250.5;
  }

  // Move the label
  if ( $(ball).position().left == sLeft ) {
    if ( left > 50 ) {
      $(ball).addClass('sideLabelL');
    } else {
      $(ball).removeClass('sideLabelL');
    }
  } else if ( $(ball).position().left == sRight ) {
    if ( left < 200.5 ) {
      $(ball).addClass('sideLabelR');
    } else {
      $(ball).removeClass('sideLabelR');
    }
  }

  // Move the ball
  $(ball).css('left', left);

  // Style the bar
  // Get the extremes
  var sLeft = 250.5;
  var sRight = -10.5;
  $(slider).find('.slider_ball').each(function(){
    if ( $(this).position().left < sLeft ) {
      sLeft = $(this).position().left;
    }
    if ( $(this).position().left > sRight ) {
      sRight = $(this).position().left;
    }
  });
  // Calculations and styling
  var length = 265;
  var sLeftPerc = Math.round((sLeft + 10.5) / length * 100);
  var sRightPerc = Math.round((sRight + 10.5) / length * 100);
  $(slider).css('background','linear-gradient(to right, #cccccc 0%, #cccccc ' + sLeftPerc + '%, #3098ff ' + sLeftPerc + '%, #3098ff ' + sRightPerc + '%, #cccccc ' + sRightPerc + '%, #cccccc 100%)');

  // Calculate average
  var low = capSlider(sLeft + 10.5);
  var high = capSlider(sRight + 10.5);
  var avg = (low + high) / 2;
  var avgPos = (sLeft + sRight + 21) / 2;

  // Flip the average if too close
  if ( Math.abs(sRight - sLeft) < 140 ) {
    $(slider).find('.slider_avg_caret').addClass('invert');
  } else {
    $(slider).find('.slider_avg_caret').removeClass('invert');
  }

  // Move the average slider
  $(slider).find('.slider_avg_caret').each(function(){
    $(this).css('left',(avgPos - 3) + 'px');
  });

  // Insert values
  var ballVal = capSlider(left + 10.5);
  if ( ballVal >= 1000000000 ) {
    ballVal = (ballVal / 1000000000) + 'B';
  } else if ( ballVal >= 1000000 ) {
    ballVal = (ballVal / 1000000) + 'M';
  } else if ( ballVal >= 1000 ) {
    ballVal = (ballVal / 1000) + 'K';
  }
  $(ball).find('.slider_ball_label').html('$' + ballVal);
  if ( avg < 10 ) {
    avg = Math.round(10 * avg) / 10;
    if ( avg % 1 != 0 ) {
      avg = avg + '0';
    } else {
      avg = avg + '.00';
    }
  } else {
    avg = Math.round(avg);
  }
  if ( avg >= 1000000000 ) {
    avg = Math.round(avg / 1000000000) + 'B';
  } else if ( avg >= 1000000 ) {
    avg = Math.round(avg / 1000000) + 'M';
  } else if ( avg >= 1000 ) {
    avg = Math.round(avg / 1000) + 'K';
  } else {
    avg = Math.round(avg);
  }
  $(slider).find('.slider_avg').html('$' + avg + ' Average');
}

// Returns the dollar value of the position on the slider for the Share Price Slider
function shareSlider(position) {
  // Handle both extremes
  if ( position == 0 ) {
    return 1;
  } else if ( position == 261 ) {
    return 755;
  }

  // position will be between 0 and 100
  var minp = 0;
  var maxp = 261;
  var pRng = maxp - minp;
  var pPerc = (position - minp) / pRng;

  // NONE LOGARITHMIC TEST
  var minv = 1;
  var maxv = 755;
  var vRng = maxv - minv;
  var ret = vRng * pPerc + minv;

  // The result should be between 1 an 755
  var minv = Math.log(1);
  var maxv = Math.log(755);

  // calculate adjustment factor
  var scale = (maxv-minv) / (maxp-minp);
  var val = Math.exp(minv + scale*(position-minp));

  if ( val < 10 ) {
    return Math.round(val * 10) / 10;
  } else {
    return Math.round(val);
  }
}

// Moves the ball (and handles changing values) for the Share Price Slider
function moveBallShare(ball, left) {
  // Set lower limits
  var slider = $(ball)[0].parentElement;
  var sLeft = 250.5;
  var sRight = -10.5;
  $(slider).find('.slider_ball').each(function(){
    if ( $(this).position().left < sLeft ) {
      sLeft = $(this).position().left;
    }
    if ( $(this).position().left > sRight ) {
      sRight = $(this).position().left;
    }
  });
  // Handle left bound
  // console.log($(ball).position().left == sLeft,$(ball).position().left,sLeft);
  if ( $(ball).position().left == sLeft && left < -10.5 ) {
    left = -10.5;
  } else if ( $(ball).position().left == sLeft && left >= sRight ) {
    left = sRight - 5;
  }
  // Handle right bound
  if ( $(ball).position().left == sRight && left <= sLeft ) {
    left = sLeft + 5;
  } else if ( $(ball).position().left == sRight && left > 250.5 ) {
    left = 250.5;
  }

  // Move the label
  if ( $(ball).position().left == sLeft ) {
    if ( left > 50 ) {
      $(ball).addClass('sideLabelL');
    } else {
      $(ball).removeClass('sideLabelL');
    }
  } else if ( $(ball).position().left == sRight ) {
    if ( left < 200.5 ) {
      $(ball).addClass('sideLabelR');
    } else {
      $(ball).removeClass('sideLabelR');
    }
  }

  // Move the ball
  $(ball).css('left', left);

  // Style the bar
  // Get the extremes
  var sLeft = 250.5;
  var sRight = -10.5;
  $(slider).find('.slider_ball').each(function(){
    if ( $(this).position().left < sLeft ) {
      sLeft = $(this).position().left;
    }
    if ( $(this).position().left > sRight ) {
      sRight = $(this).position().left;
    }
  });
  // Calculations and styling
  var length = 265;
  var sLeftPerc = Math.round((sLeft + 10.5) / length * 100);
  var sRightPerc = Math.round((sRight + 10.5) / length * 100);
  $(slider).css('background','linear-gradient(to right, #cccccc 0%, #cccccc ' + sLeftPerc + '%, #3098ff ' + sLeftPerc + '%, #3098ff ' + sRightPerc + '%, #cccccc ' + sRightPerc + '%, #cccccc 100%)');

  // Calculate average
  var low = shareSlider(sLeft + 10.5);
  var high = shareSlider(sRight + 10.5);
  var avg = (low + high) / 2;
  var avgPos = (sLeft + sRight + 21) / 2;

  // Flip the average if too close
  if ( Math.abs(sRight - sLeft) < 140 ) {
    $(slider).find('.slider_avg_caret').addClass('invert');
  } else {
    $(slider).find('.slider_avg_caret').removeClass('invert');
  }

  // Move the average slider
  $(slider).find('.slider_avg_caret').each(function(){
    $(this).css('left',(avgPos - 3) + 'px');
  });

  // Insert values
  var ballVal = shareSlider(left + 10.5);
  if ( (ballVal % 1) != 0 ) {
    ballVal = ballVal + '0';
  } else if ( ballVal < 10 ) {
    ballVal = ballVal + '.00';
  }
  $(ball).find('.slider_ball_label').html('$' + ballVal);
  if ( avg < 10 ) {
    avg = Math.round(10 * avg) / 10;
    if ( avg % 1 != 0 ) {
      avg = avg + '0';
    } else {
      avg = avg + '.00';
    }
  } else {
    avg = Math.round(avg);
  }
  $(slider).find('.slider_avg').html('$' + avg + ' Average');
}

Template.find_company.events({
  'mousedown #ModShare .slider_ball': function(event) {
    if ( !$(event.target).hasClass('slider_ball') ) {
      return false;
    }
    $('html').mousemove({'ball': event.target, 'startx': event.clientX, 'startLeft': $(event.target).position().left},function(event){
      moveBallShare(event.data.ball, event.data.startLeft + event.clientX - event.data.startx);
    });
    $('html').mouseup(function(){
      $('html').unbind('mousemove');
      $('html').unbind('mouseup');
    });
  },
  'mousedown #ModCap .slider_ball': function(event) {
    if ( !$(event.target).hasClass('slider_ball') ) {
      return false;
    }
    $('html').mousemove({'ball': event.target, 'startx': event.clientX, 'startLeft': $(event.target).position().left},function(event){
      moveBallCap(event.data.ball, event.data.startLeft + event.clientX - event.data.startx);
    });
    $('html').mouseup(function(){
      $('html').unbind('mousemove');
      $('html').unbind('mouseup');
    });
  },
  'click .find_cmp_dd_menu': function(event) {
    if ( $(event.currentTarget).hasClass('noclick') || $(event.currentTarget).hasClass('disabled') ) {
      return false;
    }
    if ( $(event.currentTarget).hasClass('active') ) {
      $('html').unbind('click');
      $('.find_cmp_dd_menu.active').removeClass('active');
      return false;
    }
    if ( Session.get('IsOpenDropdown') ) {
      $('html').unbind('click');
      $('.find_cmp_dd_menu.active').removeClass('active');
    }
    $(event.currentTarget).addClass('active');
    Session.set('IsOpenDropdown',true);
    setTimeout(function () {
      $('html').click(function(event){
        $('.find_cmp_dd_menu.active').removeClass('active');
        $('html').unbind('click');
      });
    }, 1);
  },
  'click .dropdown .dropdown_item': function(event) {
    var name = $(event.target)[0].innerHTML;
    var parentTarg = $(event.target).closest('.find_cmp_dd_menu')[0];
    $(parentTarg).find('.find_cmp_dd_menu_txt').each(function(){
      $(this).html(name);
    });
    $(parentTarg).find('.dropdown_item.active').removeClass('active');
    $(event.target).addClass('active');
    Session.set($(parentTarg)[0].id,name);
  }
});

Template.find_company.helpers({
  range: function() {
    return {
      ranges: [
        {name: '15'},
        {name: '25'},
        {name: '50', class: 'active'},
        {name: '100'},
        {name: '150+'}
      ]
    };
  },

  exchange: function() {
    var data = Session.get('find_company');
    if ( typeof data != "object" || typeof data.exchanges == "undefined" ) {
      return false;
    }
    var retArr = data.exchanges;
    return {exchanges: retArr};
  },

  sector: function() {
    var data = Session.get('find_company');
    if ( typeof data != "object" || typeof data.sector_to_industry == "undefined" ) {
      return false;
    }
    var retArr = [];
    for ( var attr in data.sector_to_industry ) {
      if ( data.sector_to_industry.hasOwnProperty(attr) ) {
        retArr[retArr.length] = attr.toTitleCase();
      }
    }

    return {sectors: retArr};
  },

  industry: function() {
    var data = Session.get('find_company');
    var current = Session.get('ModSector');
    if ( typeof data != "object" || typeof data.sector_to_industry == "undefined" ) {
      return false;
    }
    if ( typeof current == "undefined" || current == "All Sectors" ) {
      return {class: 'disabled', default: 'All Industries'};
    }
    return {industries: data.sector_to_industry[current], default: 'All Industries'};
  },

  metric: function() {
    var data = Session.get('find_company');
    if ( typeof data != "object" || typeof data.key_metrics == "undefined" ) {
      return false;
    }
    var RetArr = [];
    var def = data.key_metrics[0].toTitleCase();
    for ( var index = 1; index < data.key_metrics.length; index++ ) {
      RetArr[RetArr.length] = data.key_metrics[index].toTitleCase();
    }
    return {default: def, metrics: RetArr};
  }
});
