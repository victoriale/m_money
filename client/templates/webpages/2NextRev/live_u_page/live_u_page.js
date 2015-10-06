/*Author: Kyle Toom
Date Created: 8/3/2015
Description: A page for displaying real time information
Associated files: live_u_page.html, live_u_page.less, live_u_page.js
*/

liveUPageData = [
  {
    speaker: "GoPro Inchsdhghgfhfghg.'s",
    title: "Stock Price:",
    message: "GoPro, Inc. (NASDAQ: GPRO) traded within a stock price of $69.80 to $73.09",
    location: "San Mateo",
    elapsed_time: "3 hours",
    type: 1
  },
  {
    speaker: "Tommy Lofgren",
    title: "said:",
    message: "Bacon ipsum dolor amet ham flank meatball tri-tip turducken ground round. Ribeye cupim beef, jerky shankle landjaeger spare ribs cow ground round.",
    location: "San Mateo",
    elapsed_time: "3 hours",
    type: 0
  },
  {
    speaker: "Chicago Tribune",
    title: "published an article:",
    message: "GoPro craters 9.3% after pricing its secondary offering...",
    location: "San Mateo",
    elapsed_time: "3 hours",
    type: 2
  },
  {
    speaker: "Vance Banks",
    title: "added GoPro, Inc:",
    message: "Tech Companies Portfolio",
    location: "San Mateo",
    elapsed_time: "3 hours",
    type: 3
  },
  {
    speaker: "Vance Banks",
    title: "added GoPro, Inc:",
    message: "Tech Companies Portfolio",
    location: "San Mateo",
    elapsed_time: "3 hours",
    type: 3
  }
]

var lupBolden = function(s)
{
  return "<i class='lup-b'>" + s + "</i>";
}

Template.live_u_page.helpers({
  article: function() {
    return liveUPageData;
  },

  lupFmtMessage: function(type, message) {
    switch(type) //applies changes in style based on what type the message is
    {
    case 0:
      return message;
      break;
    case 1:
      return message.replace(/([$]\d+[.]\d+)/g, lupBolden);
      break;
    case 2:
      return "<i style='color: #3098ff; font-family: HN-B'>" + message + "</i>";
      break;
    case 3:
      return "To his favorite <i style='color: #3098ff; font-family: HN-B; font-style: normal;'>" + message + "</i>";
      break;
    case 4:
      return "To her favorite <i style='color: #3098ff; font-family: HN-B; font-style: normal;'>" + message + "</i>";
      break;
    default:
      return message;
      break;
    }
    if(type==0)
    {
      return message;
    }
  }
});
