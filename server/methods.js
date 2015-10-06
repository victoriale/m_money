Meteor.methods({
  GetCompanyData: function(company_id, batchNum) {
    console.log("New Company Request",company_id,batchNum);
    var Start = new Date();
    Start = Start.getTime();

    var UrlString = "http://apifin.synapsys.us/call_controller.php?action=company_profile&option="+batchNum+"&param="+company_id;

    //var UrlString = "http://localhost:3000/ProfileData.json";
    var data = HTTP.call("GET",UrlString);
    try {
      data = JSON.parse(data['content']);
    } catch(e) {
      console.log("Exception");
      data['content'] = data['content'].toString().replace(/^[^\{]*/,'');
      data = JSON.parse(data['content']);
    }
    var End = new Date();
    End = End.getTime();
    var TimeDif = (End - Start)/1000;
    console.log("Request finished in " + Math.round(TimeDif*10)/10 + " seconds");
    return data;
  },
});

Meteor.startup(function(){
  robots.addLine('User-agent: *');
  robots.addLine('Disallow: /');
});
