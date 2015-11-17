/* Author: Ryan Fisher
** Created: 10/19/2015
** Description: .js file for Quarterly EIS
** Associated Files: quarterly_EBS.html, quarterly_EBS.less, quarterly_EBS_logic.js
*/

Template.quarterly_EBS.onCreated(function(){
  this.autorun(function(){
    var urlArray = $(location).attr('href').split("/");
    Meteor.http.get('http://apifin.investkit.com/call_controller.php?action=company_page&option=balance_sheet&param=' + urlArray[urlArray.length - 1],
    function(error, data){
      Session.set("annual_EBS",data);
    });
    Meteor.http.get('http://apifin.investkit.com/call_controller.php?action=company_profile&option=indie&call=earnings&param=' + urlArray[3],
      function(error, data){
      Session.set("quarterly_EBS",data);
    });
    sortEBSData2();
    quarterlyEBSgraph();
    adjustChart2();
  })
})

function sortEBSData2(){
  var unsorted_data = Session.get("quarterly_EBS");
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
    Session.set("sorted_quarterly_EBS", newObject);
  }
}

Template.quarterly_EBS.onRendered(function(){
  sortEBSData2();
  quarterlyEBSgraph();
  adjustChart2();
})

//Resets Orange line to represent percentage
function adjustChart2(){
  var chart = $('#quarterlyEBSgraph').highcharts();
  if(chart != undefined){
    var axisMax = chart.yAxis[0].max;
    chart.series[2].update({
      tooltip:{
        pointFormatter: function() {
            return "Debt to Assets: " + (this.y / (axisMax / 100)).toFixed(2) + "%";
        }
      }
    });
    for(var i = 0; i<chart.series[2].data.length; i++){
      chart.series[2].data[i].y *= axisMax;
      chart.series[2].data[i].update();
    }
  }
}

function graphDebtData() {
  var data = Session.get('sorted_quarterly_EBS');
  if(data == undefined){
    return '';
  }
  var target = data.balance[0].data[0].coa_data;
  var out = [];
  var arrayIndex = 0;
  for(var i = 4; i >= 0; i--){
    for(var j = 0; j < data.balance[i].data.length; j++){
      if(data.balance[i].data[j].coa_title == "Total Debt"){
        out[arrayIndex] = parseFloat(data.balance[i].data[j].coa_data);
      }
    }
    arrayIndex++;
  }
  return out;
}

function graphreportdata2() {
  var data = Session.get('sorted_quarterly_EBS');
  if(data == undefined){
    return '';
  }
  var target = data.balance[0].data[0].coa_data;
  var out = [];
  var arrayIndex = 0;
  for(var i = 4; i >= 0; i--){
    for(var j = 0; j < data.balance[i].data.length; j++){
      if(data.balance[i].data[j].coa_title == "Total Assets"){
        out[arrayIndex] = parseFloat(data.balance[i].data[j].coa_data);
      }
    }
    arrayIndex++;
  }
  return out;
}

function graphNetProfitMarginData2() {
  var debt = graphDebtData();
  var assets = graphreportdata2();
  if(debt == '' || assets == ''){
    return '';
  }
  var out = [];
  out[0] = debt[0] / assets[0];
  out[1] = debt[1] / assets[1];
  out[2] = debt[2] / assets[2];
  out[3] = debt[3] / assets[3];
  out[4] = debt[4] / assets[4];
  return out;
}

function graphLabels2(){
  var out = [];
  var data = Session.get('sorted_quarterly_EBS');
  if(data == undefined){
    return '';
  }
  for(var i = 4; i >= 0; i--){
    out[i] = data.balance[i].title.substr(5,2) + " - " + data.balance[i].title.substr(0,4);
  }
  return out;
}

function quarterlyEBSgraph(){
  var debt = graphDebtData();
  var assets = graphreportdata2();
  var margin = graphNetProfitMarginData2();
  var labels = graphLabels2();
 $('#quarterlyEBSgraph').highcharts({
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
            return "Debt to Assets: " + (this.y / 1).toFixed(2) + "%";
          }
        }
       }
     },


   series: [{
     type: 'column',
     name: 'Total Debt',
     data: debt,
     showInLegend: false,
     color: '#434348 '
   }, {
     type: 'column',
     name: 'Total Assets',
     data: assets,
     showInLegend: false,
     color: '#3098FF '
   }, {
     type: 'spline',
     name: 'Debt to Assets',
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
          return "Debt to Assets: " + (this.y / 1).toFixed(2) + "%";
        }
      }
   }]
 });
}

