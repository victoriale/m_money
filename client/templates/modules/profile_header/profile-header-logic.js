dNumberToCommaNumber = function(Number) {
  return Number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

PhoneNumber = function(phone) {
  phone = phone.replace(/[^0-9]/g, '');
  phone = phone.replace(/(\d{3})(\d{3})(\d{4})/, "($1) $2-$3");
  return phone;
}

StringToSentence = function(String) {
  return String.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
}

Template.profile_header.helpers({
  DefaultImage: function() {
    if ( Session.get('isListing') ) {
      return "/Home_Stock_Images/25_S.png";
    }
  },
  ProfileLastUpdated: function() {
    var data = Session.get('profile_header');
    if ( typeof data == 'undefined' ) {
      return "";
    }
    if ( Session.get('isListing') ) {
      var ReturnString = data['city'] + ', ' + data['state'];
      if ( typeof data['neighborhood'] != "undefined" && data['neighborhood'] != null ) {
        ReturnString = ReturnString + ' > ' + data['neighborhood'];
      }
      return ReturnString;
    } else {
      return 'LAST UPDATED: ' + data['timestamp'];
    }
  },
  RealtorImage: function() {
    var data = Session.get('profile_header');
    if ( typeof data != "undefined" && typeof data['realtor_logo'] != "undefined" ) {
      return data['realtor_logo'];
    }
    return false;
  },
  ProfileTitle: function() {
    var Data = Session.get('profile_header');
    if ( typeof Data != 'undefined' && Data != null ) {
      if ( Session.get('isListing') ) {
        if ( typeof Data['street_address'] != 'undefined' ) {
          return Data['street_address'];
        }
        return "Invalid Listing";
      } else {
        var returnString = Data['city'] + ", " + Data['state'];
        if ( Data['neighborhood_count'] > 0 ) {
          returnString = returnString + " - Home to " + NumberToCommaNumber(Data['neighborhood_count']) + " neighborhoods";
        }
        if ( typeof Data['city'] != 'undefined' ) {
          return returnString;
        }
        return "Invalid Location";
      }
    }
    return "Loading Data...";
  },
  ProfileType: function() {
    var Data = Session.get('profile_header');
    if ( typeof Data != "undefined" && Session.get('isListing') ) {
      var SubheaderText = "Listing Price: $" + NumberToCommaNumber(Data['list_price']);
    } else if ( typeof Data != "undefined" ) {
      var SubheaderText = NumberToCommaNumber(Data['listings_count']) + ' Listings Available for Sale';
    } else {
      var SubheaderText = "";
    }

    return SubheaderText;
  },
  NumberListings: function() {
    var Data = Session.get('profile_header');
    if ( typeof Data == 'undefined' ) {
      var ReturnString = "";
    } else {
      if ( Session.get('isListing') ) {
        var ReturnString = "<a href='mailto:" + Data['realtor_email'] + "'>" + Data['realtor_company'] + "</a>";
      } else {
        var ReturnString = NumberToCommaNumber(Data['listings_count']);
      }
    }
    return Spacebars.SafeString(ReturnString);
  },
  CarouselDescription: function() {
    var data = Session.get('profile_header');
    if ( typeof data != "undefined" ) {
      if ( Session.get('isListing') ) {
        var CarouselString = "This listing is located at <b>" + data['street_address'] + ", " + data['city'] + ", " + data['state'] + "</b>.";
        if ( typeof data['living_area'] != "undefined" && data['living_area'] != null && data['living_area'] > 0 ) {
          CarouselString = CarouselString + " The living area is around <b>" + NumberToCommaNumber(data['living_area']) + " sq ft</b>.";
        }
        if ( typeof data['agent_name'] != "undefined" ) {
          CarouselString = CarouselString + " If you're interested in more information, please contact agent <a href='mailto:" + data['agent_email'] + "'><b>" + StringToSentence(data['agent_name']) + "</b></a>";
          if ( typeof data['agent_phone'] != "undefined" ) {
            CarouselString = CarouselString + " at phone number <b>" + PhoneNumber(data['agent_phone']) + "</b>";
            if ( typeof data['agent_office_phone'] != "undefined" ) {
              CarouselString = CarouselString + ", or";
            }
          } else if ( typeof data['agent_office_phone'] != "undefined" ) {
            CarouselString = CarouselString + " at";
          }
          if ( typeof data['agent_office_phone'] != "undefined" ) {
            CarouselString = CarouselString + " their office phone number <b>" + PhoneNumber(data['agent_office_phone']) + "</b>";
          }
          CarouselString = CarouselString + ".";
        }
        if ( typeof data['listing_desc'] != "undeined" && data['listing_desc'] != null ) {
          CarouselString = CarouselString + "<br><br>See below for property description. <br><br>Property Description: " + data['listing_desc'];
        }
      } else {
        var CarouselString = "Today in " + data['city'] + " Realestate, " + NumberToCommaNumber(227) + " homes were added to the market. ";
        var OtherData = Session.get('similar_neighborhoods');
        if ( typeof OtherData != 'undefined' ) {
          CarouselString = CarouselString + "The most popular neighborhood for new listings was " + OtherData[0]['neighborhood'] + ". "
        }
        CarouselString = CarouselString + "Did you know that the average age for a " + data['city'] + " resident is " + Math.round(Number(data['average_age']))
        if ( typeof data['average_rental'] != 'undefined' ) {
          CarouselString = CarouselString + ", the average rental price is $" + NumberToCommaNumber(Math.round(Number(data['average_rental']/10)*10)) + "/month,";
        }
        CarouselString = CarouselString + " and the average home sells for $" + NumberToCommaNumber(Math.round(Number(data['average_residential'])/10)*10) + ".";
      }
      return Spacebars.SafeString(CarouselString);
    }
  },
  CarouselTitle: function() {
    if ( Session.get('isListing') ) {
      return "Read more about this listing";
    } else {
      return "What's happening near here?";
    }
    return "Loading Data";
  },
  isListing: function() {
    return Session.get('isListing');
  },
  ProfileImage: function(){
    var Data = Session.get('profile_header');
    if ( typeof Data != 'undefined' ) {
      if ( Session.get('isListing') ) {
        var imageURL = Data['photo'];
      } else {
        var imageURL = Data['city_image'];
      }
      return imageURL;
      //$(".profile-header-profile-image").css("background-image","url('" + imageURL + "')");
    }
    return "";
  },
  status: function(){
    var data = Session.get('profile_header');
    if(typeof data != 'undefined'){
      if (Session.get('isListing')){
        return " - " + data['listing_status'];
      }
      return '';
    }
    return '';
  },
  area: function(){
    var data = Session.get('profile_header');
    if(typeof data != 'undefined'){
      if (Session.get('isListing')){
        return " - " + data['living_area'] + " sq ft.";
      }
      return '';
    }
    return '';
  },
  originalLink: function(){
    var data = Session.get('profile_header');
    if(typeof data != 'undefined'){
      if (Session.get('isListing')){
        return data['listhub_url'];
      }
      return '';
    }
    return '';
  },
})

Template.profile_header.events({
  'click .profile-header-text-update': function() {
    var data = Session.get('profile_header');
    var location_id = data['city'] + "_" + data['state'];
    LocationRedirect(location_id);
  }
})

Template.profile_header.onRendered(function(){
  $(".profile-header-text-name").bind("DOMSubtreeModified",function(){
    if ( $(this)[0].clientWidth < $(this)[0].scrollWidth ) {
      var NewText = $(this)[0].innerHTML.split('-');
      NewText = NewText[0].trim();
      $(this)[0].innerHTML = NewText;
    }
  });
  $(".profile-header-carousel-description").bind("DOMSubtreeModified",function(){
    if ( $(this)[0].clientHeight < $(this)[0].scrollHeight ) {
      $(this).css("overflow-y","scroll");
    } else {
      $(this).css("overflow-y","hidden");
    }
  });
})
