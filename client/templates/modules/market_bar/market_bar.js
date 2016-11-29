
Template.market_bar.onCreated(function(){
  this.autorun(function(){
    var data = Session.get('market_report');
    if(typeof data =='undefined'){
      return false;
    }
    data = data['biggest_gainers'];
    var nasdaq = Router.pick_path('content.toplist', {
      loc_id: data.NASDAQ.top_list_info.top_list_location,
      l_name: compUrlName(data.NASDAQ.top_list_info.top_list_title),
      list_id: data.NASDAQ.top_list_info.top_list_id,
      page_num:1
    });
    var nyse = Router.pick_path('content.toplist', {
      loc_id: data.NYSE.top_list_info.top_list_location,
      l_name: compUrlName(data.NYSE.top_list_info.top_list_title),
      list_id: data.NYSE.top_list_info.top_list_id,
      page_num:1
    });
    var amex = Router.pick_path('content.toplist', {
      loc_id: data.AMEX.top_list_info.top_list_location,
      l_name: compUrlName(data.AMEX.top_list_info.top_list_title),
      list_id: data.AMEX.top_list_info.top_list_id,
      page_num:1
    });
    Session.set('nyse-list',nyse);
    Session.set('nasdaq-list',nasdaq);
    Session.set('amex-list',amex);
  })
})

Template.market_bar.helpers({
  //Helper to determine if data exists and display date
  marketData: function(){
    var data = Session.get('new_market_report');
    //If data does not exists exit helper
    if(typeof(data) === 'undefined'){
      return '';
    }
  //  data.lastUpdated = moment(data.lastUpdated).tz('America/New_York').format('dddd, MMM. DD, YYYY');
    data.lastUpdated = globalDateFormat(data.lastUpdated,'dayOfWeek');
    return data;
  },
  //Helper to get data for market bar
  market: function(){
    var data = Session.get('new_market_report');

    //If data does not exists exit helper
    if(typeof(data) === 'undefined'){
      return '';
    }
    $.map(data.displayData, function(item, index){
      switch(item.name){
        case 'NASDAQ':
        item.listlink = Session.get('nasdaq-list');
        item.close_value = Number(data.market_history.NASDAQ[0].current_price).toFixed(2);
        item.price_operator = data.market_history.NASDAQ[0].price_operator;
        break;
        case 'NYSE':
        item.listlink = Session.get('nyse-list');
        item.close_value = Number(data.market_history.NYSE[0].current_price).toFixed(2);
        item.price_operator = data.market_history.NYSE[0].price_operator;
        break;
        case 'AMEX':
        item.listlink = Session.get('amex-list');
        item.close_value = Number(data.market_history.AMEX[0].current_price).toFixed(2);
        item.price_operator = data.market_history.AMEX[0].price_operator;
        break;
        default:

        break;
      }
    })

    return data.displayData;

  },
  //Helper to define data for graph
  getMarketGraph: function(){

    var graphObject = {
      grid:{
        enabled: false
      },
      title: {
        text: '',
      },
      chart:{
        type:'spline',
        height:60,
        width:100
      },
      colors: ["rgb(68, 178, 36)"],
      xAxis: {
        grid: {
          lineWidth: 0,
          minorGridLineWidth: 0,
          lineColor: 'green',
          gridLineWidth: 0,
          tickLength: 0,
          tickWidth: 0,
          gridLineColor: 'green',
        },
        labels: {
          enabled: false,
        },
        minorTickLength: 0,
        tickLength: 0
      },
      yAxis: {
        grid:{
          enabled:false
        },
        labels: {
          enabled: false,
        },
        minorTickLength: 0,
        tickLength: 0,
        title: {
          text: ''
        },
      },
      credits:{
        enabled:false
      },
      tooltip: {
        enabled:false
      },
      legend: {
        enabled:false
      },
      plotOptions: {
        spline: {
          marker: {
            enabled: false
          }
        }
      },
      series: [{
        name: '',
        data: this.graphData
      }]
    };

    return graphObject;

  },
  //Helper to define chart id of graph
  getChartID: function(){
    return 'market' + this.index;
  }
});

Template.market_bar.onCreated(function(){
  //Autorun to transform data into easy to use form
  this.autorun(function(){
    var data = Session.get('market_report');

    if(typeof data !== 'undefined'){
      var lastUpdated;
      var displayData = [];
      //Index market data
      var count = 0;
      //Loop through each market to build display data
      for(name in data.market_history){
        var marketData = data.market_history[name];
        var marketArr = [];
        var latestItem = marketData[0]['graph_data'];
        var close_value = commaSeparateNumber_decimal(Math.round(latestItem[0].sh_open * 100) / 100);
        var change_value = Number(marketData[0].price_change).toFixed(2);
        var price_operator = marketData.price_operator;
        lastUpdated = latestItem.c_tr_last_updated;
        latestItem.forEach(function(item, index){
          //Transform date
          var date = moment(item.sh_date).format('X') * 1000;
          //Build point array
          var point = [date, Number(item.sh_open)]
          //Push point array to data set
          marketArr.push(point);

        })
        //Reverse array order so highcharts doesnt throw exceptions
        marketArr.reverse();
        //Push market's data to
        displayData.push({
          index: count,
          graphData: marketArr,
          name: name,
          close_value: close_value,
          change_value: change_value,
          price_operator: price_operator,
          percent: Number(marketData[0].percent_change).toFixed(2)
        })

        count++;
      }
      data.lastUpdated = lastUpdated;
      data.displayData = displayData;

      Session.set('new_market_report', data);

    }
  })
})
