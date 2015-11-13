/*
Author: Ryan Fisher
Created: 8/24/2015
Description: article_news_page module
Associated Files: article_news_page.html, article_news_page.less
*/

Template.article_news_page.onCreated(function(){
  Session.set('anpCount',0);
})

Template.article_news_page.onRendered(function(){

  this.autorun(function(){
    var data, urlString;
    var params = Router.current().getParams();
    if(typeof params.company_id != 'undefined'){
      data = Session.get('profile_header');
      if(data != undefined){
        var ticker = params.ticker;
        urlString = "http://api.synapsys.us/news/?action=get_finance_news&ticker=" + ticker;
      }
    } else if(typeof params.fname != 'undefined'){
      data = Session.get('profile_header');
      if(data != undefined){
        var ticker = params.ticker;
        var name = params.fname + "+" + params.lname;
        urlString = "http://api.synapsys.us/news/?action=get_finance_news&ticker=" + ticker + "&name=" + name;
      }
    } else if(typeof params.loc_id != 'undefined'){
      var city = fullstate(params.loc_id);
      urlString = "http://api.synapsys.us/news/?action=get_finance_news&city=" + city;
    }
    else{
      urlString = "http://api.synapsys.us/news/?action=get_finance_news";
    }
    Meteor.http.get(urlString,
      function(error, data){
      Session.set("article_news_page",data);
    });
  });

  Session.set('main_tag_hidden_count', 0);
  Session.set('topleft_tag_hidden_count', 0);
  Session.set('toprght_tag_hidden_count', 0);
  Session.set('botleft_tag_hidden_count', 0);
  Session.set('botrght_tag_hidden_count', 0);
})

Template.article_news_page.events({
  'click .art-lst-hdr-lefthov': function(){
    var counter = Session.get("anpCount");
    var tnews = Session.get('article_news_page');
    if(counter > 0){
      counter--;
      Session.set("anpCount",counter);
    }
    else
    {
      counter = tnews['data'].length-1;
      Session.set("anpCount", counter);
    }
  },
  'click .art-lst-hdr-righthov': function(){
    var counter = Session.get("anpCount");
    var tnews = Session.get('article_news_page');
    if(counter < tnews['data'].length - 1)
    {
      counter++;
      Session.set("anpCount",counter);
    }
    else
    {
      counter = 0;
      Session.set("anpCount", counter);
    }
  },
  //Event close tooltip
  'click .art-lst-whatis-header-x': function(e, t){
    t.$('.art-lst-whatis').hide();
  }
})

