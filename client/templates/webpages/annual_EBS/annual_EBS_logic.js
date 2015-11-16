/*Author: jyothyswaroop
** Created: 11/13/2015
** Description: .js file for annual_EBS
** Associated Files: annual_EBS.html, annual_EBS.less, annual_EBS.logic.js
*/
Template.annual_EBS.onCreated(function(){
  this.autorun(function(){
  var id = Session.get("profile_header").c_id;
  var imeg = Session.get("profile_header").c_logo;
  // var name = Session.get("profile_header").c_name;
  Meteor.http.get('http://apifin.investkit.com/call_controller.php?action=company_page&option=balance_sheet&param=' + id,
    function(error, data){
    Session.set("annual_EBS",data);
    annualEBSgraph();
    var chart = $('#annualEBSgraph').highcharts();
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
      annualEBSgraph();
  });

});
})

function graphDebtData() {
  var data = Session.get('annual_EBS');
  var target = data.data.balance_sheet.balance_sheet_data["Total Debt"];
  var out = [];
  out[0] = parseFloat(target["2011"]);
  out[1] = parseFloat(target["2012"]);
  out[2] = parseFloat(target["2013"]);
  out[3] = parseFloat(target["2014"]);
  out[4] = parseFloat(target["2015"]);
  return out;
}

function graphAssetData() {
  var data = Session.get('annual_EBS');
  var target = data.data.balance_sheet.balance_sheet_data["Total Assets"];
  var out = [];
  out[0] = parseFloat(target["2011"]);
  out[1] = parseFloat(target["2012"]);
  out[2] = parseFloat(target["2013"]);
  out[3] = parseFloat(target["2014"]);
  out[4] = parseFloat(target["2015"]);
  return out;
}

function graphNetProfitMarginData() {
  var data = Session.get('annual_EBS');
  var debt = graphDebtData();
  var assets = graphAssetData();
  var out = [];
  out[0] = debt[0] / assets[0];
  out[1] = debt[1] / assets[1];
  out[2] = debt[2] / assets[2];
  out[3] = debt[3] / assets[3];
  out[4] = debt[4] / assets[4];
  return out;
}