Template.quarterly_EBS.helpers({
  //gets the company name
  company: function(){
    var data = Session.get('annual_EBS');
    if(data == undefined){
      return '';
    }
    return data.data.balance_sheet.company_info.c_name;
  },
  title: function(){
    var data = Session.get('sorted_quarterly_EBS');
    if(data == undefined){
      return '';
    }
    return data.balance[0].title.substr(0,7);
  },
  updated: function(){
    var data = Session.get('annual_EBS');
    if(data == undefined){
      return '';
    }
    return data.data.balance_sheet.company_info.c_tr_last_updated;
  },
  location: function(){
    data = Session.get('annual_EBS');
    if(data == undefined)
    {
      return "";
    }
    var company = data.data.balance_sheet.company_info;
    var city = company['c_hq_city'];
    city = city.replace(/\w\S*/g, function(txt) {
        return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });
    return city + ", " + company.c_hq_state;
  },

  selectYear: function() {
    return "2015";
  },

  assets: function() {
    var data = Session.get('sorted_quarterly_EBS');
    if(data == undefined){
      return '';
    }
    for(var i = 0; i < data.balance[0].data.length; i++){
      if(data.balance[0].data[i].coa_title == "Total Assets"){
        var balance = parseFloat(data.balance[0].data[i].coa_data);
      }
    }
    if(balance > 1000)
    {
      balance /= 1000;
      return "$" + balance.toFixed(2) + " Billion";
    }
    return "$" + balance + " Million";
  },

  debt: function() {
    var data = Session.get('sorted_quarterly_EBS');
    if(data == undefined){
      return '';
    }
    for(var i = 0; i < data.balance[0].data.length; i++){
      if(data.balance[0].data[i].coa_title == "Total Debt"){
        var balance = parseFloat(data.balance[0].data[i].coa_data);
      }
    }
    if(balance > 1000)
    {
      balance /= 1000;
      return "$" + balance.toFixed(2) + " Billion";
    }
    return "$" + balance + " Million";
  },

  dta: function() {
    var data = Session.get('sorted_quarterly_EBS');
    if(data == undefined){
      return '';
    }
    for(var i = 0; i < data.balance[0].data.length; i++){
      if(data.balance[0].data[i].coa_title == "Total Debt"){
        var debt = parseFloat(data.balance[0].data[i].coa_data);
      }
      if(data.balance[0].data[i].coa_title == "Total Assets"){
        var assets = parseFloat(data.balance[0].data[i].coa_data);
      }
    }
    var out = (debt / assets) * 100;
    return out.toFixed(2) + "%";
  },

  label: function(){
    var data = Session.get('sorted_quarterly_EBS');
    if(data == undefined){
      return '';
    }
    returnArray = [];
    for(var i = 0; i < data.balance.length; i++){
      returnArray[i] = {};
      if(i == 0){
        returnArray[i].style = "font-family:HN-B";
      }
      else if(i == data.balance.length - 1){
        returnArray[i].style = "margin-right:0px";
      }
      else{
        returnArray[i].style = "";
      }

      returnArray[i].lbl = data.balance[i].title.substr(5,2) + " - " + data.balance[i].title.substr(0,4);
    }
    return returnArray;
  },

  firstLabel: function(){
    var data = Session.get('sorted_quarterly_EBS');
    if(data == undefined){
      return '';
    }
    return data.balance[0].title.substr(5,2) + " - " + data.balance[0].title.substr(0,4)
  },
  logo: function() {
    var data = Session.get('annual_EBS');
    if(data == undefined)
    {
      return '';
    }
    return data.data.balance_sheet.company_info.c_logo;
  },
  data: function(){
    var data = Session.get('sorted_quarterly_EBS');
    if(data == undefined){
      return '';
    }
    var borderArray = ["d","d","d","d","d","d","d","s","d","d","d","d","d","d","d","s","d","d","d","d","s","d","s","s","d","d","s","d","d","d","d","s","s","d","d","e"];
    returnArray = [];
    for(var i = 0; i < data.balance[0].data.length; i++){
      returnArray[i] = {};
      returnArray[i]['metric'] = data.balance[0].data[i].coa_title;
      //Set initial styles
      returnArray[i]['style1'] = "font-family:HN-B;";
      returnArray[i]['style2'] = "";
      returnArray[i]['style3'] = "";
      returnArray[i]['style4'] = "";
      returnArray[i]['style5'] = "";

      //Set amounts
      returnArray[i]['amnt1'] = data.balance[0].data[i].coa_data;
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
      returnArray[i]['amnt2'] = data.balance[1].data[i].coa_data;
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
      returnArray[i]['amnt3'] = data.balance[2].data[i].coa_data;
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
      returnArray[i]['amnt4'] = data.balance[3].data[i].coa_data;
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
      returnArray[i]['amnt5'] = data.balance[4].data[i].coa_data;
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

Template.quarterly_EBS.events({
  'click #qebs-ddn-0': function(){
    //Show dropdown 0
    if($("#qebs-ddn-0").children(".qebs-ddn-options").css("display") == "none"){
      $("#qebs-ddn-0").children(".qebs-ddn-options").css("display", "inline");
      $("#qebs-ddn-0").children(".qebs-ddn-cir").css("background-color", "#3098ff");
      $("#qebs-ddn-0").children(".qebs-ddn-cir").children(".fa").css("color", "#ffffff");

      //Turn 1 and 2 off
      $("#qebs-ddn-1").children(".qebs-ddn-options").css("display", "none");
      $("#qebs-ddn-1").children(".qebs-ddn-cir").css("background-color", "#ffffff");
      $("#qebs-ddn-1").children(".qebs-ddn-cir").children(".fa").css("color", "#3098ff");
      $("#qebs-ddn-2").children(".qebs-ddn-options").css("display", "none");
      $("#qebs-ddn-2").children(".qebs-ddn-cir").css("background-color", "#ffffff");
      $("#qebs-ddn-2").children(".qebs-ddn-cir").children(".fa").css("color", "#3098ff");
    }
    else{
      $("#qebs-ddn-0").children(".qebs-ddn-options").css("display", "none");
      $("#qebs-ddn-0").children(".qebs-ddn-cir").css("background-color", "#ffffff");
      $("#qebs-ddn-0").children(".qebs-ddn-cir").children(".fa").css("color", "#3098ff");
    }
  },

  'click #qebs-ddn-1': function(){
    //Show dropdown 1
    if($("#qebs-ddn-1").children(".qebs-ddn-options").css("display") == "none"){
      $("#qebs-ddn-1").children(".qebs-ddn-options").css("display", "inline");
      $("#qebs-ddn-1").children(".qebs-ddn-cir").css("background-color", "#3098ff");
      $("#qebs-ddn-1").children(".qebs-ddn-cir").children(".fa").css("color", "#ffffff");

      //Turn 0 and 2 off
      $("#qebs-ddn-0").children(".qebs-ddn-options").css("display", "none");
      $("#qebs-ddn-0").children(".qebs-ddn-cir").css("background-color", "#ffffff");
      $("#qebs-ddn-0").children(".qebs-ddn-cir").children(".fa").css("color", "#3098ff");
      $("#qebs-ddn-2").children(".qebs-ddn-options").css("display", "none");
      $("#qebs-ddn-2").children(".qebs-ddn-cir").css("background-color", "#ffffff");
      $("#qebs-ddn-2").children(".qebs-ddn-cir").children(".fa").css("color", "#3098ff");
    }
    else{
      $("#qebs-ddn-1").children(".qebs-ddn-options").css("display", "none");
      $("#qebs-ddn-1").children(".qebs-ddn-cir").css("background-color", "#ffffff");
      $("#qebs-ddn-1").children(".qebs-ddn-cir").children(".fa").css("color", "#3098ff");
    }
  },

  'click #qebs-ddn-2': function(){
    //Show dropdown 2
    if($("#qebs-ddn-2").children(".qebs-ddn-options").css("display") == "none"){
      $("#qebs-ddn-2").children(".qebs-ddn-options").css("display", "inline");
      $("#qebs-ddn-2").children(".qebs-ddn-cir").css("background-color", "#3098ff");
      $("#qebs-ddn-2").children(".qebs-ddn-cir").children(".fa").css("color", "#ffffff");

      //Turn 0 and 1 off
      $("#qebs-ddn-0").children(".qebs-ddn-options").css("display", "none");
      $("#qebs-ddn-0").children(".qebs-ddn-cir").css("background-color", "#ffffff");
      $("#qebs-ddn-0").children(".qebs-ddn-cir").children(".fa").css("color", "#3098ff");
      $("#qebs-ddn-1").children(".qebs-ddn-options").css("display", "none");
      $("#qebs-ddn-1").children(".qebs-ddn-cir").css("background-color", "#ffffff");
      $("#qebs-ddn-1").children(".qebs-ddn-cir").children(".fa").css("color", "#3098ff");
    }
    else{
      $("#qebs-ddn-2").children(".qebs-ddn-options").css("display", "none");
      $("#qebs-ddn-2").children(".qebs-ddn-cir").css("background-color", "#ffffff");
      $("#qebs-ddn-2").children(".qebs-ddn-cir").children(".fa").css("color", "#3098ff");
    }
  },
})
