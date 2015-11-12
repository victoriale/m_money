/*Author: Sri Sindhusha Kuchipudi
  Created: 10/18/2015
  Description: .less file for quarterly_ECF webpage
  Associated Files: quarterly_ECF.html, quarterly_ECF.less, quarterly_ECF.js
*/

// to copy the data from url into session variable
Template.quarterly_ECF.onCreated(function(){
  this.autorun(function(){
  var urlArray = $(location).attr('href').split("/");
  Meteor.http.get('http://apifin.investkit.com/call_controller.php?action=company_profile&option=indie&call=earnings&param='+urlArray[3],
    function(error, data){
    Session.set("quarterly_E",data);
  });
  sortQuaData();
  Meteor.http.get('http://apifin.investkit.com/call_controller.php?action=company_page&option=income_statement&param=' + urlArray[urlArray.length - 1],
  function(error, data){
    Session.set("annual_E",data);
  });
    quarterlygraph();
});
});

// to sort the in form of income and cash and balance data
function sortQuaData(){
  var unsorted_data = Session.get("quarterly_E");
  if(unsorted_data != undefined){
    var earn = unsorted_data.data.earnings;
    var Obj = {"income" : [], "balance": [], "cash": []};
    var incCount = 0, balCount = 0, cashCount = 0;
    for(var i = 0; i < earn.length; i++){
      if(earn[i].e_report_title.substr(5,1) == "Q"){
        if(earn[i].e_report_title.substr(8) == "Income Statement"){
          Obj.income[incCount] = {};
          Obj.income[incCount]["title"] = earn[i]["e_report_title"];
          Obj.income[incCount]["data"] = earn[i]["e_report_data"];
          incCount++;
        }
        else if(earn[i].e_report_title.substr(8) == "Balance Sheet"){
          Obj.balance[balCount] = {};
          Obj.balance[balCount]["title"] = earn[i]["e_report_title"];
          Obj.balance[balCount]["data"] = earn[i]["e_report_data"];
          balCount++;
        }
        else if(earn[i].e_report_title.substr(8) == "Cash Flow Statement"){
          Obj.cash[cashCount] = {};
          Obj.cash[cashCount]["title"] = earn[i]["e_report_title"];
          Obj.cash[cashCount]["data"] = earn[i]["e_report_data"];
          cashCount++;
        }
      }
    }
    Session.set("sorted_quarterly_E", Obj);
  }
}

Template.quarterly_ECF.onRendered(function(){
  sortQuaData();
  quarterlygraph();
})


