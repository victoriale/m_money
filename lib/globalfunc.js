//will return location profile
LocationURL = function(partnerid, location){
  return Router.path('content.locationprofile');
}

//will return Executive profile
ExecutiveURL = function(partnerid, executive){
  return Router.path('content.executiveprofile',{
    //exec_id: Session.get('exec_id');
  });
}

//will return company profile
CompanyURL = function(partnerid, company){
  return Router.path('content.companyprofile',{
    //company_id: Session.get('profile_header')['c_id'];
  });
}

PHcheck = function(data){
  var check = data.o_compensation;
  //initially check if the object is empty
  if(typeof check == 'undefined' || check == ''){
    data.o_compensation = {};
  }

    if(typeof data.o_compensation.Salary == 'undefined' || data.o_compensation.Salary == '0' || data.o_compensation.Salary == Infinity){
      data.o_compensation.Salary = 0;
    }else{
      data.o_compensation.Salary = Number(data.o_compensation.Salary);
    }

    if(typeof data.o_compensation.Bonus == 'undefined' || data.o_compensation.Bonus == '0' || data.o_compensation.Bonus == Infinity){
      data.o_compensation.Bonus = 0;
    }else{
      data.o_compensation.Bonus = Number(data.o_compensation.Bonus);
    }

    if(typeof data.o_compensation.TotalST == 'undefined' || data.o_compensation.TotalST == '0' || data.o_compensation.TotalST == Infinity){
      data.o_compensation.TotalST = 0;
    }else{
      data.o_compensation.TotalST = Number(data.o_compensation.TotalST);
    }

    if(typeof data.o_compensation.RestrictedStock == 'undefined' || data.o_compensation.RestrictedStock == '0' || data.o_compensation.RestrictedStock == Infinity){
      data.o_compensation.RestrictedStock = 0;
    }else{
      data.o_compensation.RestrictedStock = Number(data.o_compensation.RestrictedStock);
    }

    if(typeof data.o_compensation.AllOtherLT == 'undefined' || data.o_compensation.AllOtherLT == '0' || data.o_compensation.AllOtherLT == Infinity){
      data.o_compensation.AllOtherLT = 0;
    }
    else{
      data.o_compensation.AllOtherLT = Number(data.o_compensation.AllOtherLT);
    }

    if(typeof data.o_compensation.TotalComp == 'undefined' || data.o_compensation.TotalComp == '0' || data.o_compensation.TotalComp == Infinity){
      data.o_compensation.TotalComp = 0;
    }else{
      data.o_compensation.TotalComp = Number(data.o_compensation.TotalComp);
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
  var maxsize= ($(maxdiv).width());
  var currentsize= $(curdiv).width();
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
  delete Session.keys['IsCompany'];
  delete Session.keys['IsExec'];
  delete Session.keys['IsLocation'];
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

//number converter to decimal with correct format version 2
nFormatter2 = function(num) {
  if (num >= 1000000000000) {
		return (num / 1000000000000).toFixed(0).replace(/\.0$/, '') + ' Trillion';
	}
	if (num >= 1000000000) {
		return (num / 1000000000).toFixed(0).replace(/\.0$/, '') + ' Billion';
	}
	if (num >= 1000000) {
		return (num / 1000000).toFixed(0).replace(/\.0$/, '') + ' Million';
	}
	if (num >= 1000) {
		return (num / 1000).toFixed(0).replace(/\.0$/, '') + ' Thousand';
	}
	return num;
}

// make sure to scroll to the top of the page on a new route
// Use: global
scrollUp = function() {
    $('body,html').scrollTop(0);
}

//pass date to get unix returned
convert_date_readableToUnix = function(val){
  return new Date(val).getTime() / 1000;
}

//Pass in unix (milliseconds) and return full date (ex. Thursday Sep 17, 2015)
get_full_date = function(unix){
 return moment(unix).format('dddd MMM DD, YYYY');
}

//Adds commas to a value with decimal points
commaSeparateNumber_decimal = function(val){
    val = val.toString().replace(/,/g, ''); //remove existing commas first
    var valSplit = val.split('.'); //then separate decimals

    while (/(\d+)(\d{3})/.test(valSplit[0].toString())){
        valSplit[0] = valSplit[0].toString().replace(/(\d+)(\d{3})/, '$1'+','+'$2');
    }

    if(valSplit.length == 2){ //if there were decimals
        val = valSplit[0] + "." + valSplit[1]; //add decimals back
    }else{
        val = valSplit[0]; }

    return val;
}

//convert all state abbr to full  PROB DONT NEED THIS BUT KEEPING HERE JUST IN CASE
fullstate = function(state){
  var stateName = {
    AL: 'Alabama',
    AK: 'Alaska',
    AZ: 'Arizona',
    AR: 'Arkansas',
    CA: 'California',
    CO: 'Colorado',
    CT: 'Connecticut',
    DC: 'District of Columbia',
    DE: 'Delaware',
    FL: 'Florida',
    GA: 'Georgia',
    HI: 'Hawaii',
    ID: 'Idaho',
    IL: 'Illinois',
    IN: 'Indiana',
    IA: 'Iowa',
    KS: 'Kansas',
    KY: 'Kentucky',
    LA: 'Lousiana',
    ME: 'Maine',
    MD: 'Maryland',
    MA: 'Massachusetts',
    MI: 'Michigan',
    MN: 'Minnesota',
    MS: 'Mississippi',
    MO: 'Missouri',
    MT: 'Montana',
    NE: 'Nebraska',
    NV: 'Nevada',
    NH: 'New Hampshire',
    NJ: 'New Jersey',
    NM: 'New Mexico',
    NY: 'New York',
    NC: 'North Carolina',
    ND: 'North Dakota',
    OH: 'Ohio',
    OK: 'Oklahoma',
    ON: 'Ontario',
    OR: 'Oregon',
    PA: 'Pennsylvania',
    PR: 'Peurto Rico',
    RI: 'Rhode Island',
    SC: 'South Carolina',
    SD: 'South Dakota',
    TN: 'Tennessee',
    TX: 'Texas',
    UT: 'Utah',
    VT: 'Vermont',
    VA: 'Virginia',
    WA: 'Washington',
    WV: 'West Virginia',
    WI: 'Wisconsin',
    WY: 'Wyoming'
  }
  return stateName[state];
}

//USED FOR YSEOP AI CONTENT CONVERT XML TO string
createGenericString = function (error, data) {
  if ( error ) {
    console.log(error);
    //window.alert('An error occured. Check the console for more details');
    return false;
  }
  try {
    if ( window.DOMParser ) {
      parser = new DOMParser();
      xml = parser.parseFromString(data,"text/xml");
    } else {
      xml = new ActiveXObject("Microsoft.XMLDOM");
      xml.async = false;
      xml.loadXML(data);
    }
    //return full XML result
    //console.log('XML: ', xml);
    var index = 0, subInd = 0, indArr = ['y:output','y:results','y:texts','y:txt'], data = xml;
    while ( data.nodeName != 'y:txt' ) {
      if ( subInd == data.childNodes.length ) {
        console.log('Invalid index: ', data);
        //window.alert('Error Getting Text Node. See console for more details');
        return false;
      }
      if ( data.childNodes[subInd].nodeName == indArr[index] ) {
        data = data.childNodes[subInd];
        subInd = 0;
        index++;
      }
      subInd++;
    }
    //Return XML final doc containing content
    //console.log('Text XML: ', data);
    counter = 0;
    recursion = 0;
    function ParseElement(Element, RetStr) {
      counter++;
      recursion++;
      if ( recursion > 5 ) {
        console.log('Recursion limit reached (You were on level ' + recursion + ' of recursion)');
        recursion--;
        return RetStr;
      }
      if ( counter > 500 ) {
        return RetStr;
      }
      switch (Element.nodeName) {
        case 'yt:bold':
          RetStr = RetStr + '<b>' + Element.textContent + '</b>';
          break;
        case 'yt:line':
          RetStr = RetStr + '<div class="line"></div>';
          break;
        case 'yt:par':
          RetStr = RetStr + '<br><br>';
          break;
        case 'yt:hlink':
          var ldata = Element.childNodes;
          delete ltext;
          delete lloc;
          for ( var subInd = 0; subInd < ldata.length; subInd++ ) {
            if ( ldata[subInd].nodeName == 'yt:title' ) {
              var ltext = ldata[subInd].textContent;
            } else if ( ldata[subInd].nodeName == 'yt:src' ) {
              var lloc = ldata[subInd].textContent;
            }
          }
          if ( typeof ldata != "undefined" && typeof lloc != "undefined" ) {
            RetStr = RetStr + '<a href="' + lloc + '">' + ltext + '</a>';
          }
          break;
        case '#text':
          RetStr = RetStr + Element.textContent;
          break;
        default:
          for ( var index = 0; index < Element.childNodes.length; index++ ) {
            RetStr = ParseElement(Element.childNodes[index], RetStr);
          }
      }
      recursion--;
      return RetStr;
    }
    var RetStr = "";
    RetStr = ParseElement(data, RetStr);
    if ( counter > 500 ) {
      console.log(counter);
      //window.alert('The element limit was reached (limit 500 elements). Your element count (that were processed): ' + counter);
    }
    $('#demo_div').html(RetStr);
    return RetStr
  } catch(e) {
    console.log('Content Parse Error: ', e);
    //window.alert('Error Parsing Content. Check console for more details');
    return false;
  }
}

//global registor to detect value and change color in html
Template.registerHelper('changeColor', function(val){
 if(val >= 0){
   return '#44b224 ';
 }else{
   return '#ca1010 ';
 }
})

//global registor to detect value and change color in html
Template.registerHelper('changeIcon', function(val){
 if(val >= 0){
   return 'fa-arrow-up';
 }else{
   return 'fa-arrow-down';
 }
})

// Return correct image url
Template.registerHelper('imageUrl', function(path){
  return 'http://apifin2.synapsys.us/images/' + path;
});

// Return correct image url
Template.registerHelper('exchange', function(path){
  return '/exchange/' + path + '.png';
});
