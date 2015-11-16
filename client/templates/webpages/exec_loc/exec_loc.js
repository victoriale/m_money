
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
    return Router.pick_path('content.locationprofile', {
      loc_id: params.loc_id
    });
  },
  location: function(){
    var data = Router.current().params;
    if(typeof data == 'undefined' || typeof data.loc_id == 'undefined'){
      return '';
    }
    var loc = fullstate(data.loc_id);
    return loc;
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
      if ( typeof Session.get('profile_header') != "undefined" ) {
        listdata.location_data.name = Session.get('profile_header').location;
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
        listdata.location_data.name = fullstate(Router.current().params.loc_id);
      } else {
        listdata.location_data.name = Router.current().params.loc_id;
      }
    }
    $.map(listdata.list_data, function(data,index){
      if(index % 2 == 0){
        data['background'] = 'tilewhite';
      }else{
        data['background'] = 'tilegrey';
      }
      if(typeof data.compensation == 'undefined' || data.compensation == '' || data.compensation == null){
        data['objname'] = 'Compensation';
        data['lcsi_market_cap'] = 0;
      }else{
        data['objname'] = 'Compensation';
        data['lcsi_market_cap'] = commaSeparateNumber_decimal(data.compensation.TotalComp.toString().split('.')[0]);
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
      //data from list can come in 6 different ways these values will catch and give results back
      for(objName in data){
        if(objName === 'stock_percent'){
          data['data_name'] = "Stock Percent";
          data['data_value'] = Number(data['stock_percent']).toFixed(2)+"%";
        }
        if(objName === 'market_cap'){
          data['data_name'] = "Market Cap";
          data['data_value'] = '$'+data['market_cap'];
        }
        if(objName === 'market_percent'){
          data['data_name'] = "Market Percent";
          data['data_value'] = Number(data['market_percent']).toFixed(2)+"%";
        }
        if(objName === 'trading_volume'){
          data['data_name'] = "trading volume";
          data['data_value'] = commaSeparateNumber_decimal(data['trading_volume'].split('.')[0]);
        }
        if(objName === 'pe_ratio'){
          data['data_name'] = "PE Ratio";
          data['data_value'] = Number(data['pe_ratio']).toFixed(0);
        }
        if(objName === 'eps'){
          data['data_name'] = "Earnings Per Share";
          data['data_value'] = Number(data['eps']).toFixed(2);
        }
      }
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
      if(typeof data.compensation == 'undefined' || data.compensation == '' || data.compensation == null){
        data['objname'] = 'Compensation';
        data['lcsi_market_cap'] = 0;
        data['TotalComp'] = 0;
      }else{
        data['objname'] = 'Compensation';
        console.log(data.compensation.TotalComp);
        data['lcsi_market_cap'] = commaSeparateNumber_decimal(data.compensation.TotalComp.split('.')[0]);
        data['TotalComp'] = commaSeparateNumber_decimal(data.compensation.split('.')[0]);
      }
      data['newDate'] = CurrentDate();
      data['rank'] = index+1;
      data['url'] = Router.pick_path('content.executiveprofile',{
        fname:data.o_first_name,
        lname:data.o_last_name,
        ticker: data.c_ticker,
        exec_id: data.o_id
      });
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
    //Currently disabled: Styling needs to be fixed to handle this event
    //t.$('.list_vw-wl').hide();
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
