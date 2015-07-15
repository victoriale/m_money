
/*Author: [snehalatha pappu]
Created: [05/30/2015]
Description: [.js file for property listing Module]
Associated Files: [property_listing.html,property_listing.less]
*/

/* code for the first thumbnail sc1 to pop up in the container */
//create image image_media_index to scroll through listing images
Template.image_media.onRendered(function(){
  $('.navigation-button-right').mousedown(function(){ return false; });
  $('.navigation-button-left').mousedown(function(){ return false; });
});
Template.image_media.onCreated(function(){
  Session.set("image_media_index", -1);
});

Template.image_media.events({
  'click .property_listing-midcont .navigation-button-right': function() {
    var image_media_index = Session.get("image_media_index");
    var listdata = Session.get("images_media");
    if ( typeof listdata != "undefined" ) {
      if(image_media_index < listdata["photos"].length - 1){
        image_media_index++;
      } else {
        image_media_index = 0;
      }
      Session.set("image_media_index", image_media_index);
    }
    return false;
  },
  'click .property_listing-midcont .navigation-button-left': function() {
    var listdata = Session.get("images_media");
    var image_media_index = Session.get("image_media_index");
    if(image_media_index > 0){
      image_media_index--;
    } else {
      image_media_index = listdata['photos'].length - 1;
    }
    Session.set("image_media_index", image_media_index);
    return false;
  },

  'click [class*="property_listing-sc"]': function(event) {
    var ClickedElem = event.target;
    var ClassName = $(ClickedElem)[0].className;
    Session.set('image_media_index', $(ClickedElem)[0].id);
  },
  'click #virtual_tour': function(){
    var virtual = Session.get("images_media");
    window.open(virtual['virtual_tours'][0], '_blank');
  },
  'click #video': function(){
    var virtual = Session.get("images_media");
    window.open(virtual['videos'][0], '_blank');
  },
})

Template.image_media.helpers({
  image_counter: function(){
    //if the page is Listing the replace image_media_index for images
    Session.set("image_media_index",0);
    if(Session.get("isListing")){
      var data = Session.get("images_media");
      if ( typeof data == 'undefined' ) {
        return false;
      }
      return data["photos"].length;
    } else {
      //this is where location should go
      return '';
    }
  },
  virtual_counter: function(){
    //if the page is Listing the replace neccessary information
    if(Session.get("isListing")){
      var data = Session.get("images_media");
      if ( typeof data == 'undefined' ) {
        return false;
      }
      return data["virtual_tours"].length;
    }else{
      //this is where location should go
      return '';
    }
  },
  video_counter: function(){
    //if the page is Listing the replace neccessary information
    return false;
  },
  MainImgURL: function(){
    var index = Session.get('image_media_index');
    var data = Session.get("images_media");
    if ( Session.get('isListing') ) {
      if ( typeof data != "undefined" ) {
        return data["photos"][index];
      }
    }
  },
  SubImg: function(){
    var index = Session.get('image_media_index');
    var data = Session.get("images_media");
    if ( Session.get('isListing') ) {
      if ( typeof data != "undefined" ) {
        var returnData = new Array();
        if ( data['photos'].length < 5 ) {
          var Start = 0;
          var End = data['photos'].length;
        } else if ( index > data['photos'].length - 5 ) {
          var Start = data['photos'].length - 5;
          var End = data['photos'].length;
        } else {
          var Start = index;
          var End = index + 5;
        }
        for ( var localIndex = Start; localIndex < End; localIndex++ ) {
          returnData[localIndex - Start] = new Object();
          returnData[localIndex - Start]['Index'] = localIndex;
          returnData[localIndex - Start]['SubImgURL'] = data['photos'][localIndex];
        }
        return returnData;
      }
    }
  }
})
