
/* Author: Sri Sindhusha Kuchipudi
 Created: 09/30/2015
 Description: .js file for career_stats module
 Associated Files: career_stats.html, career_stats.less, career_stats.js
 */


 //this will call the getcounter function to increment the number
   Template.happening_today.onRendered(function(){
     $(".hp_td-imgh-im3-txt").html("#1")
     counter();
   });

//helpers to send the dynamic data
Template.happening_today.helpers({
  companyName: function(){
    var data = Session.get('profile_header');
    if(typeof data == 'undefined'){
      return '';
    }
    return data.c_name;
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
