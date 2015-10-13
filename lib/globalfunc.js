//will return location profile
LocationURL = function(partnerid, location){
  return Router.path('content.locationprofile');
}

//will return Executive profile
ExecutiveURL = function(partnerid, executive){
  return Router.path('content.executiveprofile');
}

//will return company profile
CompanyURL = function(partnerid, company){
  return Router.path('content.companyprofile');
}

PHcheck = function(data){
  var check = data.o_compensation;
  if(typeof check == 'undefined' || check == ''){
    data.o_compensation = {};
  }
  if(check.Salary == '0' || typeof check.Salary == 'undefined'){
    data.o_compensation.Salary = "N/A";
  }else{
    data.o_compensation.Salary = dNumberToCommaNumber(data.o_compensation.Salary);
  }

  if(check.Bonus == '0' || typeof check.Bonus == 'undefined'){
    data.o_compensation.Bonus = "N/A";
  }else{
    data.o_compensation.Bonus = dNumberToCommaNumber(data.o_compensation.Bonus);
  }

  if(check.TotalST == '0' || typeof check.TotalST == 'undefined'){
    data.o_compensation.TotalST = "N/A";
  }else{
    data.o_compensation.TotalST = dNumberToCommaNumber(data.o_compensation.TotalST);
  }

  if(check.RestrictedStock == '0' || typeof check.RestrictedStock == 'undefined'){
    data.o_compensation.RestrictedStock = "N/A";
  }else{
    data.o_compensation.RestrictedStock = dNumberToCommaNumber(data.o_compensation.RestrictedStock);
  }

  if(check.AllOtherLT == '0' || typeof check.AllOtherLT == 'undefined'){
    data.o_compensation.AllOtherLT = "N/A";
  }
  else{
    data.o_compensation.AllOtherLT = dNumberToCommaNumber(data.o_compensation.AllOtherLT);
  }

  if(check.TotalComp == '0' || typeof check.TotalComp == 'undefined'){
    data.o_compensation.TotalComp = "N/A";
  }else{
    data.o_compensation.TotalComp = dNumberToCommaNumber(data.o_compensation.TotalComp);
  }
  //console.log(data);
  return data;
}
//returns number to text date in MONTHS
Months = function(number){
  var month = {
    "01":"Jan.",
    "02":"Feb.",
    "03":"Mar.",
    "04":"Apr.",
    "05":"May",
    "06":"June",
    "07":"July",
    "08":"Aug.",
    "09":"Sept.",
    "10":"Oct.",
    "11":"Nov.",
    "12":"Dec.",
  }
  return month[number];
}

/*
**make sure title stays correct size to fit div
**max div is the max width before text needs to resizetext
**cur div is the container containing the text-align
**cursize is the cur font-size of the container that needs to decrease
*/
resizetext = function(maxdiv, curdiv, cursize){
  $(curdiv).css('font-size', cursize);
  console.log(maxdiv, curdiv);
  var maxsize= ($(maxdiv).width());
  var currentsize= $(curdiv).width();
  console.log(maxsize, currentsize);
  while(currentsize > maxsize){
    //MUST HAVE BELOW otherwise infinite loops will happen
    currentsize= $(curdiv).width();
    var size = parseFloat($(curdiv).css("font-size"));
    size -= 1;
    $(curdiv).css('font-size', size + 'px !important');
  }
}

//preload images and store it into an array
preload = function (imgs) {
  var images = [];
	for (i = 0; i < imgs.length; i++) {
		images[i] = new Image()
		images[i].src = imgs[i]
	}
}

//resets all named session variable whenever this function is used.
ResetSession = function() {
  $(window).scrollTop(0);
  delete Session.keys['IsData'];
    for ( var SessVar in Session.keys ) {
    delete Session.keys[SessVar];
  }
  /*
  */
}

//sets title of page and page tab
SetPageTitle = function(newtitle,override) {
  var DefaultTitle = "InvestKit";
  override = override || false;
  newtitle = newtitle || null;
  if ( override ) {
    document.title = newtitle;
  } else {
    if ( newtitle != null ) {
      document.title = newtitle + " | " + DefaultTitle;
    } else {
      document.title = DefaultTitle;
    }
  }
  delete override;
  delete newtitle;
}

//first letter of word to uppercase and the rest are lower
toTitleCase = function(str){
  return str.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
}

//puts comma on every thousand number
dNumberToCommaNumber = function(Number) {
  return Number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

//number converter to decimal with correct format
nFormatter = function(num) {
	if (num >= 1000000000) {
		return (num / 1000000000).toFixed(1).replace(/\.0$/, '') + ' B';
	}
	if (num >= 1000000) {
		return (num / 1000000).toFixed(1).replace(/\.0$/, '') + ' M';
	}
	if (num >= 1000) {
		return (num / 1000).toFixed(1).replace(/\.0$/, '') + ' K';
	}
	return num;
}

// make sure to scroll to the top of the page on a new route
// Use: global
scrollUp = function() {
    $('body,html').scrollTop(0);
}
