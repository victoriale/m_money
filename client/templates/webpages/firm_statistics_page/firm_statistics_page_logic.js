/* Author: Ryan Fisher
** Created: 08/05/2015
** Description: .js file for Advisor Page - Firm Statistics
** Associated Files: firm_statistics_page.html, firm_statistics_page.less, firm_statistics_page_logic.js
*/

//set colors and dummy data for piechart
var colors =     Highcharts.setOptions({
    colors: ['#3193ff', '#64adfe', '#82bdff', '#a1cdfe', '#b8daff', '#cee4fd', '#ddecfc', '#cfddeb', '#c5d1de']
}),
    data = [{
            categories: ['Individuals', 'High Net Worth Individuals', 'Other Net Worth Individuals',
                          'Pooled Investment Vehicles', 'Banks or Thirfts', 'Corporation/Business',
                          'Government', 'Charities', 'Insurance Companies',],
            data: [ 50, 15, 5, 5, 5, 5, 5, 5, 5]
    }],
    sectdata = [],
    dataLen = data.length,
    sectdataLen;

// Build the data arrays
for (i = 0; i < dataLen; i += 1) {
    // add version data
    sectdataLen = data[i].data.length;
    for (j = 0; j < sectdataLen; j += 1) {
        sectdata.push({
            name: data[i].categories[j],
            y: data[i].data[j]
        });
    }
}

// Create the chart
Template.firm_statistics_page.client_breakdwn = function(){

  return{
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
        name: 'Sector Breakdown',
        data: sectdata,
        borderWidth: 0,
        size: '100%',
        innerSize: '58%'
    }],
    credits: {
      enabled: false
    }
  };
};



Template.firm_statistics_page.helpers({
  name: 'Morgan Stanleyhdskjfhsdlkhfklsdh',

  category:[
    {
      title: 'Investment Advisor Firm',
      line:[
        {text: 'Morgan Stanley'}
      ]
    },
    {
      title: 'Assets Under Management',
      line:[
        {text: '1.9 Trillion'}
      ]
    },
    {
      title: 'Number of Advisory Clients',
      line:[
        {text: '+100'}
      ]
    },
    {
      title: 'Average Account Balance',
      line:[
        {text: '$393,520,413,953'}
      ]
    }
  ],

  client:[
    {bgc: '#f2f2f2', color: '#3193ff', type: 'Individuals', num: 50},
    {bgc: '#ffffff', color: '#64adfe', type: 'High Net Worth Individuals', num: 15},
    {bgc: '#f2f2f2', color: '#82bdff', type: 'Other Net Worth Individuals', num: 5},
    {bgc: '#f2f2f2', color: '#a1cdfe', type: 'Pooled Investment Vehicles', num: 5},
    {bgc: '#ffffff', color: '#b8daff', type: 'Banks or Thirfts', num: 5},
    {bgc: '#f2f2f2', color: '#cee4fd', type: 'Corporation/Business', num: 5},
    {bgc: '#f2f2f2', color: '#ddecfc', type: 'Government', num: 5},
    {bgc: '#ffffff', color: '#cfddeb', type: 'Charities', num: 5},
    {bgc: '#f2f2f2', color: '#c5d1de', type: 'Insurance Companies', num: 5}
  ]
});