function annualEBSgraph(){
  var deb = graphDebtData();
  var assets = graphAssetData();
  var margin = graphNetProfitMarginData();
 $('#annualEBSgraph').highcharts({
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
     name: 'Net assets',
     data: assets,
     showInLegend: false,
     color: '#434348 '
   }, {
     type: 'column',
     name: 'debt',
     data: deb,
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

Template.annual_EBS.helpers({
  imag: function(){
    var data = Session.get('profile_header');
    return data['c_logo'];
  },
  company: function(){
    var data = Session.get('annual_EBS');
    return data['data']['balance_sheet']['company_info']['c_name'];
  },
  updated: function(){
    var data = Session.get('annual_EBS');
    return data['data']['balance_sheet']['company_info']['c_tr_last_updated'];
  },
  location: function(){
    var data = Session.get('annual_EBS');
    var city = data['data']['balance_sheet']['company_info']['c_hq_city'];
    city = city.replace(/\w\S*/g, function(txt) {
        return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });
    var state = data['data']['balance_sheet']['company_info']['c_hq_state'];
    return city + ", " + state;
  },

  selectYear: function() {
    return "2015";
  },

  totaldbt: function() {
    var data = Session.get('annual_EBS');
    var totaldbt = parseInt(data.data.balance_sheet.balance_sheet_data["Total Debt"]["2015"]);
    if(totaldbt > 1000)
    {
      totaldbt /= 1000;
      return "$" + totaldbt.toFixed(2) + " Billion";
    }
    return "$" + totaldbt + " Million";
  },

  totalasets: function() {
    var data = Session.get('annual_EBS');
    var totalasets = parseInt(data.data.balance_sheet.balance_sheet_data["Total Assets"]["2015"]);
    if(totalasets > 1000)
    {
      totalasets /= 1000;
      return "$" + totalasets.toFixed(2) + " Billion";
    }
    return "$" + totalasets + " Million";
  },

  perce: function() {
    var data = Session.get('annual_EBS');
    var perce = parseFloat(data.data.balance_sheet.balance_sheet_data["Total Debt"]["2015"]);
    var rev = parseFloat(data.data.balance_sheet.balance_sheet_data["Total Assets"]["2015"]);
    var out = (perce / rev) * 100;

    return out.toFixed(2) + "%";
  },

  label1: function(){
    var data = Session.get('annual_EBS');
    if(data == undefined){
      return '';
    }
    returnArray = [];
    var newv = Object.keys(data.data.balance_sheet['balance_sheet_data']['Total Debt']);
    for(var i = 0; i < newv.length; i++){
      returnArray[i] = {};
     returnArray[i].lbl1 = Object.keys(data.data.balance_sheet['balance_sheet_data']['Total Debt'])[i];
    }
    return returnArray;
  },

  firstLabel1: function(){
    var data = Session.get('annual_EBS');
    if(data == undefined){
      return '';
    }
    var newv = Object.keys(data.data.balance_sheet['balance_sheet_data']['Total Debt']);
   return Object.keys(data.data.balance_sheet['balance_sheet_data']['Total Debt'])[newv.length - 1];

  },

  data: function(){
    var data = Session.get('annual_EBS');
    var borderArray = ["d","d","d","d","d","d","d","d","s","d","d","d","d","d","d","s","d","d","d","d","d","s","d","d","s","s","d","d","d","s","d","d","d","d","d","d","d","s","s","d","s","d","d","d","d","d"];
    var balancedata = data['data']['balance_sheet']['balance_sheet_data'];
    returnArray = [];
    for(var i = 0; i < Object.keys(balancedata).length; i++){
      returnArray[i] = {};
      returnArray[i]['metric'] = Object.keys(balancedata)[i];
      //Set initial styles
      returnArray[i]['style1'] = "font-family:HN-B;";
      returnArray[i]['style2'] = "";
      returnArray[i]['style3'] = "";
      returnArray[i]['style4'] = "";

      //Set amounts
      returnArray[i]['amnt1'] = balancedata[Object.keys(balancedata)[i]]['2014'];
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
      returnArray[i]['amnt2'] = balancedata[Object.keys(balancedata)[i]]['2013'];
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
      returnArray[i]['amnt3'] = balancedata[Object.keys(balancedata)[i]]['2012'];
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
      returnArray[i]['amnt4'] = balancedata[Object.keys(balancedata)[i]]['2011'];
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
  }
});

Template.annual_EBS.events({
  'click #anebs-grph-0': function(){
    //shows the dropdown
    if($("#anebs-grph-0").children(".anebs-grph-tabs-tab-options").css("display") == "none")
    {
      //shows the dropdown for only #anebs-grph-0
      $("#anebs-grph-0").children(".anebs-grph-tabs-tab-options").css("display", "inline");
      $("#anebs-grph-0").children("anebs-grph-tabs-tab-circ").css("background-color", "#3098FF");
      $("#anebs-grph-0").children("anebs-grph-tabs-tab-circ").children(".fa").css("color", "#ffffff");
      //don't show any effect on #anebs-grph-1 #anebs-grph-2
      $("#anebs-grph-1").children(".anebs-grph-tabs-tab-options").css("display","none");
      $("#anebs-grph-1").children(".anebs-grph-tabs-tab-circ").css("background-color","#ffffff");
      $("#anebs-grph-1").children(".anebs-grph-tabs-tab-circ").children(".fa").css("color","#3098FF");
      $("#anebs-grph-2").children(".anebs-grph-tabs-tab-options").css("display","none");
      $("#anebs-grph-2").children(".anebs-grph-tabs-tab-circ").css("background-color","#ffffff");
      $("#anebs-grph-2").children(".anebs-grph-tabs-tab-circ").children(".fa").css("color","#3098FF");
    }
    else {
      $("#anebs-grph-0").children(".anebs-grph-tabs-tab-options").css("display","none");
      $("#anebs-grph-0").children(".anebs-grph-tabs-tab-circ").css("background-color","#ffffff");
      $("#anebs-grph-0").children(".anebs-grph-tabs-tab-circ").children(".fa").css("color","#3098FF");
    }
  },
  'click #anebs-grph-1': function(){
    //shows the dropdown
    if($("#anebs-grph-1").children(".anebs-grph-tabs-tab-options").css("display") == "none")
    {
      //shows the dropdown for only #anebs-grph-0
      $("#anebs-grph-1").children(".anebs-grph-tabs-tab-options").css("display", "inline");
      $("#anebs-grph-1").children("anebs-grph-tabs-tab-circ").css("background-color", "#3098FF");
      $("#anebs-grph-1").children("anebs-grph-tabs-tab-circ").children(".fa").css("color", "#ffffff");
      //don't show any effect on #anebs-grph-1 #anebs-grph-2
      $("#anebs-grph-0").children(".anebs-grph-tabs-tab-options").css("display","none");
      $("#anebs-grph-0").children(".anebs-grph-tabs-tab-circ").css("background-color","#ffffff");
      $("#anebs-grph-0").children(".anebs-grph-tabs-tab-circ").children(".fa").css("color","#3098FF");
      $("#anebs-grph-2").children(".anebs-grph-tabs-tab-options").css("display","none");
      $("#anebs-grph-2").children(".anebs-grph-tabs-tab-circ").css("background-color","#ffffff");
      $("#anebs-grph-2").children(".anebs-grph-tabs-tab-circ").children(".fa").css("color","#3098FF");
    }
    else {
      $("#anebs-grph-1").children(".anebs-grph-tabs-tab-options").css("display","none");
      $("#anebs-grph-1").children(".anebs-grph-tabs-tab-circ").css("background-color","#ffffff");
      $("#anebs-grph-1").children(".anebs-grph-tabs-tab-circ").children(".fa").css("color","#3098FF");
    }
  },
  'click #anebs-grph-2': function(){
    //shows the dropdown
    if($("#anebs-grph-2").children(".anebs-grph-tabs-tab-options").css("display") == "none")
    {
      //shows the dropdown for only #anebs-grph-0
      $("#anebs-grph-2").children(".anebs-grph-tabs-tab-options").css("display", "inline");
      $("#anebs-grph-2").children("anebs-grph-tabs-tab-circ").css("background-color", "#3098FF");
      $("#anebs-grph-2").children("anebs-grph-tabs-tab-circ").children(".fa").css("color", "#ffffff");
      //don't show any effect on #anebs-grph-1 #anebs-grph-2
      $("#anebs-grph-1").children(".anebs-grph-tabs-tab-options").css("display","none");
      $("#anebs-grph-1").children(".anebs-grph-tabs-tab-circ").css("background-color","#ffffff");
      $("#anebs-grph-1").children(".anebs-grph-tabs-tab-circ").children(".fa").css("color","#3098FF");
      $("#anebs-grph-0").children(".anebs-grph-tabs-tab-options").css("display","none");
      $("#anebs-grph-0").children(".anebs-grph-tabs-tab-circ").css("background-color","#ffffff");
      $("#anebs-grph-0").children(".anebs-grph-tabs-tab-circ").children(".fa").css("color","#3098FF");
    }
    else {
      $("#anebs-grph-2").children(".anebs-grph-tabs-tab-options").css("display","none");
      $("#anebs-grph-2").children(".anebs-grph-tabs-tab-circ").css("background-color","#ffffff");
      $("#anebs-grph-2").children(".anebs-grph-tabs-tab-circ").children(".fa").css("color","#3098FF");
    }
  },
});
