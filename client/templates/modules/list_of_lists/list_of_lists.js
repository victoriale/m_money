/*
Name: Venkatesh
Created:7/21/2015
Description: Top lists Facebook
Associated Files: list_of_lists.html, list_of_lists_logic.js and list_of_lists.less
*/
//This variable is set as white as our first background is grey, the program checks whether its white and changes it to grey.

Template.list_of_lists.onRendered(function () {

});

Template.list_of_lists.helpers({

  listsData: function(){
    var list = Session.get('list_of_lists');
    if(typeof list =='undefined'){
      return false;
    }
    $.map(list.list_rankings, function(data, index){
      if((index % 2) == 0){
        data['index_color'] = '#f2f2f2';
      }else{
        data['index_color'] = '#ffffff';
      }
    })
    console.log(list.list_rankings);
    return list.list_rankings;
  },

  headerInfo: function(){
    var data = Session.get('profile_header');
    if(typeof data == 'undefined'){
      return false;
    }
    console.log(data);
  },
});
//This handles the events on button clicks of 1,2,3 and 200
Template.list_of_lists.events({

});
