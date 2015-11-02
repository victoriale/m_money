/*
Author: William Klausmeyer
Location Module: Find Company
*/

Template.find_company.onCreated(function(){
  Session.set('SuggestTime',0);
})

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

function suggestFilter(arr) {
  var f = []
  return arr.filter(function(n) {
    return f.indexOf(n.c_hq_city) == -1 && f.push(n.c_hq_city);
  })
}

function suggest(nowTime){
  var searchString = $('.find_cmp_sb_bar > input')[0].value;
  if(searchString === ''){
    return false;
  }
  Meteor.call('GetSuggestion', encodeURIComponent(searchString), nowTime, function(err, result){
    //console.log('err, result', err, result);
    if(err){
      //Error code
      //console.log('Suggestion Error', error);
      return false;
    }

    if(Session.get('SuggestTime') > result.time){
      return false;
    }

    Session.set('SuggestTime', result.time);
    var result = result.data;
    //console.log('LATEST RESULT', result);
    var uniqueArr = suggestFilter(result.location.func_data.search_data);
    Session.set('find_company_suggestions', uniqueArr);
  })

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
  'click .dropdown .dropdown_item': function(event, t) {

    //Exit function if part of search dropdown (Clean up)
    if(t.$(event.currentTarget).hasClass('sb-item')){
      return false;
    }

    var name = $(event.target)[0].innerHTML;
    var parentTarg = $(event.target).closest('.find_cmp_dd_menu')[0];
    $(parentTarg).find('.find_cmp_dd_menu_txt').each(function(){
      $(this).html(name);
    });
    $(parentTarg).find('.dropdown_item.active').removeClass('active');
    $(event.target).addClass('active');
    Session.set($(parentTarg)[0].id,name);
  },
  //Event to submit search form
  'click .find_cmp_find': function(e, t){
    var ModLocation = Session.get('ModLocation');

    if(typeof ModLocation === 'undefined'){
      ModLocation = t.$('.find_cmp_sb_bar > input').val();
    }else{
      ModLocation = ModLocation.c_dma_code;
    }

    var obj = {
      exchange: Session.get('ModExchange'),
      sector: Session.get('ModSector'),
      industry: Session.get('ModIndustry'),
      key_metric: Session.get('ModMetrics'),
      location: ModLocation
    }

    //console.log('submit object', obj);

    var params = '';

    for(key in obj){
      if(typeof obj[key] !== 'undefined'){
        params += '&' + key + '=' + obj[key];
      }
    }//Close for

    console.log('THE PARAMS', params);

  },
  //Event to find suggested results
  'keyup .find_cmp_sb_bar > input': function(e, t){
    var input = t.$('.find_cmp_sb_bar > input').val();

    if(input === ''){
      Session.set('find_company_suggestions', undefined);
      return false;
    }

    if ( typeof StartTime == "undefined" ) {
      StartTime = 0;
    }
    var d = new Date();
    d = d.getTime();
    curTime = d;
    if ( d - StartTime < 250 ) {
      setTimeout(function(curTime){suggest(curTime);},250,curTime);
      return "";
    }
    StartTime = d;
    suggest(curTime);

    /*Meteor.http.get('http://apifin.investkit.com/call_controller.php?action=search&option=location&param=' + input + '&wild=1', function(err, result){
      //console.log('Keyup result', result);
      if(err){
        //Error code
      }else{
        //Success code
        var array = result.data.location.search_data;
        //Get unique cities
        var flags = [], output = [], l = array.length, i;
        for( i=0; i<l; i++) {
            if( flags[array[i].c_hq_city]) continue;
            flags[array[i].c_hq_city] = true;
            output.push(array[i].c_hq_city);
        }

        Session.set('find_company_suggestions', result.data.location.search_data);
      }
    });*/
  },
  //Event to display suggested results dropdown
  'focus .find_cmp_sb_bar > input': function(e, t){
    Session.set('find_company_focus', true);
  },
  'click .find_cmp_sb .dropdown .dropdown_item': function(e, t){
    t.$('.find_cmp_sb_bar > input').val(this.c_hq_city + ", " + this.c_hq_state);

    Session.set('ModLocation', this);
    Session.set('find_company_focus', false);
  },
  //Event to clear search
  'click .find_cmp_clear': function(e, t){
    var data = Session.get('find_company');

    delete Session.keys.ModExchange;
    delete Session.keys.ModSector;
    delete Session.keys.ModIndustry;
    delete Session.keys.ModMetrics;
    delete Session.keys.ModLocation;
    delete Session.keys.find_company_suggestions;
    t.$('.find_cmp_sb_bar > input').val('');
    t.$('#ModExchange > .find_cmp_dd_menu_txt').html(data.exchanges[0]);
    t.$('#ModSector > .find_cmp_dd_menu_txt').html('All Sectors');
    t.$('#ModIndustry > .find_cmp_dd_menu_txt').html('All Industry');
    t.$('#ModMetrics > .find_cmp_dd_menu_txt').html(data.key_metrics[0].toTitleCase());

  }
});

Template.find_company.helpers({
  search_style: function(){
    var data = Session.get('find_company_suggestions');
    var isFocus = Session.get('find_company_focus');

    if(typeof data === 'undefined' || isFocus === false || typeof isFocus === 'undefined'){
      return '';
    }

    return 'display: block; opacity: 1';

  },

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
  },

  suggest: function(){
    var data = Session.get('find_company_suggestions');

    if ( typeof data === 'undefined' ){
      return false;
    }
    //Return only max of 5 results
    var returnArr = data.slice(0, 5);

    return returnArr;
  }
});
