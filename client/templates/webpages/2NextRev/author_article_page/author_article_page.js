/*
Author: Meghana yerramilli
Created: [8-06-2015]
Description:article Webpage
Associated Files: author_article_page.html,author_article_page.less
*/
//render function with data set into an array
Template.author_article_page.onRendered( function() {
  Session.set("article_list_page",
    [
      {//render function with data set into an array
        tags: ["EARNINGS RELEASE", "LEISURE", "NASDAQ"],
        score: 5,
        headline: "Orbitz Worldwide, Inc. Earnings Release Available on Company's Investor Relations Website",
        blurb: "Orbitz Worldwide, Inc. OWW, +21.79% today announced the companys financial results for the fourth quarter and year ended December",
        publisher: "The Verge",
        author: "Robin Meade",
        date: "01/24/2015",
        time: "8:30am",
        type: "main_article"
      },
      {//render function with data set into an array
        tags: ["EARNINGS RELEASE", "CONSUMER"],
        score: 2,
        headline: "Comcast's NBC refuses to air commercials for Sling TV",
        blurb: "",
        publisher: "The Verge",
        author: "Robin Meade",
        date: "01/25/15",
        time: "10:11PM",
        type: "article"
      },
      {//render function with data set into an array
        tags: ["EARNINGS RELEASE", "LEISURE"],
        score: 0,
        headline: "Manchester United (MANU) on Q2 2015 Results - Earnings Call Transcript",
        blurb: "",
        publisher: "The Verge",
        author: "Robin Meade",
        date: "01/25/15",
        time: "10:11PM",
        type: "video"
      },
      {//render function with data set into an array
        tags: ["EARNINGS RELEASE", "MOTOR VEHICLE"],
        score: 8,
        headline: "Here's What to Expect from Tesla Earnings",
        blurb: "",
        publisher: "The Verge",
        author: "Robin Meade",
        date: "01/25/15",
        time: "10:11PM",
        type: "article"
      },
      {//render function with data set into an array
        tags: ["EARNINGS RELEASE", "SOFTWARE"],
        score: 1,
        headline: "TripAdvisor Beats its 4th Quarter Revenue, FAlls Shy on Earnings",
        blurb: "",
        publisher: "The Verge",
        author: "Robin Meade",
        date: "01/25/15",
        time: "10:11PM",
        type: "article"
      },
      {//render function with data set into an array
        tags: ["EARNINGS RELEASE", "FINANCE"],
        score: 0,
        headline: "Kroll Bond Rating Agency Releases Cadence Bancorp, LLC",
        blurb: "",
        publisher: "The Verge",
        author: "Robin Meade",
        date: "01/25/15",
        time: "10:11PM",
        type: "video"
      },
      {//render function with data set into an array
        tags: ["EARNINGS RELEASE", "HARDWARE"],
        score: 200,
        headline: "Nvidia Releases Fourth Quarter Earnings",
        blurb: "",
        publisher: "The Verge",
        author:"Robin Meade",
        date: "01/25/15",
        time: "10:11PM",
        type: "article"
      },
      {//render function with data set into an array
        tags: ["EARNINGS RELEASE", "HEALTHCARE"],
        score: 1,
        headline: "Acadia Healthcare Company Inc (ACHC) Releases FY15 Earnings",
        blurb: "",
        publisher:"The Verge",
        author: "Robin Meade",
        date: "01/25/15",
        time: "10:11PM",
        type: "article"
      },
      {//render function with data set into an array
        tags: ["EARNINGS RELEASE", "COMMUNICATION"],
        score: 8,
        headline: "CenturyLink, Inc. (CTL) Releases Q1 Earnings Guidance",
        blurb: "",
        publisher: "The Verge",
        author:"Robin Meade",
        date: "01/25/15",
        time: "10:11PM",
        type: "article"
      },
      {//render function with data set into an array
        tags: ["EARNINGS RELEASE", "LEISURE", "NASDAQ"],
        score: 5,
        headline: "Orbitz Worldwide, Inc. Earnings Release Available on Company's Investor Relations Website",
        blurb: "Orbitz Worldwide, Inc. OWW, +21.79% today announced the companys financial results for the fourth quarter and year ended December",
        publisher: "The Verge",
        author: "Robin Meade",
        date: "01/24/2015",
        time: "8:30am",
        type: "main_article"
      },
    ]);

});
//variables set
var lastPosition="right";
var sizeIndex = 0.0;
var sizes = ["sml", "big", "sml", "big", "big", "sml", "big", "sml"];
//helpers function for to use the objects in html
Template.author_article_page.helpers ( {
//looped articles obtains these objects
  getArticles: function() {
    var data = Session.get("article_list_page");
    return data;
  },
  isMainArticle: function(objType) {
    if (objType === "main_article"){
      return true;
    } else {
      return false;
    }
  },
  isArticle: function(objType) {

    if (objType == "main_article" || objType == "article"){
      return true;
    } else {
      return false;
    }
  },
//box function
  isSmallBox: function() {
    if (sizes[Math.floor(sizeIndex)] === "sml") {
      sizeIndex+=0.5;
      return true;
    } else {
      sizeIndex+=0.5;
      return false;
    }
  },
  isLessThanTwoDigits: function(num){
   if(num<10&&num>0)
     return true;
   else
     return false;
 },
 isTwotoFourDigits: function(num){
   if(num>=10&&num<=9999)
     return true;
   else
     return false;
 },
  onLeft: function() {
    if (lastPosition === "left")
    {
      lastPosition = "right";
      return false;
    } else {
      lastPosition = "left";
      return true;
    }
  },
  cutOff: function(str) {
    if (str.length > 124){
      return str.substring(0,124) + "...";
    }
    return str;
  }

})
//for selection of page numbered buttons
artLstSelect = function(p)
{
  var artLstPages = [
    document.getElementById("artLstPage1"),
    document.getElementById("artLstPage2"),
    document.getElementById("artLstPage3"),
    document.getElementById("artLstPage4")
  ];
  for(var i = 1; i != 5; i++)
  {
    if(i!=4)
    {
      if(i==p)
      {
        artLstPages[i-1].className = "ap-pages-circle-selected";
      } else {
        artLstPages[i-1].className = "ap-pages-circle";
      }
    } else {
      if(i==p)
      {
        artLstPages[i-1].className = "ap-pages-oval-selected";
      } else {
        artLstPages[i-1].className = "ap-pages-oval";
      }
    }
  }
}