// helpers to display data
Template.quarterly_ECF.helpers({
  //to get company name
  cname:function(){
    var data = Session.get('annual_E');
    if(typeof data == "undefined")
    {
      return '';
    }
    var name = data.data.income_statement.company_info.c_name;
    return name;
  },
  //to get location
  loc: function(){
    var data = Session.get('annual_E');
    var city = data['data']['income_statement']['company_info']['c_hq_city'];
    city = city.replace(/\w\S*/g, function(txt) {
        return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });
    var state = data['data']['income_statement']['company_info']['c_hq_state'];
    return city + ", " + state;
  },
  //to get the Annual or Quarterly title
    title: function(){
    var data = Session.get('sorted_quarterly_E');
    if(data == undefined){
      return '';
    }
    return data.cash[0].title.substr(0,7);
  },
  //to get the date in mm/dd/yyy at hh:mm format
  getdate:function(UNIX_timestamp){
    var data = Session.get('annual_E');
    if(typeof data == "undefined")
    {
      return '';
    }
    var inputDate = data.data.income_statement.company_info.c_tr_last_updated;
    var a = new Date(inputDate);
    var year = a.getFullYear();
    var month = a.getMonth()+1;
    var date = a.getDate();
    var hour = a.getHours();
    var min = a.getMinutes();
    var sec = a.getSeconds();
    var time = ((month.toString().length===1)?('0'+month):month) + '/' + ((date.toString().length===1)?('0'+date):date) + '/' + year+ ' '+'at'+ ' ' + ((hour>12)?(hour-12):hour) + ':' + ((min.toString().length===1)?('0'+min):min) +' '+ ((hour>12)?('pm'):'am') ;
    return time;
  },

// to display finance amount in legend
  financ: function() {
    var data = Session.get('sorted_quarterly_E');
    if(data == undefined){
      return '';
    }
    for(var i = 0; i < data.cash[0].data.length; i++){
      if(data.cash[0].data[i].coa_title == "Cash from Financing Activities"){
        var cash = parseFloat(data.cash[0].data[i].coa_data);
      }
    }
    if(cash > 1000 || cash< -1000)
    {
      cash /= 1000;
      return "$" + cash.toFixed(2) + " Billion";
    }
    return "$" + cash + " Million";
  },
// to display operating amount in legend
  operate: function() {
    var data = Session.get('sorted_quarterly_E');
    if(data == undefined){
      return '';
    }
    for(var i = 0; i < data.cash[0].data.length; i++){
      if(data.cash[0].data[i].coa_title == "Cash from Operating Activities"){
        var cash = parseFloat(data.cash[0].data[i].coa_data);
      }
    }
  if(cash > 1000 || cash< -1000)
    {
      cash /= 1000;
      return "$" + cash.toFixed(2) + " Billion";
    }
    return "$" + cash + " Million";
  },
// to display investigating amount in legend
  investg: function(){
    var data = Session.get('sorted_quarterly_E');
    if(data == undefined){
      return '';
    }
    for(var i = 0; i < data.cash[0].data.length; i++){
      if(data.cash[0].data[i].coa_title == "Cash from Investing Activities"){
        var cash = parseFloat(data.cash[0].data[i].coa_data);
      }
    }
      if(cash > 1000 || cash< -1000)
    {
      cash /= 1000;
      return "$" + cash.toFixed(2) + " Billion";
    }
    return "$" + cash + " Million";
  },
  yr: function(){
    var data = Session.get('sorted_quarterly_E');
    if(data == undefined){
      return '';
    }
    returnArray = [];
    for(var i = 0; i < data.cash.length; i++){
      returnArray[i] = {};
      if(i == 0){
        returnArray[i].style = "font-family:HN-B";
      }
      else if(i == data.cash.length - 1){
        returnArray[i].style = "margin-right:0px";
      }
      else{
        returnArray[i].style = "";
      }

      returnArray[i].lbl = data.cash[i].title.substr(5,2) + " - " + data.cash[i].title.substr(0,4);
    }
    return returnArray;
  },
// to display year
  fyr: function(){
    var data = Session.get('sorted_quarterly_E');
    if(data == undefined){
      return '';
    }
    return data.cash[0].title.substr(5,2) + " - " + data.cash[0].title.substr(0,4)
  },


    //to return the data in the bottom part
    data: function(){
      var data = Session.get('sorted_quarterly_E');
      if(data == undefined){
        return '';
      }
      //to set the border of the tile
      var borderArray = ["d","d","d","d","d","s","d","d","s","d","d","d","d","s","d","s","d","d","e"];
      // var first = data['data']['earnings']['1']['e_report_data'];
      // var second = data['data']['earnings']['4']['e_report_data'];
      // var third = data['data']['earnings']['11']['e_report_data'];
      // var fourth = data['data']['earnings']['14']['e_report_data'];
      quarray = [];
      for(var i = 0; i < data.cash[0].data.length; i++){
        quarray[i] = {};
        quarray[i]['metric'] = data.cash[0].data[i].coa_title;
        //to set the initial styles
        quarray[i]['style1'] = "font-family:HN-B;";
        quarray[i]['style2'] = "";
        quarray[i]['style3'] = "";
        quarray[i]['style4'] = "";

        //to get the numbers in each Quarter and trim it to display only two zeros at the end
        quarray[i]['amnt1'] = data.cash[0].data[i].coa_data;
        //If no number for a quarter then set it to -
        if(quarray[i]['amnt1'] == undefined){
          quarray[i]['amnt1'] = "-";
        }
        //If the number is negative, then set the color to red
        else if(parseInt(quarray[i]['amnt1']) != NaN){
          quarray[i]['amnt1'] = parseFloat(quarray[i]['amnt1']).toFixed(2);
          if(parseInt(quarray[i]['amnt1']) < 0){
            quarray[i]['style1'] += "color:#ca1010;";
          }
        }
        quarray[i]['amnt2'] = data.cash[1].data[i].coa_data;
        if(quarray[i]['amnt2'] == undefined){
          quarray[i]['amnt2'] = "-";
        }
        else if(parseInt(quarray[i]['amnt2']) != NaN){
            quarray[i]['amnt2'] = parseFloat(quarray[i]['amnt2']).toFixed(2);
          if(parseInt(quarray[i]['amnt2']) < 0){
            quarray[i]['style2'] += "color:#ca1010;";
          }
        }
        quarray[i]['amnt3'] = data.cash[2].data[i].coa_data;
        if(quarray[i]['amnt3'] == undefined){
          quarray[i]['amnt3'] = "-";
        }
        else if(parseInt(quarray[i]['amnt3']) != NaN){
            quarray[i]['amnt3'] = parseFloat(quarray[i]['amnt3']).toFixed(2);
          if(parseInt(quarray[i]['amnt3']) < 0){
            quarray[i]['style3'] += "color:#ca1010;";
          }
        }
        quarray[i]['amnt4'] = data.cash[3].data[i].coa_data;
        if(quarray[i]['amnt4'] == undefined){
          quarray[i]['amnt4'] = "-";
        }
        else if(parseInt(quarray[i]['amnt4']) != NaN){
            quarray[i]['amnt4'] = parseFloat(quarray[i]['amnt4']).toFixed(2);
          if(parseInt(quarray[i]['amnt4']) < 0){
            quarray[i]['style4'] += "color:#ca1010;";
          }
        }
      //To change the border
        switch(borderArray[i]){
          case 'd':
            quarray[i]['border'] = "dashed";
            break;
          case 's':
            quarray[i]['border'] = "solid";
            break;
          case 'e':
            quarray[i]['border'] = "end";
            break;
        }

        //To change the color of the tile
        if(i%2 == 0){
          quarray[i]['getcolor'] = 'white';
        }
        else{
          quarray[i]['getcolor'] = 'grey';
        }
      }

      return quarray;
    },
});
// to display the highchart
function operating() {
  var data = Session.get('sorted_quarterly_E');
  if(data == undefined){
    return '';
  }
  var target = data.cash[0].data[0].coa_data;
  var out = [];
  var arrayIndex = 0;
  for(var i = 4; i >= 0; i--){
    for(var j = 0; j < data.cash[i].data.length; j++){
      if(data.cash[i].data[j].coa_title == "Cash from Operating Activities"){
        out[arrayIndex] = parseFloat(data.cash[i].data[j].coa_data);
      }
    }
    arrayIndex++;
  }
  return out;
}

