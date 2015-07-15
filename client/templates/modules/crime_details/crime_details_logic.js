/*Author: [Prashanth Diddi]
Created: [05/30/2015]
Description: [.js file for Crime Details Module where pie chart code and logic related to crime details module is written]
Associated Files: [crime_details.html,crime_details.less,crime_details_logic.html]
*/
//runs on page start and will keep trying until the data is received and run the function
Template.crime_details.onRendered(function(){
  this.autorun(function () {
    //display image of current location of listing inside pie chart
    var image = Session.get("profile_header");
    //$('.crimedetails-piechartimage').attr('src',image.photo);

    //will keep rerunning if data is coming back undefined
    if(typeof Session.get("crime_details") == "undefined"){
      return "";
    }
    //grabs from api to get total stats and create percent
    var crime_data = Session.get("crime_details")['total_stats'];
    var total_crime = crime_data.Arrest + crime_data.Assault + crime_data.Burglary + crime_data.Other + crime_data.Robbery + crime_data.Theft + crime_data.Vandalism;

    //returns certain values based off of which profile they are in
    if(Session.get("isListing")){
      var crime1 = parseFloat((crime_data.Assault/total_crime).toFixed(2)*100);
      crime1 = Math.floor(crime1);
      var crime2 = parseFloat((crime_data.Burglary/total_crime).toFixed(2))*100;
      crime1 = Math.floor(crime2);
      var crime3 = parseFloat((crime_data.Arrest/total_crime).toFixed(2))*100;
      crime1 = Math.floor(crime3);
      var crime4 = parseFloat(((crime_data.Other+crime_data.Robbery+crime_data.Vandalism+crime_data.Theft)/total_crime).toFixed(2))*100;
      crime1 = Math.floor(crime4);
      var x1 = "Assault";
      var x2 = "Burglary";
      var x3 = "Arrest";
      var x4 = "Other";
    }else {
      var crime1 = parseFloat((crime_data.Assault/total_crime).toFixed(2))*100;
      crime1 = Math.floor(crime1);
      var crime2 = parseFloat((crime_data.Theft/total_crime).toFixed(2))*100;
      crime1 = Math.floor(crime2);
      var crime3 = parseFloat((crime_data.Robbery/total_crime).toFixed(2))*100;
      crime1 = Math.floor(crime3);
      var crime4 = parseFloat(((crime_data.Other+crime_data.Arrest+crime_data.Vandalism+crime_data.Burglary)/total_crime).toFixed(2))*100;
      crime1 = Math.floor(crime4);
      var x1 = "Assault";
      var x2 = "Theft";
      var x3 = "Robbery";
      var x4 = "Other";
    }
    //set colors and  data for piechartSession.get("isListing")
    var colors =     Highcharts.setOptions({
        colors: ['#3098ff', '#ca1010', '#FFBD2F', '#6D0E77']
    }),
    data = [{
            categories: [x1, x2, x3,x4],
            data: [ crime1, crime2, crime3,crime4]
    }],
    crimeData = [],
    dataLen = data.length,
    crimeDataLen;

    // Build the data arrays
    for (i = 0; i < dataLen; i += 1) {
        // add version data
        crimeDataLen = data[i].data.length;
        for (j = 0; j < crimeDataLen; j += 1) {
            crimeData.push({
                name: data[i].categories[j],
                y: data[i].data[j]
            });
        }
    }
    Session.set("crimeData", crimeData);
    Session.set("crime1",x1);
    Session.set("crime2",x2);
    Session.set("crime3",x3);
    Session.set("crime4",x4);
    Session.set("crimepercent1",crime1);
    Session.set("crimepercent2",crime2);
    Session.set("crimepercent3",crime3);
    Session.set("crimepercent4",crime4);

    //calls the create chart function to create pie chart
    crime_chart();
    //METEOR CALL to grab news for crime_detail
      Meteor.http.get("http://api.synapsys.us/listhuv/?action=crime_details&city="+image.city+"&state="+image.state+"&full=1", function(error, result){
        if(error){
          console.log("crime_detail call FAILED");
        }
        else {
          Session.set("crime_news",result['data']['result']);
        }
      });
  });
})

