/*   Author: David Wibowo
**** Created: [09/30/2015]
**** Description: Exec profile header
**** Associated Files: e-p_header.html, e-p_header.less, e-p_header_logic.js
*/

Template.ep_head.onCreated(function(){
  this.autorun(function(){
    var data = Session.get('profile_header');
    if(typeof data == 'undefined'){
      return '';
    }
    data.compensation = PHcheck(data.compensation);
    Session.set('profile_header', data);
    resizetext('.p-head-top-name','.p-head-top-name-txt', '44px');
  })

  this.autorun(function(){
    //actual time of data coming in which is 5 hours and 15 mins
    var data = Session.get('profile_header');
    //date comparison
    if(typeof data != 'undefined'){
      //grab date
      var apiDate = data['o_last_updated'].split(' ')[0];
      var today = [new Date().getFullYear(),new Date().getMonth()+1,new Date().getDate()];
      //year month day
      apiDate = apiDate.split('-');
      var year = today[0] - Number(apiDate[0]);
      var month = today[1] - Number(apiDate[1]);
      var day = today[2] - Number(apiDate[2]);

      if(typeof lastUpdated == 'undefined'){
        //global scope
        lastUpdated = "test";
        if(day > 0){
          if(day == 1){
            lastUpdated = "Yesterday";
          }else{
            lastUpdated = day+" Days ago";
          }
        }else{
          lastUpdated = "Today";
        }
        if(month > 0){
          lastUpdated = month+" Months ago";
        }
        if(year > 0){
          lastUpdated = year+" Months ago";
        }
      }//end nested if
    }
  })
});

Template.ep_head.helpers({
  execInfo: function(){
    var data = Session.get('profile_header');
    if(typeof data == 'undefined'){
      return '';
    }
    data['o_last_updated'] = data['o_last_updated'].split(' ')[0];
    data['lastUpdated'] = lastUpdated;
    data['c_hq_location'] = data.c_hq_city + ", " + data.c_hq_state;
    data['e_name'] = data.o_first_name + " " + data.o_middle_initial + " " + data.o_last_name;
    Session.set('profile_header', data);
    return data;
  },

  compURL: function(){
    var data = Session.get('profile_header');
    if(typeof data == 'undefined'){
      return '';
    }
    return Router.path('content.companyprofile', {company_id: data.c_id});
  },
});

Template.ep_body.helpers({

  compensationInfo: function(){
    var data = Session.get('profile_header');
    if(typeof data == 'undefined'){
      return '';
    }
    var convString = data.compensation.o_compensation;
    convString.Salary = dNumberToCommaNumber(convString.Salary);
    convString.TotalComp = dNumberToCommaNumber(convString.TotalComp);
    convString.AllOtherLT = dNumberToCommaNumber(convString.AllOtherLT);
    return data;
  },

});

Template.ep_rdr.helpers({
  execInfo: function(){
    var data = Session.get('profile_header');
    if(typeof data == 'undefined'){
      return '';
    }
    return data;
  },

});
