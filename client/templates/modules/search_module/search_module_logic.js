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
  $('.re_mainsearch input')[0].value = "";
}

Template.search_module.events({
  'keypress .re_mainsearch input': function(event){
    if ( event.which === 13 ) {
      ExecSearch();
    }
  },
  'click .re_searchbtn.fa-search': function() {
    ExecSearch();
  }
});