// Create the chart
function crime_chart(){
$('.crime_chart').highcharts({
    chart: {
        type: 'pie',
        backgroundColor:'rgba(255, 255, 255, 0.1)'
    },
    title: {
        useHTML:true,
        text: "",
        verticalAlign: 'middle',
    },
    plotOptions: {
        pie: {
            shadow: false,
            cursor: 'pointer',
            dataLabels:{
              enabled: false,
            }
        },
        series: {
            allowPointSelect: true
        }
    },
    tooltip: {
        valueSuffix: '%'
    },
    series: [{
        name: 'Crime Rate',
        data: Session.get("crimeData"),
        borderWidth: 0,
        size: '100%',
        innerSize: '59%'
    }],
    credits: {
      enabled: false
    }
  });
}

//helpers to fill in data points on html
Template.crime_details.helpers({
  //Lutz Added:
  chartImg: function(){
    var image = Session.get("profile_header");
    return image.photo ? image.photo :
    'http://images.chicagotraveler.com/sites/default/files/billboard/cloud-gate_C.jpg';
  },
  crime1: function(){
    data = Session.get("crime1");
    if(typeof data == "undefined"){
      return "";
    }
    return data;
  },
  crime2: function(){
    data = Session.get("crime2");
    if(typeof data == "undefined"){
      return "";
    }
    return data;
  },
  crime3: function(){
    data = Session.get("crime3");
    if(typeof data == "undefined"){
      return "";
    }
    return data;
  },
  crime4: function(){
    data = Session.get("crime4");
    if(typeof data == "undefined"){
      return "";
    }
    return data;
  },
  crimepercent1: function(){
    data = Session.get("crimepercent1");
    if(typeof data == NaN){
      return "";
    }
    return data;
  },
  crimepercent2: function(){
    data = Session.get("crimepercent2");
    if(typeof data == NaN){
      return "";
    }
    return data;
  },
  crimepercent3: function(){
    data = Session.get("crimepercent3");
    if(typeof data == NaN){
      return "";
    }
    return data;
  },
  crimepercent4: function(){
    data = Session.get("crimepercent4");
    if(typeof data == NaN){
      return "";
    }
    return data;
  },
  location: function(){
    var location = Session.get("profile_header");
    if(typeof location == "undefined"){
      return "";
    }
    if(Session.get("isListing")){
      return location.street_address;
    }else {
      return location.city + (", ") + location.state;
    }
  },

  crime_news_type1: function(){
    var type = Session.get("crime_news");
    if ( typeof type[150] != "undefined" ) {
      return type[30].type;
    }
    return type[150].type;
  },
  crime_news1: function(){
    var news = Session.get("crime_news");
    if(typeof news[150] == "undefined"){
      return (news[30].desc);
    }
    return blankdesc(news[150].desc);
  },
  crime_date1: function(){
    var date = Session.get("crime_news");
    if(typeof date[150] == "undefined"){
      return date[30].datetime_human;
    }
    return date[150].datetime_human;
  },
  crime_news_type2: function(){
    var type = Session.get("crime_news");
    if(typeof type[100] == "undefined"){
      return type[20].type;
    }
    return type[100].type;
  },
  crime_news2: function(){
    var news = Session.get("crime_news");
    if(typeof news[100] == "undefined"){
      return blankdesc(news[20].desc);
    }
    return blankdesc(news[100].desc);
  },
  crime_date2: function(){
    var date = Session.get("crime_news");
    if(typeof date[100] == "undefined"){
      return date[20].datetime_human;
    }
    return date[100].datetime_human;
  },
  crime_news_type3: function(){
    var type = Session.get("crime_news");
    if(typeof type[200] == "undefined"){
      return type[10].type;
    }
    return type[200].type;
  },
  crime_news3: function(){
    var news = Session.get("crime_news");
    if(typeof news[200] == "undefined"){
      return blankdesc(news[10].desc);
    }
    return blankdesc(news[200].desc);
  },
  crime_date3: function(){
    var date = Session.get("crime_news");
    if(typeof date[200] == "undefined"){
      return date[10].datetime_human;
    }
    return date[200].datetime_human;
  },
  crime_news_type4: function(){
    var type = Session.get("crime_news")
    if(typeof type[270] == "undefined"){
      return type[0].type;
    };
    return type[270].type;
  },
  crime_news4: function(){
    var news = Session.get("crime_news");
    if(typeof news[270] == "undefined"){
      return blankdesc(news[0].desc);
    }
    return blankdesc(news[270].desc);
  },
  crime_date4: function(){
    var date = Session.get("crime_news");
    if(typeof date[270] == "undefined"){
      return date[0].datetime_human;
    }
    return date[270].datetime_human;
  },
})

function blankdesc(text){
  if(text == ''){
    return "Happened on ";
  }
  return text;
}
