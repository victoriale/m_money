/* Author: Sri Sindhusha Kuchipudi
** Created: 09/18/2015
** Description: .js file for header_nav
** Associated Files: header_nav.html, header_nav.less, header_nav_logic.js
*/

function GetSuggest(nowTime) {
  var searchString = $('.layout_nav-search_input')[0].value;
  if ( searchString == "" ) {
    $('.header_search_recommendations').removeClass('active');
  } else {
    Meteor.call('GetSuggestion',encodeURIComponent(searchString),nowTime,function(error, data){
      if ( error ) {
        console.log('Suggestion Error',error);
        return false;
      }

      if ( Session.get('SuggestTime') > data.time ) {
        return false;
      }

      Session.set('SuggestTime',data.time);
      data = data.data;

      var suggestions = sortSuggestions(data, $('.layout_nav-search_input')[0].value);

      var HTMLString = '<div class="caret-top"></div>';
      for ( var index = 0; index < suggestions.length; index++ ) {
        if ( index != 0 ) {
          HTMLString = HTMLString + '<div class="border-li"></div>';
        }
        HTMLString = HTMLString + '<a style="color: #000" href="' + suggestions[index].url + '"><div class="header_search_recommendations_item">' + suggestions[index].string + '</div></a>';
      }

      if ( data['name']['func_success'] == false && data['location']['func_success'] == false && data['ticker']['func_success'] == false) {
        $('.header_search_recommendations').removeClass('active');
        return false;
      }

      //  $('.fi_search_recommendations')[0].innerHTML = '<div class="caret-top"></div>' /*' <i class="fa fa-times fi_search_recommendations_close"></i>'*/ + HTMLStringTick + HTMLStringName + HTMLStringLoc;
      $('.header_search_recommendations').html(HTMLString);
      $('.header_search_recommendations').addClass('active');
    });
  }
}

/* On render Function for header file, this function will hide allthe drop downs and will change the background color of Research button*/
Template.header_nav.onRendered(function () {
  $(".pgheader-nav_divtp_Resrch").css("background-color","#ffffff");
  $(".pgheader-nav_divbtm_dropdown-meEX").hide();
  $(".pgheader-nav_divbtm_dropdown-meST").hide();
  $(".pgheader-nav_divbtm_dropdown-meIT").hide();
  $(".pgheader-nav_divbtm_dropdown-meKT").hide();
  $(".pgheader-nav_divbtm_dropdown-meDR").hide();
  String_facebook ="https://www.facebook.com/sharer/sharer.php?u="+ URL;
  $(".facebook-link").attr("href", String_facebook);
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
      event.stopPropagation();
      $('.dropdown-meEX').slideToggle();
      $('#ST').slideUp();
      $('#IT').slideUp();
      $('#KM').slideUp();
      $('#DR').slideUp();
    },
    /* this function will show the dropdown list for Sector type*/
    'click #Sector': function() {
      event.stopPropagation();
      $('#ST').slideToggle();
      $('.dropdown-meEX').slideUp();
      $('#IT').slideUp();
      $('#KM').slideUp();
      $('#DR').slideUp();
    },
    /* this function will show the dropdown list for Industry type*/
    'click #Industry': function() {
      event.stopPropagation();
      $('#IT').slideToggle();
      $('#ST').slideUp();
      $('.dropdown-meEX').slideUp();
      $('#KM').slideUp();
      $('#DR').slideUp();
    },
    /* this function will show the dropdown list for Key Metric*/
    'click #Key': function() {
      event.stopPropagation();
      $('#KM').slideToggle();
      $('#ST').slideUp();
      $('.dropdown-meEX').slideUp();
      $('#IT').slideUp();
      $('#DR').slideUp();
    },
    /* this function will show the dropdown list for Date Range*/
    'click #Date': function() {
      event.stopPropagation();
      $('#DR').slideToggle();
      $('#ST').slideUp();
      $('.dropdown-meEX').slideUp();
      $('#IT').slideUp();
      $('#KM').slideUp();
    },
    /* this function envokes client/layouts/finance/finance_search.js */
    'keyup .layout_nav-search_input': function(event){
      if ( $('.layout_nav-search_input')[0].value == '' || $('.layout_nav-search_input')[0].value == undefined ) {
        $('.header_search_recommendations').removeClass('active');
      }
      if( event.which === 13){
        event.preventDefault();
        Finance_Search($('.layout_nav-search_input')[0].value);
        $('.header_search_recommendations').removeClass('active');
        return "";
      }
      if ( typeof StartTime == "undefined" ) {
        StartTime = 0;
      }
      var d = new Date();
      d = d.getTime();
      curTime = d;
      if ( d - StartTime < 250 ) {
        setTimeout(function(curTime){GetSuggest(curTime);},250,curTime);
        return "";
      }
      StartTime = d;
      GetSuggest(curTime);
    },
    'click .header_search_recommendations': function(){
      $('.header_search_recommendations').removeClass('active');
      $('.layout_nav-search_input')[0].value = "";
    },
    'click body': function(){
      console.log('THIS');
      $('.header_search_recommendations').removeClass('active');
    },
    'focus .layout_nav-search_input': function(){
      if($('.layout_nav-search_input')[0].value == '' || $('.layout_nav-search_input')[0].value == ' ' || $('.layout_nav-search_input')[0].value == undefined){
        return false;
      }else{
        $('.header_search_recommendations').addClass('active');
      }
    }
  });

Template.header_nav.helpers({
  homepage:function(){
    return Session.get('IsHome');
  },
  drpdwns: [
    { listname:"Sector", listtype:"Sector Type", listno:"ST", option1: "Sector Type1", option2: "Sector Type2", option3: "Sector Type3", option4: "Sector Type4"},
    { listname:"Industry", listtype:"Industry Type", listno:"IT", option1: "Industry Type1", option2: "Industry Type2", option3: "Industry Type3", option4: "Industry Type4"},
    { listname:"Key", listtype:"Key Metric", listno:"KM", option1: "Key Metric1", option2: "Key Metric2", option3: "Key Metric3", option4: "Key Metric4"},
    { listname:"Date", listtype:"Date Range", listno:"DR", option1: "Date Range1", option2: "Date Range2", option3: "Date Range3", option4: "Date Range4"},
  ],
  notPartner: function() {
    if ( typeof Router.current().params.partner_id != "undefined" ) {
      return false;
    }
    return true;
  }
});
//To hide the dropdown menu when clicked on body of the page
$(document).click( function(){
  $('#ST').slideUp();
  $('.dropdown-meEX').slideUp();
  $('#IT').slideUp();
  $('#KM').slideUp();
  $('#DR').slideUp();
});
