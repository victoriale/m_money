/*
Author: Deepika Priyanka V
Created: 07/17/2015
Description: Share & follow module
Associated Files: share_logic.js and share.less

*/
Template.share.onRendered(function(){
  //gets the data using  Session.get()

    var URL = window.top.location.href;

    String_facebook ="https://www.facebook.com/sharer/sharer.php?u="+ URL;
    $(".facebook-link").attr("href", String_facebook);

    //for twitter sharing we are appending the URL with the static URL
    String_twitter ="https://twitter.com/home?status="+ URL;
    $(".twitter-link").attr("href", String_twitter);

    //for google+ sharing we are appending the URL with the static URL
    String_google ="https://plus.google.com/share?url="+ URL;
    $(".google-link").attr("href", String_google);

    //for pinterest sharing we are appending the URL with the static URL
    String_pinterest ="https://pinterest.com/pin/create/button/?url=&media="+ URL;
    $(".pinterest-link").attr("href", String_pinterest);

})

Template.share.helpers({
  compImage: function(){
    var image = Session.get('profile_header');
    if(typeof image == 'undefined'){
      return '';
    }
    return image.c_logo;
  },
  image: function(){
    var data = Session.get('profile_header');
    console.log(data);
    var state = data['location'].replace(/ /g, '_');;
    console.log(state);
    return "background-image: url('/StateImages/Location_"+ state +".jpg');";
  },
})
