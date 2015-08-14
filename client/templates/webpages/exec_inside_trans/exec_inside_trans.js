/*
Author: Meghana yerramilli
Created: [8-11-2015]
Description:exec_inside_trans Webpage
Associated Files: exec_inside_trans.html,exec_inside_trans.less
*/

//data set for retrieval in html
details = [
  {
    name: "Mark Zuckerberg",
    company: "Facebook, Inc.",
    date:"Dec 26th, 2013",
    shares:"41,350,000 shares",
    price:"$55.05",
    amount:"$2,276,317,500",
    time: "December 26th, 2013",
    location: "Menlo Park, CA"
  },
  {
    name: "Mark Zuckerberg",
    company: "Facebook, Inc.",
    date:"May 22nd, 2012",
    shares:"30,200,000 shares",
    price:"$37.58",
    amount:"$1,134,916,000",
    time: "May 22nd, 2012",
    location: "Menlo Park, CA"
  },
  {
    name: "Mark Zuckerberg",
    company: "Facebook, Inc.",
    date:"May 2nd, 2011",
    shares:"200,000 shares",
    price:"$20.35",
    amount:"$4,070,000",
    time: "May 2nd, 2011",
    location: "Menlo Park, CA"
  },
  {
    name: "Mark Zuckerberg",
    company: "Facebook, Inc.",
    date:"May 22nd, 2012",
    shares:"30,200,000 shares",
    price:"$37.58",
    amount:"$1,134,916,000",
    time: "May 22nd, 2012",
    location: "Menlo Park, CA"
  },
  {
    name: "Mark Zuckerberg",
    company: "Facebook, Inc.",
    date:"May 2nd, 2011",
    shares:"200,000 shares",
    price:"$20.35",
    amount:"$4,070,000",
    time: "May 2nd, 2011",
    location: "Menlo Park, CA"
  },
];
//variable set for different background class
insiderTransactionsWhite = true;
Template.exec_inside_trans.helpers (
  {
    //object returned to html
    info: function() {
      return details;
    },
    person:function () {
      return details[0].name;
    },
    // function for different background tiles
    getColor: function() {
      if(insiderTransactionsWhite)
      {
        insiderTransactionsWhite = false;
        return "white";
      } else {
        insiderTransactionsWhite = true;
        return "grey";
      }
    }

  })
  //for selection of page numbered buttons
  eitSelect = function(p)
  {
    var eitPages = [
      document.getElementById("eitPage1"),
      document.getElementById("eitPage2"),
      document.getElementById("eitPage3"),
      document.getElementById("eitPage4")
    ];
    for(var i = 1; i != 5; i++)
    {
      if(i!=4)
      {
        if(i==p)
        {
          eitPages[i-1].className = "eit-pages-circle-selected";
        } else {
          eitPages[i-1].className = "eit-pages-circle";
        }
      } else {
        if(i==p)
        {
          eitPages[i-1].className = "eit-pages-oval-selected";
        } else {
          eitPages[i-1].className = "eit-pages-oval";
        }
      }
    }
  }
