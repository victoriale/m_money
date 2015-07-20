/*
Author: [Venkatesh Mabbu]
Created: [07/20/2015]
JIRA ID: REAL-73
Description: This script will run after the Facebook template rendered, this script is required to insert the plugin in the html page.
Associated Files: [Facebook.html, Facebook_logic.js and Facebook.less ]
*/

Template.Facebook.onRendered((function(d, s, id) {
  var js, fjs = d.getElementsByTagName(s)[0];
  if (d.getElementById(id)) return;
  js = d.createElement(s);
  js.id = id;
  js.src = "//connect.facebook.net/en_US/sdk.js#xfbml=1&version=v2.4&appId=280601245384203";
  fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk')));
