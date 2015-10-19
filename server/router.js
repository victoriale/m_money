// Create a custom handler for multiple async functions
var async_mult = function(functions, callback) {
  this._functions = functions;
  this._callback = callback;
}

/**
 * Executes the functions passed to the constructor.
 */
async_mult.prototype.execute = function execute() {
    var i;
    var functions = this._functions;
    var length = this._remaining = functions.length;
    this._results = [];

    for (i = 0; i < length; i += 1) {
        functions[i](this);
    }
};

/**
 * Signifies that another function has finished executing. Can be provided with
 * a value to store in the results array which is passed to the completion
 * handler.
 *
 * All functions in the batch must call this when done.
 *
 * @param {*} [result] Optional value to store and pass back to the completion handler when done.
 */
async_mult.prototype.done = function done(result) {
    this._remaining -= 1;

    if (typeof result !== 'undefined') {
        this._results.push(result);
    }

    if (this._remaining === 0) {
        this._completionHandler(this._results);
    }
};

// HTML minifier
var minify = Npm.require('html-minifier').minify;
// Environment Variables
var info_envar = new Meteor.EnvironmentVariable;

// Filter out bot requests
var seoPicker = Picker.filter(function(req, res) {
  if ( /bot/.test(req.headers['user-agent']) || /Webmaster/.test(req.headers['user-agent']) || /Bing/.test(req.headers['user-agent']) || /externalhit/.test(req.headers['user-agent']) ) {
    return true;
  }
  return false;
});

// Home Page
// NOT DONE
seoPicker.route('/:partner_id?',function(params, req, res){
  var startTime = (new Date()).getTime(); // Log the start time (normal variable b/c no async)

  var head_data = { // Data to put into the head of the document (meta tags/title)
    description: 'Discover your next investment with InvesKit\'s unique blend of lists, information, and profiles. Get big data in an easy to digest format with AI generated content, executive profiles, and much more!',
    title: 'InvestKit.com - Discover Your Next Investment',
    url: 'http://www.investkit.com/'
  };
  var page_data = {
    head_data: head_data,
    h1: {
      title: 'InvestKit.com - Discover Your Next Investment',
      content: {
        ul: [
          '<a href="http://google.com">Google</a>'
        ]
      },
      h2: [
        {
          title: 'H2 Title'
        }
      ]
    }
  };

  res.end(minify(SSR.render('generic_page',page_data), {
    minifyCSS: true,
    minifyJS: true,
    removeComments: true,
    collapseWhitespace: true
  })); // Write the pages template
  // Also minifies the HTML string

  // Log how long it took to render the page
  var endTime = (new Date()).getTime();
  console.log("SSRSTAT|PHX,,\"" + (Math.round((endTime - startTime)/10)/100) + "s\",\"" + (new Date()).getTime() + "\"|");
});

// Company Profile
seoPicker.route('/:partner_id?/company/:company_id',function(params, req, res){
  var startTime = (new Date()).getTime(); // Log the start time (normal variable b/c no async)

  // Get the data
  info_envar.withValue({params: params, res: res, req: req, startTime: startTime}, function(){
    var callback = Meteor.bindEnvironment(function(results){
      var res_arr = {};
      for ( var index = 0; index < results.length; index++ ) {
        res_arr = $.extend(res_arr, results[index]);
      }
      var info = info_envar.get();
      var res = info.res;
      res.end(JSON.stringify(res_arr, null, 2));
      return true;
    });

    var functions = [];
    var method_cb = function(error, data) {
      console.log("Batch 1");
      if ( error ) {
        console.log(error);
        batch.done({});
        return false;
      }
      batch.done(data);
    }

    functions.push(function(batch){
      Meteor.call("GetCompanyData",params.company_id,"batch_1", method_cb);
    });
    functions.push(function(batch){
      Meteor.call("GetCompanyData",params.company_id,"batch_2", method_cb);
    });
    functions.push(function(batch){
      Meteor.call("GetCompanyData",params.company_id,"batch_3", method_cb);
    });

    var company_batch = new async_mult(functions, callback);
  });

  var head_data = { // Data to put into the head of the document (meta tags/title)
    description: 'Discover your next investment with InvesKit\'s unique blend of lists, information, and profiles. Get big data in an easy to digest format with AI generated content, executive profiles, and much more!',
    title: 'InvestKit.com - Discover Your Next Investment',
    url: 'http://www.investkit.com/'
  };
  var page_data = {
    head_data: head_data,
    h1: {
      title: 'InvestKit.com - Discover Your Next Investment',
      content: {
        ul: [
          '<a href="http://google.com">Google</a>'
        ]
      },
      h2: [
        {
          title: 'H2 Title'
        }
      ]
    }
  };

  // res.end(minify(SSR.render('generic_page',page_data), {
  //   minifyCSS: true,
  //   minifyJS: true,
  //   removeComments: true,
  //   collapseWhitespace: true
  // })); // Write the pages template
  // Also minifies the HTML string

  // Log how long it took to render the page
  var endTime = (new Date()).getTime();
  console.log("SSRSTAT|PHX,,\"" + (Math.round((endTime - startTime)/10)/100) + "s\",\"" + (new Date()).getTime() + "\"|");
});
