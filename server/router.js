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

var minify = Npm.require('html-minifier').minify;

var info_envar = new Meteor.EnvironmentVariable;

function RenderError(res){
  res.writeHead(410);
  res.write('<head>\n');
  res.write('<meta name="description" content="This page does not exist"/>\n');
  res.write('<meta name="og:site_name" content="Joyful Home"/>\n');
  res.write('<meta name="og:title" content="Page Does Not Exist | JoyfulHome.com"/>\n');
  res.write('<meta name="robots" content="noindex"/>\n');
  res.write('<title>Page Does Not Exist | JoyfulHome.com</title>\n');
  res.end('</head>\n');
  return false;
}

var seoPicker = Picker.filter(function(req, res) {
  return true;
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
