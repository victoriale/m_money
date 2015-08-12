
/*Author: Navya Eetaram
Created: [07/08/2015]
Description: Leave_comment
<Associated Files: comments.html, comments.js, comments.less, commentserver.js,
 comments_page.html, comments_page.js,comments_page.less,article_page.html,
 article_page.less, article_page_logic.js */

POST = new Mongo.Collection('post');
REPLY = new Mongo.Collection('reply');
POST2 = new Mongo.Collection('post2');
REPLY2 = new Mongo.Collection('reply2');
POST3 = new Mongo.Collection('post3');
REPLY3 = new Mongo.Collection('reply3');

POST.allow({
  insert: function(userId, doc) {
    return true;
  }
});

POST.allow({
  remove: function(userId, doc) {
    return true;
  }
});
REPLY.allow({
  insert: function(userId, doc) {
    return true;
  }
});
REPLY.allow({
  remove: function(userId, doc) {
    return true;
  }
});
POST2.allow({
  insert: function(userId, doc) {
    return true;
  }
});

POST2.allow({
  remove: function(userId, doc) {
    return true;
  }
});
REPLY2.allow({
  insert: function(userId, doc) {
    return true;
  }
});
REPLY2.allow({
  remove: function(userId, doc) {
    return true;
  }
});

POST3.allow({
  insert: function(userId, doc) {
    return true;
  }
});

POST3.allow({
  remove: function(userId, doc) {
    return true;
  }
});
REPLY3.allow({
  insert: function(userId, doc) {
    return true;
  }
});
REPLY3.allow({
  remove: function(userId, doc) {
    return true;
  }
});


if (Meteor.isServer) {
  Meteor.publish('post', function() {
    return POST.find();
  });
  Meteor.publish('reply', function() {
    return REPLY.find();
  });
  Meteor.publish('post2', function() {
    return POST2.find();
  });
  Meteor.publish('reply2', function() {
    return REPLY2.find();
  });
  Meteor.publish('post3', function() {
    return POST3.find();
  });
  Meteor.publish('reply3', function() {
    return REPLY3.find();
  });
}
