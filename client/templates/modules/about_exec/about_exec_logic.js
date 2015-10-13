/* Author: Ryan Fisher
** Created: 07/17/2015
** Description: .js file for About Exec Page
** Associated Files: about_exec.html, about_exec.less, about_exec_logic.js
*/

Template.about_exec.onRendered(function(){

  this.autorun(function(){
    var data = Session.get('college_rivals');
    var exec_id = Session.get('exec_id');

    if(typeof exec_id == 'undefined' || typeof data == 'undefined' || typeof data['officer'] == 'undefined'){
      return '';
    }
    var RivalArray = [];
    //set the officer id of the current page
    data['officer']['e_id'] = exec_id;

    //push all data returned into a list array to be used for the module
    RivalArray.push(data['officer']);
    $.map(data.rivals, function(data, index){
      data['e_id'] = index;
      RivalArray.push(data);
    });
    //console.log("RIVAL ARRAY DONE!",RivalArray);
    Session.set('about_exec', RivalArray);
  });

});
