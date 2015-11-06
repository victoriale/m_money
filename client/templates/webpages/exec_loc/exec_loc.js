
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
    var data = Session.get('executives_page');
    if(typeof data == 'undefined'){
      return '';
    }
    var loc = fullstate(data[0].c_hq_state);
    return loc;
  },
  stateImage: function(){
    var params = Router.current().getParams();
    var data = params.loc_id;
    if(data == 'National' || data == '' || typeof data == 'undefined'){
      return "url('/StateImages/Location_"+data+".jpg');";
    }else{
      if(isNaN(data)){
        data = fullstate(data).replace(/ /g, '_');
        return "url('/StateImages/Location_"+data+".jpg');";
      }else{
        return "url('/DMA_images/location-"+data+".jpg');";
      }
    }
  },
  toplist:function(){
    var params = Router.current().getParams();
    var listdata = {}
    var newData = Session.get('executives_page');
    listdata.list_data = newData;
    listdata['newDate'] = CurrentDate();
    $.map(listdata.list_data, function(data,index){
      if(index % 2 == 0){
        data['background'] = 'tilewhite';
      }else{
        data['background'] = 'tilegrey';
      }
      if(typeof data['lcsi_market_cap'] == 'undefined' || data['lcsi_market_cap'] == ''){
        data['objname'] = 'Salary';
        data['lcsi_market_cap'] = 1;
      }else{
        data['objname'] = 'Compensation';
        data['lcsi_market_cap'] = nFormatter2(data['lcsi_market_cap']);
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
          data['data_value'] = '$'+nFormatter2(data['market_cap']);
        }
        if(objName === 'market_percent'){
          data['data_name'] = "Market Percent";
          data['data_value'] = Number(data['market_percent']).toFixed(2)+"%";
        }
        if(objName === 'trading_volume'){
          data['data_name'] = "trading volume";
          data['data_value'] = nFormatter2(data['trading_volume']);
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
    var newData = Session.get('executives_page');
    var newData = listdata.list_data;
    if(typeof listdata =='undefined'){
      return '';
    }
    console.log(newData);
    $.map(newData, function(data,index){
      if(typeof data['lcsi_market_cap'] == 'undefined' || data['lcsi_market_cap'] == ''){
        data['objname'] = 'Salary';
        data['lcsi_market_cap'] = 1;
      }else{
        data['objname'] = 'Compensation';
        data['lcsi_market_cap'] = nFormatter2(data['lcsi_market_cap']);
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
    console.log(listdata);
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
    if(params.list_id == 'executives_page'){
      var list = Session.get('executives_page');
    }
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
    if(params.list_id == 'executives_page'){
      var list = Session.get('executives_page');
    }
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
