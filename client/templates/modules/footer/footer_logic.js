Template.footer.onRendered(function(){
  //gets the data using  Session.get()

    var URL = window.top.location.href;

    String_facebook ="https://www.facebook.com/sharer/sharer.php?u="+ URL;
    $(".facebook_foot4").attr("href", String_facebook);

    //for twitter sharing we are appending the URL with the static URL
    String_twitter ="https://twitter.com/home?status="+ URL;
    $(".facebook_foot3").attr("href", String_twitter);

    //for google+ sharing we are appending the URL with the static URL
    String_google ="https://plus.google.com/share?url="+ URL;
    $(".facebook_foot1").attr("href", String_google);

    //for pinterest sharing we are appending the URL with the static URL
    String_pinterest ="https://pinterest.com/pin/create/button/?url=&media="+ URL;
    $(".facebook_foot").attr("href", String_pinterest);
    //for linkedin sharing we are appending the URL with the static URL
    String_linkedin = "https://www.linkedin.com/";
    $(".facebook_foot2").attr("href", String_linkedin);
})

Template.footer.helpers({
  notPartner: function() {
    if ( typeof Router.current().params.partner_id != "undefined" || Session.get('IsSubDomain') ) {
      return false;
    }
    return true;
  },

  trendinglist: function(){
    return globalUrl('listoflists');
  },
  gain: function(){
    return globalUrl('gain');
  },
  loss: function(){
    return globalUrl('loss');
  },
  national: function(){
    return globalUrl('National');
  },
  pathPick: function(type, query, pageNum){
    var params = Router.current().getParams();

    if(typeof params.partner_id !== 'undefined'){
      query = query !== 'null' ? query : undefined;
      return Router.path('partner.finance.directory', {type: type, pageNum: pageNum, partner_id: params.partner_id}, {query: query});
    }else{
      query = query !== 'null' ? query : undefined;
      return Router.path('content.finance.directory', {type: type, pageNum: pageNum}, {query: query});
    }

  },
  pathPickStatic: function(route_name){
    return Router.pick_path(route_name, {});
  }
});
