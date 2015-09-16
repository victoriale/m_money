Template.insider_t_page.helpers({

date: "06/24/2015",
date2: "07/29/2015",
date3: "07/30/2015",
time: "8:00 AM EST",
locat: "San Francisco, CA",
name: "[Person's Profile Name]",
name2: "[Profile Name]",
con1: "[Person Connection 1's Name]",
con1desc: "Lorem ipsum dolor sit amet, consectetur adipisc- ing elit, sed do eiusmod"
          + " tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim "
          + "veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex" +
          " ea commodo consequat. Duis aute irure dolor in.",
option: "Insider Connections",
prftyp: "[profile type]",

tile1: [
  {
    color: "#F2F2F2",
    rank: 1,
    city: "[City]",
    state: "[STATE]",
    name1: "[Person Connection 1's Name]",
    pos: "[Position]",
    comp: "[Company]",
    connect: 100,
    link: "http://www.reddit.com/r/android"
  },
  {
    color: "#FFFFFF",
    rank: 2,
    city: "[City]",
    state: "[STATE]",
    name1: "[Person Connection 2's Name]",
    pos: "[Position]",
    comp: "[Company]",
    connect: 99,
    link: "http://www.reddit.com/r/android"
  },
  {
    color: "#F2F2F2",
    rank: 3,
    city: "[City]",
    state: "[STATE]",
    name1: "[Person Connection 3's Name]",
    pos: "[Position]",
    comp: "[Company]",
    connect: 98,
    link: "http://www.reddit.com/r/android"
  }
],
fc: [
  {
    width: "167px",
    margin: "2px",
    c_nm: "Exxon Mobil Corp.",
    c_stckprc: "$46.69",
    c_stckinc: "+0.39 (+0.85%)"
  },
  {
    width: "169px",
    margin: "2px",
    c_nm: "Johnson & Johnson",
    c_stckprc: "$99.55",
    c_stckinc: "+0.18 (+0.18%)"
  },
  {
    width: "169px",
    margin: "2px",
    c_nm: "Facebook Inc",
    c_stckprc: "$94.31",
    c_stckinc: "+2.68 (+2.76%)"
  },
  {
    width: "169px",
    margin: "0px",
    c_nm: "Wells Fargo & Co",
    c_stckprc: "$58.07",
    c_stckinc: "+0.18 (+0.13%)"
  }
],

tile2: [
  {
    color: "#FFFFFF",
    rank: 4,
    city: "[City]",
    state: "[STATE]",
    name1: "[Person Connection 4's Name]",
    pos: "[Position]",
    comp: "[Company]",
    connect: 75,
    link: "http://www.reddit.com/r/android"
  },
  {
    color: "#F2F2F2",
    rank: 5,
    city: "[City]",
    state: "[STATE]",
    name1: "[Person Connection 5's Name]",
    pos: "[Position]",
    comp: "[Company]",
    connect: 60,
    link: "http://www.reddit.com/r/android"
  }
]
});

//This handles the events on button clicks of 1,2,3 and 200
Template.insider_t_page.events({
    //This function is called when user presses the button "1" and the function makes the button background turn
    //blue and make the other buttons background white
    'click .in-pgnum-1': function()
    {
        $(".in-pgnum-1").css("background-color","#3098ff");
        $(".in-pgnum-1").css("color","#ffffff");
        $(".in-pgnum-2").css("background-color","#ffffff");
        $(".in-pgnum-2").css("color","#000000");
        $(".in-pgnum-3").css("background-color","#ffffff");
        $(".in-pgnum-3").css("color","#000000");
        $(".in-pgnum-200").css("background-color","#ffffff");
        $(".in-pgnum-200").css("color","#000000");
    },
    //This function is called when user presses the button "2" and the function makes the button background turn
    //blue and make the other buttons background white
    'click .in-pgnum-2': function()
    {
        $(".in-pgnum-2").css("background-color","#3098ff");
        $(".in-pgnum-2").css("color","#ffffff");
        $(".in-pgnum-1").css("background-color","#ffffff");
        $(".in-pgnum-1").css("color","#000000");
        $(".in-pgnum-3").css("background-color","#ffffff");
        $(".in-pgnum-3").css("color","#000000");
        $(".in-pgnum-200").css("background-color","#ffffff");
        $(".in-pgnum-200").css("color","#000000");
    },
    //This function is called when user presses the button "3" and the function makes the button background turn
    //blue and make the other buttons background white
    'click .in-pgnum-3': function()
    {
        $(".in-pgnum-3").css("background-color","#3098ff");
        $(".in-pgnum-3").css("color","#ffffff");
        $(".in-pgnum-2").css("background-color","#ffffff");
        $(".in-pgnum-2").css("color","#000000");
        $(".in-pgnum-1").css("background-color","#ffffff");
        $(".in-pgnum-1").css("color","#000000");
        $(".in-pgnum-200").css("background-color","#ffffff");
        $(".in-pgnum-200").css("color","#000000");
    },
    //This function is called when user presses the button "200" and the function makes the button background turn
    //blue and make the other buttons background white
    'click .in-pgnum-200': function()
    {
        $(".in-pgnum-200").css("background-color","#3098ff");
        $(".in-pgnum-200").css("color","#ffffff");
        $(".in-pgnum-2").css("background-color","#ffffff");
        $(".in-pgnum-2").css("color","#000000");
        $(".in-pgnum-3").css("background-color","#ffffff");
        $(".in-pgnum-3").css("color","#000000");
        $(".in-pgnum-1").css("background-color","#ffffff");
        $(".in-pgnum-1").css("color","#000000");
    }
});
