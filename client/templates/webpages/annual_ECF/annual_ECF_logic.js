/*Author: Sri Sindhusha Kuchipudi
  Created: 11/11/2015
  Description: .less file for quarterly_ECF webpage
  Associated Files: quarterly_ECF.html, quarterly_ECF.less, quarterly_ECF.js
*/

Template.annual_ECF.onCreated(function(){
  var id = Session.get("profile_header").c_id;
//var id=3330;
  Meteor.http.get('http://apifin.investkit.com/call_controller.php?action=company_page&option=cash_flow&param=' + id,
    function(error, data) {
        Session.set("annual_ECF",data);
        annualECFgraph();
    }
  );
})

function oper(){
  var data = Session.get('annual_ECF')
  var target = data.data.cash_flow.cash_flow_data["Cash from Operating Activities"];
  var out = [];
  out[0] = parseFloat(target["2009"]);
  out[1] = parseFloat(target["2010"]);
  out[2] = parseFloat(target["2011"]);
  out[3] = parseFloat(target["2012"]);
  out[4] = parseFloat(target["2013"]);
  out[5] = parseFloat(target["2014"]);
  out[6] = parseFloat(target["2015"]);
  return out;
  // var data = Session.get('annual_ECF');
  // rarray1 = [];
  // var index=0;
  // var count1=data['data']['cash_flow']['cash_flow_data']['Cash from Operating Activities'];
  // for(var i = 0; i < Object.keys(count1).length; i++){
  //   rarray1[index]=count1[Object.keys(count1)[i]];
  //   index++;
  // }
  // // Session.set("financing", rarray1);
  // // var data1 = Session.get("financing");
  // return rarray1;
}

function inves(){
  var data = Session.get('annual_ECF')
  var target = data.data.cash_flow.cash_flow_data["Cash from Investing Activities"];
  var out = [];
  out[0] = parseFloat(target["2009"]);
  out[1] = parseFloat(target["2010"]);
  out[2] = parseFloat(target["2011"]);
  out[3] = parseFloat(target["2012"]);
  out[4] = parseFloat(target["2013"]);
  out[5] = parseFloat(target["2014"]);
  out[6] = parseFloat(target["2015"]);
  return out;
  // var data = Session.get('annual_ECF');
  // rarray2 = [];
  // var index=0;
  // var count2=data['data']['cash_flow']['cash_flow_data']['Cash from Investing Activities'];
  // for(var i = 0; i < Object.keys(count2).length; i++){
  //   rarray2[index]=count2[Object.keys(count2)[i]];
  //   index++;
  // }
  // // Session.set("financing", rarray2);
  // // var data2 = Session.get("financing");
  // return rarray2;
}

