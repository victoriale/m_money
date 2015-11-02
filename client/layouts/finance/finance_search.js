Finance_Search = function(quer){
  function isInArray(value, array){
    return array.indexOf(value) > -1;
  }

  Array.prototype.remove = function(from, to) {
    var rest = this.slice((to || from) + 1 || this.length);
    this.length = from < 0 ? this.length + from : from;
    return this.push.apply(this, rest);
  };

  String.prototype.replaceAt = function(index, character) {
    return this.substr(0, index) + character + this.substr(index+character.length);
  };

  function abbrState(input, to){
    var states = [
      ['Arizona', 'AZ'],
      ['Alabama', 'AL'],
      ['Alaska', 'AK'],
      ['Arkansas', 'AR'],
      ['California', 'CA'],
      ['Colorado', 'CO'],
      ['Connecticut', 'CT'],
      ['Delaware', 'DE'],
      ['Florida', 'FL'],
      ['Georgia', 'GA'],
      ['Hawaii', 'HI'],
      ['Idaho', 'ID'],
      ['Illinois', 'IL'],
      ['Indiana', 'IN'],
      ['Iowa', 'IA'],
      ['Kansas', 'KS'],
      ['Kentucky', 'KY'],
      ['Louisiana', 'LA'],
      ['Maine', 'ME'],
      ['Maryland', 'MD'],
      ['Massachusetts', 'MA'],
      ['Michigan', 'MI'],
      ['Minnesota', 'MN'],
      ['Mississippi', 'MS'],
      ['Missouri', 'MO'],
      ['Montana', 'MT'],
      ['Nebraska', 'NE'],
      ['Nevada', 'NV'],
      ['New Hampshire', 'NH'],
      ['New Jersey', 'NJ'],
      ['New Mexico', 'NM'],
      ['New York', 'NY'],
      ['North Carolina', 'NC'],
      ['North Dakota', 'ND'],
      ['Ohio', 'OH'],
      ['Oklahoma', 'OK'],
      ['Oregon', 'OR'],
      ['Pennsylvania', 'PA'],
      ['Rhode Island', 'RI'],
      ['South Carolina', 'SC'],
      ['South Dakota', 'SD'],
      ['Tennessee', 'TN'],
      ['Texas', 'TX'],
      ['Utah', 'UT'],
      ['Vermont', 'VT'],
      ['Virginia', 'VA'],
      ['Washington', 'WA'],
      ['West Virginia', 'WV'],
      ['Wisconsin', 'WI'],
      ['Wyoming', 'WY'],
    ];

    if (to == 'abbr'){
      input = input.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
      for(i = 0; i < states.length; i++){
        if(states[i][0] == input){
          return(states[i][1]);
        }
      }
    } else if (to == 'name'){
      input = input.toUpperCase();
      for(i = 0; i < states.length; i++){
        if(states[i][1] == input){
          return(states[i][0]);
        }
      }
    }
  }

  /*==== SET UP THE CLEAN VARIABLES  ====*/

  var toss = {};
  //Session.set('p_search', undefined);
  Session.set('TickCheck', false);
  Session.set('NameCheck', false);
  Session.set('LocCheck', false);

  var words = new Array();
  var quer_ngrams = nlp.ngram(quer, {max_size:2});
  var pos = nlp.pos(quer, {dont_combine: true}).sentences[0]; //makes sure no 'double word' strings are returned
  var nouns = pos.nouns() //var of just the nouns

  for(i=0;i<pos.tokens.length;i++){
    words[i] = pos.tokens[i].text;      //sets each word of query into spot in new array
  }


  /*******************************************/

  console.log('Words: ' + words);


  /*==== PARSING ALL UPPER CASE WORDS ====*/


  var skipper = 0;
  var AllCapped = [];
  var TickerPurgeWords = ['I', 'A', 'N'];
  var TickerPurgeSymbols = ['!','?','.','>'];

  //this loop parses out all possible tickers (words in all upper case)
  for(i=0;i<words.length;i++){
    for(j=0;j<words[i].length;j++){
      if(words[i][j] !== words[i][j].toUpperCase()){
        break;
      }
      skipper ++;
    }
    if(skipper == words[i].length){
      AllCapped[AllCapped.length] = words[i];
    }
    skipper = 0;
  }

  //this loop runs the possible tickers against the words to be purged from the possibilities array
  for(i=0;i<TickerPurgeWords.length;i++){
    if(isInArray(TickerPurgeWords[i],AllCapped)){
      AllCapped.remove(i);
    }
  }

  //this loop takes out all special characters that could be at the end of the possible tickers( ! ? , . ( ) # )
  /*for(i=0;i<AllCapped.length;i++){
  for(j=0;j<AllCapped[i].length;j++){
  if(isInArray(AllCapped[i][j], TickerPurgeSymbols)){
  AllCapped[i].replaceAt(AllCapped[i].indexOf(AllCapped[i][j]), '');
  }
  }
  }*/

  //console.log(AllCapped);

  /*****************************************************/

  /*==== TICKER -- EXACT ( based on AllCapped[] ) ====*/
  if(AllCapped.length !== 0){
    for(i=0;i<AllCapped.length;i++){
      $.ajax({
        url: 'http://apifin.investkit.com/call_controller.php?action=search&wild=0&option=ticker&param=' + AllCapped[i],
        dataType: 'json',
        async: false,
        success: function(r){
          if(r['success'] == true){
            Session.set('TickCheck', r['ticker']['search_data']);
            //console.log(r['name']['search_data'][0]);
          }
        }
      });
    }
  }
  /****************************************************/





  /*==== NAME -- EXACT ( based on second degree ngrams ) ====*/
  if(Session.get('TickCheck') == false && Session.get('NameCheck') == false && Session.get('LocCheck') == false){
    for(i=0;i<quer_ngrams[1].length;i++){
      //http://apifin.investkit.com/call_controller.php?action=search&option=name&param=mark%20zuckerberg
      $.ajax({
        url: 'http://apifin.investkit.com/call_controller.php?action=search&wild=0&option=name&param=' + quer_ngrams[1][i].word,
        dataType: 'json',
        async: false,
        success: function(r){
          if(r['success'] == true){
            Session.set('NameCheck', r['name']['search_data']);
            //console.log(r['name']['search_data'][0]);
          }
        }
      });
    }
  }

  /**************************************************/



  /*==== NAME -- EXACT ( based on nlp single word nouns ) ====*/
  if(Session.get('NameCheck') == false && Session.get('TickCheck') == false && Session.get('LocCheck') == false){
    for(i=0;i<words.length;i++){
      if(nlp.pos(words[i]).tags()[0][0] == 'NN'){
        $.ajax({
          url: 'http://apifin.investkit.com/call_controller.php?action=search&wild=0&option=name&param=' + words[i],
          dataType: 'json',
          async: false,
          success: function(r){
            if(r['success'] == true){
              Session.set('NameCheck', r['name']['search_data']);
              //console.log(r['name']['search_data'][0]);
            }
          }
        });
      }
    }
  }
  /*********************************************************************************/



  //use api.real version of the is_city method? for location based parsing??


  /*==== LOCATION -- EXACT ( based on words[] ) ====*/
  if(Session.get('TickCheck') == false && Session.get('NameCheck') == false && Session.get('LocCheck') == false){
    for(i=0;i<words.length;i++){
      if(words[i].toLowerCase() !== 'the'){
        //http://apifin.investkit.com/call_controller.php?action=search&option=location&param=ks
        $.ajax({
          url: 'http://apifin.investkit.com/call_controller.php?action=search&wild=0&option=location&param=' + words[i],
          dataType: 'json',
          async: false,
          success: function(r){
            if(r['success'] == true){
              console.log(words[i]);
              Session.set('LocCheck', r['location']['search_data']);
              //console.log(r['location']['search_data'][0]);
            }
          }
        });
      }
    }
  }
  /**************************************/


  /*==== LOCATION -- EXACT ( based on second degree ngrams ) ====*/
  if(Session.get('TickCheck') == false && Session.get('NameCheck') == false && Session.get('LocCheck') == false){
    for(i=0;i<quer_ngrams[1].length;i++){
      //http://apifin.investkit.com/call_controller.php?action=search&option=location&param=ks
      $.ajax({
        url: 'http://apifin.investkit.com/call_controller.php?action=search&wild=0&option=location&param=' + quer_ngrams[1][i].word,
        dataType: 'json',
        async: false,
        success: function(r){
          if(r['success'] == true){
            console.log(quer_ngrams[1][i].word);
            Session.set('LocCheck', r['location']['search_data']);
            //  console.log(r['location']['search_data'][0]);
          }
        }
      });
    }
  }
  /**************************************************/






  /*==== DOUBLE WORD COMPANY NAME PARSING MECHANISM BASED ON PROPER NOUNS ====*/

  //impossible for now :(   would use second degree ngrams for this but the nlp.pos('str').tags() doesnt work with two words at a time.
  //this is also the barrier of exact search to open search

  /****************************************************************************/



  /*==== NAME -- OPEN ( based on second degree ngrams ) ====*/
  if(Session.get('TickCheck') == false && Session.get('NameCheck') == false && Session.get('LocCheck') == false){
    for(i=0;i<quer_ngrams[1].length;i++){
      //http://apifin.investkit.com/call_controller.php?action=search&option=name&param=mark%20zuckerberg
      $.ajax({
        url: 'http://apifin.investkit.com/call_controller.php?action=search&wild=1&option=name&param=' + quer_ngrams[1][i].word,
        dataType: 'json',
        async: false,
        success: function(r){
          if(r['success'] == true){
            Session.set('NameCheck', r['name']['search_data']);
            //console.log(r['name']['search_data'][0]);
          }
        }
      });
    }
  }

  /**************************************************/



  /*==== NAME -- OPEN ( based on nlp single word nouns  ) ====*/
  if(Session.get('NameCheck') == false && Session.get('TickCheck') == false && Session.get('LocCheck') == false){
    for(i=0;i<words.length;i++){
      if(nlp.pos(words[i]).tags()[0][0] == 'NN'){
        $.ajax({
          url: 'http://apifin.investkit.com/call_controller.php?action=search&wild=1&option=name&param=' + words[i],
          dataType: 'json',
          async: false,
          success: function(r){
            if(r['success'] == true){
              Session.set('NameCheck', r['name']['search_data']);
              //console.log(r['name']['search_data'][0]);
            }
          }
        });
      }
    }
  }
  /*********************************************************************************/



  /*==== NAME -- OPEN ( based on nlp words.length <= 3 ) ====*/
  if(Session.get('NameCheck') == false && Session.get('TickCheck') == false && Session.get('LocCheck') == false && words.length <= 3){
    for(i=0;i<words.length;i++){
      $.ajax({
        url: 'http://apifin.investkit.com/call_controller.php?action=search&wild=1&option=name&param=' + words[i],
        dataType: 'json',
        async: false,
        success: function(r){
          if(r['success'] == true){
            Session.set('NameCheck', r['name']['search_data']);
            //console.log(r['name']['search_data'][0]);
          }
        }
      });
    }
  }
  /*********************************************************************************/

  //ticker EXACT for lower case
  /*==== TICKER -- EXACT ( based on words[i] if words.length is equal to 1 ) ====*/
  if(Session.get('NameCheck') == false && Session.get('TickCheck') == false && Session.get('LocCheck') == false && words.length == 1){
    for(i=0;i<words.length;i++){
      $.ajax({
        url: 'http://apifin.investkit.com/call_controller.php?action=search&wild=0&option=ticker&param=' + words[i],
        dataType: 'json',
        async: false,
        success: function(r){
          if(r['success'] == true){
            Session.set('TickCheck', r['ticker']['search_data']);
            //console.log(r['name']['search_data'][0]);
          }
        }
      });
    }
  }
  /****************************************************/





  /*==== ROUTING CONTROL LOGIC ====*/

  //if(Session.get('TickCheck') !== false && Session.get('TickCheck').length == 1 && Session.get('NameCheck') == false && Session.get('LocCheck') == false){
  if(Session.get('TickCheck') !== false && Session.get('NameCheck') == false && Session.get('LocCheck') == false){
    Router.go('content.companyprofile', {ticker: Session.get('TickCheck')[0]['c_ticker'], name: Session.get('TickCheck')[0]['c_name'], company_id: Session.get('TickCheck')[0]['c_id']});
  }

  //else if(Session.get('TickCheck') == false && Session.get('NameCheck') !== false && Session.get('NameCheck').length == 1 && Session.get('LocCheck') == false){
  else if(Session.get('TickCheck') == false && Session.get('NameCheck') !== false && Session.get('LocCheck') == false){
    if(Session.get('NameCheck')[0]['name_type'] == 'company'){
      Router.go('content.companyprofile', {ticker: Session.get('NameCheck')[0]['c_ticker'], name: Session.get('NameCheck')[0]['c_name'], company_id: Session.get('NameCheck')[0]['c_id']});
    }else if(Session.get('NameCheck')[0]['name_type'] == 'officer'){
      Router.go('content.executiveprofile', {lname: Session.get('NameCheck')[0]['o_last_name'], fname: Session.get('NameCheck')[0]['o_first_name'], ticker: Session.get('NameCheck')[0]['c_ticker'], exec_id: Session.get('NameCheck')[0]['o_id']});
    }
  }

  //else if(Session.get('TickCheck') == false && Session.get('NameCheck') == false && Session.get('LocCheck') !== false && Session.get('LocCheck').length == 1){
  else if(Session.get('TickCheck') == false && Session.get('NameCheck') == false && Session.get('LocCheck') !== false){
    Router.go('content.locationprofile', {loc_id: abbrState(Session.get('LocCheck')[0]['c_hq_state'],'name'), city: Session.get('LocCheck')[0]['c_hq_city']});
  }

  else if(Session.get('TickCheck') == false && Session.get('NameCheck') == false && Session.get('LocCheck') == false){
    //NO RESULTS Route -- rarely happens.
    Router.go('content.noresults', {partner_id: Session.get('partner_id')});
  }
  /*else{
  //WildCard Route -- for multiple results.
  Router.go('content.search', {partner_id: Session.get('partner_id'), search_results: quer});
  }*/

  /*********************************/
} //end Finance_Search function
