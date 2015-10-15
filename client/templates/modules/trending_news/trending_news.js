
Template.trending_news.onCreated( function() {
  Session.set("trending_news_count",0);
});

Template.trending_news.onRendered( function() {
  this.autorun(function(){
    var city = Session.get('profile_header');
    if(typeof city != 'undefined'){
      Meteor.http.get('http://api.synapsys.us/news/?action=get_finance_whats_happening&city='+ city.c_hq_location ,function(err, data){
        if(err){
          console.log('CALL ERROR', err);
        }else{
          console.log(data);
          Session.set("trending_news",data);
        }
      })

    }else{
      return '';
    }
  })
});

Template.trending_news.events({
  'click .news_trndnews-news_left_button': function(){
    var counter = Session.get("trending_news_count");
    var tnews = Session.get('trending_news');
    console.log("FUCKER BITCH", tnews);
    if(counter > 0){
      counter--;
      Session.set("trending_news_count",counter);
    }
    else
    {
      counter = tnews['stories'].length-1;
      Session.set("trending_news_count", counter);
    }
  },
  'click .news_trndnews-news_right_button': function(){
    var counter = Session.get("trending_news_count");
    var tnews = Session.get('trending_news');
    console.log("FUCKER BITCH", tnews);
    if(counter < tnews['stories'].length - 1)
    {
      counter++;
      Session.set("trending_news_count",counter);
    }
    else
    {
      counter = 0;
      Session.set("trending_news_count", counter);
    }
  },
})
Template.trending_news.helpers ({
  //will grab the news in the array and using count go through all news
  TrendingStories: function(){
    var news = Session.get('trending_news');
    var count = Session.get('trending_news_count');
    if(typeof news != 'undefined'){
      if(typeof news.stories != 'undefined'){
        news.stories[count]['pubDate_ut'] = get_full_date(Number(news.stories[count]['pubDate_ut']));
        return news.stories[count];
      }
    }else{
      return '';
    }
  },


})
