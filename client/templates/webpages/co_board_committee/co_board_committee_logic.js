/*
Author: jyothyswaroop
Created: 08/10/2015
Description: co_board_committee page
Associated Files: co_board_committee.less and co_board_committee.html
*/
var counter=0;
Template.co_board_committee.onCreated(function(){
  Session.set('board_count', 0);
});
//renders the data when page loads
Template.co_board_committee.onRendered(function(){
  this.autorun(function(){
    var bio = Session.get('officer_bio_updated');
    if ( bio && bio.length > 0 ) {
      Tracker.afterFlush(function(){
        addCustomScroller('co_commi-m_c-dp');
      });
    }
  });
});

var backgroundStyle="tilewhite";
Template.co_board_committee.helpers({
  //Helper to return to company profile page
  backToComp: function(){
    var params = Router.current().getParams();

    return Router.pick_path('content.companyprofile', {
      company_id: params.company_id,
      name: params.name,
      ticker: params.ticker
    });
  },

  backProfile: function(){
    var params = Router.current().getParams();
    var company = params.name;
    company = company.replace(/-/g, ' ');
    return company;
  },

  image: function(){
    var data = Session.get('profile_header');
    if(typeof data == 'undefined'){
      return '';
    }
    return data.c_logo;
  },
//gave names for dyamic access {{getheadername}}
  getheadername1: function(){
    var data = Session.get('profile_header');
    if(typeof data == 'undefined'){
      return '';
    }
    return data.c_name;
  },

  location: function(){
    var data = Session.get('profile_header');
    if(typeof data == 'undefined'){
      return '';
    }
    var loc = data.c_hq_city + ", " + data.c_hq_state;
    return loc;
  },

  officerList: function(){
    var list = Session.get('officers');
    var image = Session.get('profile_header');
    if(typeof list == 'undefined'){
      return '';
    }
    $.map(list,function(data, index){
      //data.o_last_updated = moment(data.o_last_updated).format("dddd, MMM. DD, YYYY");
      data.o_last_updated = globalDateFormat(data.o_last_updated,'dayOfWeek');

      if(typeof data['compensation'] == 'undefined'){
        data['compensation'] = {};
      }else{
        if(typeof data['compensation'].TotalComp == 'undefined'){
          data['compen'] = 0;
        }else{
          data['compen'] = dNumberToCommaNumber(data['compensation'].TotalComp);
        }
      }
      data['image'] = image.c_logo;

      data['comp_url'] = Router.pick_path('content.locationprofile',{
        loc_id: image.c_hq_state,
        city: image.c_hq_city
      });
      data['url'] = Router.pick_path('content.executiveprofile',{
        fname:data.o_first_name,
        lname:data.o_last_name,
        ticker:Router.current().getParams().ticker,
        exec_id: data.o_id
      });
    });
    return list;
  },

  officer: function(){
    var list = Session.get('officers');
    var count = Session.get('board_count');
    var image = Session.get('profile_header');
    if(typeof list == 'undefined'){
      return '';
    }
    list[count]['image'] = image.c_logo;
    // list[count].o_last_updated = moment(list[count].o_last_updated).format("dddd, MMM. DD, YYYY");
    list[count].o_last_updated = globalDateFormat(list[count].o_last_updated,'dayOfWeek');

    list[count]['url'] = Router.pick_path('content.executiveprofile',{
      fname:list[count].o_first_name,
      lname:list[count].o_last_name,
      ticker:Router.current().getParams().ticker,
      exec_id: list[count].o_id
    });
    Session.set('officer_bio_updated', list[count].o_bio);
    return list[count];
  },

  //This function is called everytime "each" loop runs, it returns the respective class which is suppose to use on each iteration
  getBackgroundStyle: function() {

    if (backgroundStyle === "tilegrey")
    {
      backgroundStyle="tilewhite";
      return backgroundStyle;
    } else {
      backgroundStyle = "tilegrey";
      return backgroundStyle;
    }
  }
});

Template.co_board_committee.events({
  'click .co_commi-lefthov': function(){
    var counter = Session.get("board_count");
    var board = Session.get('officers');
    if(counter > 0){
      counter--;
      Session.set("board_count",counter);
    }
    else
    {
      counter = board.length-1;
      Session.set("board_count", counter);
    }
  },
  'click .co_commi-righthov': function(){
    var counter = Session.get("board_count");
    var board = Session.get('officers');
    if(counter < board.length - 1)
    {
      counter++;
      Session.set("board_count",counter);
    }
    else
    {
      counter = 0;
      Session.set("board_count", counter);
    }
  },
  'click .co_commi-x': function(){
    document.getElementById("co_commi-wl").style.display = "none";
    document.getElementById("co_commi-wrapper").style.top = "43px";
  },
});