function financial() {
  var data = Session.get('sorted_quarterly_E');
  if(data == undefined){
    return '';
  }
  var target = data.cash[0].data[0].coa_data;
  var out = [];
  var arrayIndex = 0;
  for(var i = 4; i >= 0; i--){
    for(var j = 0; j < data.cash[i].data.length; j++){
      if(data.cash[i].data[j].coa_title == "Cash from Financing Activities"){
        out[arrayIndex] = parseFloat(data.cash[i].data[j].coa_data);
      }
    }
    arrayIndex++;
  }
  return out;
}
// to display data in graph
function Investing() {
  var data = Session.get('sorted_quarterly_E');
  if(data == undefined){
    return '';
  }
  var target = data.cash[0].data[0].coa_data;
  var out = [];
  var arrayIndex = 0;
  for(var i = 4; i >= 0; i--){
    for(var j = 0; j < data.cash[i].data.length; j++){
      if(data.cash[i].data[j].coa_title == "Cash from Investing Activities"){
        out[arrayIndex] = parseFloat(data.cash[i].data[j].coa_data);
      }
    }
    arrayIndex++;
  }
  return out;
}
// to display x-axis variables
function axisLabels(){
  var out = [];
  var data = Session.get('sorted_quarterly_E');
  if(data == undefined){
    return '';
  }
  for(var i=0; i < data.cash.length; i++){
    out[i] = data.cash[i].title.substr(5,2) + " - " + data.cash[i].title.substr(0,4);
  }
  return out;
}

function quarterlygraph() {
  var invest = Investing();
  var oper = operating();
  var fin = financial();
  var labels = axisLabels();

    $('#quarterly').highcharts({
      chart: {
      type: 'spline',
      width: 650,
      height: 197,
    },

    credits: {
      enabled: false
    },

    exporting: {
      enabled: false
    },

    title: {
      text: ''
    },

    xAxis:{
      categories: labels,
    },
    plotOptions: {
        series: {
          allowPointSelect: true,
            marker: {
              enabled: false
            }
        }
    },
    yAxis:{
      opposite:true,
      title: "In Millions of USD",
      labels:{
        style: {
          fontSize: '13px',
          fontFamily: 'HN-L',
          color:'#666666'
        }
      }
    },
    scrollbar: {
      enabled:false
    },

    legend: {
      enabled: 'false'
    },
    marker: {
      enabled: false
    },

    series: [{
      name: 'Operating Income',
      data: oper,
      type: 'spline',
      color: '#3098FF',
      marker: {
           symbol: "circle"
       },
      showInLegend: false
    }, {
      name: 'Investing',
      data:invest,
      type: 'spline',
      color: '#F7701D',
      marker: {
           symbol: "circle"
       },
      showInLegend: false
    }, {
      name: 'Financing',
      data: fin,
      type: 'spline',
      color: '#CA1010',
      marker: {
           symbol: "circle"
       },
      showInLegend: false
    }]
  });
}

//to display the graph and highlight the Q2 quarter on rendering
Template.quarterly_ECF.onRendered( function() {

      $("#Qt2").css("font-family","HN-B");
});
//events to change the sub menu buttons
Template.quarterly_ECF.events({
  'click #cir1': function() {
    event.stopPropagation();
      $('#dd1').slideToggle();
      $('#dd2').slideUp();
      $('#dd3').slideUp();
  },
  'click #cir2': function() {
    event.stopPropagation();
      $('#dd2').slideToggle();
      $('#dd3').slideUp();
      $('#dd1').slideUp();
  },
  'click #cir3': function() {
    event.stopPropagation();
      $('#dd3').slideToggle();
      $('#dd2').slideUp();
      $('#dd1').slideUp();
  },
});
$(document).click( function(){
  $('#dd3').slideUp();
  $('#dd2').slideUp();
  $('#dd1').slideUp();
});
