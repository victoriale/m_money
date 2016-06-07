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
  });

  this.autorun(function(){
    //actual time of data coming in which is 5 hours and 15 mins
    var data = Session.get('profile_header');
    //date comparison
    if(typeof data != 'undefined'){
      //grab date
      data['last_updated'] = (new Date(data['o_last_updated'])).toSNTFormTime();
      lastUpdated = data['o_last_updated'];
    }
  });
});

Template.ep_head.onRendered(function() {  
  this.autorun(function(){    
    var bioText = Session.get('ep_head_o_bio');
    if ( bioText !== undefined && bioText.length > 0 ) {
      addCustomScroller('p-head-bottom-text');
    }
  });
});

Template.ep_head.helpers({
  execInfo: function(){
    var data = Session.get('profile_header');
    if(typeof data == 'undefined'){
      return '';
    }
    data['locurl'] = Router.pick_path('content.locationprofile',{
      loc_id:data.c_hq_state,
      city:data.c_hq_city
    });
    data['o_last_updated'] = (new Date(data.o_last_updated)).toSNTForm();
    data['last_updated'] = lastUpdated;
    data['c_hq_location'] = data.c_hq_city + ", " + data.c_hq_state;
    data['e_name'] = data.o_first_name + " " + data.o_middle_initial + " " + data.o_last_name;
    // data['mrURL'] = Router.pick_path('content.executiveprofile',
    //   {
    //     fname: data.o_first_name,
    //     lname: data.o_last_name,
    //     ticker: companies[i].c_ticker,
    //     exec_id: companies[i].o_id
    //   });
    data['compURL'] = Router.pick_path('content.companyprofile',{
      ticker:data.c_ticker,
      name:compUrlName(data.c_name),
      company_id:data.c_id
    });

    var companies = Session.get('company_profiles');

    if ( typeof companies == "object" && companies.length > 1 ) {
      var cmp_data = {companies: []};
      var count = 0;
      for ( var i = 0; i < companies.length; i++ ) {
        if ( companies[i].c_id != data.c_id ) {
          cmp_data.companies[cmp_data.companies.length] = {
            c_text: companies[i].c_name + ' (' + companies[i].c_name + ')',
            c_url: Router.pick_path('content.executiveprofile',{fname: data.o_first_name, lname: data.o_last_name, ticker: companies[i].c_ticker, exec_id: companies[i].o_id})
          };
          if ( count > 0 ) {
            cmp_data.companies[cmp_data.companies.length - 1].notFirst = true;
          }
          count++;
        }
      }
      data.cmp_data = cmp_data;
    }
    Session.set('profile_header', data);
    Session.set('ep_head_o_bio', data.o_bio);
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
    data['compURL'] = Router.pick_path('content.companyprofile',{
      ticker:data.c_ticker,
      name:compUrlName(data.c_name),
      company_id:data.c_id
    });
    var convString = data.compensation.o_compensation;
    convString.Salary = dNumberToCommaNumber(convString.Salary);
    convString.TotalComp = dNumberToCommaNumber(convString.TotalComp);
    convString.AllOtherLT = dNumberToCommaNumber(convString.AllOtherLT);

    if (convString.Salary == 0) {
      convString.Salary = "N/A";
    }else {
      convString.Salary = '$' + convString.Salary;
    }

    if (convString.TotalComp == 0) {
      convString.TotalComp = "N/A";
    }else {
      convString.TotalComp = '$' + convString.TotalComp;
    }

    if (convString.AllOtherLT == 0) {
      convString.AllOtherLT = "N/A";
    }else{
      convString.AllOtherLT = '$' + convString.AllOtherLT;
    }

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

Template.ep_head.events({
  'click .p-head-top-container-location .fa-chevron-down': function() {
    $('.p-head-top-container-location').addClass('active');
    setTimeout(function () {
      $('html').bind('click',function(){
        $('.p-head-top-container-location').removeClass('active');
        $('html').unbind('click');
      })
    }, 0);
  }
})