function finan(){
  var data = Session.get('annual_ECF')
  var target = data.data.cash_flow.cash_flow_data["Cash from Financing Activities"];
  var out = [];
  out[0] = parseFloat(target["2009"]);
  out[1] = parseFloat(target["2010"]);
  out[2] = parseFloat(target["2011"]);
  out[3] = parseFloat(target["2012"]);
  out[4] = parseFloat(target["2013"]);
  out[5] = parseFloat(target["2014"]);
  out[6] = parseFloat(target["2015"]);
  return out;
  // var data = Session.get('annual_ECF');
  // rarray3 = [];
  // var index=0;
  // var count3=data['data']['cash_flow']['cash_flow_data']['Cash from Financing Activities'];
  // for(var i = 0; i < Object.keys(count3).length; i++){
  //   rarray3[index]=count3[Object.keys(count3)[i]];
  //   index++;
  // }
  // // Session.set("financing", rarray3);
  // // var data3 = Session.get("financing");
  // return rarray3;
}
function annualECFgraph() {
  var invest = inves();
  var opera = oper();
  var fin = finan();

    $('#annualECFgraph').highcharts({
      chart: {
      type: 'spline',
      width: 676,
      height: 275,
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
      categories: ['2009', '2010', '2011', '2012', '2013', '2014', '2015']
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
      data: opera,
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

Template.annual_ECF.helpers({
  yr:[
    {lbl:"2015"},{  lbl:"2014"},{  lbl:"2013"},{  lbl:"2012"},{  lbl:"2011"},{  lbl:"2010"},{  lbl:"2009"}
  ],

  fyr: function(){
    return 2015;
  },
  cname:function()
  {
    var dt =Session.get('operating');
    var data = Session.get('annual_ECF');
    if(typeof data == "undefined")
    {
      return '';
    }
    var name =data['data']['cash_flow']['company_info']['c_name'];
    return name;
  },
  getdate:function(UNIX_timestamp){
    var data = Session.get('annual_ECF');
    if(typeof data == "undefined")
    {
      return '';
    }
    var inputDate = data['data']['cash_flow']['company_info']['c_tr_last_updated'];
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
  loc: function(){
    var data = Session.get('annual_ECF');
    var city = data['data']['cash_flow']['company_info']['c_hq_city'];
    city = city.replace(/\w\S*/g, function(txt) {
        return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });
    var state = data['data']['cash_flow']['company_info']['c_hq_state'];
    return city + ", " + state;
  },
  logo:function()
  {
    var data = Session.get('annual_ECF');
    if(typeof data == "undefined")
    {
      return '';
    }
    var logo =data['data']['cash_flow']['company_info']['c_logo'];
    return logo;
  },
  money1:function(){
    var data = Session.get('annual_ECF');
    if(typeof data == "undefined")
    {
      return '';
    }
    var money=data['data']['cash_flow']['cash_flow_data']['Cash from Operating Activities'][2014].replace(/\b.000+/g, ".00");
    if(money > 1000 ||  money < -1000)
    {
      money /= 1000;
      return "$" + money.toFixed(2) + " Billion";
    }
    return "$" + money + " Million";
    },
  money2:function(){
    var data = Session.get('annual_ECF');
    if(typeof data == "undefined")
    {
      return '';
    }
    var money=data['data']['cash_flow']['cash_flow_data']['Cash from Investing Activities'][2014].replace(/\b.000+/g, ".00");
    if(money > 1000 || money < -1000)
    {
      money /= 1000;
      return "$" + money.toFixed(2) + " Billion";
    }
    return "$" + money + " Million";
  },
  money3:function(){
    var data = Session.get('annual_ECF');
    if(typeof data == "undefined")
    {
      return '';
    }
    var money=data['data']['cash_flow']['cash_flow_data']['Cash from Financing Activities'][2014].replace(/\b.000+/g, ".00");
    if(money > 1000 || money < -1000)
    {
      money /= 1000;
      return "$" + money.toFixed(2) + " Billion";
    }
    return "$" + money + " Million";
  },

  year: "2014",
  data: function(){
    var data = Session.get('annual_ECF');
    var borderArray = ["d","d","d","d","d","s","d","d","s","d","d","d","d","s","d","s","d","d","d"];
    var cashflowdata = data['data']['cash_flow']['cash_flow_data'];
    returnArray = [];
    for(var i = 0; i < Object.keys(cashflowdata).length; i++){
      returnArray[i] = {};
      returnArray[i]['metric'] = Object.keys(cashflowdata)[i];
      //Set initial styles
      returnArray[i]['style1'] = "font-family:HN-B;";
      returnArray[i]['style2'] = "";
      returnArray[i]['style3'] = "";
      returnArray[i]['style4'] = "";

      //Set amounts
      returnArray[i]['amnt1'] = cashflowdata[Object.keys(cashflowdata)[i]]['2014'];
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
      returnArray[i]['amnt2'] = cashflowdata[Object.keys(cashflowdata)[i]]['2013'];
      if(returnArray[i]['amnt2'] == undefined){
        returnArray[i]['amnt2'] = "-";
      }
      else {
        if(parseFloat(returnArray[i]['amnt1']) != NaN){
          returnArray[i]['amnt2'] = parseFloat(returnArray[i]['amnt2']).toFixed(2);
          if(parseFloat(returnArray[i]['amnt2']) < 0){
            returnArray[i]['style2'] += "color:#ca1010  ;";
          }
        }
      }
      returnArray[i]['amnt3'] = cashflowdata[Object.keys(cashflowdata)[i]]['2012'];
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
      returnArray[i]['amnt4'] = cashflowdata[Object.keys(cashflowdata)[i]]['2011'];
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
Template.annual_ECF.events({
  'click #tab1': function() {
    event.stopPropagation();
      $('#drop1').slideToggle();
      $('#drop2').slideUp();
      $('#drop3').slideUp();
  },
  'click #tab2': function() {
    event.stopPropagation();
      $('#drop2').slideToggle();
      $('#drop3').slideUp();
      $('#drop1').slideUp();
  },
  'click #tab3': function() {
    event.stopPropagation();
      $('#drop3').slideToggle();
      $('#drop2').slideUp();
      $('#drop1').slideUp();
  },
});
$(document).click( function(){
  $('#drop3').slideUp();
  $('#drop2').slideUp();
  $('#drop1').slideUp();
});
