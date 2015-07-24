/*
Author: Naveen
Created: [07/21/2015]
Description: This file includes js code for the module Earnings_Page
Associated Files: [The Earnings.less, Earnings.html for the module]
*/
Template.Earnings.helpers({ //helper for the template earnings  is created to provide the handlebar with the below corresponding  data
earns:[ // name of the object used to call data's
  {Facebook:'Facebook,Inc.',month:'Jun',date:'08',year:'2014',description:'Fiscal Earnings Report '},
  {Facebook:'Facebook,Inc.',month:'Jul',date:'08',year:'2015',description:'Fiscal Earnings Report '},
  {Facebook:'Facebook,Inc.',month:'Aug',date:'10',year:'2014',description:'Q1 Earning Reports  '},
  {Facebook:'Facebook,Inc.',month:'Sep',date:'29',year:'2015',description:'Q2 Earning Report '},
  {Facebook:'Facebook,Inc.',month:'Jul',date:'12',year:'2014',description:'Q4 Earning Report '},
  {Facebook:'Facebook,Inc.',month:'Jun',date:'03',year:'2015',description:'Q3 Earning Report '},
  {Facebook:'Facebook,Inc.',month:'Jun',date:'25',year:'2013',description:'Q4 Earning Report '},
  {Facebook:'Facebook,Inc.',month:'Oct',date:'07',year:'2015',description:'Q1 Earnings Report '}
],
tiles:[
  {open_page:'OPEN PAGE',awesome:'fa-file-text-o',descrip:'Prev.Released Earnings',tile_name:'Prev.Released Earnings',red:'',style:'earnings-displaynone'},
  {open_page:'OPEN PAGE',awesome:'fa-search',descrip:'Find Earning Releases',tile_name:'Find Earning Releases ',red:'',style:'earnings-displaynone'},
  {open_page:'OPEN PAGE',awesome:'fa-calendar',descrip:'Earnings Calendar',tile_name:'Earnings Calendar ',red:'NEW',style:'earning_body-redbutton'}
]
});
