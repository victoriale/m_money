
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
     var city = Session.get('profile_header');
     if(typeof city != 'undefined'){
       Meteor.http.get('http://api.synapsys.us/news/?action=get_finance_whats_happening&city='+ city.c_hq_city ,function(err, data){
         if(err){
           console.log('CALL ERROR', err);
           return false;
         }else{
           console.log("whats_happening:",data);
           Session.set("whats_happening",data);
         }
       })
     }else{
       return '';
     }
   })
 });

 //this will call the getcounter function to increment the number
   Template.happening_today.onRendered(function(){
     $(".hp_td-imgh-im3-txt").html("#1")
     counter();
   });

//helpers to send the dynamic data
Template.happening_today.helpers({
  mention: function(){
    var data = Session.get('whats_happening');
    if(typeof data == 'undefined'){
      return '';
    }
    data['readData'] = get_full_date(data.current_time_ut);
    console.log(data);
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
  },

    cName: 'Apple, Inc.',
    date: 'October 1, 2015',
    wrtby: 'Aman Jain',
  });

  //counter variable
  var cntr=1;
  function counter(){ //
  $(".hp_td-imgh-cir").click(function(){
    cntr++;
    $(".hp_td-imgh-im3-txt").html("#"+cntr)
    });
}
