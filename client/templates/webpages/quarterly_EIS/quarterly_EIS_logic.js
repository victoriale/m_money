/* Author: Ryan Fisher
** Created: 10/19/2015
** Description: .js file for Quarterly EIS
** Associated Files: sorted_quarterly_EIS.html, sorted_quarterly_EIS.less, sorted_quarterly_EIS_logic.js
*/

Template.quarterly_EIS.onCreated(function(){
  var urlArray = $(location).attr('href').split("/");
  Meteor.http.get('http://apifin.investkit.com/call_controller.php?action=company_page&option=income_statement&param=' + urlArray[urlArray.length - 1],
  function(error, data){
    Session.set("annual_EIS",data);
  });
  Meteor.http.get('http://apifin.investkit.com/call_controller.php?action=company_profile&option=indie&call=earnings&param=' + urlArray[3],
    function(error, data){
    Session.set("quarterly_EIS",data);
  });
  sortEISData();
})

function sortEISData(){
  var unsorted_data = Session.get("quarterly_EIS");
  if(unsorted_data != undefined){
    var earnings = unsorted_data.data.earnings;
    var newObject = {"income" : [], "balance": [], "cash": []};
    var incCount = 0, balCount = 0, cashCount = 0;
    for(var i = 0; i < earnings.length; i++){
      if(earnings[i].e_report_title.substr(5,1) == "Q"){
        if(earnings[i].e_report_title.substr(8) == "Income Statement"){
          newObject.income[incCount] = {};
          newObject.income[incCount]["title"] = earnings[i]["e_report_title"];
          newObject.income[incCount]["data"] = earnings[i]["e_report_data"];
          incCount++;
        }
        else if(earnings[i].e_report_title.substr(8) == "Balance Sheet"){
          newObject.balance[balCount] = {};
          newObject.balance[balCount]["title"] = earnings[i]["e_report_title"];
          newObject.balance[balCount]["data"] = earnings[i]["e_report_data"];
          balCount++;
        }
        else if(earnings[i].e_report_title.substr(8) == "Cash Flow Statement"){
          newObject.cash[cashCount] = {};
          newObject.cash[cashCount]["title"] = earnings[i]["e_report_title"];
          newObject.cash[cashCount]["data"] = earnings[i]["e_report_data"];
          cashCount++;
        }
      }
    }
    Session.set("sorted_quarterly_EIS", newObject);
  }
}

Template.quarterly_EIS.onRendered(function(){
  sortEISData();
  quarterlyEISgraph();
  var chart = $('#quarterlyEISgraph').highcharts();
  var axisMax = chart.yAxis[0].max;
  chart.series[2].update({
    tooltip:{
      pointFormatter: function() {
          return "Profit Margin: " + (this.y / (axisMax / 100)).toFixed(2) + "%";
      }
    }
  });
  for(var i = 0; i<chart.series[2].data.length; i++){
    chart.series[2].data[i].y *= axisMax;
    chart.series[2].data[i].update();
  }
})

function graphRevData() {
  var data = Session.get('sorted_quarterly_EIS');
  if(data == undefined){
    return '';
  }
  var target = data.income[0].data[0].coa_data;
  var out = [];
  var arrayIndex = 0;
  for(var i = 4; i >= 0; i--){
    for(var j = 0; j < data.income[i].data.length; j++){
      if(data.income[i].data[j].coa_title == "Revenue"){
        out[arrayIndex] = parseFloat(data.income[i].data[j].coa_data);
      }
    }
    arrayIndex++;
  }
  return out;
}

function graphreportdata() {
  var data = Session.get('sorted_quarterly_EIS');
  if(data == undefined){
    return '';
  }
  var target = data.income[0].data[0].coa_data;
  var out = [];
  var arrayIndex = 0;
  for(var i = 4; i >= 0; i--){
    for(var j = 0; j < data.income[i].data.length; j++){
      if(data.income[i].data[j].coa_title == "Net Income"){
        out[arrayIndex] = parseFloat(data.income[i].data[j].coa_data);
      }
    }
    arrayIndex++;
  }
  return out;
}

function graphNetProfitMarginData() {
  var revenue = graphRevData();
  var income = graphreportdata();
  if(revenue == '' || income == ''){
    return '';
  }
  var out = [];
  out[0] = income[0] / revenue[0];
  out[1] = income[1] / revenue[1];
  out[2] = income[2] / revenue[2];
  out[3] = income[3] / revenue[3];
  out[4] = income[4] / revenue[4];
  return out;
}

