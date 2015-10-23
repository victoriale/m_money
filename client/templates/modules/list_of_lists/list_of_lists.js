/*
Name: Venkatesh
Created:7/21/2015
Description: Top lists Facebook
Associated Files: list_of_lists.html, list_of_lists_logic.js and list_of_lists.less
*/
//This variable is set as white as our first background is grey, the program checks whether its white and changes it to grey.

Template.list_of_lists.onCreated(function () {
  this.autorun(function(){
    if(Session.get('IsCompany') || Session.get('IsExec')){
      var data = Session.get('profile_header');
      if(typeof data =='undefined'){
        return ''
      }

      Meteor.call('listData', data.c_ticker, function(error, result){
        if(error){
          console.log('Invalid parameters Error',error);
          return '';
        }
        Session.set('list_of_lists', result.list_of_lists);
      })
    }
  })
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
    return list.list_rankings;
  },

  checkList: function(){
    var list = Session.get('list_of_lists');
    if(typeof list =='undefined' || list == ''){
      return false;
    }
    return true;
  },

  headerInfo: function(){
    var data = Session.get('profile_header');
    if(typeof data == 'undefined'){
      return false;
    }
    if(Session.get('IsCompany')){
      var name = data.c_name;
    }
    if(Session.get('IsExec')){
      var name = data.c_name;
    }
    return name;
  },
});
//This handles the events on button clicks of 1,2,3 and 200
Template.list_of_lists.events({

});
