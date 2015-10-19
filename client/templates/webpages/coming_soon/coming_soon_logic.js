/*
Author: jyothyswaroop
Created: 07/30/2015
Description: stock disclaimer page
Associated Files: coming_soon.less and coming_soon.html
*/

Template.coming_soon.onCreated(function(){
  var counter = 0;
  Session.set("count",counter);

})

Template.coming_soon.helpers({
comp_name: function(){
  var name = "Facebook, Inc";
  return name;
}
});