function graphLabels(){
  var out = [];
  var data = Session.get('sorted_quarterly_EIS');
  if(data == undefined){
    return '';
  }
  for(var i=0; i < data.income.length; i++){
    out[i] = data.income[i].title.substr(5,2) + " - " + data.income[i].title.substr(0,4);
  }
  return out;
}

function quarterlyEISgraph(){
  var rev = graphRevData();
  var income = graphreportdata();
  var margin = graphNetProfitMarginData();
  var labels = graphLabels();
 $('#quarterlyEISgraph').highcharts({
   credits: {
     enabled: false
   },
   exporting: {
     enabled: false
   },
   title: {
     text: ''
   },
   xAxis: {
     categories: labels,
   },

   yAxis: {
     tickInterval: 1000,
     title: "In Millions of USD"
   },
   plotOptions: {
     spline: {
       tooltip: {
         valueDecimals: 2,
         pointFormatter: function() {
            return "Profit Margins: " + (this.y / 1).toFixed(2) + "%";
          }
        }
       }
     },


   series: [{
     type: 'column',
     name: 'Net Income',
     data: income,
     showInLegend: false,
     color: '#434348 '
   }, {
     type: 'column',
     name: 'Revenue',
     data: rev,
     showInLegend: false,
     color: '#3098FF '
   }, {
     type: 'spline',
     name: 'Profit Margin',
     data: margin,
     showInLegend: false,
     marker: {
       lineWidth: 2,
       lineColor: '#F8A354 ',
       fillColor: 'white'
     },
     color: '#F8A354 ',
     tooltip: {
       valueDecimals: 2,
       pointFormatter: function() {
          return "Profit Margins: " + (this.y / 1).toFixed(2) + "%";
        }
      }
   }]
 });
}

