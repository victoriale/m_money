/*Author: Sri Sindhusha Kuchipudi
  Created: 10/18/2015
  Description: .less file for quarterly_ECF webpage
  Associated Files: quarterly_ECF.html, quarterly_ECF.less, quarterly_ECF.js
*/

// to copy the data from url into session variable
Template.quarterly_ECF.onCreated(function(){
  Meteor.http.get('http://apifin.synapsys.us/call_controller.php?action=company_page&option=cash_flow&param=3330',
    function(error, data){
    Session.set("quarterly_E",data);
  });
})
// helpers to display data
Template.quarterly_ECF.helpers({
  //to get company name               
  cname:function(){
    var data = Session.get('quarterly_E');
    if(typeof data == "undefined")
    {
      return '';
    }
    var name = data['data']['cash_flow']['company_info']['c_name'];
    return name;
  },
  //to get the date in mm/dd/yyy at h:mm format
  getdate:function(UNIX_timestamp){
    var data = Session.get('quarterly_E');
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
    //to return the data in the bottom part
    data: function(){
      var data = Session.get('quarterly_E');
      //to set the border of the tile
      var borderArray = ["d","d","d","d","d","s","d","d","s","d","d","d","d","s","d","s","d","d","e"];
      var incomedata = data['data']['cash_flow']['cash_flow_data'];
      returnArray = [];
      for(var i = 0; i < Object.keys(incomedata).length; i++){
        returnArray[i] = {};
        returnArray[i]['metric'] = Object.keys(incomedata)[i];
        //to set the initial styles
        returnArray[i]['style1'] = "font-family:HN-B;";
        returnArray[i]['style2'] = "";
        returnArray[i]['style3'] = "";
        returnArray[i]['style4'] = "";

        //to get the numbers in each Quarter and trim it to display only two zeros at the end
        returnArray[i]['amnt1'] = incomedata[Object.keys(incomedata)[i]]['2015'].replace(/\b.000+/g, ".00");
        //If no number for a quarter then set it to -
        if(returnArray[i]['amnt1'] == undefined){
          returnArray[i]['amnt1'] = "-";
        }
        //If the number is negative, then set the color to red
        else if(parseInt(returnArray[i]['amnt1']) != NaN){

          if(parseInt(returnArray[i]['amnt1']) < 0){
            returnArray[i]['style1'] += "color:#ca1010;";
          }
        }
        returnArray[i]['amnt2'] = incomedata[Object.keys(incomedata)[i]]['2014'].replace(/\b.000+/g, ".00");
        if(returnArray[i]['amnt2'] == undefined){
          returnArray[i]['amnt2'] = "-";
        }
        else if(parseInt(returnArray[i]['amnt2']) != NaN){
          if(parseInt(returnArray[i]['amnt2']) < 0){
            returnArray[i]['style2'] += "color:#ca1010;";
          }
        }
        returnArray[i]['amnt3'] = incomedata[Object.keys(incomedata)[i]]['2013'].replace(/\b.000+/g, ".00");
        if(returnArray[i]['amnt3'] == undefined){
          returnArray[i]['amnt3'] = "-";
        }
        else if(parseInt(returnArray[i]['amnt3']) != NaN){
          if(parseInt(returnArray[i]['amnt3']) < 0){
            returnArray[i]['style3'] += "color:#ca1010;";
          }
        }
        returnArray[i]['amnt4'] = incomedata[Object.keys(incomedata)[i]]['2012'].replace(/\b.000+/g, ".00");
        if(returnArray[i]['amnt4'] == undefined){
          returnArray[i]['amnt4'] = "-";
        }
        else if(parseInt(returnArray[i]['amnt4']) != NaN){
          if(parseInt(returnArray[i]['amnt4']) < 0){
            returnArray[i]['style4'] += "color:#ca1010;";
          }
        }
      //To change the border
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

        //To change the color of the tile
        if(i%2 == 0){
          returnArray[i]['getcolor'] = 'white';
        }
        else{
          returnArray[i]['getcolor'] = 'grey';
        }
      }

      return returnArray;
    },
    // groups:[
    // {
    //   tiles1:[
    //     {name:'Net Income\/Starting Line',num1:'1,231.00', num2:'512.00', num3:'2,940.00', num4:'2,239.00'},
    //     {name:'Depreciation/Depletion',num1:'916.00', num2:'457.00', num3:'1,234.00', num4:'810.00'},
    //     {name:'Amortization',num1:'-', num2:'-', num3:'-', num4:'-'},
    //     {name:'Deffered Taxes',num1:'-289.00', num2:'-223.00', num3:'-210.00', num4:'-30.00'},
    //     {name:'Non-Cash Items',num1:'1,464.00', num2:'700.00', num3:'1,746.00', num4:'904.00'},
    //     {name:'Changes in Working Capital',num1:'258.00', num2:'254.00', num3:'-262.00', num4:'-49.00'},
    //   ]},{
    //   tiles2:[
    //     {name:'Cash from Operating Activities',num1:'3,580.00', num2:'1,700.00', num3:'1,700.00', num4:'3,874.00'},
    //     {name:'Capital Expenditures',num1:'-1,051.00', num2:'-502.00', num3:'-1,831.00', num4:'-1,314.00'},
    //     {name:'Other Investing Cash Flow Items, Total',num1:'-2,357.00', num2:'-2,342.00', num3:'-5,913.00', num4:'2,017.00'},
    //   ]},{
    //   tiles3:[
    //     {name:'Cash from Investing Activities',num1:'-3,048.00', num2:'512.00', num3:'2940.00', num4:'2239.00'},
    //     {name:'Financing Cash Flow Items',num1:'1,231.00', num2:'512.00', num3:'1,760.00', num4:'1,362.00'},
    //     {name:'Total Cash Dividends Paid',num1:'-', num2:'-', num3:'-', num4:'-'},
    //     {name:'Issuance (Retirement) of Stock, Net',num1:'0.00', num2:'0.00', num3:'18.00', num4:'7.00'},
    //     {name:'Issuance (Retirement) of Debt, Net',num1:'-84.00', num2:'-47.00', num3:'-243.00', num4:'-199.00'},
    //   ]},{
    //  tiles4:[
    //     {name:'Cash from Financing Activities',num1:'713.00', num2:'371.00', num3:'1,571.00', num4:'1,170.00'},
    //     {name:'Foreign Exchange Effects',num1:'-77.00', num2:'-123.00', num3:'-123.00', num4:'-71.00'},
    //   ]},{
    //   tiles5:[
    //     {name:'Net Change in Cash',num1:'808.00', num2:'-896.00', num3:'992.00', num4:'5,676.00'},
    //     {name:'Cash Interest Paid, Supplemental',num1:'5.00', num2:'3.00', num3:'15.00', num4:'11.00'},
    //     {name:'Cash Taxes Paid, Supplemental',num1:'159.00', num2:'119.00', num3:'184.00', num4:'107.00'},
    //   ]}
    // ]
});
// to display the highchart
function quarterlygraph() {
  $('#quarterly').highcharts({
    //dimensions of high chart
    chart:{
      width:650,
      height:197,
    },
    title: {
      text:''
    },
    //x-axis values
    xAxis:{
      categories: ['2006', '2007', '2008', '2009', '2010', '2011',
               '2012', '2013', '2014', 'Dec 08']
    },
    //to show a plain line without markers
    plotOptions: {
        series: {
          allowPointSelect: true,
            marker: {
              enabled: false
            }
        }
    },
    //y-axis values
    yAxis:{
      opposite:true,
      title: '',
      labels:{
        style: {
          fontSize: '13px',
          fontFamily: 'HN-L',
          color:'#666666'
        }
      }
    },

    legend: {
      //   layout: 'horizontal',
      //   align: 'top',
      //   verticalAlign: 'right',
      //   symbolHeight:100,
      //  backgroundColor: '#f2f2f2',
      //   x:225,
      //   y:-15,
      //   borderWidth: 0,
      //   style:{
      //     fontSize: '14px',
      //     fontFamily: 'HN',
      //     color:'#666666'
      //   }
      enabled:false
    },
    //to display the graph
    series: [{
           name: '$12.46 Million<br/>Investing',
           color: '#f7701d',
           type:'spline',
           data: [7.0, 6.9, 9.5, 14.5, 18.2, 21.5, 25.2, 26.5, 23.3, 18.3],
           marker: {
                symbol: "circle"
            }
       }, {
           name: '$4.99 Million<br/>Operating Income',
           color: '#3098ff',
           type:'spline',
           data: [-0.2, 0.8, 5.7, 11.3, 17.0, 22.0, 24.8, 24.1, 20.1, 14.1],
           marker: {
                symbol: "circle"
            }
       }, {
           name: '$2.94 Million<br/>Financing',
           color: '#ca1010',
           type:'spline',
           data: [-0.9, 0.6, 3.5, 8.4, 13.5, 17.0, 18.6, 17.9, 14.3, 9.0],
           marker: {
                symbol: "circle"
            }
    }],
    credits: {
                   enabled: false
               }
  });
}
//to display the graph and highlight the Q2 quarter on rendering
Template.quarterly_ECF.onRendered( function() {
      quarterlygraph();
      $("#Qt2").css("font-family","HN-B");
});
//events to change the sub menu buttons
// Template.quarterly_ECF.events({
//   'click .q_ECF-btm-subs-ky': function()
//   {
//       $("#ky").css("font-family","HN-B");
//       $("#Qt2").css("font-family","HN");
//       $("#Qt1").css("font-family","HN");
//       $("#Qt4").css("font-family","HN");
//       $("#Qt3").css("font-family","HN");
//   },
//   'click #Q2': function()
//   {
//       $("#ky").css("font-family","HN");
//       $("#Qt2").css("font-family","HN-B");
//       $("#Qt1").css("font-family","HN");
//       $("#Qt4").css("font-family","HN");
//       $("#Qt3").css("font-family","HN");
//   },
//   'click #Q1': function()
//   {
//       $("#ky").css("font-family","HN");
//       $("#Qt1").css("font-family","HN-B");
//       $("#Qt2").css("font-family","HN");
//       $("#Qt4").css("font-family","HN");
//       $("#Qt3").css("font-family","HN");
//   },
//   'click #Q4': function()
//   {
//       $("#ky").css("font-family","HN");
//       $("#Qt4").css("font-family","HN-B");
//       $("#Qt1").css("font-family","HN");
//       $("#Qt2").css("font-family","HN");
//       $("#Qt3").css("font-family","HN");
//   },
//   'click #Q3': function()
//   {
//       $("#ky").css("font-family","HN");
//       $("#Qt3").css("font-family","HN-B");
//       $("#Qt1").css("font-family","HN");
//       $("#Qt4").css("font-family","HN");
//       $("#Qt2").css("font-family","HN");
//   },
// });
