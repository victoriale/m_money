/*Author:Ramakrishna Vaibhav kasibhatla [Ram]
Created: [06/09/2015]
Description: [Trending Realtors in Chicago, IL]*/
/*Calling the function for the template named trending_realtors*/
Template.trending_stories_today.onRendered(function(){
  Meteor.call('GetProfileData',function(error,result){
    /*if and else statement for no error*/
    if(!error){
      Session.set("trending_stories_today_data",result);
      Session.set("counter_trd",0);
      if(result != undefined)
             setImage(result);
    }
    else{
      /*if an error occurs*/
      console.log("ERROR");
    };
  })
});
/* the event calls for the right navigation button*/
Template.trending_stories_today.events({
  'click .trd_str-right-nav-button': function() {
    var counter = Session.get("counter_trd");
    /* increment the counter by 1 on every click*/
    Session.set("counter_trd",counter+1);
    console.log("right-click");
  },
  /*the event calls for the left navigation button*/
  'click .trd_str-left-nav-button': function() {
    var counter = Session.get("counter_trd");
    if(counter>0)
    /*decrement the counter by 1 on every click of left nav button*/
    Session.set("counter_trd",counter-1);
    console.log("left-click");
  }
})

/*calling of the helper data to returned at the time of the nav button active*/
Template.trending_stories_today.helpers({
  /*to call the city (ex: Chicago, Wichita)*/
  trd_str_Location: function(){
    var data = Session.get("trending_stories_today_data");
    return data['residential']['items'][Session.get("counter_trd")]['Address'].City;
  },
  /* to call the state (ex: KS, IL)*/
  trd_str_State: function(){
    var data = Session.get("trending_stories_today_data");
    return data['residential']['items'][Session.get("counter_trd")]['Address'].StateOrProvince;
  },

  /* to call the website Url on click of the Broker office name */
  trd_str_WebsiteURL: function(){
    var data = Session.get("trending_stories_today_data");
    return data['residential']['items'][Session.get("counter_trd")]['Brokerage'].WebsiteURL;
  },

  trd_str_WebsiteURL: function(){
    var data = Session.get("trending_realtors_data");
    return data['residential']['items'][Session.get("counter_trd")]['Brokerage'].name;
  },
  /* for the above is implemented in the submain1*/
  /*the display of the realtor for count is +1*/
  trd_str_name: function(){
    var data = Session.get("trending_realtors_data");
    return data['residential']['items'][Session.get("counter_trd")+1]['Brokerage'].Name;
  },

  /* for the above is implemented in the submain2*/
  /*the display of the realtor for count is +2*/
  trending_realtorsBrokarageName2: function(){
    var data = Session.get("trending_realtors_data");
    return data['residential']['items'][Session.get("counter_trd")+2]['Brokerage'].Name;
  },
  trending_realtorsBrokarageaUrl2: function(){
    var data = Session.get("trending_realtors_data");
    return data['residential']['items'][Session.get("counter_trd")+2]['Brokerage'].WebsiteURL;
  },
  /* for the above is implemented in the submain3*/
  /*the display of the realtor for count is +3*/
  trending_realtorsBrokarageName3: function(){
    var data = Session.get("trending_realtors_data");
    return data['residential']['items'][Session.get("counter_trd")+3]['Brokerage'].Name;
  },
  trending_realtorsBrokarageaUrl3: function(){
    var data = Session.get("trending_realtors_data");
    return data['residential']['items'][Session.get("counter_trd")+3]['Brokerage'].WebsiteURL;
  }
})


function setImage(data)
{

$('.trd_str-whiteround').css("background-image", "url("+data['residential']['items'][Session.get("counter_trd")]['Brokerage'].LogoURL+")");
$('.trd_str-round-1').css("background-image", "url("+data['residential']['items'][Session.get("counter_trd")+1]['Brokerage'].LogoURL+")");
$('.trd_str-round-2').css("background-image", "url("+data['residential']['items'][Session.get("counter_trd")+2]['Brokerage'].LogoURL+")");
$('.trd_str-round-3').css("background-image", "url("+data['residential']['items'][Session.get("counter_trd")+3]['Brokerage'].LogoURL+")");
}