Template.quarterly_EIS.helpers({
  //gets the company name
  profile: function(){
    var data = Session.get('annual_EIS');
    if(data == undefined){
      return '';
    }
    return data.data.income_statement.company_info.c_name;
  },
  title: function(){
    var data = Session.get('sorted_quarterly_EIS');
    if(data == undefined){
      return '';
    }
    return data.income[0].title.substr(0,7);
  },
  updated: function(){
    var data = Session.get('sorted_quarterly_EIS');
    if(data == undefined){
      return '';
    }
    return '10/24/2014, 12:36 PM EDT';
  },
  location: function(){
    return "The United States of America";
  },

  selectYear: function() {
    return "2015";
  },

  ninc: function() {
    var data = Session.get('sorted_quarterly_EIS');
    if(data == undefined){
      return '';
    }
    for(var i = 0; i < data.income[0].data.length; i++){
      if(data.income[0].data[i].coa_title == "Net Income"){
        var income = parseFloat(data.income[0].data[i].coa_data);
      }
    }
    if(income > 1000)
    {
      income /= 1000;
      return "$" + income.toFixed(2) + " Billion";
    }
    return "$" + income + " Million";
  },

  rev: function() {
    var data = Session.get('sorted_quarterly_EIS');
    if(data == undefined){
      return '';
    }
    for(var i = 0; i < data.income[0].data.length; i++){
      if(data.income[0].data[i].coa_title == "Revenue"){
        var income = parseFloat(data.income[0].data[i].coa_data);
      }
    }
    if(income > 1000)
    {
      income /= 1000;
      return "$" + income.toFixed(2) + " Billion";
    }
    return "$" + income + " Million";
  },

  pm: function() {
    var data = Session.get('sorted_quarterly_EIS');
    if(data == undefined){
      return '';
    }
    for(var i = 0; i < data.income[0].data.length; i++){
      if(data.income[0].data[i].coa_title == "Net Income"){
        var income = parseFloat(data.income[0].data[i].coa_data);
      }
      if(data.income[0].data[i].coa_title == "Revenue"){
        var rev = parseFloat(data.income[0].data[i].coa_data);
      }
    }
    var out = (income / rev) * 100;
    return out.toFixed(2) + "%";
  },

  label: function(){
    var data = Session.get('sorted_quarterly_EIS');
    if(data == undefined){
      return '';
    }
    returnArray = [];
    for(var i = 0; i < data.income.length; i++){
      returnArray[i] = {};
      if(i == 0){
        returnArray[i].style = "font-family:HN-B";
      }
      else if(i == data.income.length - 1){
        returnArray[i].style = "margin-right:0px";
      }
      else{
        returnArray[i].style = "";
      }

      returnArray[i].lbl = data.income[i].title.substr(5,2) + " - " + data.income[i].title.substr(0,4);
    }
    return returnArray;
  },

  firstLabel: function(){
    var data = Session.get('sorted_quarterly_EIS');
    if(data == undefined){
      return '';
    }
    return data.income[0].title.substr(5,2) + " - " + data.income[0].title.substr(0,4)
  },

  data: function(){
    var data = Session.get('sorted_quarterly_EIS');
    if(data == undefined){
      return '';
    }
    var borderArray = ["d","s","d","s","d","d","d","d","d","d","s","s","d","d","d","s","s","d","d","s","d","d","d","s","d","s","s","d","d","s","d","d","s","s","d","d","d","d","d","d","d","d","d","d","d","d","d","d","d","e"];
    returnArray = [];
    for(var i = 0; i < data.income[0].data.length; i++){
      returnArray[i] = {};
      returnArray[i]['metric'] = data.income[0].data[i].coa_title;
      //Set initial styles
      returnArray[i]['style1'] = "font-family:HN-B;";
      returnArray[i]['style2'] = "";
      returnArray[i]['style3'] = "";
      returnArray[i]['style4'] = "";
      returnArray[i]['style5'] = "";

      //Set amounts
      returnArray[i]['amnt1'] = data.income[0].data[i].coa_data;
      //If no amount, set it to -
      if(returnArray[i]['amnt1'] == undefined){
        returnArray[i]['amnt1'] = "-";
      }
      //If amount is negative, color it red
      else {
        if(parseFloat(returnArray[i]['amnt1']) != NaN){
          returnArray[i]['amnt1'] = parseFloat(returnArray[i]['amnt1']).toFixed(2);
          if(parseFloat(returnArray[i]['amnt1']) < 0){
            returnArray[i]['style1'] += "color:#ca1010  ;";
          }
        }
      }
      returnArray[i]['amnt2'] = data.income[1].data[i].coa_data;
      if(returnArray[i]['amnt2'] == undefined){
        returnArray[i]['amnt2'] = "-";
      }
      else {
        if(parseFloat(returnArray[i]['amnt2']) != NaN){
          returnArray[i]['amnt2'] = parseFloat(returnArray[i]['amnt2']).toFixed(2);
          if(parseFloat(returnArray[i]['amnt2']) < 0){
            returnArray[i]['style2'] += "color:#ca1010  ;";
          }
        }
      }
      returnArray[i]['amnt3'] = data.income[2].data[i].coa_data;
      if(returnArray[i]['amnt3'] == undefined){
        returnArray[i]['amnt3'] = "-";
      }
      else {
        if(parseFloat(returnArray[i]['amnt3']) != NaN){
          returnArray[i]['amnt3'] = parseFloat(returnArray[i]['amnt3']).toFixed(2);
          if(parseFloat(returnArray[i]['amnt3']) < 0){
            returnArray[i]['style3'] += "color:#ca1010  ;";
          }
        }
      }
      returnArray[i]['amnt4'] = data.income[3].data[i].coa_data;
      if(returnArray[i]['amnt4'] == undefined){
        returnArray[i]['amnt4'] = "-";
      }
      else {
        if(parseFloat(returnArray[i]['amnt4']) != NaN){
          returnArray[i]['amnt4'] = parseFloat(returnArray[i]['amnt4']).toFixed(2);
          if(parseFloat(returnArray[i]['amnt4']) < 0){
            returnArray[i]['style4'] += "color:#ca1010  ;";
          }
        }
      }
      returnArray[i]['amnt5'] = data.income[4].data[i].coa_data;
      if(returnArray[i]['amnt5'] == undefined){
        returnArray[i]['amnt5'] = "-";
      }
      else {
        if(parseFloat(returnArray[i]['amnt5']) != NaN){
          returnArray[i]['amnt5'] = parseFloat(returnArray[i]['amnt5']).toFixed(2);
          if(parseFloat(returnArray[i]['amnt5']) < 0){
            returnArray[i]['style5'] += "color:#ca1010  ;";
          }
        }
      }

      //Determine bottom border
      switch(borderArray[i]){
        case 'd':
          returnArray[i]['border'] = "dashed";
          break;
        case 's':
          returnArray[i]['border'] = "solid";
          break;
        case 'e':
          returnArray[i]['border'] = "end";
          break;
      }

      //determine background color
      if(i%2 == 0){
        returnArray[i]['color'] = 'white';
      }
      else{
        returnArray[i]['color'] = 'grey';
      }
    }

    return returnArray;
  },
})