Template.article_news_page.helpers({
  topImage: function(){
    var params = Router.current().getParams();
    console.log(params);
    var getName = Router.current().route.getName();
    console.log(getName);
    var data = Session.get('loc_id');
    //if partner domain exists then choose the
    if(typeof params.loc_id == 'undefined'){
      var partner_image = Session.get('profile_header');
      if(partner_image.dma_code == null){
        return "background-image: url('/StateImages/Location_"+partner_image['location'] +".jpg');";
      }else{
        return "background-image: url('/DMA_images/location-"+partner_image['dma_code'].split(',')[0]+".jpg');";
      }
    }
    //otherwise take url data to detmine what image to show statewise
    if(data == 'National' || data == '' || typeof data == 'undefined'){
      return "background-image: url('/StateImages/Location_National.jpg');";
    }else{
      if(isNaN(data)){
        data = fullstate(data) || data;
        data = data.replace(/ /g, '_');
        return "background-image: url('/StateImages/Location_"+data+".jpg');";
      }else{
        return "background-image: url('/DMA_images/location-"+data+".jpg');";
      }
    }
  },
  headerinfo: function(){
    var params = Router.current().getParams();
    var data = Session.get('profile_header');
    var returnObj = {};

    if(typeof params.company_id !== 'undefined'){
      returnObj.location = data.c_hq_city + ', ' + data.c_hq_state;
      returnObj.name = data.c_name;
      returnObj.url = 'http://apifin2.synapsys.us/images/' + data.c_logo;
    }else if(typeof params.fname !== 'undefined'){

    }else if(typeof params.loc_id !== 'undefined'){
      returnObj.location = data.location;
      returnObj.name = data.location;
      returnObj.url = '/StateImages/Location_' + data.location +'.jpg';
    }

    return returnObj;
  },
  shareURL: function(){
    var news = Session.get('article_news_page');
    var count = Session.get('anpCount');

    if(typeof news != 'undefined'){
      return "https://www.facebook.com/sharer/sharer.php?u=" + news.data[count].link;
    }
  },
  newsCarousel: function(){
    var news = Session.get('article_news_page');
    var count = Session.get('anpCount');
    if(typeof news != 'undefined'){
      return news['data'][count];
    }else{
      return '';
    }
  },

  dateWritten: function(){
    var news = Session.get('article_news_page');
    var count = Session.get('anpCount');
    if(typeof news != 'undefined'){
      var date = Number(news['data'][count]['pubDate_ut']) * 1000;
      return get_full_date(date);
    }else{
      return '';
    }
  },

  isData: function(){
    var data = Session.get('article_news_page');
    if(typeof data == undefined){
      return false;
    }
    else if(data.data.length == 0){
      return false;
    }
    return true;
  },
  isComp: function(){
    return Session.get('IsCompany');
  },
  isExec: function(){
    return Session.get('IsExec');
  },
  isLoc: function(){
    return Session.get('IsLocation');
  },
  company: function(){
    data = Session.get('profile_header');
    if(typeof data == undefined){
      return '';
    }
    return data['c_name'];
  },
  exec: function(){
    data = Session.get('profile_header');
    if(typeof data == undefined){
      return '';
    }
    return data['o_first_name'] + " " + data['o_last_name'];
  },
  loc: function(){
    data = Session.get('fl_data');
    if(typeof data == undefined){
      return '';
    }
    return data['company_location'];
  },
  updt_dt: function(){
    return "05/24/2015, 12:36PM EDT";
  },
  main_title: function(){
    var data = Session.get('article_news_page');
    if(data!=undefined){
      return data.data[0]['title'];
    }
    else {
      return "";
    }
  },
  main_description: function(){
    var data = Session.get('article_news_page');
    if(data!=undefined)
    return data.data[0]['description'];
    else {
      return "";
    }
  },
  main_pub: function(){
    var data = Session.get('article_news_page');
    if(data!=undefined){
    return data.data[0]['publisher'];
    }
    else {
      return "";
    }
  },
  main_url:function(){
    var data = Session.get('article_news_page');
    if(data!=undefined){
      return data.data[0]['link'];
    }
    else {
      return "";
    }
  },
  main_image: function(){
    var data = Session.get('article_news_page');
    if(data!=undefined)
    {
      return data.data[0]['lead_image'];
    }
    else {
      return "";
    }
  },
  main_time: function(){
    var data = Session.get('article_news_page');
    if(data!=undefined)
    {

      return convert_time_full(data.data[0]['pubDate_ut'] * 1000);
    }
  },
  mntags:function(){
    var data = Session.get('article_news_page');
    if(data!=undefined){
      tagArray = data.data[0]['tags'].split(", ");
      return tagArray;
    }
    else {
      return "";
    }
  },
  mnnum:function(){
    return Session.get('main_tag_hidden_count');
  },

  artlft: function(){
    var data = Session.get('article_news_page');
    var returnArray = [];
    var tagArray = [];
    var i, j = 0;

    for(i = 1; i < data.data.length; i+=2){
      returnArray[j] = {};
      returnArray[j]['url'] = data.data[i]['link'];
      returnArray[j]['fontawesome'] = "fa fa-newspaper-o";
      returnArray[j]['type'] = "Article";
      if(data.data[i]['tags'] != null){
        tagArray = data.data[i]['tags'].split(", ");
      }
      returnArray[j]['buttons'] = tagArray.slice(0);
      if(i == 1){
        returnArray[j]['num'] = Session.get('topleft_tag_hidden_count');
      }
      else{
        returnArray[j]['num'] = Session.get('botleft_tag_hidden_count');
      }

      //Set index for each tag to index of article
      for(k = 0; k < returnArray[j]['buttons'].length; k++){
        returnArray[j]['buttons'][k] = {};
        returnArray[j]['buttons'][k]['string'] = tagArray[k];
        returnArray[j]['buttons'][k]['index'] = i;
      }

      returnArray[j]['image'] = data.data[i]['lead_image'];
      returnArray[j]['title'] = data.data[i]['title'];
      returnArray[j]['pub'] = data.data[i]['publisher'];
      returnArray[j]['time'] = convert_time_full(data.data[i]['pubDate_ut'] * 1000);
      returnArray[j]['index'] = i;
      j++;
    }

    return returnArray;
  },


  // Right Pane
  artrt: function(){
    var data = Session.get('article_news_page');
    var returnArray = [];
    var tagArray = [];
    var i, j = 0;

    for(i = 2; i < data.data.length; i+=2){
      returnArray[j] = {};
      returnArray[j]['url'] = data.data[i]['link'];
      returnArray[j]['fontawesome'] = "fa fa-newspaper-o";
      returnArray[j]['type'] = "Article";
      if(data.data[i]['tags'] != null){
        tagArray = data.data[i]['tags'].split(", ");
      }
      returnArray[j]['buttons'] = tagArray.slice(0);
      if(i == 2){
        returnArray[j]['num'] = Session.get('toprght_tag_hidden_count');
      }
      else{
        returnArray[j]['num'] = Session.get('botrght_tag_hidden_count');
      }

      //Set index for each tag to index of article
      for(k = 0; k < returnArray[j]['buttons'].length; k++){
        returnArray[j]['buttons'][k] = {};
        returnArray[j]['buttons'][k]['string'] = tagArray[k];
        returnArray[j]['buttons'][k]['index'] = i;
      }

      returnArray[j]['image'] = data.data[i]['lead_image'];
      returnArray[j]['title'] = data.data[i]['title'];
      returnArray[j]['pub'] = data.data[i]['publisher'];
      returnArray[j]['time'] = convert_time_full(data.data[i]['pubDate_ut'] * 1000);
      returnArray[j]['index'] = i;
      j++;
    }

    return returnArray;
  },

 isNotZero: function(num) {
   return num != 0;
 },

 isM: function(num) {
   return num < 10;
 },

 isL: function(num) {
   return num > 9;
 },


});

