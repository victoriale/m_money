
Template.trending_news.onRendered( function() {
  Session.set("trending_news");
});
  Template.trending_news.helpers (
    {
    trnd_name: function() {
      var data = Session.get("trending_news");
      return ["Mark Zuckerberg emerges as business person of the year"];
    },
    trnd_writtenby:function() {
      var data = Session.get("trending_news");
      return ["Julie Balise"];
    },
    trnd_timestamp:function() {
      var data = Session.get("trending_news");
      return ["8:17am, Friday July 17th, 2015"];
    },
    trnd_url:function(){
      return Router.path('content.allarticles');
    },
  })