Template.quarterly_EIS.events({
  'click #qeis-ddn-0': function(){
    //Show dropdown 0
    if($("#qeis-ddn-0").children(".qeis-ddn-options").css("display") == "none"){
      $("#qeis-ddn-0").children(".qeis-ddn-options").css("display", "inline");
      $("#qeis-ddn-0").children(".qeis-ddn-cir").css("background-color", "#3098ff");
      $("#qeis-ddn-0").children(".qeis-ddn-cir").children(".fa").css("color", "#ffffff");

      //Turn 1 and 2 off
      $("#qeis-ddn-1").children(".qeis-ddn-options").css("display", "none");
      $("#qeis-ddn-1").children(".qeis-ddn-cir").css("background-color", "#ffffff");
      $("#qeis-ddn-1").children(".qeis-ddn-cir").children(".fa").css("color", "#3098ff");
      $("#qeis-ddn-2").children(".qeis-ddn-options").css("display", "none");
      $("#qeis-ddn-2").children(".qeis-ddn-cir").css("background-color", "#ffffff");
      $("#qeis-ddn-2").children(".qeis-ddn-cir").children(".fa").css("color", "#3098ff");
    }
    else{
      $("#qeis-ddn-0").children(".qeis-ddn-options").css("display", "none");
      $("#qeis-ddn-0").children(".qeis-ddn-cir").css("background-color", "#ffffff");
      $("#qeis-ddn-0").children(".qeis-ddn-cir").children(".fa").css("color", "#3098ff");
    }
  },

  'click #qeis-ddn-1': function(){
    //Show dropdown 1
    if($("#qeis-ddn-1").children(".qeis-ddn-options").css("display") == "none"){
      $("#qeis-ddn-1").children(".qeis-ddn-options").css("display", "inline");
      $("#qeis-ddn-1").children(".qeis-ddn-cir").css("background-color", "#3098ff");
      $("#qeis-ddn-1").children(".qeis-ddn-cir").children(".fa").css("color", "#ffffff");

      //Turn 0 and 2 off
      $("#qeis-ddn-0").children(".qeis-ddn-options").css("display", "none");
      $("#qeis-ddn-0").children(".qeis-ddn-cir").css("background-color", "#ffffff");
      $("#qeis-ddn-0").children(".qeis-ddn-cir").children(".fa").css("color", "#3098ff");
      $("#qeis-ddn-2").children(".qeis-ddn-options").css("display", "none");
      $("#qeis-ddn-2").children(".qeis-ddn-cir").css("background-color", "#ffffff");
      $("#qeis-ddn-2").children(".qeis-ddn-cir").children(".fa").css("color", "#3098ff");
    }
    else{
      $("#qeis-ddn-1").children(".qeis-ddn-options").css("display", "none");
      $("#qeis-ddn-1").children(".qeis-ddn-cir").css("background-color", "#ffffff");
      $("#qeis-ddn-1").children(".qeis-ddn-cir").children(".fa").css("color", "#3098ff");
    }
  },

  'click #qeis-ddn-2': function(){
    //Show dropdown 2
    if($("#qeis-ddn-2").children(".qeis-ddn-options").css("display") == "none"){
      $("#qeis-ddn-2").children(".qeis-ddn-options").css("display", "inline");
      $("#qeis-ddn-2").children(".qeis-ddn-cir").css("background-color", "#3098ff");
      $("#qeis-ddn-2").children(".qeis-ddn-cir").children(".fa").css("color", "#ffffff");

      //Turn 0 and 1 off
      $("#qeis-ddn-0").children(".qeis-ddn-options").css("display", "none");
      $("#qeis-ddn-0").children(".qeis-ddn-cir").css("background-color", "#ffffff");
      $("#qeis-ddn-0").children(".qeis-ddn-cir").children(".fa").css("color", "#3098ff");
      $("#qeis-ddn-1").children(".qeis-ddn-options").css("display", "none");
      $("#qeis-ddn-1").children(".qeis-ddn-cir").css("background-color", "#ffffff");
      $("#qeis-ddn-1").children(".qeis-ddn-cir").children(".fa").css("color", "#3098ff");
    }
    else{
      $("#qeis-ddn-2").children(".qeis-ddn-options").css("display", "none");
      $("#qeis-ddn-2").children(".qeis-ddn-cir").css("background-color", "#ffffff");
      $("#qeis-ddn-2").children(".qeis-ddn-cir").children(".fa").css("color", "#3098ff");
    }
  },
})
