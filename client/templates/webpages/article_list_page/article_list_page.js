/*
Author: Tanner Storment
Date: [08/03/2015]
Description: Logic for the list of articles Page
Related Files:
- /client/templates/webpages/article_list_page.html
- /client/stylesheets/webpages/article_list_page.less
*/

Template.article_list_page.onRendered( function() {
  Session.set("article_list_page_header", {
    headline: "'Ok Google' Can Now Send Messages Vis WhatsApp.",
    blurb: "Google Inc (NASDAQ:GOOG) started allowing Android users to use voice actions like the \"OK Google\" command for operating a third-party app a few months ago, and now, the Internet Giant lorem ipsum dolor sit amet consequiter",
    publisher: "Value Walk",
    date: "07/29/2015"
  });
  Session.set("article_list_page",
  [
    {
      tags: ["EARNINGS RELEASE", "LEISURE", "NASDAQ"],
      score: 5,
      headline: "Orbitz Worldwide, Inc. Earnings Release Available on Company's Investor Relations Website",
      blurb: "Orbitz Worldwide, Inc. OWW, +21.79% today announced the companys financial results for the fourth quarter and year ended December",
      publisher: "MarketWatch",
      author: "GlobalNews",
      date: "01/24/2015",
      time: "8:30am",
      type: "main_article"
    },
    {
      tags: ["EARNINGS RELEASE", "CONSUMER"],
      score: 2,
      headline: "HubSpot Exceeded Expectations in Q4",
      blurb: "",
      publisher: "BostInno",
      author: "Lauren Dunlap",
      date: "01/25/15",
      time: "10:11PM",
      type: "article"
    },
    {
      tags: ["EARNINGS RELEASE", "LEISURE"],
      score: 0,
      headline: "Manchester United (MANU) on Q2 2015 Results - Earnings Call Transcript",
      blurb: "",
      publisher: "CBS News",
      author: "Veronica De La Cruz",
      date: "01/25/15",
      time: "10:11PM",
      type: "video"
    },
    {
      tags: ["EARNINGS RELEASE", "MOTOR VEHICLE"],
      score: 8,
      headline: "Here's What to Expect from Tesla Earnings",
      blurb: "",
      publisher: "In-Depth Fortune",
      author: "Timothy Clabo",
      date: "01/25/15",
      time: "10:11PM",
      type: "article"
    },
    {
      tags: ["EARNINGS RELEASE", "SOFTWARE"],
      score: 1,
      headline: "TripAdvisor Beats its 4th Quarter Revenue, Falls Shy on Earnings",
      blurb: "",
      publisher: "NY Times",
      author: "Nick Wingfield",
      date: "01/25/15",
      time: "10:11PM",
      type: "article"
    },
    {
      tags: ["EARNINGS RELEASE", "FINANCE"],
      score: 0,
      headline: "Kroll Bond Rating Agency Releases Cadence Bancorp, LLC lorem ipsum dolor sit amet consequiter",
      blurb: "",
      publisher: "INS News",
      author: "Veronica De La Cruz",
      date: "01/25/15",
      time: "10:11PM",
      type: "video"
    },
    {
      tags: ["EARNINGS RELEASE", "HARDWARE"],
      score: 2,
      headline: "Nvidia Releases Fourth Quarter Earnings",
      blurb: "",
      publisher: "WallStreetScope",
      author: "Lauren Dunlap",
      date: "01/25/15",
      time: "10:11PM",
      type: "article"
    },
    {
      tags: ["EARNINGS RELEASE", "HEALTHCARE"],
      score: 1,
      headline: "Acadia Healthcare Company Inc (ACHC) Releases FY15 Earnings",
      blurb: "",
      publisher: "The Legacy",
      author: "Nick Wingfield",
      date: "01/25/15",
      time: "10:11PM",
      type: "article"
    },
    {
      tags: ["EARNINGS RELEASE", "COMMUNICATION"],
      score: 8,
      headline: "CenturyLink, Inc. (CTL) Releases Q1 Earnings Guidance",
      blurb: "",
      publisher: "Dakota Financial",
      author: "Timothy Clabo",
      date: "01/25/15",
      time: "10:11PM",
      type: "article"
    }
  ]);

});

var lastPosition="right"; //Keeps track of the position of the last small article tile
var sizeIndex = 0.0; //Keeps track of our position in sizes[]
var sizes = ["sml", "big", "sml", "big", "big", "sml", "big", "sml"]; //The stylesheet said tiles should follow this pattern
Template.article_list_page.helpers ( {
  //Gets & returns the article from article_list_page_header
  getHeaderArticle: function() {
    var data = Session.get("article_list_page_header");
    return data;
  },
  //Gets & returns the big list of articles to display in the little tiles
  getArticles: function() {
    var data = Session.get("article_list_page");
    return data;
  },
  //Determines whether the article should be in a big, full width container or not
  isMainArticle: function(objType) {
    if (objType === "main_article"){
      return true;
    } else {
      return false;
    }
  },
  //Determins whether or not we should draw a newspaper. If not we'll draw a video icon
  isArticle: function(objType) {

    if (objType == "main_article" || objType == "article"){
      return true;
    } else {
      return false;
    }
  },
  //Returns true if we should draw a small box & header, false if not
  //We increment by 0.5 because I hate code dupe and {{#each}} requires me to end divs.
  //I would have to make an entirely new "template" for the big tile and small tiles.
isSmallBox: function() {
  if (Math.floor(sizeIndex) > 7)
  {
    sizeIndex = 0;
  }
  if (sizes[Math.floor(sizeIndex)] === "sml") {
    sizeIndex+=0.5;
    return true;
  } else {
    sizeIndex+=0.5;
    return false;
  }
},
//Used to determine if an article's "score" is greater than 0
isGreaterThanZero: function(num) {
  return num > 0;
},
//Determins whether or not we should float left for our article tile
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
//I'm Sorry. Cuts off a string at 124(specs said so) characters and adds an ...
//If I knew a better way to do multi line ellipsis I would.
cutOff: function(str) {
  if (str.length > 124){
    return str.substring(0,124) + "...";
  }
  return str;
}

})
//Colors circles based on page? Not sure. Ask Kyle Toom.
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
        artLstPages[i-1].className = "art-lst-pages-circle-selected";
      } else {
        artLstPages[i-1].className = "art-lst-pages-circle";
      }
    } else {
      if(i==p)
      {
        artLstPages[i-1].className = "art-lst-pages-oval-selected";
      } else {
        artLstPages[i-1].className = "art-lst-pages-oval";
      }
    }
  }
}
