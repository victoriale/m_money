function ExecSearch() {
  var LocationText = $('.re_mainsearch-text')[0].value;
  if ( LocationText.match(/^\d*$/) ) {
    location_id = LocationText;
  } else if ( LocationText.match(/^[^\,]*\,[^\,]*$/) ) {
    LocationText = LocationText.split(',');
    LocationText[0] = LocationText[0].trim();
    LocationText[1] = LocationText[1].trim();
    LocationText[0] = LocationText[0].replace(/.+?[\.\?\!](\s|$)/g, function (txt) {
      return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });
    LocationText[1] = LocationText[1].toUpperCase();
    if ( LocationText[1].length != 2 ) {
      console.log("Incorrect state length");
      return;
    }
    var location_id = LocationText[0] + "_" + LocationText[1];
  } else {
    console.log('Other');
    return;
  }
  LocationRedirect(location_id);
}
function GetSuggest(nowTime) {
  var searchString = $('.re_mainsearch-text')[0].value;
  if ( searchString == "" ) {
    $('.discover_recommendations').removeClass('active');
  } else {
    Meteor.call('GetSuggestion',encodeURIComponent(searchString),nowTime,function(error, data){
      if ( error ) {
        console.log('Suggestion Error',error);
        return false;
      }

      if ( Session.get('SuggestTime') > data.time ) {
        return false;
      }

      Session.set('SuggestTime',data.time);
      data = data.data;

      var suggestions = sortSuggestions(data, $('.re_mainsearch-text')[0].value);

      if ( suggestions.length == 0 ) {
        $('.discover_recommendations').html('');
        $('.discover_recommendations').removeClass('active');
        return false;
      }

      var HTMLString = '<div class="caret-top"></div>';
      for ( var index = 0; index < suggestions.length; index++ ) {
        if ( index != 0 ) {
          HTMLString = HTMLString + '<div class="border-li"></div>';
        }
        HTMLString = HTMLString + '<a style="color: #000" href="' + suggestions[index].url + '"><div class="discover_recommendations_item">' + suggestions[index].string + '</div></a>';
      }

      if ( data['name']['func_success'] == false && data['location']['func_success'] == false && data['ticker']['func_success'] == false) {
        $('.discover_recommendations').removeClass('active');
        return false;
      }

      //  $('.fi_search_recommendations')[0].innerHTML = '<div class="caret-top"></div>' /*' <i class="fa fa-times fi_search_recommendations_close"></i>'*/ + HTMLStringTick + HTMLStringName + HTMLStringLoc;
      $('.discover_recommendations').html(HTMLString);
      $('.discover_recommendations').addClass('active');
    });
  }
}
Template.search_module.onRendered(function(){
  $('.header_search_recommendations').removeClass('active');
});

Template.search_module.events({
  'submit form': function(event) {
    event.preventDefault();
  },
  'keypress .re_mainsearch input': function(event){
    if ( event.which === 13 ) {
      Finance_Search($('.re_mainsearch-text')[0].value);
    }
  },
  'click .re_searchbtn.fa-search': function() {
    Finance_Search($('.re_mainsearch-text')[0].value);
  },
  'keyup .re_mainsearch input': function(event) {
    if ( event.which === 13 ) {
      return "";
    }
    if ( typeof StartTime == "undefined" ) {
      StartTime = 0;
    }
    var d = new Date();
    d = d.getTime();
    if ( d - StartTime < 250 ) {
      setTimeout(function(){GetSuggest();},250);
      return "";
    }
    StartTime = d;
    GetSuggest();
  },
  'click .discover_recommendations_item': function(event) {
    $('.re_mainsearch-text')[0].value = $(event.target).text();
    $('.discover_recommendations').removeClass('active');
    Finance_Search($('.re_mainsearch-text')[0].value);
  },
  'click .discover_recommendations_close': function() {
    $('.discover_recommendations').removeClass('active');
    return false;
  },
  'click .fi_mainsearch-text': function(){
    if($('.re_mainsearch-text')[0].value == '' || $('.re_mainsearch-text')[0].value == ' ' || $('.re_mainsearch-text')[0].value == undefined){
      return false;
    }else{
      $(".fi_mainsearch-text").addClass("boxhighlight");
      $('.discover_recommendations').addClass('active');
    }
  },
  'mouseenter .re_mainsearch': function(){
    if($('.re_mainsearch-text')[0].value == '' || $('.re_mainsearch-text')[0].value == ' ' || $('.re_mainsearch-text')[0].value == undefined){
      return false;
    }else{
      $(".fi_mainsearch-text").addClass("boxhighlight");
      $('.discover_recommendations').addClass('active');
    }
  },
  'mouseleave .discover_recommendations': function(){
    $(".fi_mainsearch-text").removeClass("boxhighlight");
    $('.discover_recommendations').removeClass('active');
  }

});
