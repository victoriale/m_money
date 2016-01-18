/*Author: [Thanush Subramanian Elango]
Created: [07/15/2015]
Description: [daily_update]
Associated Files: [daily_update.less][daily_update.html]*/

Template.daily_update.onCreated(function(){
  this.autorun(function(){
    var params = Router.current().getParams();

    if(Session.get('IsLocation')){
      //Set initial range
      Session.set('d_u_range', '1D');
      console.log(params);
      Meteor.call('GetAIContent2', params.loc_id, Session.get('city_id'), function(err, data){
        if(err){
          console.log("error Call", err);
          return false;
        }else{
          var aiContent = createGenericString(false, data);
          Session.set('AI_daily_update',aiContent);
        }
      })

      //Determines type of parameters to send back. This allows the method to determine what type of parameters to expect
      //normal tells the method to expect dma or state
      //partner tells the method to expect a partner id
      if(typeof params.partner_id === 'undefined' && typeof params.loc_id !== 'undefined'){
        var input_param = params.loc_id;
        var input_type = 'normal';
      }else if(typeof params.partner_id !== 'undefined' && typeof params.loc_id === 'undefined'){
        var input_param = params.partner_id;
        var input_type = 'partner';
      }else if(typeof params.partner_id !== 'undefined' && typeof params.loc_id !== 'undefined'){
        var input_param = params.loc_id;
        var input_type = 'normal';
      }

      transformLocationDailyUpdate();
    }
  })
  this.autorun(function(){
    if(Session.get('IsCompany')){
      Session.set('d_u_range', '1D');

      var companyid =  Session.get('profile_header');
      if(typeof companyid != 'undefined'){
        Meteor.call('GetAIContent', companyid.c_id, function(err, data){
          if(err){
            console.log("error Call", err);
            return false;
          }else{
            var aiContent = createGenericString(false, data);
            Session.set('AI_daily_update',aiContent);
          }
        })

        transformCompanyDailyUpdate();
      }
    }
  })
})

function transformCompanyDailyUpdate(){
  var data = Session.get('daily_update');
  var data2 = Session.get('daily_update');

  if(typeof data === 'undefined'){
    return '';
  }

  var highchartsData = [];
  var daily_update = {};

  data.stock_hist.forEach(function(item, index){
    var date = item.sh_date * 1000;

    var point = [date, Number(item.sh_close)];
    highchartsData.push(point);
  })

  var highchartsData2 = [];

  data2.stock_hist.forEach(function(item, index){
    var date = (item.sh_date - 20 * 60) * 1000;

    var point = [date, Number(item.sh_close)];
    highchartsData2.push(point);
  })

  highchartsData.reverse();
  data.highchartsData = highchartsData;

  Session.set('graph_data', data);
  Session.set('new_one_day_daily_update', highchartsData);
}

//Function to transform location data to form useable my already existing helpers
function transformLocationDailyUpdate(){
  var data = Session.get('location_daily_update');
  var data2 = Session.get('one_day_location_daily_update');
  //If data is undefined exit function
  if(typeof data === 'undefined'){
    return '';
  }

  var highchartsData = [];
  var daily_update = {};
  data.composite_history.forEach(function(item, index){
    //Transform date
    var date = moment(item.date).format('X') * 1000;
    //Build point array
    if (!isNaN(Number(item.price)) && !isNaN(date) ){
			var point = [date, Number(item.price)];
      //Push point array to data set
      highchartsData.push(point);
		}
  })

  var highchartsData2 = [];
  data2.forEach(function(item, index){

    var date = (item.sh_date - 20 * 60) * 1000;

    var point2 = [date, Number(item.sh_close)];

    highchartsData2.push(point2);
  })

  Session.set('new_one_day_location_daily_update', highchartsData2);


  //GRAPH MUST BE ASC order from [0] - [max] where max is the latest date in unix
  highchartsData.reverse();
  data.highchartsData = highchartsData;

  /*highchartsData.push([
    moment().format('X') * 1000,
    Number(data.composite_summary.current_price)
  ]);*/

  Session.set('graph_data', data);

  daily_update.csi_price = data.composite_summary.current_price;
  daily_update.csi_percent_change_since_last = data.composite_summary.percent_change;
  daily_update.csi_price_change_since_last = data.composite_summary.price_change;
  daily_update.lastUpdated = (new Date(data.composite_summary.last_updated)).toSNTFormTime();
  daily_update.todays_high = commaSeparateNumber_decimal(Number(data.composite_summary.todays_high).toFixed(2));
  daily_update.todays_low = commaSeparateNumber_decimal(Number(data.composite_summary.todays_low).toFixed(2));
  daily_update.previous_close = data.composite_summary.previous_close;
  daily_update.total_companies = data.composite_summary.total_companies;


  Session.set('daily_update', daily_update);
}

