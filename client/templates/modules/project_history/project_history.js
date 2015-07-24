/*
Author: Tanner Storment
Created: [07-16-2015]
Description: Project History List
Associated Files: project_history.html, project_history.less
*/

//This function should, once the page is rendered, set the session data "project_history_list" to an array of objects.
//These objects should contain data about the various companies this module is supposed to display.
Template.project_history.onRendered( function() {
  Session.set("project_history_list",
  [
    {
      project_name:"Internet.org",
      project_location:"Palo Alto, CA",
      project_start_date: "August 2013",
      project_end_date: "present",
      project_time_elapsed: "1 year & 9 months",
      project_position_name: "Founder"
    },
    {
      project_name:"Facebook, Inc.",
      project_location:"Menlo Park, CA",
      project_start_date: "February 2004",
      project_end_date: "present",
      project_time_elapsed: "12 years & 1 month",
      project_position_name: "Chief Executive Officer"
    },
    {
      project_name:"Wirehog",
      project_location:"Palo Alto, CA",
      project_start_date: "October 2004",
      project_end_date: "2006",
      project_time_elapsed: "1 year & 2 months",
      project_position_name: "Co-Founder"
    }
  ]);
});


var backgroundStyle = "white"; //Tracks the background color of the company tiles
Template.project_history.helpers (
  {
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
  })
