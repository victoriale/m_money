Template.share_this.onRendered(function(){
  //taking the URL of the page and storing it on variable name URL
  var URL = window.top.location.href;

  //for facebook sharing we are appending the URL with the static URL
  String_facebook ="https://www.facebook.com/sharer/sharer.php?u="+ URL;
  $(".facebook-link").attr("href", String_facebook);

  //for twitter sharing we are appending the URL with the static URL
  String_twitter ="https://twitter.com/home?status="+ URL;
  $(".twitter-link").attr("href", String_twitter);

  //for google+ sharing we are appending the URL with the static URL
  String_google ="https://plus.google.com/share?url="+ URL;
  $(".google-link").attr("href", String_google);

  //for linkedin sharing we are appending the URL with the static URL
  String_linkedin ="https://www.linkedin.com/shareArticle?mini=true&url="+ URL;
  $(".linkedin-link").attr("href", String_linkedin);

  //for pinterest sharing we are appending the URL with the static URL
  String_pinterest ="https://pinterest.com/pin/create/button/?url=&media="+ URL;
  $(".pinterest-link").attr("href", String_pinterest);

});

Template.share_this.helpers({
  imgURL: function() {
    var image = Session.get('profile_header');
    if ( typeof image == "undefined" ) {
      return "";
    }
    if ( Session.get('isListing') ) {
      return image['photo'];
    } else {
      return image['city_image'];
    }
  }
})