timeConverter = function(UNIX_timestamp){
  var a = new Date(UNIX_timestamp*1000);
  var year = a.getFullYear();
  var month = a.getMonth();
  var date = a.getDate();
  var hour = a.getHours();
  var min = a.getMinutes();
  var sec = a.getSeconds();
  var time = ('on'+' '+(month.toString().length===1)?('0'+month):month) + '/' + ((date.toString().length===1)?('0'+date):date) + '/' + year+ ' '+'at'+ ' ' + ((hour>12)?(hour-12):hour) + ':' + min +' '+ ((hour>12)?('pm'):'am') ;
  return time;
}


//When a tag is rendered check to see if it fits within the allowed specs (300 width). If not remove from DOM and increment counter
Template.main_tag_item.onRendered(function(){
  switch(this.data.artindex){
    case 0:
      if(this.firstNode.offsetLeft + this.firstNode.offsetWidth > 375){
        //Get count to increment
        var count = Session.get('main_tag_hidden_count');
        //Remove node from DOM
        $(this.firstNode).remove();
        //Increment count session var
        Session.set('main_tag_hidden_count', count + 1);
      }
      break;
    case 1:
      if(this.firstNode.offsetLeft + this.firstNode.offsetWidth > 250){
        //Get count to increment
        var count = Session.get('topleft_tag_hidden_count');
        //Remove node from DOM
        $(this.firstNode).remove();
        //Increment count session var
        Session.set('topleft_tag_hidden_count', count + 1);
      }
      break;
    case 2:
      if(this.firstNode.offsetLeft + this.firstNode.offsetWidth > 250){
        //Get count to increment
        var count = Session.get('toprght_tag_hidden_count');
        //Remove node from DOM
        $(this.firstNode).remove();
        //Increment count session var
        Session.set('toprght_tag_hidden_count', count + 1);
      }
      break;
    case 3:
      if(this.firstNode.offsetLeft + this.firstNode.offsetWidth > 250){
        //Get count to increment
        var count = Session.get('botleft_tag_hidden_count');
        //Remove node from DOM
        $(this.firstNode).remove();
        //Increment count session var
        Session.set('botleft_tag_hidden_count', count + 1);
      }
      break;
    case 4:
      if(this.firstNode.offsetLeft + this.firstNode.offsetWidth > 250){
        //Get count to increment
        var count = Session.get('botrght_tag_hidden_count');
        //Remove node from DOM
        $(this.firstNode).remove();
        //Increment count session var
        Session.set('botrght_tag_hidden_count', count + 1);
      }
      break;
    default:
      if (this.data.artindex % 2 == 1 ) {
        if(this.firstNode.offsetLeft + this.firstNode.offsetWidth > 250){
          //Get count to increment
          var count = Session.get('botleft_tag_hidden_count');
          //Remove node from DOM
          $(this.firstNode).remove();
          //Increment count session var
          Session.set('botleft_tag_hidden_count', count + 1);
        }
      } else {
        if(this.firstNode.offsetLeft + this.firstNode.offsetWidth > 250){
          //Get count to increment
          var count = Session.get('botrght_tag_hidden_count');
          //Remove node from DOM
          $(this.firstNode).remove();
          //Increment count session var
          Session.set('botrght_tag_hidden_count', count + 1);
        }
      }
      break;
  }
})
