/* Author: jyothyswaroop
** Created: 10/19/2015
** Description: .js file for annual EIS
** Associated Files: annual_EIS.html, annual_EIS.less, annual_EIS_logic.js
*/

Template.annual_EIS.onCreated(function(){
  this.autorun(function(){
    var urlArray = $(location).attr('href').split("/");
    Meteor.http.get('http://apifin.investkit.com/call_controller.php?action=company_page&option=income_statement&param=' + urlArray[urlArray.length - 1],
    function(error, data){
      Session.set("annual_EIS",data);
    });
    annualEISgraph();
    var chart = $('#annualEISgraph').highcharts();
    if(chart != undefined)
    {
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
    }
  });
})

Template.annual_EIS.onRendered(function() {
  annualEISgraph();
});

function graphRevData() {
  var data = Session.get('annual_EIS');
  if(data == undefined)
  {
    return '';
  }
  var target = data.data.income_statement.income_data["Revenue"];
  var out = [];
  out[0] = parseFloat(target["2011"]);
  out[1] = parseFloat(target["2012"]);
  out[2] = parseFloat(target["2013"]);
  out[3] = parseFloat(target["2014"]);
  out[4] = parseFloat(target["2015"]);
  return out;
}

function graphIncomeData() {
  var data = Session.get('annual_EIS');
  if(data == undefined)
  {
    return '';
  }
  var target = data.data.income_statement.income_data["Net Income"];
  var out = [];
  out[0] = parseFloat(target["2011"]);
  out[1] = parseFloat(target["2012"]);
  out[2] = parseFloat(target["2013"]);
  out[3] = parseFloat(target["2014"]);
  out[4] = parseFloat(target["2015"]);
  return out;
}

function graphNetProfitMarginData() {
  var data = Session.get('annual_EIS');
  if(data == undefined)
  {
    return '';
  }
  var revenue = graphRevData();
  var income = graphIncomeData();
  var out = [];
  out[0] = income[0] / revenue[0];
  out[1] = income[1] / revenue[1];
  out[2] = income[2] / revenue[2];
  out[3] = income[3] / revenue[3];
  out[4] = income[4] / revenue[4];
  return out;
}

function annualEISgraph(){
  var rev = graphRevData();
  var income = graphIncomeData();
  var margin = graphNetProfitMarginData();
  $('#annualEISgraph').highcharts({
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
      categories: ['2011', '2012', '2013', '2014', '2015']
    },

    yAxis: {
      tickInterval: 1000,
      title: "In Millions of USD"
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
      tooltip:{
        pointFormatter: function() {
          return "Profit Margins: " + (this.y).toFixed(2) + "%";
        }
      },
      name: 'Profit Margin',
      data: margin,
      showInLegend: false,
      marker: {
        lineWidth: 2,
        lineColor: '#F8A354 ',
        fillColor: 'white'
      },
      color: '#F8A354 ',
    }]
  });
}

