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
  topImage: function(){
    var data = Session.get('profile_header');
    if(typeof data == 'undefined'){
      return '';
    }
    if(Session.get('IsCompany')){
      var image = data.c_logo;
    }else if(Session.get('IsExec')){
      var image = data.o_pic;
    }
    return image;
  },
  isLocation:function(){
    return Session.get('IsLocation');
  },
  image: function(){
    var params = Router.current().getParams();
    var data = Session.get('loc_id');
    //if partner domain exists then choose the
    if(typeof params.loc_id == 'undefined'){
      var partner_image = Session.get('profile_header');
      if(partner_image.dma_code == null){
        return "background-image: url('/StateImages/Location_"+ partner_image['location'] +".jpg');";
      }else{
        return "background-image: url('/DMA_images/location-"+ partner_image['dma_code'].split(',')[0] +".jpg');";
      }
    }
    if(data == 'National' || data == '' || typeof data == 'undefined'){
      return "background-image: url('/StateImages/Location_"+ data +".jpg');";
    }else{
      if(isNaN(data)){
        data = fullstate(data) || data;
        data = data.replace(/ /g, '_');
        return "background-image: url('/StateImages/Location_"+ data +".jpg');";
      }else{
        return "background-image: url('/DMA_images/location-"+ data +".jpg');";
      }
    }
  },
})
