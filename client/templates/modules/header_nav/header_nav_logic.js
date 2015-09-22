/* Author: Sri Sindhusha Kuchipudi
** Created: 09/18/2015
** Description: .js file for header_nav
** Associated Files: header_nav.html, header_nav.less, header_nav_logic.js
*/
/* On render Function for header file, this function will hide allthe drop downs and will change the background color of Research button*/
Template.header_nav.onRendered(function () {
$(".pgheader-nav_divtp_Resrch").css("background-color","#ffffff");
$(".pgheader-nav_divbtm_dropdown-meEX").hide();
$(".pgheader-nav_divbtm_dropdown-meST").hide();
$(".pgheader-nav_divbtm_dropdown-meIT").hide();
$(".pgheader-nav_divbtm_dropdown-meKT").hide();
$(".pgheader-nav_divbtm_dropdown-meDR").hide();
});
/* this is for on click events */
Template.header_nav.events({

  
    /*the color of the background will change for the coressponding button*/
    'click .pgheader-nav_divtp_Resrch': function()
    {
        $(".pgheader-nav_divtp_Resrch").css("background-color","#ffffff");
        $(".pgheader-nav_divtp_tplst").css("background-color","#f2f2f2");
        $(".pgheader-nav_divtp_sav").css("background-color","#f2f2f2");
        $(".pgheader-nav_divtp_Resrch_restxt").css("font-family","HN");
        $(".pgheader-nav_divtp_tplst_tptxt").css("font-family","HN-L");
        $(".pgheader-nav_divtp_sav_savetxt").css("font-family","HN-L");
    },
        /*the color of the background will change for the coressponding button*/
    'click .pgheader-nav_divtp_tplst': function()
    {
      $(".pgheader-nav_divtp_Resrch").css("background-color","#f2f2f2");
      $(".pgheader-nav_divtp_tplst").css("background-color","#ffffff");
      $(".pgheader-nav_divtp_sav").css("background-color","#f2f2f2");
      $(".pgheader-nav_divtp_Resrch_restxt").css("font-family","HN-L");
      $(".pgheader-nav_divtp_tplst_tptxt").css("font-family","HN");
      $(".pgheader-nav_divtp_sav_savetxt").css("font-family","HN-L");
    },
        /*the color of the background will change for the coressponding button*/
    'click .pgheader-nav_divtp_sav': function()
    {
      $(".pgheader-nav_divtp_Resrch").css("background-color","#f2f2f2");
      $(".pgheader-nav_divtp_tplst").css("background-color","#f2f2f2");
      $(".pgheader-nav_divtp_sav").css("background-color","#ffffff");
      $(".pgheader-nav_divtp_Resrch_restxt").css("font-family","HN-L");
      $(".pgheader-nav_divtp_tplst_tptxt").css("font-family","HN-L");
      $(".pgheader-nav_divtp_sav_savetxt").css("font-family","HN");
    },
    /* this function will show the dropdown list for Exchange type*/
    'click .pgheader-nav_divbtm_ddexc': function() {
      $('.dropdown-meEX').slideToggle();
      $('#ST').slideUp();
      $('#IT').slideUp();
      $('#KM').slideUp();
      $('#DR').slideUp();
    },
    /* this function will show the dropdown list for Sector type*/
    'click #Sector': function() {
      $('#ST').slideToggle();
      $('.dropdown-meEX').slideUp();
      $('#IT').slideUp();
      $('#KM').slideUp();
      $('#DR').slideUp();
    },
    /* this function will show the dropdown list for Industry type*/
    'click #Industry': function() {
      $('#ST').slideUp();
      $('.dropdown-meEX').slideUp();
      $('#IT').slideToggle();
      $('#KM').slideUp();
      $('#DR').slideUp();
    },
    /* this function will show the dropdown list for Key Metric*/
    'click #Key': function() {
      $('#ST').slideUp();
      $('.dropdown-meEX').slideUp();
      $('#IT').slideUp();
      $('#KM').slideToggle();
      $('#DR').slideUp();
    },
    /* this function will show the dropdown list for Date Range*/
    'click #Date': function() {
      $('#ST').slideUp();
      $('.dropdown-meEX').slideUp();
      $('#IT').slideUp();
      $('#KM').slideUp();
      $('#DR').slideToggle();
    }
  });
Template.header_nav.helpers({
  drpdwns: [
  { listname:"Sector", listtype:"Sector Type", listno:"ST", option1: "Sector Type1", option2: "Sector Type2", option3: "Sector Type3", option4: "Sector Type4"},
  { listname:"Industry", listtype:"Industry Type", listno:"IT", option1: "Industry Type1", option2: "Industry Type2", option3: "Industry Type3", option4: "Industry Type4"},
  { listname:"Key", listtype:"Key Metric", listno:"KM", option1: "Key Metric1", option2: "Key Metric2", option3: "Key Metric3", option4: "Key Metric4"},
  { listname:"Date", listtype:"Date Range", listno:"DR", option1: "Date Range1", option2: "Date Range2", option3: "Date Range3", option4: "Date Range4"},
]
});