Template.annual_EIS.helpers({
  //gets the company name
  company: function(){
    var data = Session.get('annual_EIS');
    if(data == undefined)
    {
      return '';
    }
    return data['data']['income_statement']['company_info']['c_name'];
  },
  updated: function(){
    var data = Session.get('annual_EIS');
    if(data == undefined)
    {
      return '';
    }
    return data['data']['income_statement']['company_info']['c_tr_last_updated'];
  },
  location: function(){
    var data = Session.get('annual_EIS');
    if(data == undefined)
    {
      return '';
    }
    var city = data['data']['income_statement']['company_info']['c_hq_city'];
    city = city.replace(/\w\S*/g, function(txt) {
        return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });
    var state = data['data']['income_statement']['company_info']['c_hq_state'];
    return city + ", " + state;
  },

  label: function() {
    var data = Session.get("annual_EIS");
    if(data == undefined)
    {
      return '';
    }
    var yrs = data.data.income_statement.income_data["Net Income"];
    var years = [];
    yrs2 = Object.keys(yrs);
    for(var i = 0; i < yrs2.length; i++)
    {
      years[i] = yrs2[yrs2.length - i - 1];
    }
    return years;
  },

  firstLabel: function() {
    var data = Session.get("annual_EIS");
    if(data == undefined)
    {
      return '';
    }
    var yrs = data.data.income_statement.income_data["Net Income"];
    yrs2 = Object.keys(yrs);
    return yrs2[yrs2.length - 1];
  },

  ninc: function() {
    var data = Session.get('annual_EIS');
    if(data == undefined)
    {
      return '';
    }
    var income = parseInt(data.data.income_statement.income_data["Net Income"]["2015"]);
    if(income > 1000)
    {
      income /= 1000;
      return "$" + income.toFixed(2) + " Billion";
    }
    return "$" + income + " Million";
  },

  rev: function() {
    var data = Session.get('annual_EIS');
    if(data == undefined)
    {
      return '';
    }
    var income = parseInt(data.data.income_statement.income_data["Revenue"]["2015"]);
    if(income > 1000)
    {
      income /= 1000;
      return "$" + income.toFixed(2) + " Billion";
    }
    return "$" + income + " Million";
  },

  pm: function() {
    var data = Session.get('annual_EIS');
    if(data == undefined)
    {
      return '';
    }
    var income = parseFloat(data.data.income_statement.income_data["Net Income"]["2015"]);
    var rev = parseFloat(data.data.income_statement.income_data["Revenue"]["2015"]);
    var out = (income / rev) * 100;

    return out.toFixed(2) + "%";
  },

  data: function(){
    var data = Session.get('annual_EIS');
    if(data == undefined)
    {
      return '';
    }
    var borderArray = ["d","s","d","s","d","d","d","d","d","d","s","s","d","d","d","s","s","d","d","s","d","d","d","s","d","s","s","d","d","s","d","d","s","s","d","d","d","d","d","d","d","d","d","d","d","d","d","d","d","e"];
    var incomedata = data['data']['income_statement']['income_data'];
    returnArray = [];
    for(var i = 0; i < Object.keys(incomedata).length; i++){
      returnArray[i] = {};
      returnArray[i]['metric'] = Object.keys(incomedata)[i];
      //Set initial styles
      returnArray[i]['style1'] = "font-family:HN-B;";
      returnArray[i]['style2'] = "";
      returnArray[i]['style3'] = "";
      returnArray[i]['style4'] = "";
      returnArray[i]['style5'] = "";

      //Set amounts
      returnArray[i]['amnt1'] = incomedata[Object.keys(incomedata)[i]]['2014'];
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
      returnArray[i]['amnt2'] = incomedata[Object.keys(incomedata)[i]]['2013'];
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
      returnArray[i]['amnt3'] = incomedata[Object.keys(incomedata)[i]]['2012'];
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
      returnArray[i]['amnt4'] = incomedata[Object.keys(incomedata)[i]]['2011'];
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
      returnArray[i]['amnt5'] = incomedata[Object.keys(incomedata)[i]]['2010'];
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
      if(i % 2 == 0){
        returnArray[i]['color'] = 'white';
      }
      else{
        returnArray[i]['color'] = 'grey';
      }
    }
    return returnArray;
  },
});

