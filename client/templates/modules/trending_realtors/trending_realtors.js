/*Author:Ramakrishna Vaibhav kasibhatla [Ram]
Created: [06/09/2015]
Description: [Trending Realtors in Chicago, IL]*/
/*Calling the function for the template named trending_realtors*/
Template.trending_realtors.onRendered(function(){
  Meteor.call('GetProfileData',function(error,result){
    /*if and else statement for no error*/
    if(!error){
      Session.set("trending_realtors_data",result);
      /*Counter is replaced by a name realtor*/
      Session.set("realtor",0);
    }
    else{
      /*if an error occurs*/
      console.log("ERROR");
    };
  })
});
/* the event calls for the right navigation button*/
Template.trending_realtors.events({
  'click .trds-right-button-hov': function() {
    var realtor = Session.get("realtor");
    /* increment the realtor by 1 on every click*/
    Session.set("realtor",realtor+1);
    console.log("okk");
  },
  /*the event calls for the left navigation button*/
  'click .trds-left-button-hov': function() {
    var realtor = Session.get("realtor");
    if(realtor>0)
    /*decrement the realtor by 1 on every click of left nav button*/
    Session.set("realtor",realtor-1);
    console.log("kko");
  }
})

/*calling of the helper data to returned at the time of the nav button active*/
Template.trending_realtors.helpers({
  /*to call the city (ex: Chicago, Wichita)*/
  trending_realtorsLocation: function(){
    var data = Session.get("trending_realtors_data");
    return data['residential']['items'][Session.get("realtor")]['Address'].City;
  },
  /* to call the state (ex: KS, IL)*/
  trending_realtorsState: function(){
    var data = Session.get("trending_realtors_data");
    return data['residential']['items'][Session.get("realtor")]['Address'].StateOrProvince;
  },
  /*to call the broker office name (Ex: Select Homes, @properties)*/
  trending_realtorsBrokarageName: function(){
    var data = Session.get("trending_realtors_data");
    return data['residential']['items'][Session.get("realtor")]['Brokerage'].Name;
  },
  /* to call the website Url on click of the Broker office name */
  trending_realtorsBrokarageaUrl: function(){
    var data = Session.get("trending_realtors_data");
    return data['residential']['items'][Session.get("realtor")]['Brokerage'].WebsiteURL;
  },
  /* for the above is implemented in the submain1*/
  /*the display of the realtor for count is +1*/
  trending_realtorsBrokarageName1: function(){
    var data = Session.get("trending_realtors_data");
    return data['residential']['items'][Session.get("realtor")+1]['Brokerage'].Name;
  },
  trending_realtorsBrokarageaUrl1: function(){
    var data = Session.get("trending_realtors_data");
    return data['residential']['items'][Session.get("realtor")+1]['Brokerage'].WebsiteURL;
  },
  /* for the above is implemented in the submain2*/
  /*the display of the realtor for count is +2*/
  trending_realtorsBrokarageName2: function(){
    var data = Session.get("trending_realtors_data");
    return data['residential']['items'][Session.get("realtor")+2]['Brokerage'].Name;
  },
  trending_realtorsBrokarageaUrl2: function(){
    var data = Session.get("trending_realtors_data");
    return data['residential']['items'][Session.get("realtor")+2]['Brokerage'].WebsiteURL;
  },
  /* for the above is implemented in the submain3*/
  /*the display of the realtor for count is +3*/
  trending_realtorsBrokarageName3: function(){
    var data = Session.get("trending_realtors_data");
    return data['residential']['items'][Session.get("realtor")+3]['Brokerage'].Name;
  },
  trending_realtorsBrokarageaUrl3: function(){
    var data = Session.get("trending_realtors_data");
    return data['residential']['items'][Session.get("realtor")+3]['Brokerage'].WebsiteURL;
  }
})
