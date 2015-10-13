/*Author:Ramakrishna Vaibhav kasibhatla [Ram]
Created: [07/21/2015]
Description: [latest news- finance]
Associated Files: [latest_news.less,latest_news.html  ]
*/


/*template for getting data*/
Template.latest_news.helpers({
  newURL: function(){
      return Router.path('content.articlenews');
  },
  companyName: function(){
    var data = Session.get('profile_header');
    if(typeof data == 'undefined'){
      return '';
    }
    return data.c_name;
  },
  items:[
    {heading:"Facebook Inc (FB) Is Going After Another Google Inc Pro",description: "CNN > Lauren Dunlap", loc:"article published on 01/25/15 at 10:11pm", num:"+2", fontawesome:"fa-newspaper-o"},
    {heading:"Facebook's (FB) CEO Mark Zuckerberg on Q4 Repot....", description: "CNN > Veronica De La Cruz",loc:"article published on 01/25/15 at 10:11pm", num:"+8", fontawesome:"fa-volume-off"},
    {heading:"Facebook Inc (FB) Is Going After Another Google Inc Pro",description: "CNN > Lauren Dunlap", loc:"article published on 01/25/15 at 10:11pm", num:"+2", fontawesome:""},

  ],
  item2:[
    {heading:"Facebook (FB) Stock Falls Today Despite Two Million Active Advertiser Announ... ", description: "CNN > Timothy Clabo", loc:"article published on 01/25/15 at 10:11pm",num:"+10", fontawesome:"fa-play"},
    {heading:"Facebook Inc (FB) Planning For a $200 Billion Town For It's Employees", description: "CNN > Nick Wingfield", loc:"article published on 01/25/15 at 10:11pm",num:"+5", fontawesome:"fa-newspaper-o"}
  ]
});