Template.daily_update.onRendered(function(){
  this.autorun(function(){
    /*
    **make sure title stays correct size to fit div
    **max div is the max width before text needs to resizetext
    **cur div is the container containing the text-align
    **cursize is the cur font-size of the container that needs to decrease
    */
    resizetext(".all_daily_update_modules-regiontext", ".all_daily_update_modules-regiontext-txt", "18px");
  })
})

Template.daily_update.events({
  'click .daily_update-buttons-circle': function(e, t){
    if ( !$(e.currentTarget).hasClass('disabled') ) {
      Session.set('d_u_range', e.currentTarget.id);
    }
  },
})

Template.daily_update.helpers({
  image: function(){
    var data = Session.get('profile_header');
    if(typeof data == 'undefined'){
      return '';
    }
    if(Session.get('IsLocation')){
      var params = Router.current().getParams();
      var data = Session.get('loc_id');
      //if partner domain exists then choose the
      if(typeof params.loc_id == 'undefined'){
        var partner_image = Session.get('profile_header');
        if(partner_image.dma_code == null){
          return "/StateImages/Location_"+ partner_image['location'] +".jpg";
        }else{
          return "/DMA_images/location-"+ partner_image['dma_code'].split(',')[0] +".jpg";
        }
      }
      if(data == 'National' || data == '' || typeof data == 'undefined'){
        return "/StateImages/Location_"+ data +".jpg";
      }else{
        if(isNaN(data)){
          data = fullstate(data) || data;
          data = data.replace(/ /g, '_');
          return "/StateImages/Location_"+ data +".jpg";
        }else{
          return "/DMA_images/location-"+ data +".jpg";
        }
      }
    }else{
      return data.c_logo;
    }
  },

  isLoc:function(){
    return Session.get('IsLocation');
  },

  buttons: function(){
    var d_u_range = Session.get('d_u_range');
    var style = '';
    if(!Session.get('IsCompany')){
      style = 'disabled';
    }
    var buttons = [
      {data:"1D"},
      {data:"5D"},
      {data:"10D"},
      {data:"1M"},
      {data:"3M", class: style},
      {data:"6M", class: style},
      {data:"9M", class: style},
      {data:"1Y", class: style},
      {data:"3Y", class: style},
      {data:"5Y", class: style},
    ];

    buttons.forEach(function(item, index){
      if(item.data === d_u_range){
        item.active = 'active';
      }
    })

    return buttons;
  },
  aiInfo: function(){
      var data = Session.get('AI_daily_update');
      if ( !data ) {
        return false;
      }
      var header = Session.get('profile_header');
      var content = {};
      if(typeof data == 'undefined' || data == false){
        if(Session.get('IsLocation')){
          content['content'] = "Did you know "+header.location+" has "+header.total_companies+" companies, gathering a total market cap of "+header.total_market_cap+" Dollars. "+header.location+" is also home to "+header.total_executives+" total executives.";
          return content;
        }else{
          return false;
        }
      }
      content['content'] = data;
      return content;
  },
  loc_info: function(){
    var data = Session.get('profile_header');
    if ( typeof data == "undefined" || typeof data.location == "undefined" ) {
      return false;
    }
    var ret = {
      location: data.location
    };
    return ret;
  },

  lastUpdated: function(){
    var data = Session.get('daily_update');
    if(typeof data == 'undefined'){
      return '';
    }
    return data.lastUpdated;
  },

  lbInfo: function(){
    var data = Session.get('daily_update');
    if(typeof data == 'undefined'){
      //return {new:"stuff"};
      return '';
    }
    var getheader = Router.current().getParams();
    var currentRoute = Router.current().route.getName();

    switch(currentRoute){
      case 'content.partnerhome':
        var pheader = Session.get('profile_header');
        data.header = 'How is the ' + pheader.location + ' Composite Doing Today?';
        data.subheader = 'Daily Update: ' + pheader.location + ' Composite';
      case 'content.locationprofile':
      case 'partner.locationprofile':
        if ( typeof data.header == "undefined" ) {
          if(getheader.loc_id == 'National' || getheader.loc_id == '' || typeof getheader.loc_id == 'undefined'){
            data.header = 'How is the United States Composite Doing Today?'
            data.subheader = 'Daily Update: United States Composite';
          }else{
            data.header = 'How is the ' + fullstate(getheader.loc_id) + ' Composite Doing Today?';
            data.subheader = 'Daily Update: ' + fullstate(getheader.loc_id) + ' Composite';
          }
        }
        data.text1 = 'Todays Low';
        data.text2 = 'Todays High';
        data.text3 = 'Previous Close';
        data.text4 = 'Total Public Companies';

        data.value1 = data.todays_low;
        data.value2 = data.todays_high;
        data.value3 = commaSeparateNumber_decimal(Number(data.previous_close));
        data.value4 = data.total_companies;
      break;
      case 'content.companyprofile':
      case 'partner.companyprofile':
        data.header = 'How Well is ' + getheader.name.replace(/-/g, ' ') + ' Doing Today';
        data.subheader = getheader.name.replace(/-/g, ' ') + ' Daily Update';
        data.text1 = 'Market Cap';
        data.text2 = 'PE Ratio';
        data.text3 = 'Total Shares';
        data.text4 = 'Average Volume';

        data.value1 = nFormatter(Number(data['csi_market_cap']).toFixed(2));;
        data.value2 = Number(data['csi_pe_ratio']).toFixed(2);
        data.value3 = nFormatter(Number(data['csi_total_shares']));
        data.value4 = nFormatter(Number(data['csi_trading_vol']));
      break;
    }

    //data is being returned as string so convert to numbers and round to fit design
    data['csi_percent_change_since_last'] = Number(data['csi_percent_change_since_last']).toFixed(2);
    data['csi_price'] = commaSeparateNumber_decimal(Math.round(data['csi_price'] * 100) / 100);
    data['csi_price_change_since_last'] = Number(data['csi_price_change_since_last']).toFixed(2);
    if ( typeof data.csi_price_last_operator == "undefined" ) {
      if ( Number(data.csi_percent_change_since_last) < 0 ) {
        data.csi_percent_change_since_last = Math.abs(Number(data.csi_percent_change_since_last));
        data.csi_price_change_since_last = Math.abs(Number(data.csi_price_change_since_last));
        data.csi_price_last_operator = 0;
      } else {
        data.csi_price_last_operator = 1;
      }
    }

    return data;
  },
  graphTitle: function(){
    var d_u_range = Session.get('d_u_range');

    if(Session.get('IsLocation')){
      if(d_u_range === '1D'){
        var data = Session.get('new_one_day_location_daily_update');
        return ' - ' + moment.utc(data[0][0]).subtract(5, 'hours').format('dddd MMM Do, YYYY');
      }
    }

    if(Session.get('IsCompany')){
      if(d_u_range === '1D'){
        var data = Session.get('new_one_day_daily_update');
        return ' - ' + moment.utc(data[0][0]).subtract(5, 'hours').format('dddd MMM Do, YYYY');
      }
    }

    return '';

  },
  //Helper to determine chart
  getGraph: function(){
    var data = Session.get('graph_data');
    var d_u_range = Session.get('d_u_range');

    //If data does not exists exit helper
    if(typeof data === 'undefined'){
      return ''
    }

    var graphData = data.highchartsData;

    if(Session.get('IsLocation')){
      var tooltip_dipslay_name = data.composite_summary.friendly_name;
    }else if(Session.get('IsCompany')){
      var tooltip_dipslay_name = data.c_name;
    }

    //Get dependencies to find date range
    var dataLength = data.highchartsData.length;
    var latestDate = moment.utc(data.highchartsData[dataLength - 1][0]).subtract(5, 'hours');

    //Set default values for highcharts obj
    var max = null;
    var tickPositions = undefined;

    switch(d_u_range){
      case '1D':
        //Define what data to use. Location uses separate api call
        if(Session.get('IsLocation')){
          var graphData = Session.get('new_one_day_location_daily_update');
          var dataLength = graphData.length;
          //Set min and max of graphs to latest day available (9:00am EST - 4:00pm EST)
          var min = moment.utc(graphData[dataLength - 1][0]).subtract(5, 'hours').hour(14).minute(0).second(0).format('X') * 1000;
          var max = moment.utc(graphData[dataLength - 1][0]).subtract(5, 'hours').hour(21).minute(5).second(0).format('X') * 1000;
        }
        if(Session.get('IsCompany')){
          var graphData = Session.get('new_header_one_day_daily_update');
          var dataLength = graphData.length;
          //Set min and max of graphs to latest day available (9:00am EST - 4:00pm EST)
          var min = moment.utc(graphData[dataLength - 1][0]).subtract(5, 'hours').hour(14).minute(0).second(0).format('X') * 1000;
          var max = moment.utc(graphData[dataLength - 1][0]).subtract(5, 'hours').hour(21).minute(5).second(0).format('X') * 1000;
        }

        var tickPositions = [min + (1800 * 1000), min + ((3 * 3600) * 1000), min + ((5 * 3600) * 1000), min + ((7 * 3600) * 1000)];

        var xAxis_format = '%l:%M %P';
        var tooltip_format = '%l:%M %P EST';
      break;
      case '5D':
        var min = latestDate.subtract(5, 'days').format('X') * 1000;
        var xAxis_format = '%b %e';
        var tooltip_format = '%a, %b %e';
      break;
      case '10D':
        var min = latestDate.subtract(10, 'days').format('X') * 1000;

        var xAxis_format = '%b %e';
        var tooltip_format = '%a, %b %e';
      break;
      case '1M':
        var min = latestDate.subtract(1, 'months').format('X') * 1000;

        var xAxis_format = '%b %e';
        var tooltip_format = '%a, %b %e';
      break;
      case '3M':
        var min = latestDate.subtract(3, 'months').format('X') * 1000;

        var xAxis_format = '%b %e';
        var tooltip_format = '%a, %b %e';
      break;
      case '6M':
        var min = latestDate.subtract(6, 'months').format('X') * 1000;

        var xAxis_format = '%b %e';
        var tooltip_format = '%a, %b %e';
      break;
      case '9M':
        var min = latestDate.subtract(9, 'months').format('X') * 1000;

        var xAxis_format = '%b %e';
        var tooltip_format = '%b %e %Y';
      break;
      case '1Y':
        var min = latestDate.subtract(1, 'years').format('X') * 1000;

        var xAxis_format = '%b %e %Y';
        var tooltip_format = '%b %e %Y';
      break;
      case '3Y':
        var min = latestDate.subtract(3, 'years').format('X') * 1000;

        var xAxis_format = '%b %Y';
        var tooltip_format = '%b %e %Y';
      break;
      case '5Y':
        var min = latestDate.subtract(5, 'years').format('X') * 1000;

        var xAxis_format = '%Y';
        var tooltip_format = '%b %e %Y';
      break;
      case '10Y':
        var min = latestDate.subtract(10, 'years').format('X') * 1000;

        var xAxis_format = '%Y';
        var tooltip_format = '%b %e %Y';
      break;
      default:
        var graphData = data.highchartsData;
        var min = latestDate.subtract(5, 'years').format('X') * 1000;

        var xAxis_format = '%Y';
        var tooltip_format = '%b %e %Y';
      break;
    }

    //Get oldest date available to check if data range is possible
    var oldestDate = moment.utc(data.highchartsData[0][0]).subtract(5, 'hours').format('X') * 1000;
    //If min is less than oldest data available, set min to oldest date
    if(min <= oldestDate){
      min = oldestDate;
    }

    var cfoGraphObject = {
      title: {
          text: ''
      },
      chart: {
          height:120,
          type: 'spline'
      },
      xAxis: {
          type: 'datetime',
          labels: {
              overflow: 'justify',
              formatter: function(){

                if(this.isFirst && d_u_range === '1D'){
                  return Highcharts.dateFormat(xAxis_format, this.value) + '<br>(Open EST)';
                }
                if(this.isLast && d_u_range == '1D'){
                  return Highcharts.dateFormat(xAxis_format, this.value) + '<br>(Close EST)';
                }

                return Highcharts.dateFormat(xAxis_format, this.value);

              }
          },
          tickPositions: tickPositions,
          min: min,
          max: max,
          style: {
            'fontSize': '10px'
          }
      },
      yAxis: {
          title: '',
          opposite:true,
          gridLineDashStyle: 'longdash',
          tickAmount: 4,
          plotLines: [{
              value: 0,
              width: 1,
              color: '#808080'
          }],
          labels: {
              formatter: function() {
                  return '$' + commaSeparateNumber_decimal(this.value)
              }
          },
      },
      tooltip: {
        formatter: function(){
          if(this.x === min && d_u_range === '1D'){
            //This text gets attached to the point that matches the minimum for the 1D graph
            return "Yesterday's Closing Price<br />" + this.series.name + ': $' + commaSeparateNumber_decimal(Math.round(this.y * 100) / 100);
          }else if(this.x >= max - (5 * 60 * 1000) && this.x <= max && d_u_range === '1D'){
            //This text gets attached to the last point in the data for 1D graph, if the point is greater than 5 minutes of the max value
            return "Today's Closing Price<br />" + this.series.name + ': $' + commaSeparateNumber_decimal(Math.round(this.y * 100) / 100);
          }else{
            return Highcharts.dateFormat(tooltip_format, this.x) + '<br />' + this.series.name + ': $' + commaSeparateNumber_decimal(Math.round(this.y * 100) / 100);
          }
        }
      },
      plotOptions: {
          spline: {
              lineWidth: 2,
              states: {
                  hover: {
                      lineWidth: 3
                  }
              },
              marker: {
                  enabled: false
              }
          }
      },
      legend: {
        enabled: false
      },
      credits: {
        enabled: false
      },
      series: [{
          name: tooltip_dipslay_name,
          data: graphData
      }]
    }

    return cfoGraphObject;
  },
});
