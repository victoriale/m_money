//FOR NEXSTAR GRABBING viewPort
getViewPort = function()
{
    var screenWidth, screenHeight;
    if ( typeof window.innerWidth == 'number' )
    {
        screenWidth = window.innerWidth;
        screenHeight = window.innerHeight;
    } else if ( document.documentElement && ( document.documentElement.clientWidth || document.documentElement.clientHeight ) )
    {
        screenWidth = document.documentElement.clientWidth;
        screenHeight = document.documentElement.clientHeight;
    } else if( document.body && ( document.body.clientWidth || document.body.clientHeight ) ) {
        screenWidth = document.body.clientWidth;
        screenHeight = document.body.clientHeight;
    }
    return { width: screenWidth, height: screenHeight };
}
getTagInfo = function()
{
    window.groupId = window.groupId == undefined ? Math.round( Math.random() * 1000 ) : window.groupId;
    var viewPort = getViewPort();
    var alias = viewPort.width <= 768 ? 'mobile' : ( viewPort.width > 768 && viewPort.width <= 1006 ? 'tablet' : 'display' );
    var domain = alias == 'mobile' ? 'a' : ( alias == 'tablet' ? 'a' : 'adserver' );
    return { domain: domain, alias: alias, groupId: groupId, viewPort: viewPort }
}

getScript = function(domain){
  domain = domain.toLowerCase();
  var tag_alias;
  switch(domain){
    case 'bigcountryhomepage.com':
    tag_alias = 'ktab'
    break;
    case 'everythinglubbock.com':
    tag_alias = 'klbk'
    break;
    case 'fortwaynehomepage.net':
    tag_alias = 'wfft'
    break;
    case 'kerngoldenempire.com':
    tag_alias = 'kget'
    break;
    case 'myarklamiss.com':
    tag_alias = 'ktve'
    break;
    case 'myeasttex.com':
    tag_alias = 'ketk'
    break;
    case 'nwahomepage.com':
    tag_alias = 'knwa'
    break;
    case 'ozarksfirst.com':
    tag_alias = 'kolr'
    break;
    case 'texomashomepage.com':
    tag_alias = 'kfdx'
    break;
    case 'wearecentralpa.com':
    tag_alias = 'wtaj'
    break;
    case 'mytwintiers.com':
    tag_alias = 'wetm'
    break;
  }
  return tag_alias;
}
