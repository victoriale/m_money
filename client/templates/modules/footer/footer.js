/* Author: Ryan Fisher
** Created: 09/16/2015
** Description: .js file for Homepage footer
** Associated Files: footer.html, footer.less, footer.js
*/

Template.Footer.onRendered(function(){
  //use third part api to grab your global ip to be used in a data call

  // $.get("https://apireal.ipify.org/?format=json", function (response) {
  //   $.get(APIHost + "/zipcode/?action=ipToLoc&ip=" + response['ip'],function(data){
  //     for ( var key in data ) {
  //       key = key.split(',');
  //       Session.set('footer_user_location',{city: key[0].trim(), state: key[1].trim()});
  //       return false;
  //     }
  //   },"json");
  // }, "json");
})

Template.Footer.onRendered(function(){
//taking the URL of the page and storing it on variable name URL
 var URL = window.top.location.href;

//for facebook sharing we are appending the URL with the static URL
 var String_facebook4 ="https://www.facebook.com/sharer/sharer.php?u="+ URL;
 $(".facebook_foot4").attr("href", String_facebook4);
 var URL = window.top.location.href;

//for twitter sharing we are appending the URL with the static URL
 var String_twitter3 ="https://twitter.com/home?status="+ URL;
 $(".facebook_foot3").attr("href", String_twitter3);
 //forlinkedin sharing we are appending the URL with the static URL
  var String_linkedin ="https://www.linkedin.com/shareArticle?mini=true&url="+ URL;
  $(".facebook_foot2").attr("href", String_linkedin);
  //for google sharing we are appending the URL with the static URL
   var String_google ="https://plus.google.com/share?url="+ URL;
   $(".facebook_foot1").attr("href", String_google);
   //for pinterest sharing we are appending the URL with the static URL
    var String_pinterest ="https://pinterest.com/pin/create/button/?url=&media="+ URL;
    $(".facebook_foot").attr("href", String_pinterest);
 })

Template.Footer.helpers({
  navLink: function(){
    //Get user data for list links
    data = Session.get('footer_user_location');

    //If user data exists use city and state else use default values
    if(data){
      return{
        list: 'most-recent-listings',
        pageNum: 1,
        userCity: data.city,
        userState: data.state,
        list1: 'most-recent-listings',
        list2: 'largest-homes',
        list3: 'least-expensive-homes',
        partnerId: undefined
      }
    }else{
      return{
        list: 'most-recent-listings',
        pageNum: 1,
        city: undefined,
        state: undefined,
        list1: 'most-recent-listings',
        list2: 'largest-homes',
        list3: 'least-expensive-homes',
        partnerId: null
      }
    }
  }
})
