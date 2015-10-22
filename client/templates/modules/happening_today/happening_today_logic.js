
/* Author: Sri Sindhusha Kuchipudi
 Created: 09/30/2015
 Description: .js file for career_stats module
 Associated Files: career_stats.html, career_stats.less, career_stats.js
 */

 Template.happening_today.onCreated( function() {
   Session.set("ht_count",0);
 });

 Template.happening_today.onRendered( function() {
   this.autorun(function(){
     var city = Session.get('bio_location');
     //var url = "http://api.synapsys.us/news/?action=get_finance_whats_happening&city=San Francisco";
     if(typeof city != 'undefined'){
       var url = "http://api.synapsys.us/news/?action=get_finance_whats_happening&city="+ city.c_hq_city;
       Meteor.http.get(url ,function(err, data){
         if(err){
           console.log('CALL ERROR', err);
           return false;
         }else{
           Session.set("whats_happening",data['data']);
         }
       })
     }else{
       return '';
     }
   })
 });

 Template.happening_today.events({
   'click .hp_td-imgh-cir': function(){
     var counter = Session.get("ht_count");
     var tnews = Session.get('whats_happening');
     if(counter < tnews['stories'].length - 1)
     {
       counter++;
       Session.set("ht_count",counter);
     }
     else
     {
       counter = 0;
       Session.set("ht_count", counter);
     }
   },
 })

//helpers to send the dynamic data
Template.happening_today.helpers({
  mention: function(){
    var data = Session.get('whats_happening');
    if(typeof data == 'undefined'){
      return '';
    }
    data['readData'] = get_full_date(data.current_time_ut);
    return data;
  },
  companyName: function(){
    var data = Session.get('profile_header');
    if(typeof data == 'undefined'){
      return '';
    }
    return data.c_name;
  },

  news: function(){
    var data = Session.get('whats_happening');
    var count = Session.get('ht_count');
    if(typeof data == 'undefined' || data === null){
      return '';
    }

    return data['stories'][count];
  },

  counter: function(){
    var count = Session.get('ht_count');
    if(typeof count == 'undefined'){
      return '';
    }
    return count+1;
  },

});
