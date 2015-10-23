//Name :[Ramakrishna Vaibhav Kasibhatla]
//  Date: 7/24/2015
//files:[market_bar.js, market_bar.less]

//!!!!!!!!!!!!!!!!!!!!!! Plug in market value change when available !!!!!!!!!!!!!!!!!!!!!!

Template.market_bar.helpers({
  //Helper to determine if data exists and display date
  marketData: function(){
    var data = Session.get('new_market_report');

    //If data does not exists exit helper
    if(typeof(data) === 'undefined'){
      return '';
    }
    data.lastUpdated = moment(data.lastUpdated).tz('America/New_York').format('dddd, MMM DD, YYYY');

    return data;
  },
  //Helper to get data for market bar
  market: function(){
    var data = Session.get('new_market_report');

    //If data does not exists exit helper
    if(typeof(data) === 'undefined'){
      return '';
    }

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
        var latestItem = marketData[0];
        var close_value = commaSeparateNumber_decimal(Math.round(latestItem.sh_close * 100) / 100);
        lastUpdated = latestItem.c_tr_last_updated;


        marketData.forEach(function(item, index){
          //Transform date
          var date = moment(item.sh_date).format('X') * 1000;
          //Build point array
          var point = [date, Number(item.sh_close)]
          //Push point array to data set
          marketArr.push(point);

        })
        //Reverse array order so highcharts doesnt throw exceptions
        marketArr.reverse();

        //Push market's data to
        displayData.push({
          index: count,
          graphData: marketArr,
          name: latestItem.c_exchange,
          close_value: close_value,
          percent: latestItem.percent_change
        })

        count++;
      }
      data.lastUpdated = lastUpdated;
      data.displayData = displayData;

      Session.set('new_market_report', data);

    }
  })
})
