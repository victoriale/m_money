/*
Author: Zachary Pearson
Created: [10-30-2015]
Description: sec_doc_page
Associated Files: sec_doc_page.html, sec_doc_page.less, sec_doc_page_logic.js
*/
Template.sec_doc_page.onCreated(function(){
  this.autorun(function(){
    Session.set("Current_Doc", "Doc 1")
  })
});

Template.sec_doc_page.helpers({
  company: function(){
    return "[Profile]";
  },

  docName: function(){
    var name = Session.get("Current_Doc");
    return name;
  },

  list: function(){

   return doclist;
  }
});

//The following arrays are for dummy document purposes only.
//These can be removed once actual data/documents are available
var doclist = [];
var doc1= {};
doc1["class"] = "doc1";
doc1["name"] = "Doc 1";
doc1["path"] = "/doc1.pdf";
var doc2= {};
doc2["class"] = "doc2";
doc2["name"] = "Doc 2";
doc2["path"] = "/doc2.pdf";
var doc3= {};
doc3["class"] = "doc3";
doc3["name"] = "Doc 3";
doc3["path"] = "/doc3.pdf";
doclist.push(doc1);
doclist.push(doc2);
doclist.push(doc3);


Template.sec_doc_page.events({
  //allows the switch between doc view and doc list tabs
  'click .unselected': function(e, t){
    var clicked = $(e.target).attr("class").split(" ");

    //if statement to correct for the ocassions when the tab text
    //is clicked rather than the tab itself. Without this,
    //the child div inside the tab will be changed, not the tab
    //itself
    if(clicked[0] == "lefttab"){
      $(".selected").addClass("unselected");
      $(".selected").removeClass("selected");
      $(".reading").removeClass("unselected");
      $(".reading").addClass("selected");
      $(".documentPane").show();
      $(".listpane").hide();
    }
    else if(clicked[0] == "righttab"){
      $(".selected").addClass("unselected");
      $(".selected").removeClass("selected");
      $(".alldocs").removeClass("unselected");
      $(".alldocs").addClass("selected");
      $(".documentPane").hide();
      $(".listpane").show();
    }
  },

  //allows the switching between dummy docs by clicking the "read now"
  //button on the doc list tab.
  'click .notcurrent': function(e, t){
    var clicked = $(e.target).attr("class").split(" ");
    $(".current").children().text("Read Doc");
    $(".current").addClass("notcurrent");
    $(".current").removeClass("current");

    //if statement to correct for the ocassions when the button text
    //is clicked rather than the button itself. Without this,
    //the child div inside the button will be changed, not the button
    //itself
    if(clicked[0] == "buttonText")
    {
      var src = $("."+clicked[0]).parent().attr("class").split(" ");
      $("."+clicked[0]).parent().addClass("current");
      $("."+clicked[0]).parent().removeClass("notcurrent");
      $("."+clicked[0]).text("Reading Now");
      $(".document").attr("src","/"+src[2]+".pdf");
    }
    else
    {
      var src = $("."+clicked[0]).attr("class").split(" ");
      $("."+clicked[0]).addClass("current");
      $("."+clicked[0]).removeClass("notcurrent");
      $("."+clicked[0]).children().text("Reading Now");
      $(".document").attr("src","/"+src[2]+".pdf");
    }
    Session.set("Current_Doc", $("#"+src[2]).text());
  }
})

//helper function to determine which list items should have
//a white background
Handlebars.registerHelper("isEven", function(val){
  return val%2;
})

Handlebars.registerHelper("isFirst", function(val){
  if(val == 0){return true}
  else{return false}
})

Handlebars.registerHelper("isCurrent", function(val){
  var name = Session.get("Current_Doc");
  if(doclist[val]["name"] == name)
  { return true; }
  return false;
})
