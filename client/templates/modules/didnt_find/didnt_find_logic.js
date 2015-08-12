function ExecSearch() {
  var LocationText = $('.re_mainsearch input')[0].value;
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

function GetSuggest() {
  var searchString = $('.re_mainsearch input')[0].value;
  if ( searchString == "" ) {
    $('.discover_recommendations').removeClass('active');
  } else {
    var stringURL = 'http://api.synapsys.us/listhuv/?action=search_helper&q=' + encodeURIComponent(searchString);
    $.ajax({
      url: stringURL,
      dataType: 'json',
      cache: false,
      success: function(data) {
        var HTMLString = '<div class="caret-top"></div><i class="fa fa-times discover_recommendations_close"></i>';
        if ( data.length == 0 ) {
          $('.discover_recommendations').removeClass('active');
          return false;
        }
        for ( var index = 0; index < data.length; index++ ) {
          if ( index < 10 ) {
            if ( index != 0 ) {
              HTMLString = HTMLString + '<div class="border-li"></div>';
            }
            HTMLString = HTMLString + '<div class="discover_recommendations_item">' + data[index].city + ", " + data[index].state + '</div>';
          }
        }
        $('.discover_recommendations')[0].innerHTML = HTMLString;
        $('.discover_recommendations').addClass('active');
      }
    });
  }
}

Template.search_module.events({
  'submit form': function(event) {
    event.preventDefault();
  },
  'keypress .re_mainsearch input': function(event){
    if ( event.which === 13 ) {
      ExecSearch();
    }
  },
  'click .re_searchbtn.fa-search': function() {
    ExecSearch();
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
    $('.re_mainsearch input')[0].value = $(event.target)[0].innerHTML;
    $('.discover_recommendations').removeClass('active');
    ExecSearch();
  },
  'click .discover_recommendations_close': function() {
    $('.discover_recommendations').removeClass('active');
    return false;
  }
});
