/*
Author: Tanner Storment
Created: [07-16-2015]
Description: Project History List
Associated Files: project_history.html, project_history.less
*/

//This function should, once the page is rendered, set the session data "project_history_list" to an array of objects.
//These objects should contain data about the various companies this module is supposed to display.

Template.project_history.onCreated( function() {
  this.autorun(function(){
    //take all the data and put all the usable ones into a new array of useable content
    var data = Session.get('work_history');
    //console.log("Initial Data", data);
    if(typeof data != 'undefined'){
      var companies = data.companies;
      if(typeof companies != 'undefined'){
        var projArray = [];
        for (id in companies){
          var compList = companies[id];
          var comp = {};
          comp['location'] = compList['company_data'].c_hq_city + ", " + compList['company_data'].c_hq_state;
          comp['c_name'] = compList['company_data'].c_name;
          comp['c_ticker'] = compList['company_data'].c_ticker;
          comp['c_id'] = compList['company_data'].c_id;
          comp['exec_nearest_pos'] = compList['officer_positions'][0];
          comp['connections'] = compList['connections'];
          comp['o_id'] = data['officer_data'].o_id;
          comp['c_logo'] = compList.company_data.c_logo;
          projArray.push(comp);
        }
        Session.set('new_project_history', projArray);
        //SetprojList();
      }else{
        Session.set('new_project_history', '');
        return '';
      }
    }
  }),

  this.autorun(function(){
    var data = Session.get('new_project_history');
    var x = 0;
    if(typeof data != "undefined")
    {
      for(x;x<data.length;x++)//forloop iterates through each object returned by Session.get
      {//each object returned by session.get represents a single project
        var startmonth = data[x]['exec_nearest_pos']['start_month'];
        var startyear = data[x]['exec_nearest_pos']['start_year']*12;//coverts years to months
        data[x]["iteration"] = x;//to keep track of which project it loops through
        data[x]['title'] = data[x]['exec_nearest_pos']['Title'];
        data[x]['start_month'] = calendar_Months[startmonth-1];
        data[x]['start_year'] = startyear/12;
        if(typeof data[x]['exec_nearest_pos']['end_year'] != 'undefined')
        {//if undefined then current project else old project
          var endmonth = data[x]['exec_nearest_pos']['end_month'];
          var endyear = data[x]['exec_nearest_pos']['end_year']*12;
          data[x]['end_date'] = endyear.toString()/12;
          var monthsDiff = endyear+endmonth - startyear-startmonth;
          var yearsDiff = Math.floor(monthsDiff/12);

          if(yearsDiff == 0)//checks to see if length is shorter than year
          {
            data[x]['project_time_elapsed'] = monthsDiff.toString() + " month";
            if(monthsDiff>1)
            {
              data[x]['project_time_elapsed'] = data[x]['project_time_elapsed']+"s";
            }

          }
          else{
            monthsDiff = monthsDiff - yearsDiff*12;
            data[x]['project_time_elapsed'] = (yearsDiff).toString()+" years & " + (monthsDiff).toString() + " month";
            if(monthsDiff>1)
            {
              data[x]['project_time_elapsed'] = data[x]['project_time_elapsed']+"s";
            }
          }

        }
        else{
          var date = new Date();
          var currentMonth = date.getMonth()+1;//getMonth returns months labeled as 0,1,...,11. Must add 1 to compensate
          var currentYear = (date.getYear()+1900)*12;//getYear returns years since 1900, must add 1900 to compensate
          var monthsDiff = currentYear+currentMonth - startyear-startmonth;
          var yearsDiff = Math.floor(monthsDiff/12);
          monthsDiff = monthsDiff - yearsDiff*12;
          data[x]['end_date'] = "Present";
          data[x]['project_time_elapsed'] = (yearsDiff).toString()+" years & " + (monthsDiff).toString() + " month";
          if(monthsDiff>1)
          {
            data[x]['project_time_elapsed'] = data[x]['project_time_elapsed']+"s";
          }
        }

      }
      //The code below creates multiple sub-arrays of length 3, stores the sub-arrays in a larger array
      //and save the larger array as a Session variable
      var rows = Math.floor(data.length/3);
      var columns = data[0].length;
      var i = -1;
      var array = [rows];
      array[0]=[]
      for(x=0;x<data.length;x++)
      {
        if(x%3 == 0)
        {
          i++;
          array[i] = []
        }
        array[i].push(data[x]);
      }

      var text = $(".proj_hist-page-selector-selected").text();
      Session.set("ProjList", array);
      Session.set("ListPage", array[0]);
      //return Session.get("ProjList")[parseInt(text)-1];
    }

    //alert("here");
    //return data;
  })

});

Handlebars.registerHelper("isEven", function(val){
  return val%2;
})

var calendar_Months = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'June',
  'July',
  'Aug',
  'Sept',
  'Oct',
  'Nov',
  'Dec'
];

var backgroundStyle = "white"; //Tracks the background color of the company tiles

function resetPage(){
  Session.set("ListPage",[]);
  alert("yo");
};



Template.project_history.events({
  'click .proj_hist-featured-image': function (e, t) {
    var routename = Router.current().route.getName();

    Router.go("/executive/"+e.target.id);
  },

  'click .proj_hist-page-selector':function(e,t){//Updates list when switching between pages
    delete Session.keys["ListPage"];
    backgroundStyle = "white";
    Session.set('new_project_history',Session.get('new_project_history'));
    $(".proj_hist-page-selector-selected").addClass("proj_hist-page-selector-font");
    $(".proj_hist-page-selector-selected").removeClass("proj_hist-page-selector-selected-font");
    $(".proj_hist-page-selector-selected").removeClass("proj_hist-page-selector-selected");

    $(e.target).removeClass("proj_hist-page-selector-font");
    $(e.target).addClass("proj_hist-page-selector-selected proj_hist-page-selector-selected-font");
    var backgroundStyle = "grey";
    Session.set("ListPage", Session.get("ProjList")[parseInt($(".proj_hist-page-selector-selected").text())-1]);
  }
});
Template.project_history.helpers (
  {

    setPages: function(){//sets the number of pages that are needed to few whole work history
      var list = Session.get("ProjList");
      var array = [];
      for(var x = 1; x<=list.length; x++)
      {
        array.push(x);
      }
      return array;
    },

    connections: function(){
      var data = Session.get('new_project_history');
      var index = this["iteration"];//gets element "iteration" from array returned by projList (see function below)
      return data[index]['connections'];//index makes sures the connections list belongs to the particular company

    },
    firstName: function(){
      var exec = Session.get('profile_header');
      return exec['o_first_name'];

    },

    lastName: function(){
      var exec = Session.get('profile_header');
      return exec['o_last_name'];
    },

    moduleCheck: function(){
      var check = Session.get('work_history');
      if(typeof check == 'undefined'){
        return '';
      }
      return check;
    },

    projList: function(){
      backgroundStyle = "white";
      return Session.get("ListPage");
    },

//Function returns list of all projects worked by the current executive


    //getProjectList returns the structure in Session.get("project_history_list")
    //The project_history.html file is expecting an array of objects containing data about the various projects/companies.
    getProjectList: function() {
      var data = Session.get("project_history_list");
      return data;
    },
    //getBackgroundStyle checks what the last tile's background color was and then returns the next color in the sequence.
    getBackgroundStyle: function() {
      if (backgroundStyle === "grey")
      {
        backgroundStyle="white";
        return backgroundStyle;
      } else {
        backgroundStyle = "grey";
        return backgroundStyle;
      }
    }
  });
