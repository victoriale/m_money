/*Author: [Vinay Vittal Karagod]
Created: [05/30/2015]
Description: [.js file for Sector Breakdown Module where pie chart code and logic related to Sector Breakdown module is written]
Associated Files: [local_companies_what_they_do.html,local_companies_what_they_do.less,local_companies_what_they_do.js]
*/

  //set colors and dummy data for piechart
    var colors =     Highcharts.setOptions({
        colors: ['#3098ff', '#ca1010', '#FFBD2F', '#6D0E77']
    }),
        data = [{
                categories: ['Technology', 'Real Estate', ' Healthcare','Other'],
                data: [ 75, 16, 14,5]
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
    Template.wtd.sector_breakdwn = function(){

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
            innerSize: '59%'
        }],
        credits: {
					enabled: false
				}
      };
    };

    Template.wtd.helpers({
  sector:[
    {sect:"Technology",percent:"75%",lft_clr:"blueidt"},
    {sect:"Real Estate",percent:"16%",lft_clr:"redidt"},
    {sect:"Healthcare",percent:"14%",lft_clr:"yellowidt"},
    {sect:"Other",percent:"5%",lft_clr:"purpleidt"},
  ],
     companies:[
       {count:"48",domain:"Technology Companies",fntawwsm:"fa-laptop"},
       {count:"18",domain:"Real Estate Companies",fntawwsm:"fa-home"},
       {count:"13",domain:"Healthcare Companies",fntawwsm:"fa-user-md"},
       {count:"13",domain:"Healthcare Companies",fntawwsm:"fa-rocket"},
     ],
     tile:[
       {name:"Technology Sector",fnt:"fa-laptop"},
       {name:"Real Estate Sector",fnt:"fa-home"},
       {name:"All Sector",fnt:"fa-th"},
   ],
   loc_brkdwn:['SAN FRANCISCO BAY AREA SECTOR BREAKDOWN'],

   locl_cmpns:['LOCAL COMPANIES SORTED BY WHAT THEY DO']
  });
