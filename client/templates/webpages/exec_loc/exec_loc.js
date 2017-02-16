
Template.exec_loc.onCreated(function(){
  Session.set('lv_count', 0);
})

//renders the data when page loads
Template.exec_loc.onRendered(function () {
  $(".list_vw-page-selector1").css("background-color","#3098ff");
});

var backgroundStyle="tilewhite";
Template.exec_loc.helpers({
  back_url: function(){
    var params = Router.current().getParams();
    if(params.partner_id) {
      return Router.pick_path('partner.locationprofile', {
        partner_id: params.partner_id,
        loc_id: params.loc_id
      });
    } else {
      return Router.pick_path('content.locationprofile', {
        loc_id: params.loc_id
      });
    }
  },
  location: function(){
    var data = Router.current().params;
    if(typeof data == 'undefined' || typeof data.loc_id == 'undefined'){
      return '';
    }
    var loc = fullstate(data.loc_id);
    if(data.loc_id == "National") {
      loc = "United States";
    }
    return loc;
  },
  isNational: function() {
    var data = Router.current().params;
    if(data.loc_id == "National") {
      return true;
    } else {
      return false;
    }
  },
  loc_url: function(){
    return Router.pick_path('content.locationprofile',{
      loc_id: Router.current().params.loc_id
    });
  },
  stateImage: function(){
    var params = Router.current().getParams();
    var data = params.loc_id;
    if(data == 'National' || data == '' || typeof data == 'undefined'){
      return "url('/StateImages/Location_"+data+".jpg');";
    }else{
      if(isNaN(data)){
        data = (fullstate(data) || data).replace(/ /g, '_');
        return "url('/StateImages/Location_"+data+".jpg');";
      }else{
        return "url('/DMA_images/location-"+data+".jpg');";
      }
    }
  },
  toplist:function(){
    var params = Router.current().getParams();
    var listdata = {}
    var newData = Session.get('all_executives');
    listdata.list_data = newData;
    listdata['newDate'] = CurrentDate();
    if ( Router.current().params.loc_id == Router.current().params.partner_id ) {
      listdata.location_data = {
        url: Router.pick_path('content.partnerhome',{})
      };
      if (Session.get('p_data')) {
        listdata.location_data.name = fullstate(Session.get('p_data')['results']['location']['realestate']['location']['city'][0]['state']);;
      } else {
        listdata.location_data.name = '';
      }
    } else {
      listdata.location_data = {
        url: Router.pick_path('content.locationprofile',{
          loc_id: Router.current().params.loc_id
        })
      };

      if ( typeof fullstate(Router.current().params.loc_id) != undefined ) {
        if(Router.current().params.loc_id == 'National'){
          listdata.location_data.name = 'The United States';
        } else {
          listdata.location_data.name = fullstate(Router.current().params.loc_id);
        }
      }
      else {
        listdata.location_data.name = Router.current().params.loc_id;
      }
    }
    if(Router.current().params.loc_id == "National") {
      listdata.location_data.name = "United States";
    }
    $.map(listdata.list_data, function(data,index){
      if(index % 2 == 0){
        data['background'] = 'tilewhite';
      }else{
        data['background'] = 'tilegrey';
      }
      if(typeof data.lcsi_market_cap == 'undefined' || data.lcsi_market_cap == '' || data.lcsi_market_cap == null){
        data['objname'] = 'Market Cap';
        data['lcsi_market_cap'] = 0;
      }else{
        data['objname'] = 'Market Cap';
        data['lcsi_market_cap'] = abbreviateNumber(parseInt(data.lcsi_market_cap.split('.')[0]), 0);
      }
      data['newDate'] = CurrentDate();
      data['rank'] = index+1;
      data['url'] = Router.pick_path('content.executiveprofile',{
        fname:data.o_first_name,
        lname:data.o_last_name,
        ticker: data.c_ticker,
        exec_id: data.o_id
      });
      data['compurl'] = Router.pick_path('content.companyprofile',{
        ticker: data.c_ticker,
        name: compUrlName(data.c_name),
        company_id: data.c_id
      });
      data['o_current_title']['long_title'] = "Chief Executive Officer";
    })
    return listdata;
  },
  carouselList:function(){
    var count = Session.get("lv_count");
    var params = Router.current().getParams();
    var listdata = {};
    var newData = Session.get('all_executives');
    listdata.list_data = newData;
    if(typeof newData =='undefined'){
      return '';
    }
    $.map(listdata.list_data, function(data,index){
      if(typeof data.lcsi_market_cap == 'undefined' || data.lcsi_market_cap == '' || data.lcsi_market_cap == null){
        data['objname'] = 'Market Cap';
        data['lcsi_market_cap'] = 0;
        data['TotalComp'] = 0;
      }else{
        data['objname'] = 'Market Cap';
        data['lcsi_market_cap'] = abbreviateNumber(parseInt(data.lcsi_market_cap.split('.')[0]), 0);
      }
      data['newDate'] = CurrentDate();
      data['rank'] = index+1;
      data['url'] = Router.pick_path('content.executiveprofile',{
        fname:data.o_first_name,
        lname:data.o_last_name,
        ticker: data.c_ticker,
        exec_id: data.o_id
      });
      data['compurl'] = Router.pick_path('content.companyprofile',{
        ticker: data.c_ticker,
        name: compUrlName(data.c_name),
        company_id: data.c_id
      });
      var location = params.loc_id;
      if(location == "National") {
        data['loc'] = "United States";
      } else {
        data['loc'] = fullstate(params.loc_id);
      }
    })
    return listdata.list_data[count];
  },
  //This function is called everytime "each" loop runs, it returns the respective class which is suppose to use on each iteration
  getBackgroundStyle: function() {

    if (backgroundStyle === "tilegrey")
    {
      backgroundStyle="tilewhite";
      return backgroundStyle;
    } else {
      backgroundStyle = "tilegrey";
      return backgroundStyle;
    }
  }

});
//This handles the events on button clicks of 1,2,3 and 200
Template.exec_loc.events({
  //Event to close tooltip
  'click .list_vw-x': function(e, t){
    t.$('.list_vw-ct1').hide();
  },
  'click .list_vw-lefthov': function(){

    var counter = Session.get("lv_count");
    var params = Router.current().getParams();
    var list = Session.get('all_executives');
    if(counter > 0){
      counter--;
      Session.set("lv_count",counter);
    }
    else
    {
      counter = list.length-1;
      Session.set("lv_count", counter);
    }
  },
  'click .list_vw-righthov': function(){
    var counter = Session.get("lv_count");
    var params = Router.current().getParams();
    var list = Session.get('all_executives');
    if(counter < list.length - 1)
    {
      counter++;
      Session.set("lv_count",counter);
    }
    else
    {
      counter = 0;
      Session.set("lv_count", counter);
    }
  },
});