Template.annual_EIS.events({
  'click #aneis-ddn-0': function(){
    //Show dropdown 0
    if($("#aneis-ddn-0").children(".aneis-ddn-options").css("display") == "none"){
      $("#aneis-ddn-0").children(".aneis-ddn-options").css("display", "inline");
      $("#aneis-ddn-0").children(".aneis-ddn-cir").css("background-color", "#3098ff");
      $("#aneis-ddn-0").children(".aneis-ddn-cir").children(".fa").css("color", "#ffffff");

      //Turn 1 and 2 off
      $("#aneis-ddn-1").children(".aneis-ddn-options").css("display", "none");
      $("#aneis-ddn-1").children(".aneis-ddn-cir").css("background-color", "#ffffff");
      $("#aneis-ddn-1").children(".aneis-ddn-cir").children(".fa").css("color", "#3098ff");
      $("#aneis-ddn-2").children(".aneis-ddn-options").css("display", "none");
      $("#aneis-ddn-2").children(".aneis-ddn-cir").css("background-color", "#ffffff");
      $("#aneis-ddn-2").children(".aneis-ddn-cir").children(".fa").css("color", "#3098ff");
    }
    else{
      $("#aneis-ddn-0").children(".aneis-ddn-options").css("display", "none");
      $("#aneis-ddn-0").children(".aneis-ddn-cir").css("background-color", "#ffffff");
      $("#aneis-ddn-0").children(".aneis-ddn-cir").children(".fa").css("color", "#3098ff");
    }
  },

  'click #aneis-ddn-1': function(){
    //Show dropdown 1
    if($("#aneis-ddn-1").children(".aneis-ddn-options").css("display") == "none"){
      $("#aneis-ddn-1").children(".aneis-ddn-options").css("display", "inline");
      $("#aneis-ddn-1").children(".aneis-ddn-cir").css("background-color", "#3098ff");
      $("#aneis-ddn-1").children(".aneis-ddn-cir").children(".fa").css("color", "#ffffff");

      //Turn 0 and 2 off
      $("#aneis-ddn-0").children(".aneis-ddn-options").css("display", "none");
      $("#aneis-ddn-0").children(".aneis-ddn-cir").css("background-color", "#ffffff");
      $("#aneis-ddn-0").children(".aneis-ddn-cir").children(".fa").css("color", "#3098ff");
      $("#aneis-ddn-2").children(".aneis-ddn-options").css("display", "none");
      $("#aneis-ddn-2").children(".aneis-ddn-cir").css("background-color", "#ffffff");
      $("#aneis-ddn-2").children(".aneis-ddn-cir").children(".fa").css("color", "#3098ff");
    }
    else{
      $("#aneis-ddn-1").children(".aneis-ddn-options").css("display", "none");
      $("#aneis-ddn-1").children(".aneis-ddn-cir").css("background-color", "#ffffff");
      $("#aneis-ddn-1").children(".aneis-ddn-cir").children(".fa").css("color", "#3098ff");
    }
  },

  'click #aneis-ddn-2': function(){
    //Show dropdown 2
    if($("#aneis-ddn-2").children(".aneis-ddn-options").css("display") == "none"){
      $("#aneis-ddn-2").children(".aneis-ddn-options").css("display", "inline");
      $("#aneis-ddn-2").children(".aneis-ddn-cir").css("background-color", "#3098ff");
      $("#aneis-ddn-2").children(".aneis-ddn-cir").children(".fa").css("color", "#ffffff");

      //Turn 0 and 1 off
      $("#aneis-ddn-0").children(".aneis-ddn-options").css("display", "none");
      $("#aneis-ddn-0").children(".aneis-ddn-cir").css("background-color", "#ffffff");
      $("#aneis-ddn-0").children(".aneis-ddn-cir").children(".fa").css("color", "#3098ff");
      $("#aneis-ddn-1").children(".aneis-ddn-options").css("display", "none");
      $("#aneis-ddn-1").children(".aneis-ddn-cir").css("background-color", "#ffffff");
      $("#aneis-ddn-1").children(".aneis-ddn-cir").children(".fa").css("color", "#3098ff");
    }
    else{
      $("#aneis-ddn-2").children(".aneis-ddn-options").css("display", "none");
      $("#aneis-ddn-2").children(".aneis-ddn-cir").css("background-color", "#ffffff");
      $("#aneis-ddn-2").children(".aneis-ddn-cir").children(".fa").css("color", "#3098ff");
    }
  },
})
