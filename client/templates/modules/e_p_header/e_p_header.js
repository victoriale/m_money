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
      data['last_updated'] = (new Date(data['o_last_updated'])).toSNTFormTime();
      lastUpdated = data['o_last_updated'];
    }
  })
});

Template.ep_head.helpers({
  execInfo: function(){
    var data = Session.get('profile_header');
    if(typeof data == 'undefined'){
      return '';
    }
    console.log(data);
    data['locurl'] = Router.pick_path('content.locationprofile',{
      loc_id:data.c_hq_state,
      city:data.c_hq_city
    });
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
    return Router.pick_path('content.companyprofile', {company_id: data.c_id, name: compUrlName(data.c_name), ticker: data.c_ticker});
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
