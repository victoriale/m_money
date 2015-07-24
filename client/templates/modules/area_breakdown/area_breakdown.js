/*
ate: 07/21/2015
Description: Gives Details about company Area brakdown statistics like location,population
details,Average Rent,Description about the public market ,compensation,Total company shares
It gives location,Nearby cities,Statistics
Associated files: module.less,area_breakdown.less,area_breakdown.html,navigation_layout.less*/


  Template.area_breakdown.helpers({
   items:[
     {money:"245.84 Billion",desci:"Total Public Market Cap",fntawwsm:"fa-users"},
     {money:"$873 Million",desci:"Total Executive Compensation",fntawwsm:"fa-globe"},
     {money:"$1.3 Million",desci:"Average Executive Compensation",fntawwsm:"fa-user"},
     {money:"44.53 Million",desci:"Total Shares",fntawwsm:"fa-building-o"},

   ],

   tile:[
     {name:"Map",fnt:"fa-thumb-tack"},
     {name:"Nearby Cities",fnt:"fa-crosshairs"},
     //{name:"Statistics",fnt:"url('icon_statistics_custom.png')"}
 ]
    });
