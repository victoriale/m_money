/*
Author: Meghana yerramilli
Created: [8-11-2015]
Description:core_ipo_data Webpage
Associated Files: core_ipo_data.html,core_ipo_data.less
*/
//data set
coreleft_data = [
  {
    name:"FB",
    subname:"Proposed Symbol",
    core_none2:'core_none',
    core_none3:'core_none',
    core_none4:'core_none'
  },
  {
    name:"$1,058,000,000",
    subname:"Total Revenue",
    core_none1:'core_none',
    core_none3:'core_none',
    core_none4:'core_none'
  },
  {
    name:"Goldman, Sachs & Co.",
    subname:"Lead Underwriter",
    core_none1:'core_none',
    core_none2:'core_none',
    core_none4:'core_none'
  },
  {
    name:"$38.00",
    subname:"Expected Share Price",
    core_none2:'core_none',
    core_none3:'core_none',
    core_none1:'core_none'
  },
];
//data set
coreright_data = [
  {
    name:"Nasdaq Global Market",
    subname:"Proposed Exchange",
    core_none2:'core_none',
    core_none3:'core_none',
    core_none4:'core_none'
  },
  {
    name:"$16,006,877,370",
    subname:"Offer Amount",
    core_none1:'core_none',
    core_none3:'core_none',
    core_none4:'core_none'
  },
  {
    name:"Ernst & young LLP",
    subname:"Auditor",
    core_none1:'core_none',
    core_none2:'core_none',
    core_none4:'core_none'
  },
  {
    name:"Public ",
    lighttext:"as of 05/25/2012",
    subname:"IPO Status",
    core_none2:'core_none',
    core_none3:'core_none',
    core_none1:'core_none'
  },
];
//data set
statistics = [
  {
    compname:"Facebook, Inc",
    stat_name:"Total Expenses",
    figure:"$7,300,000"
  },
  {
    stat_name:"Shares Over-Alotted",
    figure:"0"
  },
  {
    stat_name:"Shareholder Shares Offered",
    figure:"241,233,615"
  },
  {
    stat_name:"Shares Outsatnding",
    figure:"633,492,418"
  },
  {
    stat_name:"Locked Up Period Days",
    figure:"180"
  },
  {
    stat_name:"Locked Up Expiration",
    figure:"11/14/2012"
  },
  {
    stat_name:"quiet Period Expiration",
    figure:"06/27/2012"
  },
  {
    stat_name:"stock Holders' Equity",
    figure:"$5,272,000,000"
  },
];
//data set
info = [
  {
    stat_name:"company_CEO",
    figure:"Mark Zuckerberg"
  },
  {
    stat_name:"End of Fiscal Year",

  },
  {
    stat_name:"Revenue",
    figure:"$1,058,000,000"
  },
  {
    stat_name:"Net Income",
    figure:"$205,000,000"
  },
  {
    stat_name:"Total Assets",
    figure:"$6,859,000,000"
  },
  {
    stat_name:"Total Liabilities",
    figure:"$1,587,000,000"
  },
  {
    stat_name:"Employee Count",
    figure:"3,539"
  },
  {
    stat_name:"State Of Incorporation",
    figure:"Pricing"
  },
];
//variable set for background tiles
classwhite= true;
Template.core_ipo_data.helpers (
  {
    usename:function(){
      return statistics[0].compname;
    },
    getCoredata: function() {//function for retrieval of data set in html
      return coreleft_data;
    },
    getCorerightdata: function() {//function for retrieval of data set in html
      return coreright_data;
    },
    getstats: function(){//function for retrieval of data set in html
      return statistics;
    },
    getinfo: function(){//function for retrieval of data set in html
      return info;
    },
    color: function(){//function for different background styles
      if(classwhite)
      {
        classwhite = false;
        return "grey";
      } else {
        classwhite = true;
        return "white";
      }
    },
  });
