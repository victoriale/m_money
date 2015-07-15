Template.school_list.helpers({
  PageTitle: function() {
    if ( typeof Session.get("SchoolListing") == "undefined" ) {
      return "Schools near " + Session.get("SchoolCity") + ", " + Session.get("SchoolState");
    } else {
      return "Schools near this listing";
    }
  },
  ListItems: function() {
    var data = Session.get("school_list_info");
    if ( typeof data == "undefined" ) {
      return "";
    }
    var ReturnArray = new Array();
    for ( var index = 0; index < data['schools'].length; index++ ) {
      var LocalData = data['schools'][index];
      if ( typeof LocalData.image_url == "undefined" ) {
        var subInd = LocalData['grade_level'].length - 1;
        LocalData.image_url = "/stock/small_Schools/" + data['schools'][index]['grade_level'][subInd].toLowerCase() + "_stockimage1.jpg";
      }
      for ( var subIndex = 0; subIndex < LocalData['grade_level'].length; subIndex++ ) {
        LocalData['grade_level'][subIndex] = {'level': LocalData['grade_level'][subIndex]};
        if ( subIndex < (LocalData['grade_level'].length - 1) ) {
          LocalData['grade_level'][subIndex]['level'] = LocalData['grade_level'][subIndex]['level'] + ', ';
        }
      }
      if ( index%2 == 0 ) {
        LocalData.class = "school_list_even";
      } else {
        LocalData.class = "school_list_odd";
      }
      ReturnArray[index] = LocalData;
    }
    return ReturnArray;
  },
  NextURL: function(){
    var skip = Session.get("SchoolsSkip");
    var data = Session.get("school_list_info");
    var category = Session.get("SchoolsCategory");
    if ( typeof data == "undefined" || typeof data['counts'] == "undefined " ) {
      return false;
    }
    if ( typeof category == "undefined" || category == null ) {
      var count = 0;
      for ( var label in data['counts'] ) {
        count += data['counts'][label];
      }
    } else {
      var count = data['counts'][category];
    }
    if ( count < (parseInt(skip) + 20) ) {
      return false;
    }
    if ( typeof Session.get("SchoolListing") == "undefined" ) {
      return Router.path('content.realestate.schools.listing.skip',{
        listing_id: Session.get("SchoolListing"),
        category: Session.get("SchoolCategory"),
        skip: parseInt(skip) + 20
      });
    } else {
      return Router.path('content.realestate.schools.skip',{
        city_id: Session.get("SchoolCity"),
        state_id: Session.get("SchoolState"),
        category: Session.get("SchoolCategory"),
        skip: parseInt(skip) + 20
      });
    }
  }
});
